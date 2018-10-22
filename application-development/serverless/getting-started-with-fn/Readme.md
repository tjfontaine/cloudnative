Cloud native development encompasses a continually evolving set of practices and emerging technologies. Container workflows have become commonplace, leveraging Kubernetes to abstract infrastructure resources and deploy and scale complex systems with relative ease.

The advent of Serverless provides even more powerful abstractions and promises potentially greater efficiencies, leveraging the same underlying cloud native technologies. With Serverless, we abstract resources one step further, allowing teams to simply write and push code. The platform takes care of building, deploying and scaling our software for us.

Beyond abstraction and increased simplicity, there are other reasons to consider a Serverless architecture for your next development project.

* Event-driven, modular architecture promoting cloud development best practices
* Transparent and limitless scaling, up to meet demand and back down to zero when demand rolls off
* Pay only for execution time in blocks of 100ms, never for pay for idle time
* Simplifies pivoting to emerging best-in-class solutions for dependency resolution

With these considerations in mind, what solution is best? We need something that is easy to deploy, integrates well with other cloud native standard technologies and is open and free of vendor complexities.

[The Fn Project](http://fnproject.io) is an open source, cloud-agnostic container native serverless platform that runs anywhere, on any cloud or on-premises. It’s easy to use, is performant and is very extensible. All major programming languages are supported, and since it is based upon containers, it's easy to add support for more.

Fn is a container native platform, meaning containers are primitives in Fn. They are used to build, package and deploy functions on the platform. Languages are supported through the Fn FDK, with support for Java, Go, Python, Ruby, Node.js, and others off the shelf. The FDK is easily leveraged to create support for any language at all.

When using Fn, we create and deploy functions. In the context of Fn, a function is a small bit of code which ideally does one thing. Fn functions take their input from STDIN and return output to STDOUT, while anything sent to STDERR is sent to logging. It's best to consider deploying an application as a set of single-intent functions which all work together. This follows Serverless and Microservices methodology best practices. However, don't be afraid to break the rules. Ultimately, what works best for you is what works best.

The Fn Project consists of a number of elements. In our tutorial, we'll get started by working with the Fn client and server locally, then deploy the server on a Kubernetes cluster. For more advanced concepts, check out the project's [documentation](https://github.com/fnproject/fn/blob/master/docs/README.md) and [tutorial](http://fnproject.io/tutorials/) sections.

### Prerequisites

To run through this tutorial, you will need:

* A Linux or MacOS environment where you have admin rights
* Access to the internet
* An Oracle Cloud account
