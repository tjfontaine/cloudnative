The old problem of identifying and eliminating bugs in production has become more complicated in today’s cloud native world. Tracking application logs has been a widely-adopted industry standard for addressing this issue over the last few decades, but how does this approach mesh with the dynamic nature of containers and schedulers? Special measures need to be taken to preserve logs when something fails. Fortunately, we have tools available to do just that.

## Prerequisites

This series will show you how to get up and running with Elasticsearch, FluentD, and Kibana (EFK) on Oracle Cloud Infrastructure (OCI). To get started, you will need access to [OCI](https://cloud.oracle.com/en_US/iaas).