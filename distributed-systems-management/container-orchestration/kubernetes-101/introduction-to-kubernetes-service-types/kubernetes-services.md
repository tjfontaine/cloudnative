# Introduction to Kubernetes Service types

By Micha Hernandez van Leuffen

## Overview

Welcome to our Kubernetes 101 series. When you deploy an application to Kubernetes, you will need some way to access that application, wherever it may be running.  To handle this, Kubernetes has "Services". In this post, we will go over the different types of Services you can use in Kubernetes as well as how and when to use them. Of course, you can always find more information about Kubernetes Services in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/services-networking/service/).


## The Kubernetes Service Object
Just like in object-oriented programming, Kubernetes organizes its concepts as objects. For example, from Kubernetes' perspective, you could create a Deployment object or a Pod object.  A pod object would be Kubernetes' abstraction of containers. It describes one or more objects that should always be treated as a whole when you are running an application in Kubernetes.  A deployment object creates a Pod object to run your application and also controls how many instances of a Pod should be running at any given time.

A Service object is associated with a running container (pod) or set of containers/pods (deployment) using labels.  Once the Service has been set up and associated with an application, you will be able to reach that application using whatever configuration the Service has set up.

## Kubernetes Service Types
There are 4 Kubernetes Service types, which describe the different ways Kubernetes can configure access to your application via services:

* ClusterIP - This is the default service type, so if you don't explicitly set one, this is what you'll get. The ClusterIP service type will create an IP which can be used to access your application from _within the Kubernetes cluster_. This is very useful if you only want your application to talk to other applications also running on Kubernetes. It is not very useful if you want to access the application directly or if you want the application to interact with some other software running outside of the Kubernetes cluster the app is running on.

* NodePort - The NodePort service type exposes your application on a static port on each of the nodes in your Kubernetes cluster. That static port is, of course, the "NodePort" So if you hit any given <k8sNodeIp>:<AppNodePort>, you will be able to reach your application. The caveat being that port is actually accessible through whatever firewalls you may have set up.

* LoadBalancer - This is probably the most commonly used or at least the most commonly mentioned service type.  The LoadBalancer service type allows you to configure & create, through kubectl, a cloud-specific Load Balancer resource from which you can reach the application you deployed in Kubernetes.

* ExternalName - If you have external IPs that route to one or more cluster nodes, you can use the ExternalName/ExternalIPs service type to tell Kubernetes to route traffic targeted at that IP to your application running on Kubernetes.

## More in this series 


### Ingress and Routing
Prepare your brand new Kubernetes cluster for hosting your first production-ready application! with [this great article](https://gitlab-odx.oracledx.com/cloudnative/devcenter/blob/master/content/kubernetes/ingress-routing.md).

### Run a Smoke Test with a Kubernetes Service
Our article, [Performing a Smoke Test on a New Kubernetes Cluster](https://gitlab-odx.oracledx.com/cloudnative/devcenter/blob/master/content/kubernetes/smoke-test.md), walks you through a simple smoke test for new Kubernetes clusters. The test consists of a simple Kubernetes Deployment and Service which walks you through the basic elements of running applications on Kubernetes.

### Deploy Kubernetes (Part of our Kubernetes on OCI solution)
You can create a cluster via the Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE). Or you can run your own Kubernetes cluster on Oracle Cloud Infrastructure via Terraform by following our article [Installing Kubernetes on Oracle Cloud Infrastructure via Terraform](https://gitlab-odx.oracledx.com/cloudnative/devcenter/blob/master/content/terraform/Installing-Terraform-for-Oracle-Cloud-Infrastructure.md)



