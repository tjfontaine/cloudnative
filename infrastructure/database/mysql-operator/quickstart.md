# The MySQL Operator

## What's an Operator?
A Kubernetes Operator is a tool which creates a custom resource definition for Kubernetes when installed on a Kubernetes cluster.

Kubernetes is a tool for deploying and managing (orchestrating) workloads. It does this by defining "resources" such as Deployments, Pods, and StatefulSets, which were intentionally designed to be generic enough to work with a large variety of workloads. However, some workloads require special care with their deployment and management.  The introduction of Kubernetes Operators allows users to tap directly into Kubernetes' API to make use of Kubernetes' core functionalities in whatever way works best for their use case. Creators of Kubernetes Operators can also include code to automate steps of deployment and management outside of Kubernetes' APIs' capabilities.

This results in a custom resource definition, teaching Kubernetes all the best practices for running a certain application. And the best part is that once Kubernetes understands the best practices and how to adhere to them, the Kubernetes admin can rely more on Kubernetes to do the heavy lifting of administration for particularly picky workloads!


## The MySQL Operator
The MySQL Operator is, as its name suggests, a Kubernetes Operator to simplify the task of running MySQL in Kubernetes. The operator is currently in alpha (at the time of this writing), so it's not recommended for all workloads just yet. Keep an eye out for a 1.0 release in the near future.

Creating a MySQLCluster Kubernetes object via the MySQL Operator is similar to a Deployment in that it spins up a set of Kubernetes Pods (one or more containers which Kubernetes can manage together). However, in a normal Deployment, you would need to specify a variety of features of the Pod(s) to be created, such as the container(s) (container images) to be run in the Pod, port mappings, etc. The MySQL Operator is opinionated about the way MySQL should be run on Kubernetes, so you don't have to worry about a lot of the normal details. The MySQL Operator already knows how the Pods should be configured, and it even has an opinion about the minimum number of Pods you should have to make a production-ready MySQL Cluster. Because of the MySQL Operator's built-in knowledge of running MySQL on Kubernetes, you can have a MySQLCluster resource definition as simple as:
```
apiVersion: mysql.oracle.com/v1alpha1
kind: Cluster
metadata:
  name: my-app-db
  namespace: mysql-cluster
```
In the example above, this definition tells Kubernetes that you want a MySQL Cluster named "my-app-db" and the MySQL Operator which you have installed on your Kubernetes cluster (we'll go over how to install it later) tells Kubernetes how to take care of the rest.

The MySQL Operator is aware of [MySQL Group Replication](https://dev.mysql.com/doc/refman/5.7/en/group-replication-replication-technologies.html), which means it knows how to spin up multiple MySQL instances and connect them into a group. In a group, actions that happen on one instance of MySQL, also happen on other instances in the same group. This keeps the whole group in sync, and provides reliable redundancy in case one MySQL instance should go down. This can be accomplished by creating a "Primary" cluster, where only one instance of MySQL can receive writes, or by creating "Multi-Primary" cluster where all nodes can receive writes. Multi-Primary clusters are more complex and are generally recommended only for advanced MySQL users. The MySQL Operator makes use of group replication alongside [MySQL InnoDB clustering](https://dev.mysql.com/doc/refman/5.7/en/mysql-innodb-cluster-introduction.html) to create highly available MySQL clusters within Kubernetes.

The MySQL Operator includes such features as:
* Cluster management
* Ability to create and scale MySQL clusters using InnoDB and group replication on Kubernetes
* Automatic rejoining of dead cluster instances to the main cluster
* Ability to store data on local disk or NAS backup and restore using Kubernetes Persistent Volume Claims
* Ability to create on-demand backups
* Ability to schedule automatic backup of databases to Object Storage
* Restoration of a database from an existing backup operation
* Ability to run on any Kubernetes cluster (Oracle Cloud Infrastructure (OCI), AWS, GCP, Azure)
* Prometheus metrics for alerting and monitoring
* Self-healing clusters

In the rest of this guide, you'll learn how to install the MySQL Operator and create a highly available, production-ready
 MySQL cluster on Kubernetes.  You'll also learn more about using some of the Backup and Restore and monitoring features of the MySQL Operator.

 You can find more information about the MySQL Operator on [GitHub](https://github.com/oracle/mysql-operator) or in this [guide](https://blogs.oracle.com/developers/introducing-the-oracle-mysql-operator-for-kubernetes).

## Installing the MySQL Operator

### PreRequisites
Follow the prerequisites as mentioned in the [Overview ](https://cloudnative.oracle.com/template.html#infrastructure/database/mysql-operator/readme.md).

You will need to have installed and configured kubectl, Kubernetes' CLI control tool, on the machine from which you will be working with your Kubernetes cluster.  For example, if you have an Oracle Container Engine for Kubernetes cluster running in Oracle Cloud Infrastructure, install kubectl on the laptop you use to interact with the cloud. Specify a kubeconfig file to allow kubecutl to connect to your remote cluster. You can do this by setting:

```
export KUBECONFIG=*path to your kubeconfig*
```

Or by putting your kubeconfig in `$HOME/.kube/config`. 

Whatever option you choose, make sure you're connected to the right cluster with kubectl before you try to complete the rest of the steps in this article.

NOTE:
You can do this by trying `kubectl get nodes` to confirm that the addresses of the nodes in the Kubernetes cluster kubectl is attached to match the addresses you expect.

You will also need to make sure the network for your Kubernetes cluster is configured properly. A configuration similar to the one described [here](https://docs.cloud.oracle.com/iaas/Content/ContEng/Concepts/contengnetworkconfigexample.htm) would work well for the purposes of this guide.

### Install the MySQL Operator Using Helm
To install the MySQL Kubernetes Operator, we will use the Kubernetes package manager, Helm. You can learn more about Helm in our article [here](https://blogs.oracle.com/cloudnative/helm-kubernetes-package-management).

#### Installing Helm
[Helm has instructions for installations for a variety of operating systems](https://docs.helm.sh/using_helm/#installing-helm). For a fairly generic approach, you can install from a script using curl:

```
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

#### Installing the MySQL Operator
Before we install the operator, let's create a [Kubernetes Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) where the mysql-operator will be deployed.  Create the "mysql-operator" namespace by running:
```
kubectl create ns mysql-operator
```

Once you have Helm installed and have created the mysql-operator namespace, get the Helm chart you will use to install the MySQL Operator from the [MySQL Operator GitHub repo](https://github.com/oracle/mysql-operator).

To do this, clone the project to your local machine using:
```
git clone https://github.com/oracle/mysql-operator.git
```

Then run
```
$ helm install --name mysql-operator *path to the cloned mysql-operator directory*
```
NOTE: The mysql-operator directory you want here is the one within the mysql-operator project. So for example, if the directory of your cloned project was called "mysql-operator", and you were in the directory where you installed the operator, then your command would look like `helm install --name mysql-operator mysql-operator/mysql-operator`

The MySQL Operator should now be installed on your cluster. You can check by running `kubectl get pods -n mysql-operator` which should give output like:
```
NAME                            READY     STATUS    RESTARTS   AGE
mysql-operator-d99c84c9-bjpfz   1/1       Running   0          7h
```

You can also find instructions for how to install the MySQL Operator in the tutorial [here](https://github.com/oracle/mysql-operator/blob/master/docs/tutorial.md).

## Using the MySQL Operator
Let's create a MySQL Cluster with the newly installed MySQL Operator.

We will create the cluster in a new namespace separate from the namespace we created for the MySQL Operator to run in. So let's start by creating that namespace:
```
kubectl create ns mysql-cluster
```
#### Create a ServiceAccount and RoleBinding
First, you will need to create a service account and rolebinding for the MySQL Operator to use when spinning up resources on your Kubernetes cluster.  Create a file called `serviceAccount.yaml` with the following contents:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: mysql-agent
  namespace: mysql-cluster
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: mysql-agent
  namespace: mysql-cluster
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: mysql-agent
subjects:
- kind: ServiceAccount
  name: mysql-agent
  namespace: mysql-cluster
```
Then run `kubectl apply -f serviceAccount.yaml` to create the serviceaccount and rolebinding on your Kubernetes cluster.

#### Creating the MySQL Cluster
Now we can create the MySQL cluster. First, we define the cluster in a file called `cluster.yaml` which contains:

```
apiVersion: mysql.oracle.com/v1alpha1
kind: Cluster
metadata:
  name: my-app-db
  namespace: mysql-cluster
```
To create the MySQL cluster on the Kubernetes cluster, run:
```
kubectl apply -f cluster.yaml
```
This should output `mysqlcluster "my-app-db" created`.

You can take a look at the mysqlcluster object by running:
```
kubectl -n mysql-cluster get mysqlclusters
```

This should output something like:
```
NAME      KIND
myappdb   Cluster.v1alpha1.mysql.oracle.com
```

Take a look at the Pods which make up the mysql cluster by running:
```
kubectl -n mysql-cluster get pods
```

You should see three Pods running, similar to the output below. Note, it may take a minute or two for all of the Pods to start up and become ready.
```
NAME          READY     STATUS    RESTARTS   AGE
my-app-db-0   2/2       Running   0          8h
my-app-db-1   2/2       Running   0          7h
my-app-db-2   2/2       Running   0          7h
```

Your cluster is now running!

### Smoke Test

Next, we'll test out your new Kubernetes-based MySQL cluster by trying to connect to it from a separate Pod running within the Kubernetes cluster.

The container you create will need the password for your MySQL database to be able to utilize it. The database was set up with a default password which you can get by running:

```
kubectl -n mysql-cluster get secret my-app-db-root-password -o jsonpath="{.data.password}" | base64 --decode
```
This should output a password that looks similar to: `ETdmMKh2UuDq9m7y`.

Next, we will create a MySQL Client container which will connect to the existing database using the password you got from the previous command. Replace `*YOUR PASSWORD HERE*` with your password. Do not add a space between the 'p' and your password.
```
kubectl run mysql-client --image=mysql:5.7 -it --rm --restart=Never -n mysql-cluster \
    -- mysql -h my-app-db -uroot -p*YOUR PASSWORD HERE* -e 'SELECT 1'
```

## Clean Up
Want to try that one part again? Or tried it and now you're done and want it off your system? Cleaning up is easy as 1-2-3! Here's how to clean up
everything we did in this post:

To remove the cluster and other resources created in the "Using the MySQL Operator" section, follow these steps.

1) Delete your MySQLCluster object

For this step, you will need to be in the directory where you created the cluster.yaml file earlier.
```
kubectl delete -f cluster.yaml
```

2) Delete the ServiceAccount and RoleBinding

For this step, you will need to be in the directory where you created the serviceAccount.yaml file earlier.
```
kubectl delete -f serviceAccount.yaml
```

3) Remove the Helm installation of the MySQL Operator

For this step, you will need to be in the directory where you cloned the mysql-operator github project. This command assumes you are in the top level of the cloned mysql-operator project.
```
helm delete --purge mysql-operator/mysql-operator
```

4) Remove tutorial namespaces

Finally, remove the namespaces we created during this tutorial. Any objects remaining in those namespaces will be cleaned up as well
```
helm delete ns mysql-cluster
```
```
helm delete ns mysql-operator
```

No need to remove the Pod you created in the smoke test. The --rm flag means the Pod is cleaned up as soon as it finishes running!

## Tips, Tricks, and Useful Hints
Here are some basic functions you need to know to get the most out of the Kubernetes MySQL Operator.

### Cluster Configuration Examples
[This page](https://github.com/oracle/mysql-operator/blob/master/docs/user/clusters.md) in the MySQL Operator github repo provides a variety of useful examples for using the MySQL Operator.  It includes examples of how to:
* [Specify the number of members in your MySQLCluster](https://github.com/oracle/mysql-operator/blob/master/docs/user/clusters.md#create-a-cluster-with-3-members)
* [Create a Multi-Primary cluster](https://github.com/oracle/mysql-operator/blob/master/docs/user/clusters.md#create-a-cluster-with-3-members-in-multi-master-mode)
* [Create a cluster with a custom "MYSQL_ROOT_PASSWORD"](https://github.com/oracle/mysql-operator/blob/master/docs/user/clusters.md#create-a-cluster-with-a-custom-mysql_root_password)
* [Create a cluster with a persistent volume](https://github.com/oracle/mysql-operator/blob/master/docs/user/clusters.md#create-a-cluster-with-a-persistent-volume)
* [Create a cluster with a persistent data volume and a persistent volume to use for backups/restore](https://github.com/oracle/mysql-operator/blob/master/docs/user/clusters.md#create-a-cluster-with-a-persistent-data-volume-and-a-persistent-volume-to-use-for-backupsrestore)
* [Create a cluster with custom my.cnf configuration file](https://github.com/oracle/mysql-operator/blob/master/docs/user/clusters.md#create-a-cluster-with-custom-mycnf-configuration-file)
* [Create a cluster with custom server_id values](https://github.com/oracle/mysql-operator/blob/master/docs/user/clusters.md#create-a-cluster-with-custom-server_id-values)

### Creating MySQL Backups
Probably the most important component of running a highly available, production-ready MySQL Cluster in Kubernetes is creating and managing backups. [This guide](https://cloudnative.oracle.com/template.html#infrastructure/database/mysql-operator/quickstart.md) walks you through examples of creating several types of backups for your Kubernetes MySQLClusters.

### Restoring from a Backup
Having backups is no good if you can't use them! [This guide](https://cloudnative.oracle.com/template.html#infrastructure/database/mysql-operator/quickstart.md) gives an example of how to restore your Kubernetes MySQLCluster from a backup.

### Connecting an Application to Your MySQLCluster via MySQL Router
The recommended method for connecting an application to your MySQLCluster is by using MySQL Router.  [This article](https://github.com/oracle/mysql-operator/blob/master/docs/user/router.md) gives an example of deploying an application with a MySQL Router sidecar to effectively route database traffic from the application to appropriate back-end MySQL Servers.

### Monitoring with Prometheus
The MySQL Operator provides a few custom metrics for use with Prometheus monitoring. The custom metrics the MySQL Operator offers are:

* Clusters created
* Clusters deleted
* Clusters total

You can learn how to install and get started using Prometheus with the MySQL Operator [here](https://github.com/oracle/mysql-operator/blob/b48cb69f833eb1177c750824c557236005d7340f/docs/setup/monitoring.md).

### Advanced Configuration of the MySQL Operator
Some aspects of the MySQL Operator can be configured via MySQL Operator Command Line Parameters or a MySQL Operator ConfigMap. To learn more about what aspects can be configured and how to configure them, [read this](https://github.com/oracle/mysql-operator/blob/master/docs/user/config.md).

## Conclusion
The MySQL Operator for Kubernetes allows you to run MySQL on Kubernetes, following the best practices, by teaching Kubernetes how to do all the hard work!

This guide taught you how to get started by installing the MySQL Operator on a Kubernetes cluster and running a simple MySQLCluster object.  It also gave you pointers to all the tips and tricks you'll need to customize your usage of the MySQL Operator to your needs.

Remember, the MySQL Operator is still considered to be an "alpha" version, so it isn't recommended for production use.  But the tooling it provides is still a big step toward making MySQL on Kubernetes easy and accessible for everyone.  Keep an eye on the [MySQL Operator GitHub Repo](https://github.com/oracle/mysql-operator) for new and upcoming features.


