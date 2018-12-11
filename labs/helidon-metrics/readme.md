# Helidon Metric Collection and Tracing

## Before You Begin

This 20-minute tutorial shows you how to deploy Helidon microservice application instrumented for metric collection and tracing onto a local Docker environment and Kubernetes cluster. It will also walk through the process of deploying Prometheus and Zipkin onto a local Docker environment and Kubernetes cluster and how to use the services to view metric and tracing data. 

### Background

Project Helidon is an open source set of Java libraries used to write microservices. According to the official documentation, "Helidon is a collection of Java libraries for writing microservices that run on a fast web core powered by Netty... There is no unique tooling or deployment model. Your microservice is just a Java SE application."

In this tutorial you will be deploying a microservice application created using the the Helidon framework to a local Docker environment and Kubernetes cluster and collecting metrics and tracing data from that application. 

### What Do You Need?

The following list shows the minimum versions: 

- [Java SE 8](https://www.oracle.com/technetwork/java/javase/downloads) or [Open JDK 8](http://jdk.java.net/)
- [Maven 3.5](https://maven.apache.org/download.cgi) 
- [Docker 18.02](https://docs.docker.com/install/)
- [Kubectl 1.7.4](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 
- Kubernetes: Enable [Kubernetes Support for Mac](https://docs.docker.com/docker-for-mac/#kubernetes) or [Kubernetes Support for Windows](https://docs.docker.com/docker-for-windows/#kubernetes).
- [Helm](https://docs.helm.sh/using_helm/) 

[Here](https://helidon.io/docs/latest/#/getting-started/01_prerequisites) is an updated list of pre-requisites for using Helidon.

## Download the Application 

1. Begin by downloading the quickstart-se application:

```
git clone https://github.com/mickeyboxell/helidon
```

2. Change into the helidon-se-codeone-2018 directory

3. Build the application with: 

```
mvn package
```

4. Build the Docker Image: 

```
docker build -t quickstart-se target
```

5. Start the application with Docker: 

```
docker run --rm -p 8080:8080 quickstart-se:latest
```

6. Access the application	 at http://localhost:8080

## Exercise the Application

Generate metrics and tracing data for the application through the use of curl commands and interaction with the UI: 

```
# Get the default greeting
curl -X GET http://localhost:8080/greet
{"message":"Hello World!"}

# Get a greeting for Joe
curl -X GET http://localhost:8080/greet/Joe
{"message":"Hello Joe!"}

# Change the greeting using PUT
curl -X PUT http://localhost:8080/greet/greeting/Hola
{"gretting":"Hola"}

# Get a greeting for Jose, notice Hello is now Hola
curl -X GET http://localhost:8080/greet/Jose
{"message":"Hola Jose!"}

# Change greeting by POSTing JSON
curl -X POST -d '{"greeting" : "Howdy"}' http://localhost:8080/greet/greeting

# Change greeting by POSTing JSON to a slow handler
# Using asynchronous processing
curl -X POST -d '{"greeting" : "Hi"}' http://localhost:8080/greet/slowgreeting
```

## Metrics

The application makes metrics available at the `/metrics/` endpoint. You can get metrics in JSON and Prometheus format:

```
# Get Metrics in JSON format
curl -H 'Accept: application/json' -X GET http://localhost:8080/metrics/ | json_pp

# Get Metrics in Prometheus format
curl -H 'Accept: text/plain' -X GET http://localhost:8080/metrics/
```

### Downloading and Running Prometheus on your Local Machine

What use are metrics without a tool to consume them? In this lab we will be using a tool called [Prometheus](
https://prometheus.io/docs/prometheus/latest/getting_started/). 

1. [Download the latest release](https://prometheus.io/download) of Prometheus for your platform, then extract and run it:

```
tar xvfz prometheus-*.tar.gz
cd prometheus-*
./prometheus 
```

2. To configure Prometheus to scrape metrics from the application add this to `prometheus.yml` under `scrape_configs:`:

```
  - job_name: 'helidon'

    metrics_path: '/metrics/'
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
    - targets: ['localhost:8080']
```

3. Once Prometheus is runnining access the console (e.g. `localhost:9090/graph`) and click `Graph`. Enter `application:accessctr` then click `Execute`.

4. You should see the graph plotting the application's `accessctr` metric. Exercise the application using the steps above. Click `Execute` again and you should see the counter increase.

## Tracing

The Helidon application has been instrumented to share tracing data. By default the application is configured to connect to zipkin at `http://localhost:9411`. This is configured in `application.yaml`. In this example your are deploying to a Docker container. In `application.yaml` change the zipkin.endpoint to `zipkin.endpoint: "http://docker.for.mac.localhost:9411"`. After doing so you will need to re-package the application (`mvn package`), re-build the Docker Image (`docker build -t quickstart-se target`), and restart the Docker container (`docker run --rm -p 8080:8080 quickstart-se:latest`). 

### Deploy Zipkin on your Local Machine

https://zipkin.io/pages/quickstart.html

Browse to http://localhost:9411 to find traces!

1. To run Zipkin, start the Zipkin docker container:

```
docker run -d -p 9411:9411 openzipkin/zipkin
```

2. Then exercise the application: 

```
curl -X POST -d '{"greeting" : "Howdy"}' http://localhost:8080/greet/slowgreeting
```

3. To view traces go to <http://localhost:9411/zipkin/>. Click on "Find Traces". You should see a trace called "greet-service". Generate additional tracing data using the Exercise the Application information above. 



## Deploy the Application to Kubernetes

After testing out Helidon, Prometheus, and Zipkin on your local Docker environment try deploying them to your Kubernetes cluster. If you don’t have access to a Kubernetes cluster, you can [install one on your desktop](https://helidon.io/docs/latest/#/getting-started/04_kubernetes). 

1. Run the following commands to verify connectivity to your cluster: 

```
kubectl cluster-info                # Verify which cluster you are connecting to 
kubectl get pods                    # Verify connectivity to cluster
```

2. In the quickstart-se application, navigate to the app.yaml in the src/main/k8s directory. Port 31000 has been whitelisted to allow for Google OAuth to work with the application. Update the nodePort in app.yaml in order to make sure the application is deployed on the proper NodePort. The ports section of your app.yaml should look like this: 

```
ports:
  - nodePort: 31000
    port: 8080
    targetPort: 8080
    name: http
```

3. Deploy the application to Kubernetes: 

```
kubectl create -f target/app.yaml  # Deploy application
```

4. Check to see that your service is running on the proper port: 

```
kubectl get service quickstart-se  # Get service info
```

5. Navigate to http://localhost:31000 to access your application

## Kubernetes Metrics: Downloading and Running Prometheus on Kubernetes

1. To install Prometheus on Kubernetes run:  

```
helm install stable/prometheus -n prometheus
```

2. Get the Prometheus server URL by running these commands in the same shell:

```
export POD_NAME=$(kubectl get pods --namespace default -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}")
```

```
kubectl --namespace default port-forward $POD_NAME 9090
```

3. Once Prometheus is runnining access the console (e.g. `localhost:9090/graph`) and click `Graph`. Enter `application:accessctr` then click `Execute`. You should see the graph plotting the application's `accessctr` metric. Exercise the application some more using the curl commands that were described earlier. Click `Execute` again and you should see the counter increase.

## Kubernetes Traces: Downloading and Running Zipkin on Kubernetes

1. To install Zipkin enter:

```
kubectl create -f https://raw.githubusercontent.com/mickeyboxell/helidon/master/metrics_tracing/zipkin.yaml
```

This will install Zipkin on your cluster with the NodePort of 31001 and the port of 9411. 

2. As mentioned before, the application has been instrumented to share tracing data. By default the application is configured to connect to zipkin at `http://localhost:9411`. This is configured in `application.yaml`. In this example your are deploying to a Kubernetes cluster. In `application.yaml` change the zipkin.endpoint to `zipkin.endpoint: "http://zipkin:9411"`. 

Remember, you will have to re-package the application with `mvn package` and re-build the Docker image with `docker build -t quickstart-se target` everytime the application is modified. 

3. Browse to http://localhost:9411 and choose "greet-service" from the list of available service names. Click "Find Traces" to see tracing data for the service. 

## Clean Up 

1. After you are done, remove the application from Kubernetes by navigating to the quickstart-se folder and entering: 

```
kubectl delete -f target/app.yaml
```

2. Remove Prometheus from Kubernetes: 

```
helm delete prometheus 
```

3. And remove Zipkin from Kubernetes by changing directories to the one into which you cloned our Zipkin yaml file and entering: 

```
kubectl delete -f zipkin.yaml
```



## Want to Learn More?

- [Official Helidon Documentation](https://helidon.io/docs/latest/#/about/01_introduction)

- [Official Prometheus Documentation](https://prometheus.io/docs/)

- [Official Zipkin Documentation](https://zipkin.io/)
