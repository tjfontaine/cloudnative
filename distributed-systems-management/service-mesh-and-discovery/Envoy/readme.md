Envoy is a modern, high performance, small footprint edge and service proxy and is most comparable to software load balancers such as NGINX and Linkerd. Originally written and deployed at Lyft (and still heavily used by them), Envoy has a vibrant opensource community and is an official Cloud Native Computing Foundation project.


### What's the Goal of Envoy and How Will It Help Me?

According to Envoys documentation, the project was built in the belief that:  

_"The network should be transparent to applications. When network and application problems do occur it should be easy to determine the source of the problem."_ 
 

What does this actually mean? By abstracting the network from application programmers, Envoy helps application developers focus on building business logic rather than spending a lot of time on the application plumbing, a dream and incredibly difficult in practice. Let's look at some of the features that allow Envoy to help fulfill this dream:   

- Envoy works with any application language. A single Envoy deployment can form a mesh between Java, C++, Go, PHP, Python, etc.
- Envoy is a sidecar proxy and sits alongside your main application.
- Envoy can be deployed and upgraded quickly across an entire infrastructure transparently, without the usual pain associated with library upgrades. 
- Envoy emits a rich set of logs and has a plugable tracing system. 
- Envoy is able to implement advanced load balancing techniques in a single place and have them be accessible to any application. Currently Envoy includes support for automatic retries, circuit breaking, global rate limiting via an external rate limiting service, request shadowing, and outlier detection. Future support is planned for request racing.


In addition to the above, Envoy can be used as a foundational building block to extend into a variety of use cases, including as an edge proxy, as a service mesh sidecar, and as a substrate for building new product.

All in all, Envoy is a great addition to your cloud-native tool box.  

### Prerequisites

Latest installation of Docker.