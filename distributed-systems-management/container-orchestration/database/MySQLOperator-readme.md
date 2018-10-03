Operating a MySQL cluster on Kubernetes is hard, especially if you go beyond provisioning. We wanted to make developers lives easier by providing an easy to use solution for running a MySQL cluster on Kubernetes, so we built an operator and open-sourced it. 

An operator behaves as an extension to Kubernetes and is really nothing more than a set of application-specific custom controllers. But it makes life more comfortable because the controllers have direct access to the Kubernetes API, which means they can monitor the cluster, change pods/services, scale up/down and call endpoints of the running applications, all according to custom rules written inside those controllers.

We go into more of the key features in the solution, but to give you a sneak peek, the operator is resilient and does automatic failover, has recurrent backups, runs on any Kubernetes cluster (Oracle Cloud Infrastructure, AWS, GCP, Azure), has Prometheus metrics for alerting and monitoring, and is easy to deploy, making your MySQL cluster highly available. 

In this guide, we'll walk you through how to install our MySQL Operator and create a highy available production-ready MySQL cluster on Kubernetes.

### Prerequisites 

* A running Kubernetes cluster (we're using Oracle Container Engine for the Kubernetes cluster)
* Configured kubectl
