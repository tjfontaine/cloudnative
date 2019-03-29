[Skaffold](https://github.com/GoogleContainerTools/skaffold) is a command line tool used for local continuous development of Kubernetes applications. Skaffold can be used to automate the workflow for building your application image, pushing it to a repository, and deploying it to a Kubernetes cluster. Skaffold can watch your code for changes with `skaffold dev` and then kick off the build, push, deploy process automatically when you save your code.


Skaffold can be used to deploy multiple microservices at once. You can reference multiple images and manifest files in your `skaffold.yaml`. Skaffold is a very flexible option. For example, there are five options for something as straight forward as updating an image repository. You could manually replace the image repository in `skaffold.yaml`, or you can use a flag, environment variable, global Skaffold configuration, or `skaffold config` for your current `kubectl` context. Skaffold also provides two options for deployment: `skaffold dev` and `skaffold run`. `skaffold dev` continously watches your application for changes and restarts the build, push, deploy pipeline whenever changes occur. Exiting from skaffold devwill delete your deployed application. Alternatively, `skaffold run` runs your pipeline once and does not watch for changes.

### Prerequisites

* [Docker For Desktop](https://www.docker.com/products/docker-desktop)
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [Oracle Container Engine for Kubernetes (OKE)](https://docs.cloud.oracle.com/iaas/Content/ContEng/Concepts/contengoverview.htm)
* [Oracle Cloud Infrastructure Registry (OCIR)](https://docs.cloud.oracle.com/iaas/Content/Registry/Concepts/registryoverview.htm)
