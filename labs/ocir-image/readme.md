---
layout: ziplab
description: Push a container image to the Oracle Cloud Infrastructure Registry
tags: Oracle Cloud, Oracle Cloud Infrastructure, OCI, Containers 
permalink: /ziplabs/ocir-image/index.html
---

# Pushing an Image to Oracle Cloud Infrastructure Registry #

## Before You Begin

This 10-minute tutorial shows you how to:

* Create an auth token for use with Oracle Cloud Infrastructure Registry
* Log in to Oracle Cloud Infrastructure Registry from the Docker CLI
* Pull a test image from DockerHub
* Tag the image
* Push the image to Oracle Cloud Infrastructure Registry using the Docker CLI
* Verify the image has been pushed to Oracle Cloud Infrastructure Registry using the OCI Console

### Background

Oracle Cloud Infrastructure Registry (OCIR) is a fully-managed, highly available registry that enables you to simplify your development to production workflow. With OCIR you can store, share, and manage development artifacts, such as Docker images.

### What Do You Need?

* Oracle Cloud Infrastructure access with required permissions for Repository Administration
* Docker installed in your environment 

## Push Your First Image to OCIR ##
  
### Get an Auth Token ###

Open a new browser tab or window and navigate to the [OCI console login](https://console.us-phoenix-1.oraclecloud.com/). Log into the tenant with the user credentials provided at the event.

Before you can use Docker to push an image to OCIR, you need to configure the Docker client with a token. We can create this in the OCI Console, and then use it to configure Docker.

In the top-right corner of the Console, click your username, and then click **User Settings**.

[](img/)

On the **Auth Tokens** page, click `Generate Token`. Enter <samp>tutorial auth token</samp> as a description for the token, then click `Generate Token` in this dialog.

[](img/)

The new auth token is displayed. Copy it immediately to a file in the demo user's home directory, as you will not see it again in the OCI Console. Now close the Generate Token dialog.

### Open the Registry in the OCI Console ###

Confirm that you can access Oracle Cloud Infrastructure Registry in the Console. In the navigation menu, you will find the Registry under Developer Services.

[](img/)

Click through to the Registry. Notice you can choose the region in which you will be working; for this lab environment, we're using us-phoenix-1. 

[](img/)

Review the repositories that already exist. OCIR in the lab environment is shared, so you may see some existing repositories.

### Log in to OCIR from Docker ###

XXX may change name

In a terminal, log in to OCIR from Docker using <samp>docker login</samp>.

* For `Username`, we use a combination of the OCI Tenancy and OCI User Name, in the format <samp> tenancy_name/username</samp>. An example in the lab environment might be <samp>cloudnative-devrel/demo-user-1</samp>.
* For `Password`, you'll use the auth token from above.

Each region has its own registry name, named <samp>region.ocir.io</samp>. Since our lab environment is in the Phoenix region, we will log in to <samp>phx.ocir.io</samp>. 

```
XXX example
```

### Pull an Example Image from Docker Hub ###

We'll use an example image from Docker Hub for this tutorial. In a terminal window, we'll use <samp>docker pull</samp> to retrieve the latest version of our favorite hello-world image from DockerHub.

```
docker pull karthequian/helloworld:latest
XXX output
```

### Tag the Image for Pushing ###

We tell the Docker client where to push our image by tagging it with the registry and repository we want to push to. The format of the command is as follows:

```
docker tag karthequian/helloworld:latest
<region-code>.ocir.io/<tenancy-name>/<repo-name>/<image-name>:<tag>
```

Where

* `region-code` is the region of the registry
* `tenancy-name` is the name of the tenancy
* `repo-name` is the name of a repository to which you want to push the image (optional)
* `image-name` is the name you want to give the image in Oracle Cloud Infrastructure Registry
* `tag` is an image tag you want to give the image, for example <samp>latest</samp>

Note that specifying a repository is optional. If you don't specify a repository name, the name of the image is used as the repository name in OCIR.

Because our lab environment is shared, let's go ahead and use the optional `image-name`, specifying the demo username as an additional level of hierarchy.

Putting it all together should look something like this:

XXX might change name

```
$ docker tag karthequian/helloworld:latest phx.ocir.io/cloudnative-devrel/demo-user-1/helloworld:latest
```

If you list all images now, you should see both the original image tag and your image tag. Note, since the image is unchanged, the image ID is the same.

```
docker images | grep helloworld
XXX output
```

### Tag the Image for Pushing ###

Finally, we can push our image to our OCIR repository. Use the <samp>docker push</samp> command with the image tag we created above.

```
$ docker push phx.ocir.io/cloudnative-devrel/demo-user-1/helloworld:latest
XXX output
```

### Verify the Image in OCIR on the Console ###

Let's head back to the OCI Console and verify our image is in OCIR. In the browser window showing the Console with the Registry page displayed, click `Reload`.

You will see all the repositories in the registry to which you have access, including the new private <samp>helloworld</samp> repository that was created when you pushed the image above.

[](img/)

Click the name of the <samp>helloworld</samp> repository that contains the image you just pushed. You will see:

* A list of all images in the repository; in this case, there is only one image, with the tag <samp>latest</samp>
* Details about the repository, including who created it and when, its size, and whether it's a public or private repository
* The Readme associated with the repository, if present

[](img/)

Let's leave the image where it is; if you wish to check out the **OKE Deployment** lab, we'll use this image there.

## Want to Learn More? ##

* [Overview of Registry](https://docs.us-phoenix-1.oraclecloud.com/Content/Registry/Concepts/registryoverview.htm)

* [Pushing Images Using the Docker CLI](https://docs.us-phoenix-1.oraclecloud.com/Content/Registry/Tasks/registrypushingimagesusingthedockercli.htm)
