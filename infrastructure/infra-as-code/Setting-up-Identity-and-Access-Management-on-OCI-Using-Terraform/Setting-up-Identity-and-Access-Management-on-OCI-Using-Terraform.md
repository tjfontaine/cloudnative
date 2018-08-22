# Setting up Identity and Access Management on OCI Using Terraform

By Micha Hernandez van Leuffen

## Overview 

Welcome to our Kubernetes on OCI with Terraform series. This article describes how to set up users, policies and access
management using the open source tool Terraform across different
OCI resources

## What is Terraform?

[Terraform](https://terraform.io) is an open source automation toolchain and orchestration language (HCL) for cloud infrastructure. It was created by 
Hashicorp and features a plugin model for different
infrastructure providers. It treats "infrastructure as code," meaning
resources can be provisioned in a repeatable and reliable fashion, and
as the code can be version controlled, it can be leveraged in modern
continuous integration and deployment practices.

## Key OCI Concepts Covered in This Series

First, let's go over the fundamental concepts that make up OCI:

* User - a person or machine account which has a unique id.
* Group - logical collection of users. For instance "developers" or "operators" consisting of multiple users.
* Compartment - Whereby a group is a logical group of users, a compartment is a logical grouping of resources.
* Tenancy - organization and top-level or root compartment.

## Prerequisites

Please refer to [this installation article.](https://gitlab-odx.oracledx.com/cloudnative/devcenter/blob/master/content/terraform/Installing-Terraform-for-Oracle-Cloud-Infrastructure.md)

## Defining Our Infrastructure

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

First, we set up the OCI provider with these variables. Second, we create our first user, and store this in a variable named `user1`. The name of our user is Alice and in the next statement we set the password for her.

Next, we want to define a compartment that our user can operate in. We give it the name `terraform_compartment`.

We then create a group, and store that as a variable `group1` in our Terraform script. The name of the compartment is "Developers". Finally, we add our user, Alice, to our Developers team.

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

## Applying Our Configuration

We are now ready to apply our configuration. First, we run `terraform plan` to review the changes Terraform will make to our infrastructure, including the resources that will be created.

```
terraform plan
```

With the configuration good to go, we can now create our resources:

```
terraform apply
```

Now look at the OCI dashboard and see the result of your Terraform plan! 

## Cleaning up
We should clean up after ourselves, and now that we have a working script we can destroy our created resources by issuing the following command:

```
terraform destroy
```

## Conclusion

Terraform is a powerful way to maintain your infrastructure resources. Through Terraform you can codify, version and automate your infrastructure. Terraform is highly extendable through plugins allowing you to create cloud resources programmatically that go beyond infrastructure.

### More in this series

* [Installing Terraform for Oracle Cloud Infrastructure](https://gitlab-odx.oracledx.com/cloudnative/devcenter/blob/master/content/terraform/Installing-Terraform-for-Oracle-Cloud-Infrastructure.md)
* [Installing Kubernetes on Oracle Cloud Infrastructure via Terraform](https://gitlab-odx.oracledx.com/cloudnative/devcenter/blob/master/content/kubernetes/Installing-Kubernetes-on-Oracle-Cloud-Infrastructure-via-Terraform.md)


#### License

Copyright (c) 2018, Oracle and/or its affiliates. All rights
reserved.
This content is licensed under the Universal Permissive
License 1.0.
