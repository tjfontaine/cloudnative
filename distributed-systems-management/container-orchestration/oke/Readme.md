As defined by [kubernetes.io](https://kubernetes.io), Kubernetes is a portable, extensible open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a very large, rich, rapidly growing ecosystem provided by many vendors and opensource projects in the [Cloud Native Computing Foundation](https://www.cncf.io/).

There are primarily two ways to manage Kubernetes in an environment; via self installation or via managed Kubernetes offerings.

Prior to the managed offerings, the typical process was to select and provision each of the machines on which you wanted to install Kubernetes on, tie them together in a cluster, and begin using them. You would also select one of the machines to serve as the master Kubernetes node, and the rest would act as worker nodes.

Managed Kubernetes services simplify this process of installation and maintenance. When installing Kubernetes on a cloud provider, you can easily provision your Kubernetes cluster with a few clicks or commands, and not have to worry about all of the details to set up the master nodes. Also, many services self manage the master node (sometimes referred to as the Kubernetes Control Plane) for you so you only have to worry about your infrastructure and applications running on the worker nodes (or data plane).

## Prerequisites
To effectively run the guides in this section, you will need an account to log in to the Oracle Cloud Infrastructure portal.
