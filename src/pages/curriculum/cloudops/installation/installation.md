---
title: "Installing Terraform for Oracle Cloud Infrastructure"
date: "2018-06-04T00:00:00.000Z"
path: "/cloudops/terraform-installation"
curriculum: "Cloudops"
---

This post will walk you through the steps you need to start using terraform to manage resources on Oracle Cloud Infrastructure. Both getting terraform up and running on a Mac, Windows, or Ubuntu system - and installing the OCI Terraform Provider.


Note: As you're following these steps, pay attention to the version of Terraform and the OCI Terraform Provider you are using. The OCI Terraform Provider describes the versions of Terraform it is compatible with on its github page: https://github.com/oracle/terraform-provider-oci.


## Pre-Reqs

### Install Package Managers and utilities

#### Mac
Install Homebrew.<br/>
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

#### Windows
Install Chocolatey.
##### For Powershell
`Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`
##### For CMD
`@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`

#### Ubuntu
Install unzip and snap.<br/>
`sudo apt-get install unzip
apt-get install unzip`

## Install Terraform
Note, you can always install Terraform by following the instructions and downloading the package for your OS directly from hashicorp's site at: https://www.terraform.io/intro/getting-started/install.html.

This section will go over the instructions for performing terraform installation using the package management tools described earlier. Be cognizant of the version you're downloading!

### Mac
Install terraform via Homebrew.<br/>
`brew install terraform`<br/>
Check to make sure Terraform installed properly.<br/>
`terraform version`<br/>
NOTE: It is important to run this command so terraform will set up some directories it needs. You will need to run this before setting up the provider in the next step.

### Windows
Install terraform via chocolatey.<br/>
`choco install terraform`<br/>
Check to make sure Terraform installed properly.<br/>
`terraform version`<br/>
NOTE: It is important to run this command so terraform will set up some directories it needs. You will need to run this before setting up the provider in the next step.

### Ubuntu
You can go to hashicorp's site to get the most recent version of terraform, and then use wget to download that most recent version directly from hashicorp. An example of this is given below. The most recent version at the time of writing is 0.11.7.<br/>
`wget https://releases.hashicorp.com/terraform/0.11.7/terraform_0.11.7_linux_amd64.zip`<br/>
Once you have downloaded Terraform, run commands similar to the following (but for your version of Terraform) to install Terraform by unzipping the package and moving it to usr/local/bin.<br/>
`unzip terraform_0.11.3_linux_amd64.zip
sudo mv terraform /usr/local/bin/`<br/>
Check to make sure Terraform installed properly.<br/>
`terraform version`<br/>
NOTE: It is important to run this command so terraform will set up some directories it needs. You will need to run this before setting up the provider in the next step.

## Install the OCI Terraform Provider
Up-to-date instructions for installing the OCI Terraform Provider can also be found at https://github.com/oracle/terraform-provider-oci.  I have provided a summary of the instructions for each OS type in this step.

### Mac
1. Dowload the latest release of the OCI provider from here:<br/> https://github.com/oracle/terraform-provider-oci/releases.<br/> You're going to want to select darwin_amd64.tar.gz.
2. Create the following directory to store your plugin.<br/>
`mkdir -p ~/.terraform.d/plugins/`
3. Untar the downloaded OCI plugin.<br/>
`tar -xzvf ~/Downloads/darwin_amd64.tar.gz`<br/>
NOTE: This is assuming your downloads go to your download folder. If you have moved it elsewhere, use that location.
4. Move the plugin to your newly created terraform plugin directory.<br/>
`mv darwin_amd64/terraform-provider-oci_v2.1.7.terraform.d/plugins/`<br/>
5. Open the following file `~/.terraformrc` and add in the following lines telling it where to find the plugin.<br/>
`providers {
  oci = "<replace this with the full path to the terraform provider, i.e.: /home/ubuntu/.terraform.d/plugins/terraform-provider-oci_v2.1.1>"
}`<br/>
6. Set the following variables in your bash_profile.<br/>
`export TF_VAR_tenancy_ocid=
export TF_VAR_user_ocid=
export TF_VAR_compartment_ocid=<The tenancy OCID can be used as the compartment OCID of your root compartment>
export TF_VAR_fingerprint=
export TF_VAR_private_key_path=<fully qualified path>
`

If you already set up the OCI cli, you can find `TF_VAR_fingerprint` and `TF_VAR_private_key_path` in `~/.oci/config` file under `fingerprint` `key_file` variables.

### Windows
1. Download the latest release of the OCI provider from https://github.com/oracle/terraform-provider-oci/releases.  You may do this via Powershell using a command similar to the one below.  The command below downloads the most recent version at the time of writing, 2.1.7. Take note of the version you are downloading.<br/>
`Invoke-WebRequest -Uri http://github.com/oracle/terraform-provider-oci/releases/download/v2.1.7/windows_amd64.zip -OutFile C:\Users\kasli\AppData\Roaming\terraform.d\plugins\windows_amd`<br/>
2. Unzip the file you just downloaded. If you downloaded from the github repo via an internet browser, it should be in your "Downloads" folder. If you downloaded using the command above, you could unzip it with the command below.
<br/>`Expand-Archive -LiteralPath $env:APPDATA\terraform.d\plugins\windows_amd64.zip -DestinationPath$env:APPDATA/terraform.d/plugins`
3. Terraform uses a "terraform.rc" file to keep the locations of installed terraform providers. Create this file using:<br/>
`notepad $env:APPDATA/terraform.rc`<br/>
When you are prompted on whether or not you want to create this new file, select "Yes".<br/>
When Notepad opens, input the following text, depending on whether you intend to use Terraform with Powershell or CMD.
#### Powershell
`providers {
  oci = $env:APPDATA/terraform.d/plugins/terraform-provider-oci
}`
#### CMD
` providers {
  oci = "%appdata%/terraform.d/plugins/terraform-provider-oci"
} `<br/>
Save this file.
4. Export your credentials for use by the OCI Terraform Provider.<br/>
`setx TF_VAR_tenancy_ocid <value>
setx TF_VAR_user_ocid <value>
setx TF_VAR_compartment_ocid <value>
setx TF_VAR_fingerprint <value>
setx TF_VAR_private_key_path <value>`

### Ubuntu
1. Download the latest release of the OCI provider from https://github.com/oracle/terraform-provider-oci/releases.  You may do this via wget using a command similar to the one below.  The command below downloads the most recent version at the time of writing, 2.1.7. Take note of the version you are downloading<br/>
`wget https://github.com/oracle/terraform-provider-oci/releases/download/v2.1.7/linux_amd64.tar.gz`<br/>
2. To install the OCI Terraform Provider, untar the package and move it to a place on the PATH, as shown below.<br/>
`tar -xzvf linux_amd64.tar.gz
mv linux_amd64 ~/.terraform.d/plugins`<br/>
3. Terraform uses a ".terraform.rc" file to keep the locations of installed terraform providers. Create this file using the commands below.
* First, edit the ~/.terraform.rc file using something like<br/> `vi ~/.terraform.rc`<br/>
* Copy the following text into the file and save.<br/>
`providers {
  oci = "<replace this with the full path to the terraform provider, i.e.: /home/ubuntu/.terraform.d/plugins/terraform-provider-oci_v2.1.7>"
}`<br/>
4. Export your credentials for use by the OCI Terraform Provider.<br/>
`export TF_VAR_tenancy_ocid=
export TF_VAR_user_ocid=
export TF_VAR_compartment_ocid=
export TF_VAR_fingerprint=
export TF_VAR_private_key_path=<fully qualified path>
`<br/>
Note: The "private_key_path" here is the key used to access the OCI API. Instructions for setting up this key in OCI can be found in the OCI CLI setup documentation in the OCI documentation.

## Testing
At this point, you should be able to deploy terraform templates designed for use with Oracle Cloud Infrastructure.  There are a variety of open source templates available for you to get started with.

For a simple test, you could try running one of the templates from the [examples](https://github.com/oracle/terraform-provider-oci/tree/master/docs/examples) folder in the terraform-provider-oci project on github.  A good place to start may be the "Manage instances with multiple attached volumes" example. You can find instructions for running this example in the [docs/compute/instances](https://github.com/oracle/terraform-provider-oci/tree/master/docs/examples/compute/instance) folder.

You could also check out some of our other blog posts about running oci terraform templates, such as:
* _Setting up Identity and Access Management on OCI using Terraform_
* _Installing Kubernetes on Oracle Cloud Infrastructure via Terraform_


#### License
Copyright (c) 2018, Oracle and/or its affiliates. All rights
reserved.

This content is licensed under the Universal Permissive
License 1.0.

See LICENSE.txt for more details.
