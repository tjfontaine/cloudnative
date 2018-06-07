---
title: "Introduction to Microservices"
date: 2018-04-4T13:40:24-07:00
path: "/microservices/intro"
curriculum: "Microservices"
---



## What are Microservices?
Microservices are an architecture style used by many organizations today, the premise being that you'll achieve a supernatural degree of agility, speed of delivery, and scale. Microservices give teams a way to develop more physically separated modular applications that should render individual services quicker to develop, test, and deploy. As a result, developers can work with services that are much easier to understand and maintain.

By the end of the unit, you should have a good understanding of successful adoption efforts, common pitfalls, and questions you should ask yourself and your team before you take an ax to your monolith.

## Why Microservices?
Enabling a new, more agile world in which developers and operations teams work hand in hand to deliver small, loosely coupled bundles of software quickly and safely, is not the only reason why Microservices have captured the hearts and minds of developers and those they answer to. The idea of Microservices is not new, and it could be said that the success of organizations such as Netflix, Amazon, and eBay who functionally partitioned their monolithic applications into smaller units, and the rise of Docker as the standard for encapsulating each microservice, is the real reason for the spread and widescale adoption of Microservices. I mean, who doesn't want to be Netflix? These successful organizations solved some common issues they were experiencing with their monolithic applications. Here are some thoughts on how to adopt Microservices.

## Adopting Microservices
One common approach for teams adopting microservices is to identify existing functionality in their monolith that is both non-critical and "loosely coupled enough" with the rest of the application. The usual suspect for this is authentication and authorization. In this scenario authn/authz would be extracted from the monolith and put into its own discrete service. The main idea is to slowly replace functionality in the system with discrete microservices while minimizing the changes that must be added to the system itself to support this transition. Here are some architectural patterns that can be leveraged to build a solid Microservices implementation strategy.
## Microservices Architectural Patterns
### Service Size
The overarching goal when determining the right size for a microservice is to not make a monolith out of it. Some practitioners advocate as small a service size as possible for independent operation and testing.
### Service Discovery
A service may need to know about other services when accomplishing a business function. A service discovery system enables this, wherein each service refers to an external registry holding the endpoints of the other services. This can be implemented through environment variables when dealing with a small number of services. If you're looking for something more sophisticated, you could use etcd, Consul and Apache Zookeeper for service discovery.
### Domain Modeling
The goal here is to ensure that each of your application's microservices is adequately isolated and insulated from the side effects and changes in the implementation of other microservices in the system. Proper domain modeling also helps avoid the pitfall of modeling the system along technological or organizational boundaries.
### Build and Release Pipeline
When implementing Microservices, having a continuous integration and deployment pipeline is a must. Release practices also need to include the concept of rolling upgrades or blue-green deployment. This means that, at any point in a new build and release cycle, there can be concurrent versions of the same microservice running in the production environment.

While architectures such as these are promising, it is important to remember that, during the transition from a monolithic system to a collection of microservices, both systems will exist in parallel. To reduce the development and operational costs of the migration, the architectural and integration patterns employed by the microservices must be appropriate to the system's architecture. Now that we've explored some base principles of adopting a Microservices architecture let's look at some downsides. 
## Some Issues That May Arise 

### Monitoring and Operations
Whether you're gradually breaking down a monolithic app to microservices or building a new system from scratch, you'll find yourself with a whole host of new services to monitor. These services might use different languages, have their own version control, and use different technologies. With this fragmented system, a need arises for centralized monitoring and logging to have a fair shot at understanding what's going on. That is easier said than done.
### Logging Is Distributed Between Services
Good logging hygiene is difficult to maintain even in a monolith. Microservices are all about breaking things down into individual components. As a side effect, ops procedures and monitoring are also broken down per service. The challenge here is to centralize these back using proper tooling to be able to get a picture of the system as a whole. 

### Mystery
An issue that's caused by one service can cause trouble elsewhere. With monoliths you usually know that you're looking in the right direction, while Microservices make it harder to understand what the source of the issue is and where you should get your data from. Whatever the problem is, the first step with Microservices is to understand where to start looking for answers. It's important to note that the data might not even live within your logs and dashboard metrics… see above.

### Version Management and Cyclic Dependencies Between Services
In a microservice architecture, you're even more vulnerable to errors coming in from dependency issues. More services mean different release cycles, which add to the complexity. Reproducing a problem will prove to be very difficult when it's gone in one version, and comes back in another. 

## Are We Ready for Microservices?

The most challenging aspects of moving from monolithic systems to microservices are the organizational changes required, such as building services teams that own all aspects of their microservices. This requires creating multidisciplinary units which include developers, testers, and operations staff, among others. The idea is to embrace more collective code ownership. If your organization has only one or a few people in your dev team who can set up new services, you are not ready for Microservices. You will need multiple members in each team with the ability to provision infrastructure and deploy applications without requiring outside assistance. Developers should be involved in managing everything about their applications. One approach to building out a multidisciplinary unit is to create a standard boilerplate project that encapsulates key principles of microservice design, including project structure, test automation, integration, API frameworks, monitoring infrastructure, and more.

When the overall system is still small, monolithic architectures are attractive in that they allow quick turnaround of new business features on a tight schedule. However, this becomes a development and operations nightmare as the system grows up. Microservices, like many things, come with positive and negative effects. If your organization is mature enough and has the tech in place, then the challenges associated with having Microservices can be minimized, making the positive effects all the more apparent.

#### License
Copyright (c) 2018, Oracle and/or its affiliates. All rights
reserved.

This content is licensed under the Universal Permissive
License 1.0.

See LICENSE.txt for more details.
