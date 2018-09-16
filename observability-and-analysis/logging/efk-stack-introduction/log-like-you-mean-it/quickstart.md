# Log Like You Mean It! A Quickstart for Logging Kubernetes Applications via an EFK Stack 

## Overview

Welcome to our EFK stack (Elastic Search, FluentD, Kibana) introduction series. This article will show you how to get up and running with EFK, quickly.

In this quickstart we will apply the theory learned in our EFK Stack blogpost to create a production-ready logging and analysis stack installed on an Oracle Container Engine for Kubernetes (OKE) cluster through the use of Elasticsearch, FluentD, and Kibana. Check out our [EFK Stack Overview](./Readme.md) for a more in-depth explanation of how and why we are creating an EFK stack. 

## Requirements

You will need a Kubernetes cluster accessible via a configured kubectl command. We will be using an OKE cluster. OKE allows for Helm to be pre-installed, which enables you to skip step one of this quickstart.

## Quickstart!

### Step One: Install Tiller on your cluster to use Helm

_If you are using OKE, make sure you tick the option to include Helm/Tiller when launching your cluster. Doing so will allow you to skip this step._

Download Helm and configure Tiller on to your Kubernetes cluster. This will allow you to install Helm charts via the Helm client. For an in-depth explanation of Helm and Tiller check out the  [Helm tutorial](https://docs.helm.sh/using_helm/).

1. Download and unpack the latest release of Helm from the [Github repo Release page](https://github.com/kubernetes/helm/releases) to your development machine. If you are running MacOS and have Homebrew installed, you can run `brew install kubernetes-helm` instead.
2. Run `helm init`. 

This will connect to your Kubernetes cluster via your already configured `kubectl` utility and install Tiller. You can now install packages on to your Kubernetes cluster via `helm` commands!

### Step Two: Download the EFK stack Helm chart

Download and extract our Helm chart. This will simplify the process of installing the EFK stack:

```
wget https://raw.githubusercontent.com/oracle/cloudnative/master/observability-and-analysis/logging/efk-stack-introduction/log-like-you-mean-it/efk.tar.gz
tar -xzvf ./efk.tar.gz
```

### Step Three: Run the Helm chart!

At this point you should have a folder called `elasticsearch` in your working directory, access to the `helm` command, and working access to your Kubernetes cluster via the `kubectl` command. 

Run the following to install the EFK stack:

```
helm install elasticsearch/ --namespace devops --values elasticsearch/values.yaml
```

Note that it's good practice to use a namespace dedicated to this infrastructure as it will stop your `kubectl get x` commands from being polluted with your infrastructure-related objects. You can read more about this in our [EFK Stack Overview](./Readme.md), which goes into much more detail about what we're trying to achieve in this quickstart.

This should result in an output similar to:

```
NAME:   piquant-cow
LAST DEPLOYED: Thu Jul 12 18:21:14 2018
NAMESPACE: devops
STATUS: DEPLOYED

RESOURCES:
==> v1/ServiceAccount
NAME                               SECRETS  AGE
piquant-cow-fluentd-es             1        4s
piquant-cow-elasticsearch-logging  1        4s

==> v1beta1/Deployment
NAME                        DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
piquant-cow-kibana-logging  1        1        1           0          3s

==> v1/Pod(related)
NAME                                         READY  STATUS             RESTARTS  AGE
piquant-cow-fluentd-es-7xb6w                 1/1    Running            0         3s
piquant-cow-fluentd-es-lngjj                 1/1    Running            0         3s
piquant-cow-fluentd-es-rjk67                 1/1    Running            0         3s
piquant-cow-kibana-logging-59c854856b-ck9dh  0/1    ContainerCreating  0         3s
piquant-cow-elasticsearch-logging-0          0/1    PodInitializing    0         3s

==> v1/ConfigMap
NAME                           DATA  AGE
piquant-cow-fluentd-es-config  5     4s

==> v1/ClusterRole
NAME                               AGE
piquant-cow-elasticsearch-logging  4s
piquant-cow-fluentd-es             4s

==> v1/ClusterRoleBinding
NAME                               AGE
piquant-cow-elasticsearch-logging  4s
piquant-cow-fluentd-es             4s

==> v1/Service
NAME                               TYPE          CLUSTER-IP     EXTERNAL-IP  PORT(S)            AGE
piquant-cow-elasticsearch-logging  ClusterIP     10.96.136.103  <none>       9200/TCP,9300/TCP  3s
piquant-cow-kibana-logging         LoadBalancer  10.96.91.36    <pending>    5601:32610/TCP     3s

==> v1beta1/DaemonSet
NAME                    DESIRED  CURRENT  READY  UP-TO-DATE  AVAILABLE  NODE SELECTOR  AGE
piquant-cow-fluentd-es  3        3        3      3           3          <none>         3s

==> v1beta1/StatefulSet
NAME                               DESIRED  CURRENT  AGE
piquant-cow-elasticsearch-logging  2        1        3s
```

After a few minutes of the cluster launching things, you can see the services that you have exposed by running:

```
>  kubectl cluster-info --namespace devops
```

This will output an endpoint for accessing your Kibana web interface! 

### Conclusion

By following the steps above, you have gone from a raw Kubernetes cluster to one with a complete logging and visualization solution by means of the EFK stack. To read more about what we just did, check out our in-depth [EFK Stack Overview](./Readme.md).

### More in this Series

* [Log it like you mean it! Logging Kubernetes applications via an EFK stack](./Readme.md)

#### License

Copyright (c) 2018, Oracle and/or its affiliates. All rights
reserved.
This content is licensed under the Universal Permissive
License 1.0.
See LICENSE.txt for more details.





