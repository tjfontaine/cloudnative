---
layout: ziplab
description: Deploy an application to a managed Kubernetes cluster in OKE
tags: Oracle Cloud, Oracle Cloud Infrastructure, OCI, Containers, OKE, Kubernetes
permalink: /ziplabs/oke-deploy/index.html
---

# Deploy a Load-Balanced Application to an Oracle Container Engine Cluster #

## Before You Begin ##

This 15-minute tutorial shows you how to:

* Check the status of a Kubernetes cluster running in Oracle Container Engine for Kubernetes (OKE) with both OCI Console and <samp>kubectl</samp>
* Create a named secret containing Oracle Cloud Infrastructure credentials 
* Add the named secret to a manifest file, along with the name and location of an image in Oracle Cloud Infrastructure Registry (OCIR)
* Use the manifest to deploy an application to the Kubernetes cluster and create an Oracle Cloud Infrastructure load balancer
* Verify that the application is working as expected, and that the load balancer is distributing requests between the nodes in a cluster

### Background

Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE) is a fully-managed, scalable, and highly available service that you can use to deploy your containerized applications to the cloud. Use OKE when your development team wants to reliably build, deploy, and manage cloud-native applications. You specify the compute resources that your applications require, and OKE provisions them on Oracle Cloud Infrastructure in an existing OCI tenancy. 

### What Do You Need?

* The value of the `Tutorial auth token` created in the **Pushing an Image to Oracle Cloud Infrastructure Registry** tutorial
* Verify that you can use <samp>kubectl</samp> to connect to the cluster in the labs demo compartment; kubeconfig will already be set up in your environment (see below)
    
```
$ kubectl get nodes
```

You will see details of the nodes running in the cluster. For example:

```
NAME               STATUS   ROLES   AGE   VERSION
129.146.102.157    Ready    node    1d    v1.8.11
129.146.110.67     Ready    node    1d    v1.8.11
129.146.136.139    Ready    node    1d    v1.8.11
```

You've confirmed that the cluster is up and running as expected. You can now deploy an application.

## Deploy an Application ##

### Create a Secret for the Tutorial ###

We will use our image from another lab, as indicated above. We pushed that image to a repository on our lab account's OCI Registry. It's currently set to private; OCIR repositories can be set to private or public. Rather than make the repo public, let's enable Kubernetes to pull from the private repo.

For this, we'll create a Kubernetes secret. The secret includes all the login details you would provide if you were manually logging in to the registry using the `docker login` command, including your auth token. 

1. In a terminal window, enter the following command:
    
```
$ kubectl create secret docker-registry ocirsecret \
  --docker-server=phx.ocir.io --docker-username='<tenancy-name>/<oci-username>' \ --docker-password='<oci-auth-token>' --docker-email='<email-address>'
```

where:

* `ocirsecret` is the name of the secret you're creating; for this tutorial, we'll use `ocirsecret`
* `tenancy-name` is `cloudnative-devrel`
* `oci-username` is the username of the lab demo account you are using (e.g. `demo13`)
* `oci-auth-token` is the token referred to above, from the previous lab
* `email-address` is an email address; required but not needed, so use anything you like her

Note the use of single quotes around strings containing special characters.

For example, combining the previous examples, you might enter:

```
$ kubectl create secret docker-registry ocirsecret --docker-server=phx.ocir.io \
  --docker-username='acme-dev/jdoe@acme.com' --docker-password='k]j64r{1sJSSF-;)K8' \
  --docker-email='fredo@corleoneplumbing.com'
```

2. Verify that the secret has been created by entering:
    
```
$ kubectl get secrets
```

Details about the ocirsecret secret you just created are shown. 

Having created the secret, you can now refer to it in the application's manifest file.

### Create a Manifest with Image Path and Secret ###

Having created the secret, you now include the name of the secret in the manifest file that Kubernetes uses when deploying the helloworld application to a cluster. You also include in the manifest file the path to the helloworld image in Oracle Cloud Infrastructure Registry.

1. Open a new file named <samp>helloworld-lb.yml</samp> in a text editor in the environment where you are using kubectl.
2. Copy and paste the following text into the new file:

```    
apiVersion: apps/v1
kind: Deployment
metadata:
name: helloworld-deployment
spec:
selector:
matchLabels:
        app: helloworld
replicas: 1
template:
metadata:
        labels:
        app: helloworld
spec:
        containers:
        - name: helloworld
        # enter the path to your image, update the 'N' to your demo user
        image: phx.ocir.io/cloudnative-devrel/demoN/helloworld:latest
        ports:
        - containerPort: 80
        imagePullSecrets:  
        # enter the name of the secret you created  
        - name:  ocirsecret
---
apiVersion: v1
kind: Service
metadata:
name: helloworld-service
spec:
type: LoadBalancer
ports:
- port: 80
protocol: TCP
targetPort: 80
selector:
app: helloworld
```

3. Change the `image` and `name` attributes to point at the image and secret you have created.

4. Save the file with the name helloworld-lb.yml in a local directory accessible to kubectl, and close the file.  

### Deploy the helloworld Application ###

Now that we have a manifest for the <samp>helloworld</samp> application, we can now deploy it.

1. In a terminal window, deploy the sample application to the cluster by entering:

```
$ kubectl create -f /<path-to-manifest>/helloworld-lb.yml
```

Messages confirm that the deployment <samp>helloworld-deployment</samp> and the service <samp>helloworld-service</samp> load balancer have both been created.

The <samp>helloworld-service</samp> load balancer is implemented as an Oracle Cloud Infrastructure load balancer with a backend set to route incoming traffic to nodes in the cluster. You can see the new load balancer on the Load Balancers page in the Oracle Cloud Infrastructure Console.

## Verify the Load-balanced helloworld Application Is Working Correctly

1. In a terminal window, enter the following command:

```
$ kubectl get services
```

You see details of the services running on the nodes in the cluster. For the helloworld-service load balancer that you just deployed, you see:

* an external IP address of the load balancer (for example, 129.146.147.91)
* a port number
* Open a new browser window and enter the url to access the helloworld application in the browser's **URL** field. For example, http://129.146.147.91

When the load balancer receives the request to access the helloworld application, the load balancer routes the request to one of the available nodes in the cluster. The results of the request are returned to the browser, which displays the page.

At the bottom of the page, a page view counter shows the number of times the page has been visited, and initially displays '1'.

* Reload the page in the browser window (for example, by clicking **Refresh** or **Reload**).

The counter at the bottom of the page now displays '2'.

Congratulations! You've successfully deployed the helloworld application. Kubernetes used the secret you created to pull the helloworld image from Oracle Cloud Infrastructure Registry. It then deployed the image and created an Oracle Cloud Infrastructure load balancer to distribute requests between the nodes in the cluster. Finally, you've verified that the application is working as expected.

## ![section 6][13]Housekeeping

It takes a few minutes to create the VCN and cluster, so let's leave those for further lab. However, having completed this tutorial, we can now delete the application you deployed on the cluster.

1. In a terminal window, enter the following command to delete the helloworld application:

```
$ kubectl delete deployment helloworld-deployment
```

When you delete the deployment, any running pods are automatically deleted as well.

2. Enter the following command to delete the load balancer service:

```
$ kubectl delete service helloworld-service
```

When you delete the load balancer service, the Oracle Cloud Infrastructure load balancer is automatically deleted as well.

## Want to Learn More? ##

* [Overview of Container Engine](https://docs.cloud.oracle.com/iaas/Content/ContEng/Concepts/contengoverview.htm)

* [Learn more about Kubernetes](https://kubernetes.io/)

