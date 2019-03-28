# What Are Service Catalogs and Service Brokers? 

A service catalog is an extension API that enables applications running in Kubernetes clusters to easily use third-party software offerings such as a datastore service offered by a cloud provider, let's say, for example, Oracle, through a set of endpoints (service brokers) that are managed and maintained by said third party. In a nutshell service catalog and service brokers provide a way to list, provision and bind with services that you might want to use for your application, without caring about how these services are managed, maintained or even your subscription to them; that is all taken care of. 


### But Why Though?

![y-tho-meme](images/y-tho-meme.png) 


We live in a multi-cloud, multiplatform world, with lots of service providers. Say, for example, you build this amazing feature that your users have been dying for; you write the code for the feature, deploy it, but without a data service or config-services or auto-queues or other backend external service your feature requires, your feature is as good as useless. Enterprises are complex, with moving parts, and internal hurdles, how do you get access to the services?

Well, there is a team for that. You file a ticket. You file some more tickets, you wait and wait, possibly complain, then you get access! But how do you pass on the credentials? On a post-it? Or in Slack or via an email? If you work in a company that needs to be even vaguely compliant, these are no-no's that still happen, and it's likely that you have lived through the above scenario. With service brokers, you're provided a marketplace of backend services through your command line, making it easy to provision, get the credentials and inject those credentials and subscription details without waiting for various enterprise hurdles. Poof! Goodbye long wait time and admin, hello feature. 

If you're the person looking after the purse strings or at least liable for them at some point, service brokers can help with those "black ops" teams that have somehow finagled access to a credit card and for the sake of shipping, are running loads of services and infrastructure outside of company processes.

Some history. Service brokers started in Cloud Foundry around 2016. From there the Open Service Broker API Project took root and now, the Service Catalog is a Kubernetes Project with all manner of companies making their services available to your Kubernetes cluster. In their own words, they are "Bringing the Cloud Back into Your Cluster." 

### Prerequisites

A walkthrough of the Kubernetes Service Broker:

* Service Catalog requires a Kubernetes cluster v1.9 or later
* Kubectl
* Helm with Tiller Permissions
* Minikube
* Service Catalog and CLI

The tutorial will go through the installation of these assets. 