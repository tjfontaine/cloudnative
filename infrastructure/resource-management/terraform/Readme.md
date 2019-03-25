# Installing Terraform for Oracle Cloud Infrastructure

Welcome to our Kubernetes on OCI with Terraform series. This overview walks you through the steps you need to start using Terraform to manage resources on Oracle Cloud Infrastructure.

You can learn more about the capabilities of the terraform provider for Oracle Cloud Infrastructure here: https://github.com/oracle/terraform-provider-oci/#terraform-provider-for-oracle-cloud-infrastructure

**Note:** As you're following these steps, pay attention to the version of Terraform and the OCI Terraform Provider you are using. The OCI Terraform Provider describes the versions of Terraform it is compatible with on its GitHub page: https://github.com/oracle/terraform-provider-oci.

## What is Terraform?

[Terraform](https://terraform.io) is an open source automation toolchain and orchestration language (HCL) for cloud infrastructure. It was created by Hashicorp and features a plugin model for different infrastructure providers. It treats "infrastructure as code," meaning resources can be provisioned in a repeatable and reliable fashion. Because the code can be version controlled it can be leveraged in modern continuous integration and deployment practices.

## Key OCI Concepts Covered in This Series

Let's go over the fundamental concepts of OCI which you will need for this tutorial:

* User - a person or machine account which has a unique ID
* Group - logical grouping of users, for instance "developers" or "operators"
* Compartment - a logical grouping of resources, for instance by line of business or project
* Tenancy - organization and top-level or root compartment

## Prerequisites

### Install Package Managers and Utilities

You can always install Terraform by following the instructions and downloading the package for your OS directly from Hashicorp's site at: https://www.terraform.io/intro/getting-started/install.html.

This section provides instructions for performing Terraform installation using the package management tools. Be cognizant of the version you install.

Regardless of the operating system you are installing Terraform on, be sure to confirm your installation is functioning properly by performing the "Test Installation" step at the end of this section.

#### MacOS
If you don't have a package manager we recommend that you install Homebrew.<br/>
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Install Terraform via Homebrew.<br/>
`brew install terraform`<br/>

#### Windows
Install Terraform via chocolatey.<br/>
`choco install terraform`<br/>

##### For Powershell
`Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`

##### For CMD
`@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`

#### Oracle Linux
You can install Terraform via yum:
`sudo yum install terraform`

#### Ubuntu
You can install Terraform via snap:
`sudo snap install terraform`

#### Test Installation
Regardless of your chosen OS, you can check to make sure Terraform installed properly by running: `terraform version`<br/>

**Note:** It is important to run this command, so Terraform will set up some directories it needs. Run this before setting up the provider further down in this prerequisites section.

## Configure OCI variables (optional)
It is useful to set the information Terraform will use to interact with OCI as environment variables.  By saving this information in environment variables, you will be able to use this environment with Terraform without having to supply this information every time you run a command such as `terraform plan` or `terraform apply`.

Note: The "private_key_path" in this section is the key used to access the OCI API. Instructions for setting up this key for OCI can be found [here](https://docs.cloud.oracle.com/iaas/Content/API/Concepts/apisigningkey.htm)

#### MacOS / Oracle Linux / Ubuntu

Set the following variables in your bash_profile.<br/>
`export TF_VAR_tenancy_ocid=<This OCID identifies the tenancy where you want terraform to manage resources. This information can be found in the "Identity" section of the OCI console.>
export TF_VAR_user_ocid=<This OCID indicates the user you want terraform to use to manage resources. You may want to consider creating a user specifically for terraform.>
export TF_VAR_compartment_ocid=<The tenancy OCID can be used as the compartment OCID of your root compartment>
export TF_VAR_fingerprint=<This fingerprint is used by OCI to indicate which key OCI should expect to be used for access to the OCI API.  You can find the fingerprint in the "Identity" section of the OCI console.>
export TF_VAR_private_key_path=<This should be the fully qualified path to the key you will be using for terraform to interact with the OCI API.>
`

If you already set up the OCI CLI, you can find `TF_VAR_fingerprint` and `TF_VAR_private_key_path` in `~/.oci/config` file under `fingerprint` `key_file` variables.

If you plan on using these credentials with Terraform in the future, you may want to set these variables in your `~/.bash_profile` file.  Once you've set these values in your bash profile, you can use them by opening a new terminal or by sourcing your profile changes `$ source ~/.bash_profile`

#### Windows

Export your credentials for use by the OCI Terraform Provider.<br/>
`setx TF_VAR_tenancy_ocid <value>
setx TF_VAR_user_ocid <value>
setx TF_VAR_compartment_ocid <value>
setx TF_VAR_fingerprint <value>
setx TF_VAR_private_key_path <value>`


## Testing
At this point, you should be able to deploy Terraform templates designed for use with Oracle Cloud Infrastructure. There are a variety of open source templates available for you to get started with.

For a simple test, run one of the templates from the [examples](https://github.com/oracle/terraform-provider-oci/tree/master/docs/examples) folder in the terraform-provider-oci project on GitHub.

A good place to start is with the [virtual cloud network example](https://github.com/oracle/terraform-provider-oci/tree/master/docs/examples/networking/vcn). This example contains a simple vcn.tf file that can be used to provision a virtual cloud network in your OCI environment.

Once you have the `vcn.tf` file you can begin to run Terraform commands:   

```
Change to the directory of your vcn example:
$ cd doc/examples/networking/vcn

Initialize the plugin for this template directory:
$ terraform init

Run the plan command to see what will happen:
$ terraform plan

If the plan looks right, apply it:
$ terraform apply
```
You will be able to see the newly created VCN by navigating to the networking portion of the OCI console and choosing the region and compartment specified in your variables and vcn.tf file.

```
When you are done with the test, you can delete the resources you created by running:
$ terraform destroy
```

Another good example to explore is this one "Manage instances with multiple attached volumes" example. You can find instructions for running this example in the [docs/compute/instances](https://github.com/oracle/terraform-provider-oci/tree/master/docs/examples/compute/instance) folder.
