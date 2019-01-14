On a high level, Docker is a tool that is designed to benefit both developers and system administrators, making it a part of many DevOps toolchains. For developers, it means that they can focus on writing code. For operations, Docker gives flexibility and potentially reduces the number of systems needed because of its small footprint and lower overhead. The dream is that there is no difference between developers and sysads and that developers are empowered to manage the entire lifecycle of their application. 

### What Are the Benefits of Docker Containers? 

**Simplicity**: Docker containers remove a level of complexity from development and deployment processes because developers only need to package an application and its dependencies.

**Speed**: Docker containers share the kernel of the underlying host operating system which makes containers lightweight. The Docker architecture protects containers from each other by isolating container processes. 

**Interoperability**: Development teams can link multiple Docker containers or services to create multi-tiered application stacks.

**Portability**: Docker provides a standardized method to deploy containers to any number of docker environments, whether an environment is located on a development workstation, a private cloud infrastructure, or public cloud service. 

**Density**: Docker containers have proved to be a lightweight runtime environment for applications, which can lead to increased application density per host.

### Prerequisites

This tutorial is for complete beginners that have never played with Docker before.  However, I am going to assume you are familiar with a few concepts before we continue:

* IP addresses and ports
* Virtual Machines
* Editing configuration files
* Basic familiarity with the ideas of code dependencies and building
* Machine resource usage terms, like CPU percentages, RAM use in bytes, etc.
* Finally, a Docker hub account https://hub.docker.com/  (it is free)