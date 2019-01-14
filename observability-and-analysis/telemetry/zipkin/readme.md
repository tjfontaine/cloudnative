# Distributed Application Logging with Zipkin

[Zipkin](https://zipkin.io/) is a distributed tracing system, based on [Google Dapper](https://ai.google/research/pubs/pub36356). Its goal is to identify issues within Microservice-based applications by looking at the latency between the individual components, which it achieves in part by adding unique tokens to requests as they pass through each component. 

This series of guides aims to teach how to install and configure Zipkin on a Kubernetes cluster, and send telemetry to it from a multi-microservice application.


