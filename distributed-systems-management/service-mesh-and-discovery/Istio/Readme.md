### Overview

A microservice architecture is a common choice when building new cloud applications and services. It is becoming more common for companies migrating workloads to the cloud to refactor legacy applications using a microservice architecture, breaking down monolithic applications into more discrete and manageable components. Typically, these microservices are built, distributed and managed as containers. With more applications and services deployed as microservices, the number of containers deployed increases.

It can be fairly simple to deploy, monitor and manage a handful of containers. Using Kubernetes can make this trivially easy. Containers are grouped into pods, and pods are deployed as services which can in turn be consumed by other pods and services. This maps very well to an application or service implemented as a loosely coupled set of microservices.

As more applications and services are built and deployed, the number of resources within that Kubernetes is managing and scaling increases. When working with hundreds or even thousands of containers, things can get complicated. Fold into this the complexities related to multiple versions of services in deployment, multiple deployment environments and failures which require restoration or version rollback, and things can get quite a bit more complicated. Kubernetes is the best choice for orchestrating containers at scale, but it is not designed to address these concerns.

This is where Istio comes in. It provides solutions within a service mesh, or the part of the stack where services are working with each other, and are exposed and used. Without any changes to service or application code, Istio provides features to manage container deployments at scale. Among these features, Istio provides:

* Automatic load balancing for HTTP, gRPC, WebSocket, and TCP traffic
* Fine-grained control of traffic behavior with rich routing rules, retries, failovers, and fault injection
* A pluggable policy layer and configuration API supporting access controls, rate limits and quotas
* Automatic metrics, logs, and traces for all traffic within a cluster, including cluster ingress and egress
* Secure service-to-service communication in a cluster with strong identity-based authentication and authorization

Istio provides these features through the use of a sidecar proxy. This term comes from motorcycle sidecars, and it works just the same way; a sidecar container runs in the same pod alongside the containers it supports. Istio uses the Envoy proxy for this purpose and it exposes many of its rich features directly. You can also learn more about Envoy [here](https://cloudnative.oracle.com/template.html#distributed-systems-management/service-mesh-and-discovery/envoy/readme.md) in our library.

Istio's features can be used ad hoc and independently or leveraged together in order to create very powerful service and application management solutions.

### Prerequisites

To run through this tutorial, you will need:

* A Linux or MacOS environment where you have admin rights
* Access to the internet
* An Oracle Cloud account
* An Oracle Container Engine (OKE) cluster
