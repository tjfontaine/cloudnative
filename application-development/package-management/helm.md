# Helm or High Water: Package Management for Kubernetes Services

By Mickey Boxell 

## Context 

Efficient management of Kubernetes resources can be challenging. There is a large number of objects to handle, including pods, services, persistent volumes. In addition, the dynamic nature of the platform requires the management of many releases. Packaging these objects into standardized and reusable deployments while simultaneously keeping track of releases is key to successful development. 

## Helm

In a nautical setting, a helm is a wheel used to steer a ship. In the world of containers, the open source tool Helm has a similar purpose: it is used to steer or manage Kubernetes applications. Helm addresses the challenges above by providing a method for repeatable application installation through the use of Charts, which describe complex applications. Charts are also easy to update, version, and share. 

Helm is similar to yum, brew, apt-get, choco, etc., but specifically for Kubernetes. 

There are two key parts of Helm: 
* Helm is a client running on your local system
* Tiller sits on your Kubernetes cluster and is used to manage your Helm deployments - this component is expected to be deprecated with the release of Helm 3

Charts are Helm packages that contain at least two things:
* A metadata description of the package contents (Chart.yaml)
* Templates containing Kubernetes manifest files  

For additional information about using Helm, check out the [Official Helm Project](https://github.com/helm/helm). 


## Installing Helm 

The first step is to make sure you have access to a Kubernetes cluster. We will use Oracle Container Engine for Kubernetes (OKE) for our Kubernetes cluster. OKE is a fully managed, scalable, and highly available service that you can use to deploy your containerized applications to the cloud. To start an OKE cluster follow this [friendly guide](http://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/oke-full/index.html). When creating a cluster with OKE you may choose to have Tiller preconfigured. To take advantage of this feature, click the box that says "Tiller (Helm) Enabled" when provisioning an OKE cluster.

Start by downloading the most recent version of Helm from the [official releases page](https://github.com/kubernetes/helm/releases) to the system where your Kubernetes config file is stored.  

Helm will figure out where to install Tiller by reading your Kubernetes configuration file (usually $HOME/.kube/config). This is the same file that kubectl uses. To see which cluster you are currently configured to work with, run: 

```
kubectl config current-context
```

Once you have Helm downloaded, initialize the local CLI and also install Tiller into your Kubernetes cluster in one step:

```
helm init
```
After `helm init`, you can now run `kubectl get pods --namespace kube-system` and see Tiller running.

To upgrade Tiller run: 
```
helm init --upgrade
```

## Using existing Charts

There are a number of existing Helm Charts for popular software available for consumption. To get the latest set of Charts run: 
```
helm repo update
```

See the list of stable Charts with: 

```
helm search 
```

You may also choose to refine your search with a keyword. This will search the repository of stable Charts for Charts with the keyword in the name and/or the description. In this case we will search using `mysql` as our keyword: 

```
helm search mysql
```

You can find additional information about a Chart prior to downloading by using `helm inspect` with the Chart name: 

```
helm inspect stable/mysql
```

To install a new package, use the `helm install` command. At its simplest, it takes only one argument: the name of the Chart.

```
helm install stable/mysql 
```

Whenever a Chart is installed it creates a new release object. The release made when we installed the MySQL Chart is named ringed-butterfly. You may use the `--name` flag on `helm install` if you prefer to use your own release name.

```
$helm install stable/mysql 

NAME:   ringed-butterfly
STATUS: DEPLOYED
```

## Managing your releases 

The Helm client will display information about resource creation, the release state, and options for additional configuration steps to take. You can use `helm status` with the Chart name to keep track of a release’s state and to reread configuration information. 

```
helm status ringed-butterfly  
```

It is easy to roll back to a previous release using the release name and the revision number. Every time a release is installed, upgraded, or rolled back, the revision number will be incremented by 1. Helm will also keep track of deleted releases. This featured is useful if you need to audit a cluster’s history or roll back to a previous release. 

For example, we can roll back our MySQL chart to its original version:

```
helm rollback ringed-butterfly 1
```

To keep track of your list of releases run: 

```
helm ls
```

Use the `helm delete` command to uninstall a release: 

```
helm delete ringed-butterfly
```

## Configuring additional Chart repositories

So far, we’ve been installing Charts only from the stable repository. But you can also configure Helm to use other repositories. In this case we will add the `example` repository:

```
helm repo add example https://example.com/dev-charts
```

You can see which repositories are configured using: 
```
helm repo list
```


## Creating your own Charts 

For a more detailed overview of Chart creation refer to the [Helm Charts guide](https://docs.helm.sh/developing_charts/#charts). 

```
helm create example chart 
```

This will create a folder with a Chart directory named `example` containing: 
```
Chart.yaml	
values.yaml
charts/		
templates/
```

* charts/ is where Helm will put Charts on which your Chart is dependent 
* templates/ is where all our Kubernetes resources will go 
* Chart.yaml file holds metadata about the current Chart 
* values.yaml file is where you store variables

When it’s time to package the Chart for distribution, run the helm package command:

```
helm package example
```

And that Chart can now easily be installed by helm install:
```
helm install example
```

## Conclusion 

With Helm installed, you now have the ability to efficiently manage packages of Kubernetes resources, access to a set of existing stable Charts, and control over upgrades and release history. Happy Helming!

