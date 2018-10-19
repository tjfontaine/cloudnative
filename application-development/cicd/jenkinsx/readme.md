We live in an increasingly technologically complex world that often requires a quick response to user demand and the drive to continuously outpace our competitors. Quick fixes and quality results create and retain customers. Many organizations are starting to make a move to Continuous Integration and Continuous Deployment (CI/CD), which has many potential benefits, but successful implementation often requires a good deal of consideration. 

The advent of CI/CD development practices has led to a shift to new technologies, such as Hudson, Jenkins, Travis, Circle, Wercker, and many more. So which do you choose? Jenkins is a "go to", but  teams have been known to spend days manually setting up Jenkins pipelines and implementing CI/CD effectively and then spending a considerable amount of time maintaining those pipelines. 


To alleviate that problem, the Jenkins X community has architected and developed a CI/CD solution for modern cloud applications on Kubernetes.
Jenkins X comes with all the automation you need to be able to focus on your application code. It automates all your CI/CD needs on Kubernetes including:

* Automatic releases with semantic versions, the creation of artifacts, Docker images and Helm charts
* Automatic promotion of versioned artifacts across your environments via GitOps
* Preview environments created on each pull request

and much more.  

This tutorial will walk through: 

* Installing Jenkins X on an Oracle Kubernetes Engine (OKE) cluster
* Creating a sample application through the jx create quickstart command
* Configuring Jenkins X to use Oracle Container Registry (OCIR) as the default image registry
* Deploying the sample application to our OKE cluster

### Prerequisites:

* An OKE cluster - if you don't have one check out this [guide](http://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/oke-full/index.html)
* A GitHub account
