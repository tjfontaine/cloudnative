### Overview

Google recently announced the creation of Kubeflow, a composable, portable, and scalable machine learning (ML) stack built on top of Kubernetes. It provides an open source platform for ML models to attach themselves to containers, performing computations alongside the data instead of within a superimposed layer. Some of the biggest challenges facing ML applications are composability, portability, and scalability.

One of the most significant driving factors in the rise of ML is that of the growing volumes and varieties of available data. This spate of data generation we're all living through is a double-edged sword in that it comes as a challenge AND an opportunity to businesses. As an opportunity, big data enables enterprises to make wise decisions based on insights into market situations. By gleaning insights from this data – often in real time – organizations are able to work more efficiently and likely gain an advantage over competitors, more so than if those decisions were based on "feeling" and a few customers calls. It's noteworthy however that big data by itself is of little value.

This is where ML comes in handy, as it goes further to unveil the hidden potentials of big data through producing and implementing solutions to complex business problems by using algorithms to build models that uncover connections, thus enabling organizations to make better decisions without human intervention.

With this in mind, the importance of ML and big data to businesses cannot be overemphasized; both have the potential to, and in some cases are, revolutionizing business operations by quickly and automatically producing models that can analyze bigger, more complex data and deliver faster, more accurate results.

While ML has so far been successful in solving specified tasks, the analysis of data with more complex parameters requires, well, more complex ML models. To achieve their potential, ML will need to learn efficiently at scale and integrate with cloud native technologies, especially containerization, to process the extent of information available in the cloud.

The Kubernetes framework is well suited to address these issues, which is why it’s an excellent foundation for deploying machine learning products. The goal of this solution is to get you up and running with Kubeflow as quickly as possible by taking an existing Oracle Kubernetes Engine (OKE) cluster, installing Kubeflow on it, launching a Jupyter notebook via Kubeflow and running a simple project that will train a model based on the MNSIT image dataset. 


### Prerequisites

To win at this solution, you'll need the following: 

* An OKE Cluster, with access to said cluster via a properly configured kubectl utility on your development machine.
* ksonnet installed on your development machine. This can be done via brew install ksonnet/tap/ks using Homebrew. For other platforms, see the ksonnet readme. 
* A Bash-like development environment, with access to wget (or similar). 
* An understanding of Jupyter Notebook.
* At least a basic understanding of machine learning.

Have a poke around and see if you can minimize your ML deployment pain!