# Setting up Identity and Access Management on OCI Using Terraform

## Defining Our Infrastructure

The file `variables.tf` defines the Terraform environment input variables that needed for our configuration. In this file, we see variables such as the OCID of our tenancy and our user, as well as the fingerprint of our key and the region to which we will be deploying our infrastructure.

#### variables.tf
```
variable "tenancy_ocid" {}
variable "user_ocid" {}
variable "fingerprint" {}
variable "region" {}
variable "private_key_path" {}
```

The `main.tf` file initialzes our input variables. Terraform will either read this from environment variables or from the `variables.tf` file if hard-coded there.

First, we set up the OCI provider with these variables. Second, we create our first user and store this in a variable named `user1` In this example, the name of our user is `Alice` In the next statement we set her password.

Next, we want to define a compartment for our user to operate in. We will call it `terraform_compartment`.

We then create a group and store that as a variable `group1` in our Terraform script. In this example the name of the compartment is "Developers". 

Finally, we add our user, Alice, to our Developers team.

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

Now we are ready to apply our configuration. First, we run `terraform plan` to review the changes Terraform will make to our infrastructure, which includes the resources that will be created.

```
terraform plan
```

After confirming the configuration is good to go, we can create our resources by running:

```
terraform apply
```

Now you can look at the OCI dashboard to see the result of your Terraform script! 

## Clean Up
After finishing this test we should clean up after ourselves. Now that we have confirmed our script works we can destroy our created resources by issuing the following command:

```
terraform destroy
```

## Conclusion

Terraform is a powerful way to maintain your infrastructure resources. Through Terraform you can codify, version, and automate your infrastructure. Terraform is highly extendable through plugins allowing you to create cloud resources that go beyond infrastructure in a repeatable and programmatic way.

### More in This Series

* [Installing Terraform for Oracle Cloud Infrastructure](Readme.md)
* [Installing Kubernetes on Oracle Cloud Infrastructure via Terraform](KubernetesWithTerraform.md)


