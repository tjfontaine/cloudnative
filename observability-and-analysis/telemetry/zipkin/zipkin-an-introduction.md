# Zipkin - An Introduction

In this first post of our series around Microservice Application monitoring,  we'll introduce some concepts for making our lives easier, learn about Zipkin, then deploy and configure it in preparation for receiving telemetry from our applications in future posts. 


### Where Would This Be Useful? 

Let's consider how we would debug a misbehaving monolithic application. Our large hypothetical web application debugging flow could look something like:

1. You - as an SRE - notice a slight increase in overall average web response times in your monitoring stack over the last few hours. It's a relatively small increase but seems strange. You fire up your web browser and spam refresh on the app a few times. It seems to be loading fine. There's a slight increase in [HTTP 504](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504) response codes in your load balancer logs too, but user error can sometimes trigger this. Back to that article on HN for now. 
1. A little while later, user helpdesk tickets begin pouring in that the application is hanging for them. OK... The site works fine for you, but *something* is up. You take a look at your monitoring stack again and notice that while overall average web response times are slightly elevated, certain groups of endpoint are taking a lot longer than usual in some cases.
1. You take a look at your application source for the endpoints with issues and notice that the requests with problems are all passing through a user management code path. This code path backs on to your MySQL database to interact with a user object. 
1. This is starting to seem a bit more interesting. You take a look at your MySQL Process List. It looks mostly fine, but you occasionally notice a `users` table `SELECT` query taking a few seconds. That's not enough to cause any alarms, but a few seconds to pull a user object seems excessive.
1. OK, now you're suspicious. Another look through your application logs shows that some requests to these endpoints *do* respond quickly, which makes you think that the issue might relate to specific users rather than the endpoint.
1. You grab a few IP addresses from the logs of users that have the problem, and a few that don't, then cross-reference the IPs in your Sessions table to identify a user ID. Sometimes you run into multiple users behind single NAT'd IPs, but a few minutes of copy/pasting gets you a handful of User IDs that consistently do encounter the issue where their attempts to load specific endpoints takes an order of magnitude longer than usual, and often timeout altogether. 
2. A little bit of spot-the-difference later, and welp, it seems that a recently deployed feature has erroneously been storing massive amounts of data in the user object for the users that have been playing with it. Your MySQL server wasn't tuned to handle this, which meant that any affected user lookup took a very long time to retrieve, and ultimately caused the upstream load balancer to timeout the response. 

Rollback that change! 

This example was a relatively simple* process in a monolith since the faulty code paths became clear with some digging. We can track a request from a user all the way to our backend as it's all happening in one place, and we even get a semi-reliable token in the form of a user IP address to identify an end-to-end request. With a little bit of configuration we could even manually insert a unique identifier, such as user ID, directly into our logs.

_\* Albeit overly explicit and manual for the sake of getting the point across ;)_

However, if our application were a collection of Microservices joined by a transport such as HTTP, we would see that some web request endpoints might be returning slower than usual, and we would additionally see that our User Service is _sometimes_ performing slower than usual. We might even use our monitoring stack to line the two graphs together, vaguely correlating the performance issues, but confirming the exact issue as being tied to both _specific_ users and a _specific_ feature would be much harder since each microservice is only aware of precisely what it needs to carry out its function. For example, the Users service would be aware of a User ID, but not the Web URI that was hit to warrant the need for a returned User object. 

If only there were a way to track individual requests through the microservices that build up your applications, and a pretty UI for seeing how data flows between these microservices...

## Ohh, Zipkin!

As mentioned above, this is precisely what Zipkin does!

### Components

The best place for learning about the internals of Zipkin is straight from [zipkin.io](https://zipkin.io), but as a high-level summary, Zipkin can be split three ways:

#### Application-land

`Tracers` live inside of your application code. They record timing information and metadata of requests flowing through the application. Zipkin and its [community have released Tracer libraries (known as "Instrumentations")](https://zipkin.io/pages/existing_instrumentations.html) for many languages, meaning the collection of this data, known as `Spans` is often completely transparent.

`Reporters` take the `Spans` from your requests and send them via HTTP, Kafka, or Scribe to...

#### Zipkin-land

`Collectors` receieve the `Spans` from `Reporters` sort them, and store them.

`Storage` is external, and uses Cassandra by default, but MySQL, Elasticsearch, and others are supported. One of the benefits of using Elasticsearch is that the data can be queried as part of your ELK stack directly, allowing you to create graphs that go beyond the Zipkin UI.

#### User-land

A HTTP API is exposed by Zipkin for searching and retrieving the data from storage. This API is used by the `Zipkin Web UI`, which is the primary dashboard for users.

![](https://zipkin.io/public/img/web-screenshot.png)

## So, What Are We Doing? 

Elongated introductions aside, the goal of the rest of this guide is to:

* Take an existing Kubernetes cluster with Tiller installed
* Install Elasticsearch to act as our storage backend
* Install Zipkin to the cluster
* Test that the UI works

This will put us in a position to begin monitoring our Microservice applications in future parts of this series!

## Let's Do It!

To reiterate above, you should have an existing Kubernetes cluster already, with your local `kubectl` configured to access it. You'll also need the Helm client installed on your local machine. I'll be using OKE, which configures Helm/Tiller out of the box!

### Elasticsearch

First up, we need to install Elasticsearch to our cluster, which will act as our Zipkin data storage backend. This is a simple case of running:

```
helm install --name zipkin-es stable/elasticsearch
```

This should give you some output like:

```
NOTES:
The elasticsearch cluster has been installed.

Elasticsearch can be accessed:

  * Within your cluster, at the following DNS name at port 9200:

    zipkin-es-elasticsearch-client.default.svc

  * From outside the cluster, run these commands in the same shell:

    export POD_NAME=$(kubectl get pods --namespace default -l "app=elasticsearch,component=client,release=zipkin-es" -o jsonpath="{.items[0].metadata.name}")
    echo "Visit http://127.0.0.1:9200 to use Elasticsearch"
    kubectl port-forward --namespace default $POD_NAME 9200:9200
```

If you're using Oracle Container Engine, it may take a few  minutes for the underlying persistent storage volume to become available. Keep an eye on `kubectl get events` and `kubectl get pods` to see when the cluster is available, which will be indicated by no more errors/warnings appearing in the logs.

Keep note of the DNS name and port; we'll need that in the next section.

### Zipkin

Now let's install Zipkin to our Kubernetes cluster and configure it to talk to our shiny new Elasticsearch Cluster. Zipkin doesn't have a stable Helm chart so we'll be installing this one manually!

First, Create a [Kubernetes Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) for Zipkin:

_Filename: deployment.yml_

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zipkin
  labels:
    app: zipkin
spec:
  replicas: 2
  selector:
    matchLabels:
      app: zipkin
  template:
    metadata:
      labels:
        app: zipkin
    spec:
      containers:
      - name: zipkin
        image: openzipkin/zipkin:2.11
        ports:
        - containerPort: 9411
        env:
        - name: STORAGE_TYPE
          value: elasticsearch
        - name: ES_HOSTS
          value: zipkin-es-elasticsearch-client.default.svc
```
Apply this to your cluster with `kubectl apply -f deployment.yml`

The environment variables defined in the "env" section tell Zipkin to point at the Elasticsearch cluster we just provisioned.

Next, create a Kubernetes Service for the Zipkin Service that utilizes NodePorts. This gives you remote access to your Zipkin API and UI.

_Filename: service.yml_

```
kind: Service
apiVersion: v1
metadata:
  name: zipkin-api
spec:
  selector:
    app: zipkin
  ports:
  - protocol: TCP
    port: 9411
    targetPort: 9411
    nodePort: 30011
  type: NodePort
```

Again, apply this with `kubectl apply -f service.yml`. 

### Done!

Zipkin should now be running your Kubernetes cluster. It will be accessible by hitting one of your Kubernetes Nodes on port `3011` in your web browser:

![](https://d3vv6lp55qjaqc.cloudfront.net/items/2o3G1p3D0g2T2v2s070T/Image%202018-11-28%20at%202.21.20%20pm.png?X-CloudApp-Visitor-Id=229620&v=7419d730)

That's all there is to it! 

#### But Is It _Really_ Done?

If you'd like to add some test data to Zipkin before moving on to the next post, The OpenZipkin project has exposed some test data that you can manually add to your instance. This will confirm the following: 

* The Zipkin API is working
* Your underlying Elasticsearch cluster is able to accept, retain, and lookup data
* The Zipkin UI is working

The test data can be [found here.](https://github.com/openzipkin/zipkin/tree/master/zipkin-ui/testdata)

Download `netflix.json` from this repository to your local machine, then execute the following to add it to your Zipkin instance:

```
 curl -X POST -s <KUBERNETES CLUSTER NODE IP>:30011/api/v2/spans -H'Content-Type: application/json' -d @netflix.json
```
This will take advantage of the NodePort Service we configured above to allow you to access the service remotely. Don't forget to add one of your Kubernetes Node public IPs to the request! 

You can then confirm that the data was successfully inserted into Zipkin by opening the Zipkin UI in your browser, and searching for the data you just inserted.

You should see the inserted Spans, be able to click into them, and see the data they contain. If you can: congrats! You really are done! 

## Clean Up

Should you wish to delete everything we just created in this tutorial, running the following command will put your Kubernetes cluster back to how we found it:

```
kubectl delete svc/zipkin-api deploy/zipkin && helm delete zipkin-es
```

## Conclusion

Hopefully, you'll now have an understanding of why we might want to use Zipkin in a Microservice-based application environment and have a shiny new Zipkin instance running on your Kubernetes cluster.


