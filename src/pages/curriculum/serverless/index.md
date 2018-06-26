---
title: "An Introduction to Serverless"
date: "2018-06-04T00:00:00.000Z"
path: "/serverless"
curriculum: "Serverless"
---

What is serverless? A quick [insert name of search engine here] throws up definitions like this one: 
"Serverless computing is an event-driven application design and deployment paradigm in which computing resources are provided as scalable cloud services. In traditional application deployments, the server’s computing resources represent fixed and recurring costs, regardless of the amount of computing work that is being performed by the server. In a serverless computing deployment, the cloud customer only pays for service usage; there is never any cost associated with idle, or down-time."  
The above has been paraphrased from various explanations found on the internet that come up in response to "what is Serverless." It seems straightforward enough, but if that is the case, then why is it that when asked, every person/article has a different answer? 
In this digested read we introduce you to Serverless computing, and how it may figure in your life by:  
*	Going over the difference between Serverless and Serverless.
*	Describing where Functions-as-a Service (FaaS) fits concerning PaaS and Containers. 
*	Exploring the benefits (cheaper) and drawbacks (testing, discovery, monitoring/debugging) of FaaS  
*	Seeing how FaaS/Serverless can be used in the "real world".
*	Suggesting what you might recommend to your manager and team. 

## Serverless Vs. Serverless  
The term Serverless started gaining momentum around 2015, although some reports suggest that it was being whispered about in the corridors of The Valley as early as 2012.  As you can see in this line graph below, there is a real uptick in interest for Serverless around 2014 which is likely in response to AWS Lambda’s launch.

 

And if this line graph is anything to go by, pioneers were talking Serverless in 2004, but you see, therein lies the catch! As Martin Fowler puts it: 
"Like many trends in software there’s no one clear view of what Serverless is, and that isn't helped by it really coming to mean two different but overlapping areas."  
He writes that "Serverless was first used to describe applications that significantly or fully depend on 3rd party applications/services in the cloud to manage server-side logic and state. Think single page web apps or mobile apps that use the vast ecosystem of cloud accessible databases (like Parse, Firebase), authentication services (Auth0, AWS Cognito), etc." This is likely what those guys in 2004 were searching for... and "Serverless is where the application developer still writes some amount of server-side logic but unlike traditional architectures, it is run in stateless compute containers that are event-triggered, ephemeral, and fully managed by a 3rd party." 
In short, there is Serverless that has products that fall into categories like BaaS, AaaS, and CaaS where organizations building and supporting a Serverless application are not looking after the hardware or the processes; that part is outsourced to a vendor.  Then there is Serverless computing closely associated with FaaS, which is defined by stateless compute containers and modeled for an event-driven solution. Or in plain English, products that allow developers to execute code in response to events. However, note that I wrote, closely associated with FaaS.  Serverless can also be about architectures; a Serverless Architecture could be described as an event-driven system that uses FaaS and other fully managed services for logic and persistence. 
In fact, a wise man (Kelsey Hightower) once said, "to fully appreciate the Serverless movement in all its colors you first have to understand the role event-driven architecture (EDA) plays in modern computing and then shift your thinking away from applications and towards inputs and outputs represented by events, and behavior represented by functions."
 
Lumping this "second Serverless" together with FaaS (which you see a lot of out there) or calling a compute product Serverless because it is fully managed kinda misses the point.  
So you see, that quick "what is Serverless" look up that we described earlier only shows us one side of the coin and is fixated on the deployment and cost aspect of Serverless and does not go a long way toward untangling what Serverless is, isn't, and could be construed as.  

## Where does FaaS fit with PaaS, Containers? 

In this section, we're going to focus on FaaS, which if you remember from above is the thing that is usually called Serverless (but isn't).
Vs. PaaS 

One of the operational differences between FaaS and PaaS is scaling. In traditional PaaS, scaling is done at the entire application level. Implementations typically do not have automated scaling and require server-side applications always to be running so that requests can be served. With FaaS, you compose your application into individual, autonomous functions that start when you serve a request and then terminate when the request is processed. Now, before I see pitchforks, you can setup your PaaS application to auto-scale, but you likely won’t be doing this to the level of individual requests. In other words, PaaS applications are not geared towards bringing entire applications up and down for every request, whereas FaaS platforms do exactly that. Because each function is hosted by the FaaS provider and can be scaled automatically as function call frequency increases and vice versa, you can find yourself with a pretty cost-effective way of paying for compute resources. You only pay for the times that your functions get called, rather than paying for resources while your application is always on, waiting for requests. (This, BTW, is what that earlier Serverless definition really hinged on, but we know better now.) 

### Vs. Containers

There are arguments out there that speak to the general maturity of both technologies. Whilst some folk maintain that the differences between PaaS and FaaS are the same as the differences between containers (namely Docker) and FaaS (mainly scaling), there is an inherent similarity between containers and Serverless. As for scaling, Kubernetes allows for the automated scaling of containers using application-provided metrics (such as number of concurrent requests), and AWS Lambda runs a container for each function.
However, a container-based application can be as large and as complex as you want. You can refactor an extensive monolithic application into container-based microservices (with relative ease). If you tried to refactor the same application to run on a serverless platform with FaaS, you'd likely have some issues with memory and size. In addition to this, with containers, you have control of individual containers and their ecosystem which helps with comprehensive debugging and testing, etc. Which brings us nicely to our next section. 

## Strengths and weaknesses

FaaS can reduce the complexity of software making it simple and low maintenance. It fits nicely with microservices, which can be implemented as functions and can be cheaper because you typically pay only for the actual time and volume of traffic used.   
However, as seen in the "Vs. Containers" section above, you can't just lift and shift. I mean, you can't just lift and shift anything, but with FaaS it becomes a lot more complex, and size becomes an issue. Vendor lock-in is a thing since you are using 3rd parties that are at this stage not interchangeable and with these multiple vendors come security issues (each vendor increases the surface of your security implementations). Monitoring is troublesome, service discovery a pain (this is where the mature API gateways of PaaS come in), some FaaS implementations do not provide out-of-the-box tools to test functions locally, and it's not always guaranteed to be a money-saving option. There are certain workloads that require substantial compute resources, which makes the Serverless model less cost-effective. Maybe see how you can optimize your current stack.    

Having said that, there are some current use cases that are perfect for FaaS that you can try today. 

## FaaS/Serverless in the real world 

*	APIs: go forth and create REST APIs that return data to be consumed by either another service or by a single-page application. 
*	Serve up static content: images, audio, or HTML pages that aren't modified by an application. 
*	 Clean up, parse, and filter incoming data streams and uploads from real-time devices.
*	Move data to long-term storage.

## What to tell your manager

In short Serverless/FaaS can't entirely replace PaaS or containers, and be wary of anyone who says it will replace all existing architectures or be the dominant architecture of the future. There is no one size fits all approach to anything (link to microservices article). The difference comes in the use cases; make sure that Serverless fits yours. There are a lot of pain points with current Serverless/FaaS offerings, especially for enterprise applications (security is a biggie). But these will be solved. In the meantime, it may be that containers and orchestration provide an efficient way to implement FaaS while FaaS provides an additional abstraction level that hides specific processes, operating systems and containers from developers, allowing them to focus on code which is always a step in the right direction. Now that you know what to say check out the Oracle Fn repo (link) to start you Fn journey!  
