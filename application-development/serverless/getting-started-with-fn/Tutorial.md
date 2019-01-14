# Getting Started with the Fn Project

As discussed in our [Overview](Readme.md), in this tutorial we will learn about Fn. We will first create and deploy a function locally to an Fn server running in Docker. Then, we will install the Fn server on a Kubernetes cluster running in Oracle Cloud, where we can then use the same workflow to deploy our application to the cloud.

You can find the prerequisites for this tutorial in the Overview as mentioned above.

## Installing Fn

Developers interact with the Fn client, so let's start by installing that in our development environment. Once we have the client installed, we can use it to deploy a local Fn server, and later we'll use the project's Helm Chart to deploy on a Kubernetes cluster.

The only requirement is that you have Docker installed and running. If you aren't familiar with Docker, that's ok. Fn will use Docker under the covers, you only need to install it and make sure it's configured. See the [Docker](https://docs.docker.com/install/) site for info on installation, if you're new to it.

Now, let's install the Fn client.

#### MacOs

On MacOS, you can use Homebrew via:

```
brew install fn
```

If you don't use Homebrew, you can use the install in a shell as shown below.

#### Linux

On Linux, the installer can be run via:

```
$ curl -LSs https://raw.githubusercontent.com/fnproject/cli/master/install | sh
```

This will download a script and execute it. The installer may ask for a password because it invokes <samp>sudo</samp>.

If you just want to grab a binary, you can do that over at the project's [Releases](https://github.com/fnproject/cli/releases) page.

## Setting Up a Local Development Environment

One of Fn's primary goals is to be very simple to use. To this end, getting a local development environment set up is as simple as invoking:

```
$ fn start
```

This will deploy a local instance of the Fn server, running in Docker and ready to serve local client requests. The server handles everything you'll need, from building functions in containers and handling I/O to running an API gateway and handling endpoint triggers that call your functions.

You'll see that the server logs to STDOUT, so you can open another shell and refer back to this one to monitor server activity. If you prefer, you can run the server in the background by providing the <samp>--detach</samp> option.

Another aspect of our development environment is a context. Fn uses contexts to configure various aspects of the environment, for example the container registry or the API endpoint. Contexts allow you to set up various combinations of these elements and easily switch between them.

More details on these concepts will follow, for now we can simply use the <samp>'default'</samp> context and set a dummy <samp>'fndemo'</samp> registry user on it.

```
$ fn use context default
Now using context: default
$ fn update context registry fndemo
Current context updated registry with fndemo
$ fn list contexts
CURRENT NAME    PROVIDER        API URL                 REGISTRY
*       default default         http://localhost:8080   fndemo
```

Now we're ready to work with the platform and create our first function.

## Working with Functions

### Writing Our First Function

Now that we have a local development environment, we are ready to write our first function.

We'll start with a simple "Hello world" function implemented in Python. If you don't know Python, that's fine. It's an easy enough function to follow in order to get the concepts down.

Fn is a container-based platform, but it abstracts the container runtime and images away so you can just focus on your code. We can initialize a new function by invoking the <samp>fn init</samp> command. This will create some on-disk artifacts, so let's do it in a space where we want our code to live. We will name our function <samp>'hello-tutorial'</samp>, and Fn will create a directory with the same name in our current working directory. We will use the <samp>--runtime</samp> option to tell Fn we want to use Python and the <samp>--trigger</samp> option to set up an HTTP trigger.

```
~/ws $ fn init --runtime python --trigger http hello-tutorial
Creating function at: /hello-tutorial
Function boilerplate generated.
func.yaml created.
~/ws $
```

Looking into our newly-created <samp>hello-tutorial</samp> directory, we can see that the simple command created some things for us, including some boilerplate code in <samp>func.py</samp>. Fn identifies each function you create with a descriptor called <samp>func.yaml</samp> which was also created along with some other support files.

```
~/ws $ tree hello-tutorial
hello-tutorial
├── func.py
├── func.yaml
├── requirements.txt
└── test.json

0 directories, 4 files
~/ws $
```

Let's take a look at the code that was generated for us in <samp>func.py</samp>.

```python
import fdk
import json


def handler(ctx, data=None, loop=None):
    name = "World"
    if data and len(data) > 0:
        body = json.loads(data)
        name = body.get("name")
    return {"message": "Hello {0}".format(name)}


if __name__ == "__main__":
    fdk.handle(handler)
```

We can see that the function is working with JSON; it takes input from STDIN and by default will send its output to STDOUT, as previously discussed. This is implemented in our <samp>handler</samp> function, which is provided by the FDK.

Now that we have a function, let's deploy it and get it running.

### Deploying and Invoking a Function Locally

So far, we've established that Fn can create, invoke and test functions for us. How do we make these useful and visible to the outside world? For this, we move to working with applications. In Fn, an application is a group of functions each with their own trigger for invocation. These triggers are mapped automatically for us, and updated as needed by Fn.

Let's create our first application by deploying our function to it. We'll call our application <samp>'tutorial-app'</samp>. Note we're still working locally, so we'll use the <samp>--local</samp> option to keep things in our dev environment.

```
~/ws $ fn deploy --app tutorial-app --local hello-tutorial
Deploying function at: /hello-tutorial
Deploying hello-tutorial to app: tutorial-app
Bumped to version 0.0.2
Building image fndemo/hello-tutorial:0.0.2 .....
Successfully created function: hello-tutorial with fndemo/hello-tutorial:0.0.2
Successfully created trigger: hello-tutorial-trigger
~/ws $
```

What did we just do? Quite a lot, it turns out.

First, the Fn client incremented the version of our function, and kicked off a build of its container. Every time you deploy a function, Fn will automatically increment the version for you, which is then used as the tag on its corresponding container. Then, the Fn server created an application, deployed our first function to it, wired up a trigger for the function and exposed an HTTP endpoint for us to access it through. If you're interested in seeing all of this in action, you can use the <samp>--verbose</samp> option.

Subsequent deploys will rev the version of our function and update the linkage between the container, the function and trigger.

Since we chose an HTTP trigger, we can invoke our function via the endpoint, which can be seen in the output of <samp>fn list triggers</samp>.

```
~/ws $ fn list triggers tutorial-app
FUNCTION	NAME			TYPE	SOURCE			ENDPOINT
hello-tutorial	hello-tutorial-trigger	http	/hello-tutorial-trigger	http://localhost:8080/t/tutorial-app/hello-tutorial-trigger
~/ws $
```

If we point a browser at that endpoint, or curl it, we see the output of our function.

```
~/ws $ curl -H "Content-Type: application/json" http://localhost:8080/t/tutorial-app/hello-tutorial-trigger
{"message":"Hello World"}%
~/ws $
```

There's a built-in invocation command in the Fn client that can do this for you as well.

```
~/ws $ fn invoke tutorial-app hello-tutorial
{"message":"Hello World"}%
~/ws $
```

From here, we can add more functions to our application, make changes to and redeploy our functions, and create more applications as needed. Let's look at how we can get our functions and applications into the outside world, using Kubernetes.

## Integrating Fn with Oracle Cloud Services

Now that we have a super-useful single function application, let's share it with the world. We will move from our local development environment to Fn running on a Kubernetes cluster on OCI's [Oracle Container Engine](https://cloud.oracle.com/containers/kubernetes-engine) (OKE). We'll also make use of [Oracle Container Registry](https://cloud.oracle.com/containers/registry) (OCIR) for our function containers.

Given Serverless is meant to help us focus on our code and not spend time worrying about infrastructure, this part of our tutorial might seem like we're getting into the weeds a bit. But for the most part, we're just going to fire off a few commands and we'll be up and running. This is what's great about using managed services like OKE and OCIR - we can set things up pretty quickly, and not worry too much about the details. Of course, "managed" doesn't mean "magic", so it's good to get our hands a little dirty.

To summarize the following steps, we're going to point Fn at our container registry instance in OCI for our function images, and we will install Fn server on Kubernetes so that when we deploy applications, they will be running on a managed cluster in OCI.

If you need more details regarding these components, see the [Oracle Container Engine](https://docs.cloud.oracle.com/iaas/Content/ContEng/Concepts/contengoverview.htm) and [Oracle Container Registry](https://docs.cloud.oracle.com/iaas/Content/Registry/Concepts/registryoverview.htm) documentation.

### Configure Fn to Use OCIR

Pointing the Fn client at your OCIR instance is as simple as changing the <samp>REGISTRY</samp> value on your context. Even better, we can create a new context and use it, leaving our local development environment in our <samp>default</samp> context.

```
~/ws $ fn create context oke
Successfully created context: oke
~/ws $ fn use context oke
Now using context: oke
~/ws $ fn update context registry iad.ocir.io/demo-tenant/demo-user
Current context updated registry with iad.ocir.io/demo-tenant/demo-user
~/ws $ fn list context
CURRENT NAME    PROVIDER        API URL                 REGISTRY
        default default         http://localhost:8080   fndemo
*       oke     default                                 iad.ocir.io/demo-tenant/demo-user
```

Make sure you're logged in through Docker if your registry is secure.

```
~/ws $ docker login iad.ocir.io/demo-tenant/demo-user 
Authenticating with existing credentials...
Login Succeeded
~/ws $
```

And that's it. Now when we kick off an <samp>fn deploy</samp>, we can drop the <samp>--local</samp> option and the images will push off to our registry on OCI. We'll set up our API endpoint below, and our journey to the cloud will be complete.

### Preparing Our Cluster

First, we'll need a cluster running on OKE. If you aren't yet familiar with OKE, this [easy-to-follow tutorial](http://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/oke-full/index.html) will get you started. You can stop short of deploying the sample application, if you like. Make sure to select the option to install Tiller in your cluster, which is the server side of Helm.

Once the cluster is deployed, grab the kubeconfig via the "Access Kubeconfig" button in the web console, or via <samp>oci ce cluster create-kubeconfig</samp> command. It's not required that you use <samp>kubectl</samp> to get Fn running on your cluster, but Helm will need the config in place.

So, let's get Helm set up. If you aren't familiar with Helm, that's ok. We only need to invoke a few commands and we'll be up and running. If you're interested in more info, check out the [Helm site](https://helm.sh/).

First, we'll need to install the Helm client. For instructions, check out the [Helm Install](https://docs.helm.sh/install/) documentation. On MacOS, we can use Homebrew again.

```
~/ws $ brew install kubernetes-helm
```

Or, in any shell on Linux or MacOS, we can do the curl-to-shell dance.

```
~/ws $ curl https://raw.githubusercontent.com/helm/helm/master/scripts/get | bash
```

Once we have a Helm client, we initialize. This sets up context for the client to talk with the cluster.

```
~/ws $ helm init
Creating /Users/demo-user/.helm
Creating /Users/demo-user/.helm/repository
Creating /Users/demo-user/.helm/repository/cache
Creating /Users/demo-user/.helm/repository/local
Creating /Users/demo-user/.helm/plugins
Creating /Users/demo-user/.helm/starters
Creating /Users/demo-user/.helm/cache/archive
Creating /Users/demo-user/.helm/repository/repositories.yaml
Adding stable repo with URL: https://kubernetes-charts.storage.googleapis.com
Adding local repo with URL: http://127.0.0.1:8879/charts
$HELM_HOME has been configured at /Users/demo-user/.helm.
Warning: Tiller is already installed in the cluster.
(Use --client-only to suppress this message, or --upgrade to upgrade Tiller to the current version.)
Happy Helming!
```

This is a good time to check and see if the cluster components of Helm need an update via <samp>helm init --upgrade</samp>.

That's all of our preparation done. Now we can move on to deploying Fn.

### Installing Fn

The Fn Project maintains a Helm Chart which will automate the deployment of Fn on our Kubernetes cluster. To get started, clone the Chart's GitHub repository.

```
~/ws $ git clone https://github.com/fnproject/fn-helm.git
```

The first step of our deployment is to install the Chart dependencies.

```
~/ws $ cd fn-helm
~/ws/fn-helm $ helm dep build fn
```

Note that by default, the Chart will install using container storage. This means that storage will not persist. For our tutorial this is fine, but for a production environment you'll want to set up persistent storage. See the [Chart documentation](https://github.com/fnproject/fn-helm#configuring-database-persistence) for more info.

Ok, let's install. We will name our deployment so we can easily keep track of it.

```
~/ws/fn-helm $  helm install --name fn-tutorial fn
```

The install command will have a good deal of useful output as it deploys the Fn project to your cluster. Note, it might take a minute or two for the API load balancer to spin up. You can watch for it to have an external IP assigned via:

```
~/ws $ kubectl get svc -w fn-tutorial-fn-api

```

### Point Fn at Our OKE Cluster

Once there's an external IP up on our API load balancer, we can set our API URL in our context.

```
~/ws $ kubectl get svc --namespace default fn-tutorial-fn-api
NAME                 TYPE           CLUSTER-IP    EXTERNAL-IP      PORT(S)        AGE
fn-tutorial-fn-api   LoadBalancer   10.96.24.97   129.213.76.195   80:31151/TCP   6m
~/ws $ fn update context api-url http://129.213.76.195:80
Current context updated api-url with http://129.213.76.195:80
~/ws $ fn list context
CURRENT NAME    PROVIDER        API URL                         REGISTRY
        default default         http://localhost:8080           fndemo
*       oke     default         http://129.213.76.195:80        iad.ocir.io/demo-tenant/demo-user
```

We can now test that our client can reach our server, and we're ready to move on.

```
~/ws $ fn version
Client version is latest version: 0.5.8
Server version:  0.3.570
```

## Deploy an Application to the Cloud

Now that our local Fn client is talking to our Fn server running on our OKE cluster, we can use the same workflow as we used in our local development environment. Our container images will be pushed to our OCIR repository as they are built and our triggers will be automatically managed for us on the Fn server instance running in our cluster in the cloud.

```
~/ws $ fn deploy --app tutorial-app
Deploying hello-tutorial to app: tutorial-app
Bumped to version 0.0.3
Building image iad.ocir.io/demo-tenant/demo-user/hello-tutorial:0.0.3 ....
Parts:  [iad.ocir.io demo-tenant demo-user hello-tutorial:0.0.3]
Pushing iad.ocir.io/demo-tenant/demo-user/hello-tutorial:0.0.3 to docker registry...The push refers to repository [iad.ocir.io/demo-tenant/demo-user/hello-tutorial]
fa6a9cf3cd4b: Layer already exists
85e2088e5479: Layer already exists
97dedccb7128: Layer already exists
c9e8b5c053a2: Layer already exists
0.0.4: digest: sha256:141b1dca2475053e19f242aac43e922225ed2eec35725d8ca55caa805a092092 size: 1156
Updating function hello-tutorial using image iad.ocir.io/demo-tenant/demo-user/hello-tutorial:0.0.3...
Successfully created app:  tutorial-app
Successfully created function: hello-tutorial with iad.ocir.io/demo-tenant/demo-user/hello-tutorial:0.0.3
Successfully created trigger: hello-tutorial-trigger

~/ws $ fn list triggers tutorial-app
FUNCTION	NAME			TYPE	SOURCE			ENDPOINT
hello-tutorial	hello-tutorial-trigger	http	/hello-tutorial-trigger	http://129.213.69.88/t/tutorial-app/hello-tutorial-trigger

~/ws $ curl -H "Content-Type: application/json" http://129.213.69.88/t/tutorial-app/hello-tutorial-trigger
{"message":"Hello World"}
~/ws $
```

## Conclusion 

We have learned the basics of how to create functions with Fn and how to deploy our functions in applications running in the cloud with Oracle Cloud Services. From here, we can really just focus on code, letting Fn help us package and deploy our code, and depending upon our managed Kubernetes cluster running in Oracle Container Engine to keep our applications up and running.