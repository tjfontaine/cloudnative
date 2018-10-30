# Deploying Instrumented Helidon on Oracle Container Engine for Kubernetes 

## Summary and Context

Last month Oracle released Helidon, an open source set of Java libraries used to write microservices. According to the official documentation, "Helidon is a collection of Java libraries for writing microservices that run on a fast web core powered by Netty... There is no unique tooling or deployment model. Your microservice is just a Java SE application." 

There are two different flavors of Helidon: Standard Edition (SE) and MicroProfile (MP). 

- Helidon SE is a functional programming style that uses the Helidon WebServer, Config and Security APIs directly. This provides an intentionally small featureset and gives you full transparency and control. JDK is used at runtime. 
- Helidon MP is a declarative model that supports the Eclipse MicroProfile family of APIs. This provides a development experience familiar to Java EE/Jakarta EE developers. Helidon MP is a thin layer on top of Helidon SE components.

## Why Should You Care? 

Microservices have become a focus of modern cloud native development. While it is possible to develop microservices with Java EE, Helidon provides a lightweight microservice framework to simplify the process. It addresses the core tools a developer needs when writing microservices: configuration, security, and a web server.

With traditional Java, you can spend a lot of time simply setting up your development environment: (download JDK, set up classpaths, get an IDE, get Maven, get the right dependencies, write a hello world, get a webserver to deploy onto, package stuff, then deploy it). Helidon comes with boilerplate so you can focus on business logic and developing code rather than spending your time configuring an environment. You can simply create and run your Java SE application. Helidon is also useful because it addresses the need for additional debugging and DevOps tools out of the box, for instance SpotBugs, and includes a scripts folder for deployment and stylechecking. 

Outside of Java-related challenges, it can be confusing to figure out what pieces or frameworks you need to get started when writing webapps and microservices and/or how to design with [12-factor](https://12factor.net/) principles. Helidon gives you a good recipe for this. Another benefit of using Helidon is that it was designed with Kubernetes in mind. Your quickstart application comes with an app.yaml that can be deployed straight onto a Kubernetes cluster. 

## Prerequisites

[Here](https://helidon.io/docs/latest/#/getting-started/01_prerequisites) is the list of pre-requisites for using Helidon. In order to push to Oracle Cluster Engine for Kubernetes (OKE) you will need access to an OKE cluster and the Oracle Container Registry (OCIR).  

## Helidon on OKE 

In this walkthrough we will create a Hello World application in Helidon, push it to the Oracle Container Registry, deploy it into an Oracle Container Engine for Kubernetes cluster, and then modify the application to collect service metrics that will be displayed in Prometheus. Check out [this article](https://cloudnative.oracle.com/template.html#observability-and-analysis/telemetry/getting-started-with-helm-and-prometheus/Readme.md) for more information about deploying Prometheus on OKE. 

Begin by following the [Helidon Quickstart](https://helidon.io/docs/latest/#/getting-started/02_base-example). This will walk you through the steps to generate a project using either Helidon SE or Helidon MP. I will be using Helidon SE for my example. 

### Generate the Project

Inside your development folder run the Helidon SE Example Maven archetype: 

```
mvn archetype:generate -DinteractiveMode=false \
    -DarchetypeGroupId=io.helidon.archetypes \
    -DarchetypeArtifactId=helidon-quickstart-se \
    -DarchetypeVersion=0.10.4 \
    -DgroupId=io.helidon.examples \
    -DartifactId=quickstart-se \
    -Dpackage=io.helidon.examples.quickstart.se
```

And change directories into the one created by the archetype: 

`cd quickstart-se`

Within this folder you will see 

```
pom.xml
README.md
/src
```

### Build the Application 

To build the application run `mvn package` while in the /quickstart-se directory. 

This will create a /target directory containing both the .jar file of your application and a .yaml file. The .yaml makes the process for deploying Helidon on Kubernetes simple. After building a Docker image of our application and uploading it to the Registry service we will modify the .yaml with the address of the image in the repository in order to deploy it to Kubernetes. 

At this stage you are welcome to deploy the application locally with `java -jar target/quickstart-se.jar`  If you navigate to the endpoint in the browser you will see a simple "Hello World!" greeting encoded using JSON. Alternatively you can cURL the URL with `curl -X GET http://localhost:8080/greet` to get the same response `{"message":"Hello World!"}`. 

### Build the Docker Image 

The project contains a Docker file to make it simple to create and run a Docker image. The runtime dependencies of the example are already in /target/libs directory. To build the Docker image run: `docker build -t quickstart-se target`. 

You can see the image by running `docker images`: 

```
REPOSITORY 			TAG			IMAGE ID 		CREATED 		SIZE 

quickstart-se 		latest 		21f470edc862 	3 hours ago 	88.6MB
```

You can test the Docker image by running: `docker run --rm -p 8080:8080 quickstart-se:latest` and then navigating to the same endpoint or using the same cURL commands as you did when previously deploying the application. 

### Pushing the Image to OCIR 

For a great walkthrough on how to use the Registry service, check out this article [Pushing an Image to Oracle Cloud Infrastructure Registry](https://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/registry/index.html). You will need to log into your Oracle Cloud Infrastructure console and make sure you have a native OCI user. Currently [federated users are not supported by OCIR](https://docs.cloud.oracle.com/iaas/Content/knownissues.htm#registryfederateduser).Your user will either need to be a part of the tenancy's Administrators group or another group with the REPOSITORY_CREATE permission. After confirming you have the proper permissions, generate an auth token for your user. Copy the token to a notepad as you will not be able to access it again. 

Navigate to the Registry (OCIR) tab and choose the region to which you would like to push the image. Log into the Registry service Docker CLI with `docker login <region-code>.ocir.io`

 `<region-code>` corresponds to the code for the Oracle Cloud Infrastructure Registry region you're using, as follows:

   - enter `fra` as the region code for Frankfurt
   - enter `iad` as the region code for Ashburn
   - enter `lhr` as the region code for London
   - enter `phx` as the region code for Phoenix

When prompted, enter your username in the format `<tenancy_name>/<username>`. When prompted, enter the auth token you copied earlier as the password.

The next step is to tag the quickstart image we are going to push to the registry: 

`docker tag quickstart-se:latest <region-code>.ocir.io/<tenancy-name>/<repo-name>/<image-name>:<tag>`

Finally we push the image to the Registry: 

`docker push <region-code>.ocir.io/<tenancy-name>/<repo-name>/<image-name>:<tag>`

- `<region-code>` is one of `fra`, `iad`, `lhr`, or `phx`.
- `ocir.io` is the Oracle Cloud Infrastructure Registry name.
- `<tenancy-name>` is the name of the tenancy that owns the repository to which you want to push the image (for example, `acme-dev`). Note that your user must have access to the tenancy.
- `<repo-name>` (if specified) is the name of a repository to which you want to push the image (for example, `project01`). Note that specifying a repository is optional. If you don't specify a repository name, the name of the image is used as the repository name in Oracle Cloud Infrastructure Registry.
- `<image-name>` is the name you want to give the image in Oracle Cloud Infrastructure Registry (for example, `helloworld`).
- `<tag>` is an image tag you want to give the image in Oracle Cloud Infrastructure Registry (for example, `latest`).

Within the Registry UI you will see the newly created repository. By default, the repository will be set to private. If you would like to continue with a private repository, you will have to add an image pull secret which allows Kubernetes to authenticate with a container registry to pull a private image. Let's first create a namespace for this project called "helidon" with `kubectl create namespace helidon`. We will deploy our application to this namespace. Next we will create the secret with: 

`kubectl create secret docker-registry ocirsecret --docker-server=<region-code>.ocir.io --docker-username='<tenancy-name>/<oci-username>' --docker-password='<oci-auth-token>' --docker-email='<email-address> --namespace helidon` 

Open up your /target/app.yaml file created with Maven and under `spec` next to `containers` in the deployment section add the following:  

```
imagePullSecrets: 
        - name: ocirsecret
```

In the same file also under `spec` in the deployment section add the path listed on the Registry page to `image` under `containers`: 

`<region-code.ocir.io>/<tenancy-name>/<quickstart-project-name>`

The final version will look something like this: 

```
    spec:
      imagePullSecrets: 
      - name: ocirsecret
      containers:
      - name: helidon-se-codeone-2018
        image: phx.ocir.io/cloudnative-devrel/mies/quickstart-se:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
```

To make your life a little easier, you can skip past the secret creation step and simply make your registry public. You will still need to add the image location to your app.yaml file, but you will not need to create a secret or add imagePullSecrets to the .yaml. 

Change to your quickstart-se directory and run `kubectl create -f target/app.yaml -n helidon` to deploy the application to the `helidon` namespace within your Kubernetes cluster. 

Run `kubectl get svc -n helidon` to get the NodePort for your new pod. Run `kubectl get nodes` to get the IP address for your cluster nodes. Add the port number to the IP address of your node to get access to the deployed pod. If you browse to or cURL the same /greet endpoint you will see the same JSON output as you did when the application was deployed locally. 

### Adding Metrics

The next step is to instrument our application to export metrics. We will then ingest those metrics into Prometheus, an open source monitoring solution. You will need Prometheus to continue with this section. For more information about deploying Prometheus on your Kubernetes cluster, check out [this documentation](https://www.oracle.com/webfolder/s/assets/microsite/cloud-native/template.html#observability-and-analysis/telemetry/getting-started-with-helm-and-prometheus/Readme.md). 

The first import to define is in the quickstart-se/src/main/java/io/helidon/examples/quickstart/se/Main.java file. Here we will add `import io.helidon.metrics.MetricsSupport;` to the top of the document containing the other imports in order to register metrics support with the WebServer. 

Now we can configure metrics in our routes by adding `.register(MetricsSupport.create()) // new registration` to the section below: 

```
/**
     * Creates new {@link Routing}.
     *
     * @return the new instance
     */
    private static Routing createRouting() {
        return Routing.builder()
                .register(JsonSupport.get())
                .register("/greet", new GreetService())
                .build();
    }
```

Imports in GreetService.java should initially look like this:

```
import javax.json.Json;
import javax.json.JsonObject;

import io.helidon.config.Config;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;
```

After adding our metric libraries the imports should look like:

```
import javax.json.Json;
import javax.json.JsonObject;

import io.helidon.common.http.Http;
import io.helidon.config.Config;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;

//new metric imports
import io.helidon.metrics.RegistryFactory;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.Metadata;
import org.eclipse.microprofile.metrics.MetricRegistry;
import org.eclipse.microprofile.metrics.MetricType;
import org.eclipse.microprofile.metrics.MetricUnits;
```

After these lines of code: 

```/**
     * The config value for the key {@code greeting}.
     */
    private static String greeting = CONFIG.get("greeting").asString("Ciao");
```

Add this section: 

```
  /**
     * Create Counter metadata object
     */
    private Metadata greetCounterMetadata = new Metadata(		
        "requests_total",		
        "Total Requests",		
        "Number of requests on the endpoint",		
         MetricType.COUNTER,		
         MetricUnits.NONE);


    /**
     * Create metric registry and counter
     */
    private final MetricRegistry registry = RegistryFactory.getRegistryFactory().get()
        .getRegistry(MetricRegistry.Type.APPLICATION);
    private final Counter greetCounter = registry.counter(greetCounterMetadata);
```

Then create the `counterFilter` function:

```
/**
     * Runs for every request and increments a simple counter.
     * Calls request.next() to ensure other handlers are called.
     * @param request
     * @param response
     */
    private void counterFilter(final ServerRequest request,
                               final ServerResponse response) {
        this.greetCounter.inc();
        request.next();
    }
```

Then add the "any" rule `.any(this::counterFilter)` to your routes. This is what it will look like by default: 

```/**
     * A service registers itself by updating the routine rules.
     * @param rules the routing rules.
     */
    @Override
    public final void update(final Routing.Rules rules) {
        rules
            .get("/", this::getDefaultMessage)
            .get("/{name}", this::getMessage)
            .put("/greeting/{greeting}", this::updateGreeting);
```

Open up the pom.xml file created by Maven and add the following dependencies: 

```
        <dependency>
            <groupId>io.helidon.microprofile.metrics</groupId>
            <artifactId>helidon-metrics-se</artifactId>
        </dependency>
```

### Deploying and Monitoring 

Once again run `mvn package` and `docker build -t quickstart-se target` to update your .jar and create a new Docker image of your application. Tag your updated Docker image `docker tag quickstart-se:latest <region-code>.ocir.io/<tenancy-name>/<repo-name>/<image-name>:<tag>` and push it to the registry `docker push <region-code>.ocir.io/<tenancy-name>/<repo-name>/<image-name>:<tag>`. 

Delete your existing quickstart-se deployment and service in the Helidon namespace. Modify the app.yaml to reference your Prometheus deployment: 

```---
---
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: quickstart-se
  namespace: helidon
  labels:
    prometheus: kube-prometheus
spec:
  endpoints:
  - interval: 30s
    port: http
      jobLabel: quickstart-se
  namespaceSelector:
    matchNames:
    - default
  selector:
    matchLabels:
      app: quickstart-se
```

Deploy the updated application to Kubernetes: `kubectl create -f target/app.yaml -n helidon`. If you navigate to the /metrics endpoint you will see JSON displaying the number of requests made to the service. 

Open up your Prometheus deployment and sign in with the username `admin` and password `admin`. 

Create a dashboard graphing the application:service_requests metric. Refresh the /greet endpoint to create some data to visualize on our Prometheus graph. 

## Conclusion 

In this solution we walked through the process of creating a quickstart application using Helidon SE, pushing that application to a private Oracle Registry, and deploying it to an Oracle Container Engine for Kubernetes cluster. Next we instrumented that application to export service metrics and ingested those metrics into our monitoring tool, Prometheus. We hope that after reading this you have a better understanding of how you can run Helidon in your environment. 