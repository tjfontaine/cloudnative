Operating a MySQL cluster on Kubernetes is hard, especially if you go beyond provisioning. We wanted to make developers lives easier by providing an easy to use solution for running a MySQL cluster on Kubernetes.

The MySQL Operator behaves as an extension to Kubernetes and is a set of application-specific custom controllers that allow you to write an application to manage another fully. The MySQL Operator has direct access to the Kubernetes API, which means that you can easily monitor the cluster, change pods/services, scale up/down and call endpoints of the running applications and more. These tasks can be time-consuming, the MySQL Operator can make the process simple, repeatable, and easy to follow.

To give you a sneak peek, the operator is resilient and does automatic failover, has recurrent backups, runs on any Kubernetes cluster (Oracle Cloud Infrastructure (OCI), AWS, GCP, Azure), has Prometheus metrics for alerting and monitoring, and is easy to deploy, making your MySQL cluster highly available. 

In this guide, we'll walk you through how to install our MySQL Operator and create a highy available production-ready MySQL cluster on Kubernetes.

### Prerequisites 

* A running Kubernetes cluster (we're using Oracle Container Engine for the Kubernetes cluster)
* Configured kubectl