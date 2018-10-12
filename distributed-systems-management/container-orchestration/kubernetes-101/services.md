# Introduction to Kubernetes Service Types


## Overview

Welcome to our Kubernetes 101 series. When you deploy an application to Kubernetes, you will need some way to access that application, wherever it may be running. To handle this, Kubernetes has "Services". In this post, we will go over the different types of Services you can use in Kubernetes as well as how and when to use them. Of course, you can always find more information about Kubernetes Services in the [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/service/).


## The Kubernetes Service Object
Just like in object-oriented programming, Kubernetes organizes its concepts as objects. For example, from Kubernetes' perspective, you could create a Deployment object or a pod object. A pod object would be Kubernetes' abstraction of containers. It describes one or more objects that should always be treated as a whole when you are running an application in Kubernetes. A Deployment object creates a pod object to run your application and also controls how many instances of a pod should be running at any given time.

A Service object is associated with a running container (pod) or set of containers/pods (Deployment) using labels. Once the Service has been set up and associated with an application, you will be able to reach that application using whatever configuration the Service has set up.

## Kubernetes Service Types
There are four Kubernetes Service types, which describe the different ways Kubernetes can configure access to your application via Services:

* ClusterIP - This is the default service type, so if you don't explicitly set one, this is what you'll get. The ClusterIP service type will create an IP which can be used to access your application from _within the Kubernetes cluster_. This is very useful if you only want your application to talk to other applications also running on Kubernetes. It is not very useful if you want to access the application directly or if you want the application to interact with some other software running outside of the Kubernetes cluster the app is running on.

* NodePort - This service type exposes your application on a static port on each of the nodes in your Kubernetes cluster. That static port is, of course, the "NodePort". So if you hit any given <k8sNodeIp>:<AppNodePort>, you will be able to reach your application, with the caveat being that this port is actually accessible through whatever firewalls you may have set up.

* LoadBalancer - This is probably the most commonly used or at least the most commonly mentioned Service type. The LoadBalancer Service type allows you to configure and create, through kubectl, a cloud-specific load balancer resource from which you can reach the application you deployed in Kubernetes.

* ExternalName - If you have external IPs that route to one or more cluster nodes, you can use the ExternalName/ExternalIPs Service type to tell Kubernetes to route traffic targeted at that IP to your application running on Kubernetes.

## More in this Series

* [Ingress and Routing](ingress.md)
* [Performing a Smoke Test on a New Kubernetes Cluster](smoke.md)
