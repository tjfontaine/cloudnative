# Cloud Native Labs Site Solutions Content

## Overview
This repository contains Solutions content for Oracle's Cloud Native Labs site. The intent is to have an internal working repository where content is created, reviewed and tested. Content is then pushed from here to the upstream Github repository for final publication into the site. This provides the team greater flexibility and affords a quicker time-to-market compared to other internal publishing solutions.

## Content
Content for the site is organized by by Cloud Native subject category, each containing multiple solution subcategories. For example, the "Observability and Analysis" category has subcategories "Distributed Tracing", "Logging" and "Telemetry". Each subcategory has a narrative explanation, which will be viewed by clicking within the site.

Each subcategory should have at least one solution. A solution consists of an overview and at least one tutorial. These are linked from the subcategory page, where the overview is the intitial content and each tutorial is linked from there.

The format for all content described above is Markdown. Narrative can contain links to PDF as well as external destinations. Video links are also supported (BrightCove for internally-created content, YouTube otherwise).

## Organizational Layout
The layout for this repository is a flat structure dictated by the content heirarchy described above. Top-level directories are our cloud native content categories, subcategories are subdirectories, and then specific solutions are subdirectories of the subcategory directories.

Based upon the current plan for content, the directory layout would be as shown.

```

├── application-development
│   ├── ci-cd
│   │   └── spinnaker - pending 
│   ├── microservices
│   │   └── introduction to microservices and api design (3x posts) 
│   ├── package-management
│   ├── serverless
│   │   └── intro to serverless - pending 
├── distributed-systems-management
│   ├── container-orchestration
│   │   └── kubernetes 101  (3x posts)
│   │   └── persistent-volumes-on-kubernetes - pending 
│   ├── queuing-streaming
│   ├── service-mesh-and-discovery
├── infrastructure
│   ├── infra-as-code
│   │   └── kubernetes-on-oci-with-terraform (3x posts)
│   ├── block-storage
│   ├── file-system-storage
│   ├── object-storage
└── observability-and-analysis
│   ├── distributed-tracing
│   ├── logging
│   │   └── efk-stack-introduction (2 x posts)
│   ├── telemetry
│      └── getting-started-with-helm-and-prometheus (1x post)
└── machine-learning
│   ├── tensorflow
│      └── kubeflow - pending 

```

## Style Guide
Generally speaking, Cloud Native Lab content is of a technical nature and drafted in an informal, person-to-person style. Context should remain indirect, however, and should remain professional. Rhetorical questions should be avoided.

Concepts should be used as proper nouns, descriptive terms as common. For example "When considering choices for a new greenfield project, Serverless should be in the running", compared to "When leveraging a serverless architecture, scaling is an aspect of the platform".



