# Grafana 

Grafana is the leading open source platform for analytics and monitoring. Grafana is an open-source visualization and alerting tool for time series data. It was designed with a plugin architecture that allows you to capture data across many different sources and visualize it on a single dashboard. This approach addresses the issue of cloud sprawl, by providing users with a consolidated view of resources across providers.

[The Oracle Cloud Monitoring Service](https://docs.cloud.oracle.com/iaas/Content/Monitoring/Concepts/monitoringoverview.htm) offers out of the box aggregated metrics for Oracle Cloud Infrastructure services and resources. We also make these metrics available from an open API. We worked with Grafana to expose the Monitoring service as a Grafana data source. This means you can visualize Oracle Cloud Infrastructure data in your Grafana instance and use it to create beautiful and useful dashboards.

We have created multiple documents to help with the installation process, including one for a [Linux host](linux.md), [MacOS host](macos.md), a [virtual machine in Oracle Cloud Infrastructure](linuxoci.md), a [virtual machine in Oracle Cloud Infrastructure using Terraform](terraform.md), and on [Kubernetes](kubernetes.md). We also have documentation for how to use the newly installed and configured plugin in our [Using Grafana with Oracle Cloud Infrastructure Data Source](using.md) walkthrough.



