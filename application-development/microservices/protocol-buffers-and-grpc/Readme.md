We live in an API economy. APIs are the backbone of modern applications and power communication between applications regardless of technology and platform. If you're like me, when you think about building web-based API's, your first go to tends to be RESTful APIs along with JSON as the standard for interchanging data between applications. This approach is a well-trod path and absolutely fine, but now we’re building applications for a cloud-native era where our Microservices should be able to serve on a massive scale, our developers are polyglot, and our tooling is seemingly infinite. Oh, and let's not forget that performance is more critical than ever. 

So, do JSON and RESTful APIs and the like pass muster? In these guides, we will talk you through how to use and understand Protocol buffers and gRPC and most importantly, when and if you should use them. 

### A Little More Information on Protocol Buffers and gRPC Specifically

**gRPC** is a high performance, open-source remote procedure call (RPC) framework that makes it easier to build connected systems. The motivation and design principle of gRPC is available [here](http://www.grpc.io/blog/principles). gRPC follows HTTP semantics over HTTP/2 and allows you to build services with both a synchronous and asynchronous communication model. It supports traditional Request/Response model and bidirectional streams with apparent ease. 


**Protocol Buffers (Protobuf)** is the default serialization format for the data sent between clients and servers. The encoding allows for small messages and quick decoding and encoding. Unlike other serialization formats like JSON or XML, protobuf tries to minimize the overhead of encoding by providing strongly-typed fields in an encoded binary format that's quick and predictable. 



### Prerequisites

1. Install protoc `brew install protobuf`
