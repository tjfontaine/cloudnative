# Package Management for Kubernetes Services with Helm

## Helm

Helm addresses the package mangement for Kubernetes applications by providing a method for repeatable application installation through the use of charts, repositories, and releases. 

* Chart: a Helm package consisting of the YAML file used to described the components of complex applications designed to run in a Kubernetes cluster and searchable metadata. 
* Repository: a searchable collection of Helm charts. 
* Release: an instance of a Helm chart deployed to a Kubernetes cluster. There is a new release created each time a chart is installed. 

Helm is similar to yum, brew, apt-get, choco, etc., but specifically for Kubernetes. 
Thanks to repositories and releases charts are easy to update, version, and share. 

There are two key parts of the Helm architecture: 
* Helm: a client running on your local system
* Tiller: a server in your Kubernetes cluster that interacts with the Kubernetes API server used to manage your Helm deployments - it is worth noting that this component is expected to be deprecated with the release of Helm 3 as the client/server separation is removed

For additional information about using Helm, check out the [Official Helm Project](https://github.com/helm/helm). 


## Installing Helm 

The first step is to make sure you have access to a Kubernetes cluster. We will use Oracle Container Engine for Kubernetes (OKE) for our Kubernetes cluster. OKE is a fully managed, scalable, and highly available service that you can use to deploy your containerized applications to the cloud. To start an OKE cluster follow this [friendly guide](http://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/oke-full/index.html). You may choose to have Tiller preconfigured when creating a cluster with OKE. Click the box that says "Tiller (Helm) Enabled" when provisioning an OKE cluster to take advantage of this feature.

Start by downloading the most recent version of Helm from the [official releases page](https://github.com/kubernetes/helm/releases) to the system where your Kubernetes config file is stored.  

Helm will read your Kubernetes configuration file (usually $HOME/.kube/config), the same file used by kubectl, to determine the Tiller installation location. To see which cluster you are currently configured to work with, run: 

```
kubectl config current-context
```

Once you have Helm downloaded, initialize the local CLI and install Tiller into your Kubernetes cluster in one step:

```
helm init
```
After `helm init` you can now run `kubectl get pods --namespace kube-system` and see Tiller running.

To upgrade Tiller run: 
```
helm init --upgrade
```

## Using existing charts

There are a number of existing Helm charts for popular software available for consumption. To get the latest set of charts run: 
```
helm repo update
```

See the list of stable charts with: 

```
helm search 
```

You may also choose to refine your search with a keyword. This will search the repository of stable charts for carts with the keyword in the name and/or the description. In this case we will search using `nginx` as our keyword: 

```
helm search nginx
```

In this case, there is more than one chart with the `nginx` keyword. You can find additional information about a chart prior to downloading by using `helm inspect` with the chart name. In this case we will choose the chart at the top of the list `nginx-ingress`

```
helm inspect stable/nginx-ingress
```

To install a new package, use the `helm install` command. At its simplest, it takes only one argument: the name of the chart.

```
helm install stable/nginx-ingress
```

Whenever a chart is installed it creates a new release object. A release is an instance of a chart running in a Kubernetes cluster. The release made when we installed the NGINX chart is named ringed-butterfly. You may use the `--name` flag on `helm install` if you prefer to use a specific release name.

```
$helm install stable/nginx-ingress 

NAME:   ringed-butterfly
STATUS: DEPLOYED
```

## Managing your releases 

The Helm client will display information about resource creation, the release state, and options for additional configuration steps to take. You can use `helm status` with the chart name to keep track of a release’s state and to reread configuration information. 

```
helm status ringed-butterfly  
```

It is easy to roll back to a previous release using the release name and the revision number. Every time a release is installed, upgraded, or rolled back, the revision number will be incremented by one. Helm will also keep track of deleted releases. This feature is useful if you need to audit a cluster’s history or roll back to a previous release.

For example, we can roll back our NGINX chart to its original version:

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

## Configuring additional chart repositories

A repository is the place where you can collect and share Charts. So far, we’ve been installing charts only from the stable repository. But you can also configure Helm to use other repositories. In this case we will add the `example` repository:

```
helm repo add example https://example.com/dev-charts
```

You can see which repositories are configured using: 
```
helm repo list
```


## Creating your own charts 

For a more detailed overview of chart creation refer to the [Helm charts guide](https://docs.helm.sh/developing_charts/#charts). 

```
helm create example chart 
```

This will create a folder with a chart directory named `example` containing: 
```
Chart.yaml	
values.yaml
charts/		
templates/
```

* charts/ is where Helm will put charts on which your chart is dependent 
* templates/ is where all our Kubernetes resources will go 
* Chart.yaml file holds metadata about the current chart 
* values.yaml file is where you store variables

When it’s time to package the Chart for distribution, run the Helm package command:

```
helm package example
```

And that chart can now easily be installed by helm install:
```
helm install example
```

## Conclusion 

With Helm installed, you now have the ability to efficiently manage packages of Kubernetes resources, access a repository of existing charts, and control the version history and upgrades of your releases. Happy Helming!

