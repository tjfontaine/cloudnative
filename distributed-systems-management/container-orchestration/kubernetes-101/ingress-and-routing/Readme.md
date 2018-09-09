## Ingress and Routing


## Overview

Welcome to our Kubernetes 101 series. This tutorial is part of a series about building and deploying applications in a highly available, observable, and scalable way. Other modules in the series include [Introduction to Service Types on Kubernetes](../service-types/Readme.md) and [Performing Smoke Tests on Kubernetes](../smoke-tests/Readme.md).

## Introduction

 This module focuses specifically on preparing your brand new Kubernetes cluster for hosting your first production-ready application! We are going to:

* Configure an existing, publicly accessible Kubernetes cluster on Oracle Cloud Infrastructure (OCI) with an ingress controller for exposing applications publicly
* Configure DNS on OCI, so we don't need to remember IP addresses
* Write some Kubernetes configuration files for a demo application
* Deploy the application to our cluster
* Expose the application to the internet on a domain

## Step One: Prepare the Cluster

Let's assume you have created a brand-new Kubernetes cluster in OCI using Terraform. [(Check out the earlier article in this series of tutorials to find out exactly how to do this)]().

At this point, you should have a `kubeconfig` file for accessing your cluster, along with a development environment with access to the `kubectl` utility. Note that this module will focus on a Mac OS development environment but the commands should work in any *nix environment.

You should also have the Docker daemon installed in your development environment, and have access to a Docker registry. The credentials for this registry should be installed as an [Image Secret on your cluster](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

### Kubernetes Ingress

To get to our end goal of having a Kubernetes cluster that we can launch publicly exposed applications on, we need to configure our cluster for [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/).

Ingress is a special concept inside Kubernetes that can be thought of in simple terms as the application load balancer of days past, where you would launch some form of something to front your different VMs all running web services that need to share port 80/443 and be exposed on a single domain. You'd typically achieve this by sticking Nginx or HAProxy on your public IP address, and have it route requests to the backend services by their respective hostnames. Maybe you'd even terminate SSL en-route.

Kubernetes Ingress can do all of this, and even uses Nginx or HAProxy, but it comes with the added benefit of not having to manually update the routing configuration every time you add a new application. Instead, we just throw a couple of lines in our application's Kubernetes Service definition that will ensure the request gets routed to the correct place, even if the backend changes location!

I've created a simple set of configuration files that, when applied, will fully [configure your OCI-based Kubernetes cluster for Nginx-based Ingress](https://github.com/riceo/oci-kubernetes-ingress-controller). The Readme on the linked repo explains the full process, but it's as simple as:

1. Checking out the git repo somewhere on your development machine and entering that directory.
2. Executing `kubectl apply -f config/`

Running the command will execute the following steps:

* Create a Kubernetes Service Account and Namespace dedicated to the Ingress infrastructure.
* Define an RBAC configuration to ensure the Service Account can access and interact with the Ingress infrastructure.
* Define a self-signed SSL certificate for SSL termination. **If you want to use this in production, upload your real-life certificate here.**
* Launch the Nginx-based Ingress Controller.
* Provision a load balancer in OCI to front the Ingress Controller.

The load balancer will take about five minutes to become ready in OCI. Once you've given it some time, run the following to see its public IP:

```
kubectl get svc nginx-ingress --namespace nginx-ingress
```

You should be rewarded with a public IP address for your Ingress Service, under the "External-IP" column:

```
NAME            CLUSTER-IP     EXTERNAL-IP     PORT(S)                      AGE
nginx-ingress   10.21.213.87   129.213.214.215   80:32418/TCP,443:32212/TCP   1d
```

Success! In the above case, `129.213.214.215` is our OCI LB IP that we'll use to make our applications publicly accessible on our cluster!

To check that everything came up properly, try hitting that IP in your browser/via cURL:

```
>  curl http://129.213.214.215
<html>
<head><title>404 Not Found</title></head>
<body bgcolor="white">
<center><h1>404 Not Found</h1></center>
<hr><center>nginx/1.13.12</center>
</body>
</html>
```

Output like the above is what we're looking for. While a 404 isn't usually indicative of a successful operation, in this case, it means the following has taken place:

1. The OCI load balancer has become available on the public IP address.
2. A request to the LB public IP has been routed to the nginx-ingress service inside of our Kubernetes cluster.
3. The nginx-ingress service has seen this request and passed it on to a nginx-ingress deployment running on one of the Kubernetes worker nodes.
4. An nginx-ingress pod processed the request. It looked for the hostname "129.213.214.215" (since we didn't pass anything else) and saw that there is no ingress route defined for that.
5. It sent back a 404 - as it should!

### DNS

We now have a Kubernetes cluster with Ingress configured, and a public load balancer IP that we know is routing requests through to our cluster. However, we now have two fairly obvious additional requirements:

1. We'd like to host our applications on a domain so that our users don't need to remember IP addresses.
2. We want to be able to deploy multiple applications to this cluster without having to make frequent DNS changes.

To satisfy these requirements, let's use the following simple DNS pattern:

* An A record pointing at our cluster LB IP
* A wildcard CNAME pointing at the A record

For example, I'm going to use `riceo.me` as my domain. I'll announce the following DNS records:

```
* A - prod-k8s.riceo.me - 129.213.214.215
* CNAME - *.prod-k8s.riceo.me - prod-k8s.riceo.me
```

This will mean that if we launch an application on our cluster with an ingress route for `authentication-api.prod-k8s.riceo.me`, the CNAME wildcard will match and resolve to the A record, which will be pointing at our cluster!

#### Configuring DNS on OCI

We can manage our DNS records in the OCI dashboard by going to the `Networking` menu item and selecting `DNS`. Next, select `Create Zone` and add the domain you want to manage.

Once this is complete, you'll be given a set of nameservers that you'll need to [update with your domain registrar](https://uk.godaddy.com/help/change-nameservers-for-my-domains-664).

After updating your domain's nameserver records with your registrar, it can take a bit of time for the changes to propagate around the internet. You'll know it's _mostly_ done once the following query shows Oracle nameservers in its response:

```
dig +short <DOMAIN> NS
```

However, note that there's nothing stopping you from creating your DNS records while the nameserver change is propagating. It just means that queries to the domain may be inconsistent until complete.

Adding the records is as simple as selecting the `Add Record` button on the OCI DNS Dashboard for your domain's zone, then filling in the forms to match the above pattern. Once complete you should have something like:

![](https://d3vv6lp55qjaqc.cloudfront.net/items/1I37472Z3K0n1A2g2F1g/Image%202018-05-15%20at%2011.26.57%20pm.png)

That's all there is to it!

Configuring our DNS in the following pattern means:

* We can have single or multiple A records for our primary cluster LB(s). If this ever changes we only have to update it in one place.
* We don't need to announce a new record every time we launch a new application or microservice on our cluster, but...
* We _can_ manually announce public facing pretty CNAMEs pointing at the individual records if need be. 

## Our first Application

### Demo Application Overview

The demo application that we will be deploy is called [Get IP](https://github.com/riceo/demo-get-ip). It's a simple Python application that serves the requesting client's IP address wrapped in JSON over HTTP.

I recommend forking the linked demo into your own git repo, and cloning that out locally for this section, as we need to make modifications to the configuration files specific to our clusters and Docker registries.

The application can be launched by installing its required dependencies via pip, then running `python get_ip/get_ip.py`, ensuring we pass its required parameters to launch:

```
usage: get_ip.py [-h] hostname port

HTTP API for returning a visitor's IP address.

positional arguments:
  hostname    The host IP to listen on.
  port        The port to listen on.

```

We're going to do the following with it:

* Modify the supplied Kubernetes configuration to fit our cluster in OCI
* Build the application into a Docker image using the supplied Dockerfile
* Push the built image to a Docker registry (the same one you've set up on your cluster with an image secret beforehand)
* Deploy the application to Kubernetes using the `kubectl` utility, ensuring we pass some required parameters to start the application

### Build Your Image

The included Dockerfile makes this a simple task by running the following inside the cloned repo fork on your development machine:

```
docker build .
docker tag <IMAGE ID FROM BUILD COMMAND> <docker registry path>/get-ip:v0.1
docker push <YOUR DOCKER REGISTRY PATH>/get-ip:v0.1
```

This should push the application's Docker image to your registry. You can also test that the application runs inside of the docker image on your machine by running:

```
>  docker run <IMAGE ID>
usage: get_ip.py [-h] hostname port
get_ip.py: error: too few arguments
```

If you get an output similar to the above, everything is working as expected!

### Writing an Application with Kubernetes in Mind

We are now at the point of deploying our demo application on to our cluster. Before we do, we will take a brief look at a few things that I thought about when writing this application, knowing that it was destined to be deployed in Kubernetes.

#### Passing Parameters

The application requires two variables in order to launch, which will be common in most applications you write and deploy. I like to have my applications take runtime variables as either environment variables, or pass them as parameters to the executable. I try to avoid configuration files wherever possible, as using them means you need to store them somewhere (and then worry about security), or you need to generate them at deploy time, which would require additional logic.

In the simplest of cases, we can pass variables to our Kubernetes applications by adding them to our application deployment configuration, which keeps them in a single, easy to see, place. 

However, there are times when "easy to see" is a negative, such as when dealing with passwords. In this case, you can [define secrets as environment variables at the Kubernetes level](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables) that your application can consume from. This keeps the secrets on the cluster only, and out places harder to audit such as git repositories. 

In our demo case, we don't need to pass any sensitive variables so we're going to keep it simple by passing the required runtime parameters directly to the executable in our Kubernetes deployment.

#### Logging

Most popular languages will have their own logging libraries and helpers. Whether it's Log4j in Java land or the `logging` module in Python land, they are almost always worth using rather than dumping log lines yourself as they make it easy to create a standard format for logs that you can carry across your applications and microservices. 

This standardization is invaluable when you begin pushing your logs to a centralized logging system such as an [ELK stack](../../../observability-and-analysis/logging/efk-stack-introduction/log-like-you-mean-it/Readme.md), or [Graylog](https://www.graylog.org/), as searching for several different names for "Client IP address" can be a nightmare during red-alert scenarios when debugging an outage. Trust me, your SREs will thank you!

An additional consideration when deploying to Kubernetes is the format to use when you output your logs. My preferred method is to send messages to stdout and stderr rather than write log files, as it allows me to quickly see the log output of a running deployment via `kubectl`, _and_ integrates easily with any centralized logging solution on the cluster with 0 configuration, whereas log files would need to have their persistence managed.

#### Horizontal Scaling

Finally, when writing your applications for Kubernetes, consider how Kubernetes prefers to schedule resources. It's much simpler and more visible to increase the number of instances of a given application or service running when capacity is reached, rather than assign more underlying CPU/RAM resource to it.

For this to be achievable, think about building your applications with this question in mind: "what happens if two of these are running at the same time?" The answer usually leads to storing state in a distributed database with some kind of data locking in place, or even building services without needing to manage state at all; this is a very common pattern with Microservices, which Kubernetes is particularly great at orchestrating.

#### Kubernetes Configuration

We've taken a look at how our application was built, now let's get back to deploying it!

Inside the demo repo, there's a directory called `kubernetes` with three YAML files in it. These are the three Kubernetes concepts that need to be defined to launch an application publicly - a Deployment, A Service, and an Ingress definition.

Starting with the deployment definition in `deployment.yml`, update the `image` and `imagepullsecrets` name parameters to tell Kubernetes to pull from the registry and location that you pushed your application repository to, and to pull it using the image secret you have defined on your cluster.

Next, we'll take a quick look at the `service.yml` file. We don't need to change anything here, just note that we are using the application name and reference of `v0.1` as a unique identifier for our application. 

Finally, the file that this entire post has been about: `ingress.yml`! Note that this defines a hostname that matches the CNAME wildcard we defined on the OCI DNS dashboard. Update this to reflect the wildcard CNAME you created, ensuring the first section is the application name of `get-ip`.

These are the only changes you need to make to launch this demo application on your Kubernetes cluster! Time to fire the config files off to your cluster with:

```
kubectl apply -f kubernetes/
```
You have now deployed your application to your cluster! Check that it has come up ok with:

```
 kubectl get deploy get-ip
```

This should return:

```
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
get-ip    1         1         1            1           1m
```

And the real final test is to cURL your application on your domain:

```
curl http://get-ip.prod-k8s.riceo.me/get-ip
```

If your IP address was returned in a JSON payload, then all is well! Your application has been successfully deployed to your cluster, and is now accessible publicly through Kubernetes Ingress on your domain! 

## Conclusion

This tutorial has touched on some best practices for writing applications destined to live in Kubernetes, along with an explanation of how to set up an easy Ingress system for clusters running inside of OCI.

## More in this Series

* [Introduction to service types on Kubernetes](../service-types/Readme.md)
* [Performing a Smoke Test on a New Kubernetes Cluster](../smoke-tests/Readme.md)



