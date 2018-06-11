---
title: "API Design for Microservices"
date: 2018-04-4T13:40:24-07:00
path: "/microservices/api-design"
curriculum: "Microservices"
---

# Overview

This series will cover multiple aspects of API design, with a
specific focus on the components that make up a multi-service system.

Then we will put those designs into practice.

By the end of this article you should have a good understanding of
some common elements of proper API design.

By the end of this series you will be telling everybody around you
how to write microservices at every opportunity until they ask you to
stop but you won't.


## Technologies Used in This Series
 - go
 - kubernetes
 - docker
 - grpc
 - prometheus
 - protobuf
 - zipkin
 - opentracing-go
 - urfave/cli
 - wercker/blueprint


## Concepts Covered in This Series
 - General API Design
 - Interservice APIs
 - Public APIs
 - Protocol Buffers
 - Authentication and Authorization
 - Public Gateways
 - Internal RPC
 - Service Metrics
 - RPC Tracing
 - Command-line Flags
 - Deployment
 - Service Templates and Auditing


# General API Design

People have been writing APIs for a long time now, and there is some
great material on API design. Here are a few articles if you want to read
up beforehand:

  1. Focus on usability: https://swaggerhub.com/blog/api-design/api-design-best-practices/
  2. A bit longer and more formal: https://cloud.google.com/apis/design/
  3. On the differences between RPC and REST: https://www.smashingmagazine.com/2016/09/understanding-rest-and-rpc-for-http-apis/

Some things are good ideas for any API. The goal of most of them
is to make it easy for your user (often yourself!) to guess what
something does and how to use it without having to look at docs.

## Consistent Method Naming

The names of your methods should use the same structure and
same words as much as possible.

There are a couple variations on the words and structures. Pick one
option from each section below.

Remember: Consistency in style is often more important than the
          actual chosen style.

### Tonight's Menu

#### Starters

Almost every API will need to implement a variety of CRUD operations;
these are the calls that, at the most basic level, manipulate your data.

CRUD stands for "Create, Read, Update, Delete," leading to two main
schools of thought for your verb for Read.
(https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)

  - Read: this sticks to the acronym, but tends to have an overloaded
        meaning in the realm of programming.
  - Get: there is no "G" in CRUD, but in programming languages
        without common usage of Getters and Setters it usually is
        unambiguous. **Chef's Recommendation**
        (https://en.wikipedia.org/wiki/Mutator_method)
  - (Unusual) Fetch: this has the nice implication that the call
        will require some external resource and may
        not be instantaneous, however in the context
        of an API that implication is already present.


#### Mains

Most API calls will operate on your data model and as such have a
data type (possibly abstract) associated with them. This data type
should be explicit and clear in the method call, as should the verb
that describes the operation that will take place.

The framework you use may impose some specific requirements on you,
but the three options here are:

  - Object-Verb (eg ClusterGet): has the benefit of providing
        a soft namespace for your methods, has the negative of
        sounding backwards, works passably well when dealing with
        multi-datatype calls (eg ClusterGetFromCloud)
  - Verb-Object (eg GetCluster): easily pronounced and intuitive,
        requires reading the second word every time to get the
        data type, best option for multi-datatype calls
        (eg GetClusterFromCloud). **Chef's Recommendation**
  - Object.Verb (eg Cluster.Get): a common pattern amongst certain
        types of frameworks that impose ORM-style methods, not
        recommended as it tends to add an additional level of hiding
        methods, becomes ambiguous when a call deals with multiple
        data types (eg Cluster.GetFromCloud vs Cloud.GetCluster)

#### Desserts

In addition to dealing with single objects, as shown above, you'll
probably have to return a list of objects at some point, at which
point congratulations! You've reached a major bikeshedding moment!
(https://en.wikipedia.org/wiki/Law_of_triviality)

  - Singular (eg ClusterGet, ListCluster, Cluster.Update):
      tends to cause problems for calls that return multiple objects.
  - Plural (eg ClustersGet, ListClusters, Clusters.List)
      tends to cause problems for Verb-Object single returns.
  - Both (eg ClusterGet, ListClusters, doesn't work for Object.Verb)
      doesn't work at all for Object.Verb, seems less consistent,
      intuitively sounds better to say. **Chef's Recommendation**

#### A la Carte
Some other small battles:

*By or For:*
  - ListClustersForCloudID: mildly implies an ownership relationship
    of first datatype by the second datatype.
  - ListClustersByCloudID: simple reference to which index will be
    used. **Chef's Recommendation**

*Datatype or DatatypeID:*
  - ListClustersByCloud: ambiguous, requires user to know which
    field in cloud is a primary key.
  - ListClustersByCloudID: explicitly denotes the field on the
    second datatype. **Chef's Recommendation**

Some additional things to mix into your meal:
  - For List calls indexed on the same datatype, use the field
    name, eg. ListCLustersByName.
  - Don't use List in the name of your datatype, especially not if
    you chose Object-Verb-Singular.



## Consistent Datatype Naming

Hopefully everybody chose a meal they enjoyed above. Let's get into
the ingredients.

Here's the recommended definition of a variety of common property
names:

  - ID: This is the unique, opaque, immutable, primary key of this
      datatype. It will be used for all internal referencing.
  - Name: This is a unique-within-its-container string. Can be kept
      mutable as long as ID is used for all references. By
      unique-within-its-container we mean if a project always belongs
      to a user then the project name need only be unique amongst
      the other projects owned by that user. Lowercase.
  - DisplayName: A version of Name that does not need to be lowercase.
  - *Datatype*ID: This is a reference to another datatype's ID field.
  - CreatedAt: This is a timestamp of when the data was created, in
      RFC3339 format ("2006-01-02T15:04:05Z07:00").
  - UpdatedAt: Same as CreatedAt but indicates when the data was last
      updated.
  - *Verb*At: Same as CreatedAt but indicates when the verb was performed.
  - URL: For a public API, the full url to this resource, including
      scheme.
  - *Noun*URL: A full url including scheme.
  - *Datatype*: A field named after a datatype. Implies an embedded
      object of that datatype.


## Avoid Nesting in Requests

Where possible avoid forcing users to create multi-level nested
objects when interacting with the API.

  - They tend to lead to much additional documentation searching,
    as often the nested datatypes are not defined in the same place
    as the main datatype or request.
  - On the server side, the complexity of verifying the request
    increases quite a bit.
  - On the user side, the scope of possible errors increases
    substantially.
  - For public APIs, many tools allow rapidly constructing simple
    JSON requests from the command-line, but nested json is more
    difficult or requires manual generation in a file.

Instead, for many situations, you can create additional API calls.

For example, instead of updating the nodes for a cluster in the same
call as you might update its name:

```
  UpdateCluster({
    cluster: {
      id: $clusterID,
      name: "cluster1",
      nodes: [
        {id: $node1, name: "main"},
        {id: $node2, name: "replica"},
      ],
    }
  })
```


You can:

```
  UpdateClusterNodes({
    id: $clusterId,
    nodes: [
      {id: $node1, name: "main"},
      {id: $node2, name: "replica"},
    ]
  })
```

Or:

```
  AddNodeToCluster({
    clusterID: $clusterID,
    node: {id: $node2, name: "replica"},
  })

```

## Embed Objects in Responses

Where possible, try to minimize the work your user has to do
and the number of calls they make to your API. You can help
that greatly by embedding objects in your responses.

A common scenario for this is in situations where you would return
an ID reference to another datatype. In those cases embed an
expanded version of the referenced object.

For example, instead of returning:
```
  {
    cluster: {
      id: $clusterID,
      cloudID: $cloudID,
    }
  }
```

You can expect that your user is likely to want the information
about the Cloud as well, and return:

```
  {
    cluster: {
      id: $clusterID,
      cloudID: $cloudID,
      cloud: {
        id: $cloudID,
        name: "the_cloud",
      },
    }
  }
```

## Use Objects in Updates and Responses

For your Update calls, eg. UpdateCluster, your requests should look
like:
```
  {
    cluster: $MyCluster,
  }
```
This allows you to reuse the same Cluster definition everywhere in
your codebase, and prevents having to duplicate field names and
definitions in your request object.

Likewise, name the returned object rather than mashing its keys into
the response object itself.

This has the benefit of being predictable, and allowing the results
of Get calls to easily be used in Update calls.

## Call Out the Exceptions to Your Rules

Your choices in naming of your methods and datatypes is your style
guide. Treat it with some reverance, accept it, and when you have
to make an exception to how your methods or requests or responses
are built, make it very obvious and very documented.

Example (pseudocode),
```
  // StreamClusterLogs is a streaming interface for the cluster
  // logs.
  // NOTE(termie): This requires a different call structure to
  //               support the streaming interface.
  //               Please see the additional streaming API docs
  //               At https://example.com/docs/api/streaming
  func StreamClusterLogs(clusterID, writer) {
    ...
  }
```


# Conclusion

A common refrain about APIs is the robustness principle
(https://en.wikipedia.org/wiki/Robustness_principle), summed up as

  "Be conservative in what you send, be liberal in what you accept."

A good corollary to that is

  "Be predictable in what you accept and what you send."

The most common mistake when interacting with an API is caused by
the user's ignorance of the shape of the request or response. We
all have to keep so much information in our head when interacting
with somebody else's (or your own from two weeks ago) code. Write
your APIs to make it easy on them (or yourself):

  1. Use a consistent vocabulary. (Reduce)
  2. Do the same things the same way. (Reuse)
  3. Make exceptions to your rules extremely obvious. (Ridicule?) (Recognize?)



#### License
Copyright (c) 2018, Oracle and/or its affiliates. All rights
reserved.

This content is licensed under the Universal Permissive
License 1.0.

See LICENSE.txt for more details.
