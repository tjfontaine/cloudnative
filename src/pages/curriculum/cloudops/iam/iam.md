---
title: "Setting up Identity and Access Management on OCI using Terraform"
date: "2018-06-04T00:00:00.000Z"
path: "/cloudops/iam"
curriculum: "Cloudops"
---

This article will describe how to set up users, policies and access
management using the open source tool Terraform across different
OCI resources.

## What is Terraform?

[Terraform](https://terraform.io) is an open source automation toolchain and 
orchestration language (HCL) for cloud infrastructure. It was created by 
Hashicorp and features a plugin model for different
infrastructure providers. It treats "infrastructure as code", meaning
resources can be provisioned in a repeatable and reliable fashion, and
as the code can be version controlled, it can be leveraged in modern
continuous integration and deployment practices.

## Key OCI Concepts

First, lets go over the fundamental concepts that make up OCI:

* User - a person or machine account which has a unique id
* Group - logical collection of users. For instance "developers" or "operators" consisting of multiple users.
* Compartment - Whereby a group is a logical group of users, a compartment is a logical grouping of resources
* Tenancy - organization and top level or root compartment

## Prerequisites
FOLLOW ALONG WITH TERRAFORM INSTALLATION ARTICLE

## Defining our infrastructure

The file `variables.tf` defines the Terraform environment input variables that we need for our configuration. In this file, we see variables such as the id of our tenancy on OCI and our user, as well as the fingerprint of our key and the region we will use for our infrastructure.

#### variables.tf
```
variable "tenancy_ocid" {}
variable "user_ocid" {}
variable "fingerprint" {}
variable "region" {}
variable "private_key_path" {}
```

Our `main.tf` file initialzes our input variables. Terraform will either read this from environment variables or from the `variables.tf` file if hard-coded there.

First, we set up the OCI provider with these variables. Second we create our first user, and store this in a variable named `user1`. The name of our user is Alice and in the next statement we set the password for her.

Next, we want to define a compartment that our user can operate in, we give it the name `terraform_compartment`.

We then go on to create a group, and store that as a variable `group1` in our Terraform script. The name of the compartment is "Developers. Finally, we add our user Alice to our Developers team.

#### main.tf
```
provider "oci" {
  tenancy_ocid          = "${var.tenancy_ocid}"
  user_ocid             = "${var.user_ocid}"
  fingerprint           = "${var.fingerprint}"
  private_key_path      = "${var.private_key_path}"
  region                = "${var.region}"
}

resource "oci_identity_user" "user1" {
  name = "Alice"
  description = "Alice created by Terraform"
}

resource "oci_identity_ui_password" "verysecret" {
  user_id = "${oci_identity_user.user1.id}"
}

# create compartment
resource "oci_identity_compartment" "compartment1" {
  description = "Compartment created via Terraform"
  name = "terraform_compartment"
}

resource "oci_identity_group" "group1" {
  name = "developers"
  description = "developer group created by terraform"
}

resource "oci_identity_user_group_membership" "user-group-mem1" {
  compartment_id = "${var.tenancy_ocid}"
  user_id = "${oci_identity_user.user1.id}"
  group_id = "${oci_identity_group.group1.id}"
}
```

## Applying our configuration

We are now ready to apply our configuration. First we run `terraform plan` to review the changes Terraform will make to our infrastructure, including the resources that will be created.

```
terraform plan
```

With the configuration good to go, we can now create our resources:

```
terraform apply
```

Now have a look at the OCI dashboard and see the result of your Terraform plan! 

## Cleaning up
We should clean up after ourselves, and now that we have a working script we can destroy our created resources by issueing the following command:

```
terraform destroy
```

## Conclusion

Terraform is a powerful way to maintain your infrastructure resources. Through Terraform you can codify, version and automate your infrastructure. Terraform is highly extendable through plugins allowing you to create cloud resources programmatically that go beyond infatrastructure.

