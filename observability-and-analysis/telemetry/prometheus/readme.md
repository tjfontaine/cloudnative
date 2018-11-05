Application observability is critical throughout the lifecycle of a project. Monitoring and alerting through agent-based metrics collection has been the standard for enabling data insight for years, but how does this approach mesh with the dynamic nature of containers and schedulers? The agent-based approach would have to be re-imagined, metrics would have to be collected effortlessly from within the container, and, to allow for scalability, the solution would need to avoid requiring additional effort as new containers are spun up.

When it comes to open source cloud-native monitoring, Prometheus is widely considered to be the best place to start. Prometheus is a systems monitoring and alerting toolkit that Cloud Computing Native Foundation (CNCF) recommends for container-based infrastructure. It recently became the second project to graduate from the CNCF program. It boasts powerful tools to scrape data applications, a multidimensional data model, a flexible query language to create powerful visualizations, and a built-in alert manager.

In these set of guides, we will walk through different usecases of using Prometheus from a monitoring standpoint.

### Prerequisites

* A running Kubernetes cluster (we're using Oracle Container Engine for the Kubernetes cluster)
* Configured kubectl