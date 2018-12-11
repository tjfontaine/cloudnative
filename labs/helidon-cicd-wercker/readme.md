# Helidon CI/CD with Wercker, Container Registry, and Oracle Container Engine for Kubernetes

## Before You Begin

This 20-minute tutorial shows you how to build and deploy a Helidon application using the Continuous Integration/Continuous Delivery tool Wercker. It will walk through how to use Wercker to create pipelines that push an image to Oracle Container Registry and deploy it onto Oracle Container Engine for Kubernetes. 

### Background

Project Helidon is an open source set of Java libraries used to write microservices. According to the official documentation, "Helidon is a collection of Java libraries for writing microservices that run on a fast web core powered by Netty... There is no unique tooling or deployment model. Your microservice is just a Java SE application."

Wercker is a continuous delivery platform used to help software developers build and deploy applications and microservices. It is designed to increase developer velocity by enabling users to run and automate their tests and builds.

### What Do You Need?

The following list shows the minimum versions: 

- [Java SE 8](https://www.oracle.com/technetwork/java/javase/downloads) or [Open JDK 8](http://jdk.java.net/)
- [Maven 3.5](https://maven.apache.org/download.cgi) 
- [Docker 18.02](https://docs.docker.com/install/)
- [Kubectl 1.7.4](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 
- A GitHub account
- Access to [Oracle Cloud Infrastructure](https://console.us-phoenix-1.oraclecloud.com/)
- An [Oracle Container Engine for Kubernetes](https://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/oke-full/index.html) cluster 

## Create a Wercker Application 

1. Begin by logging into your GitHub account forking the quickstart-se application from [our GitHub repo](https://github.com/mickeyboxell/helidon/helidon-se-codeone-2018). 

2. Navigate to https://app.wercker.com/. Create an account if you do not already have one. 

   ![Screen Shot 2018-11-28 at 4.08.19 PM](images/Screen%20Shot%202018-11-28%20at%204.08.19%20PM.png)

3. Click **Create your first application**. 

4. Under **Select a user from the dropdown to begin** make sure your Wercker user is selected. Under **Select SCM** choose GitHub from the list. 

   ![Screen Shot 2018-11-28 at 4.08.29 PM](images/Screen%20Shot%202018-11-28%20at%204.08.29%20PM.png)

5. On the next page Wercker will show the list of repositories in the GitHub account you connected in the previous step. Choose the forked repository, helidon-se-codeone-2018, from the dropdown menu and click **Next**. 

   ![Screen Shot 2018-11-28 at 4.19.52 PM](images/Screen%20Shot%202018-11-28%20at%204.19.52%20PM.png)

6. Accept the deatult to check out the code and click **Next**. 

7. On the **Review** page click **Create**. 

## Set Application Environmental Variables and Push to OCIR

1. In the **Environment** tab create each of the following environment variables and click **Add** after each one.

   * Docker Username must include the `<tenancy name>/<username>`Docker Password is the [authentication token](https://docs.cloud.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm). Click **Protected** checkbox. NOTE: It must not contain a $ character.
   * Docker Repo must include `<region-code>.ocir.io/<tenancy name>/<registry name>`
   * Docker Username must include the `<tenancy name>/<username>`

   When done, click the **Run** tab. 

   ![Screen Shot 2018-11-28 at 4.27.21 PM](images/Screen%20Shot%202018-11-28%20at%204.27.21%20PM.png)

2. Test that the application can be built and pushed to OCIR. Click the **trigger a build now** link at the bottom of the page. The build will run and will indicate whether or not it has run successfully. 

3. Log into [Oracle Cloud Infrastructure](https://docs.us-phoenix-1.oraclecloud.com/Content/home.htm) and navigate to **Registry** under the **Developer** tab. If the build was successful, you will see a repository and application matching the information entered into Wercker. 

   ![Screen Shot 2018-12-04 at 10.13.10 AM](images/Screen%20Shot%202018-12-04%20at%2010.13.10%20AM.png)

4. Under the **Actions** dropdown choose **Change to Public** to make your image deployable to OKE without configuring secrets.



## Deploying to Kubernetes

1. In the **Environment** tab on Wercker add the values for OKE_MASTER and OKE_TOKEN. These can be found in your the kubeconfig file. 

   - OKE_MASTER: `<server value from kubeconfig>`
   - OKE_TOKEN: `<token value from kubeconfig>` 

   ![Screen Shot 2018-12-03 at 3.27.06 PM](images/Screen%20Shot%202018-12-03%20at%203.27.06%20PM.png)

2. Next you will have to add a new workflow to Wercker. Navigate to the **Workflows** tab and click **Add new pipeline**. 

3. Enter **deploy-to-kubernetes** for both Name and YML Pipeline name and click **Create**.

4. Click the **Workflows** tab and in the workflow editor, click the ' **+** ', to create a new pipeline chain after the build. Select `deploy-to-kubernetes` for **Execute pipeline** and click **Add**.

   ![Screen Shot 2018-12-03 at 3.30.29 PM](images/Screen%20Shot%202018-12-03%20at%203.30.29%20PM.png)

5. Switch to Wercker and click the **Runs** tab. You will see that the pipeline was executed automatically when the change was made in Github. After the build completes the deploy workflow runs. Click `deploy-to-kubernetes` to view the details. Scroll to the bottom to verify that all the steps completed successfully.

   ![Screen Shot 2018-12-04 at 10.16.47 AM](images/Screen%20Shot%202018-12-04%20at%2010.16.47%20AM.png)

## Verify the Deployment to Kubernetes was Successful 

1. Run the following commands to verify connectivity to your cluster: 

   ```
   kubectl cluster-info                # Verify which cluster you are connecting to 
   kubectl get nodes                    # Verify connectivity to cluster
   ```

2. Get the service endpoint for your application: 

   ```
   kubectl get svc 
   ```

3. Add the node of your cluster to your service endpoint to get the endpoint for your deployed Helidon quickstart-se application and paste that value into your browser. 

   ![Screen Shot 2018-11-29 at 1.32.12 PM](images/Screen%20Shot%202018-11-29%20at%201.32.12%20PM.png)

## Clean Up 

1. After you are done, remove the application from Kubernetes by deleting the deployment:  

   ```
   kubectl get deployments
   kubectl delete [deployment-name]
   ```



## Want to Learn More?

- [Official Helidon Documentation](https://helidon.io/docs/latest/#/about/01_introduction)
- [Official Oracle Container Engine for Kubernetes Documentation](https://docs.cloud.oracle.com/iaas/Content/ContEng/Concepts/contengoverview.htm) 
- [Official Oracle Registry Documentation](https://docs.cloud.oracle.com/iaas/Content/Registry/Concepts/registryoverview.htm)
- [Official Wercker Documentation](https://devcenter.wercker.com/) 
- [Integrating Oracle Cloud Infrastructure Container Engine For Kubernetes and Registry with Wercker](https://www.oracle.com/webfolder/technetwork/tutorials/obe/oci/wercker/index.html)
