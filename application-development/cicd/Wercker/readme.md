In today’s software world you need to get your product in front of your customers as quickly as possible and keeping it running once it’s there. With this, is the 
added complexity of getting many different versions of the software out in quick succession, often running more than one version at once to test assumptions. 

In short, companies need to be highly adaptable, so their software needs to be highly flexible too.

Enter the rise of CI/CD. A set of tooling (and cultural changes brought about in part by the DevOps movement) that allows developers to deploy
applications in a simple and repeatable manner. By now, we're sure that you are familiar with CI/CD and have some kind of implementation in your team. But are you 
using the right one? If you are an Oracle customer (or even if you are not), you will do well to choose a recent (ish) Oracle acquisition, Wercker, a lightweight 
Docker native CI/CD. 

Wercker enables software teams to increase productivity, reduce risk and improve code quality by providing a modern cloud-based, Docker-centric deployment automation
platform. Organizations using Wercker can automatically build, test and deploy their applications, end-to-end, all the way from source to production in a repeatable
transparent manner. It also provides an open-source CLI and a collection of [curated public steps](https://app.wercker.com/steps), among other benefits. 

This tutorial will walk through: 

How to push an image in Wercker to OCI Registry and deploy the image as a container to an existing OCI Container Engine for Kubernetes (OKE) cluster.

### Prerequisites:

* Complete the [tutorial](https://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/oke-full/index.html) to create an Oracle Container Engine (OKE) cluster and deploy a sample app.
* Read the "Gotcha's"section in the tutorial
* GitHub [Account](https://github.com/).
* Wercker [Account](https://app.wercker.com/users/new/).
* You (and the groups to which you belong) must be defined solely in Oracle Cloud Infrastructure Identity and Access Management (see [Federated users are not supported by Container Engine for Kubernetes](https://docs.cloud.oracle.com/iaas/Content/knownissues.htm#contengfederateduser)).