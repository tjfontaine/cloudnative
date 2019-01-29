# Intro
This guide has been created to help Kubernetes users consider whether or not they would benefit from using nnaennaker in their deployments. This solution runs through the workflow of setting up an example application deployment with Spinnaker.

# Business case
Deploying software in a predictable and deterministic way has never been more critical than now. While you could say that software deployments have become easier over the last years. In practice, however, there is now so much choice out there, it’s hard to see the wood for the trees.
Spinnaker is an open source CD platform built by Netflix and backed by large tech companies like Google, Microsoft, and our good selves, Oracle.

It’s been described as “battle-tested in production” and is said to power over 4,000 deployments a day at Netflix. Now, with sleep being Netflix’s main competitor, it’s probably pretty safe to say that Spinnaker is the reason we (the 100 million users worldwide) can binge tv shows and that the above numbers are largely accurate.

One of the great things about Spinnaker is that it takes advantage of the existing Jenkins ecosystem and uses Jenkins behinds the scenes. Spinnaker has full support for controlling a Jenkins instance via its API and starting and monitoring Jenkins jobs is transparent to the Spinnaker user.
In short, Spinnaker takes advantage of your existing Jenkins installation with all its different plugins and existing configuration and makes it better.

Before we get to the good technical bits, here are some business reasons you might want to store in your back pocket to bring out at crucial times in meetings (if you do decide to go ahead with Spinnaker). 
* Spinnaker can help reduce the risk of bad deployments - costing money and person-hours, which also cost money.
* Spinnaker can help your company gain a competitive advantage - the more you automate, the more time you can spend building some great features and reducing that technical debt you acquired during your crazy growth stage.

# Audience
But perhaps most importantly, increase your job satisfaction. Sickness and apathy are the most significant costs to any business, and if you’re unhappy because you are manually doing tedious tasks that can and should be automated (while other deadlines pile up), then the business gets hurt too.

Some things that Spinnaker does well; easy rollbacks, different deployment strategies, automated canary analysis, automated clean up via a pipeline trigger, manual judgment stage, check precondition stage and Chaos Monkey uses the Spinnaker API to do its business.

# Prerequisites
This solution assumes you already have access to Oracle Kubernetes Engine (OKE).