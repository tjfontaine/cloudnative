# Installing Terraform for Oracle Cloud Infrastructure

Welcome to our Kubernetes on OCI with Terraform series. This overview walks you through the steps you need to start using Terraform to manage resources on Oracle Cloud Infrastructure. We'll go through getting Terraform up and running on a MacOS, Windows, or Oracle Linux system, and then install the OCI Terraform Provider. Here is the official documentation for this process: https://github.com/oracle/terraform-provider-oci/#terraform-provider-for-oracle-cloud-infrastructure

Note: As you're following these steps, pay attention to the version of Terraform and the OCI Terraform Provider you are using. The OCI Terraform Provider describes the versions of Terraform it is compatible with on its GitHub page: https://github.com/oracle/terraform-provider-oci.


## Prerequisites

### Install Package Managers and Utilities

#### MacOS
Install Homebrew.<br/>
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

#### Windows
Install Chocolatey.
##### For Powershell
`Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`
##### For CMD
`@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`

## Install Terraform
Note that you can always install Terraform by following the instructions and downloading the package for your OS directly from Hashicorp's site at: https://www.terraform.io/intro/getting-started/install.html.

This section provides instructions for performing Terraform installation using the package management tools described earlier. Be cognizant of the version you download!

### MacOS
1. Install Terraform via Homebrew.<br/>
`brew install terraform`<br/>
2. Check to make sure Terraform installed properly.<br/>
`terraform version`<br/>
NOTE: It is important to run this command, so Terraform will set up some directories it needs. Run this before setting up the provider in the next step.

### Windows
1. Install Terraform via chocolatey.<br/>
`choco install terraform`<br/>
2. Check to make sure Terraform installed properly.<br/>
`terraform version`<br/>
NOTE: It is important to run this command, so Terraform will set up some directories it needs. Run this before setting up the provider in the next step.

### Oracle Linux
1. Go to Hashicorp's site to get the most recent version of Terraform, and then use wget to download that most recent version directly from Hashicorp. An example of this is given below. The most recent version at the time of writing is 0.11.7.<br/>
`wget https://releases.hashicorp.com/terraform/0.11.7/terraform_0.11.7_linux_amd64.zip`<br/>
2. Once you have downloaded Terraform, run commands similar to the following (but for your version of Terraform) to install Terraform by unzipping the package and moving it to usr/local/bin.<br/>
`unzip terraform_0.11.7_linux_amd64.zip
sudo mv terraform /usr/local/bin/`<br/>

Regardless of your chosen OS, you can check to make sure Terraform installed properly by running: `terraform version`<br/> 
NOTE: It is important to run this command, so Terraform will set up some directories it needs. Run this before setting up the provider in the next step.

## Install the OCI Terraform Provider
Up-to-date instructions for installing the OCI Terraform Provider can also be found at https://github.com/oracle/terraform-provider-oci. I have provided a summary of the instructions for each OS type in this step.

### MacOS
1. Download the latest release of the OCI provider from here:<br/> https://github.com/oracle/terraform-provider-oci/releases.<br/> Select darwin_amd64.tar.gz.
2. Create the following directory to store your plugin.<br/>
`mkdir -p ~/.terraform.d/plugins/`
3. Untar the downloaded OCI plugin.<br/>
`tar -xzvf ~/Downloads/darwin_amd64.tar.gz`<br/>
NOTE: This assumes your downloads go to your download folder. If they are elsewhere, use that location.
4. Move the plugin to your newly created Terraform plugin directory.<br/>
`mv darwin_amd64/terraform-provider-oci_v2.1.7.terraform.d/plugins/`<br/>
5. Open the file `~/.terraformrc` and add in the following lines telling it where to find the plugin.<br/>
`providers {
  oci = "<replace this with the full path to the terraform provider, i.e.: /home/opc/.terraform.d/plugins/terraform-provider-oci_v2.1.1>"
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
1. Download the latest release of the OCI provider from https://github.com/oracle/terraform-provider-oci/releases. You may do this via Powershell using a command similar to the one below. The command below downloads the most recent version at the time of writing, 2.1.7. Take note of the version you are downloading.<br/>
`Invoke-WebRequest -Uri http://github.com/oracle/terraform-provider-oci/releases/download/v2.1.7/windows_amd64.zip -OutFile C:\Users\kasli\AppData\Roaming\terraform.d\plugins\windows_amd`<br/>
2. Unzip the file you just downloaded. If you downloaded from the GitHub repo via an internet browser, it should be in your "Downloads" folder. If you downloaded using the command above, unzip it with the command below.
<br/>`Expand-Archive -LiteralPath $env:APPDATA\terraform.d\plugins\windows_amd64.zip -DestinationPath$env:APPDATA/terraform.d/plugins`
3. Terraform uses a "terraform.rc" file to keep the locations of installed Terraform providers. Create this file using:<br/>
`notepad $env:APPDATA/terraform.rc`<br/>
When you are prompted on whether or not to create this new file, select "Yes."<br/>
When Notepad opens, input the following text, depending on whether you intend to use Terraform with Powershell or CMD.

##### Powershell
`providers {
  oci = $env:APPDATA/terraform.d/plugins/terraform-provider-oci
}`
##### CMD
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

### Oracle Linux
1. Download the latest release of the OCI provider from https://github.com/oracle/terraform-provider-oci/releases. You may do this via wget using a command similar to the one below. The command below downloads the most recent version at the time of writing, 2.1.7. Take note of the version you are downloading<br/>
`wget https://github.com/oracle/terraform-provider-oci/releases/download/v2.2.0/linux_amd64.tar.gz`<br/>
2. To install the OCI Terraform Provider, untar the package and move it to a place on the PATH, as shown below.<br/>
`tar -xzvf linux_amd64.tar.gz
mv linux_amd64 ~/.terraform.d/plugins`<br/>
3. Terraform uses a ".terraform.rc" file to keep the locations of installed Terraform providers. Create this file using the commands below.
* First, edit the ~/.terraform.rc file using something like<br/> `vi ~/.terraform.rc`<br/>
* Copy the following text into the file and save.<br/>
`providers {
  oci = "<replace this with the full path to the terraform provider, i.e.: /home/opc/.terraform.d/plugins/terraform-provider-oci_v2.1.7>"
}`<br/>

4. Export your credentials for use by the OCI Terraform Provider.<br/>
`export TF_VAR_tenancy_ocid=
export TF_VAR_user_ocid=
export TF_VAR_compartment_ocid=
export TF_VAR_fingerprint=
export TF_VAR_private_key_path=<fully qualified path>
`<br/>

Note: The "private_key_path" here is the key used to access the OCI API. Instructions for setting up this key for OCI can be found [here](https://docs.cloud.oracle.com/iaas/Content/API/Concepts/apisigningkey.htm)

If you plan on using these credentials with Terraform in the future, you may want to set these variables in your `~/.bash_profile` file. 

Once you've set these values open a new terminal or source your profile changes

`$ source ~/.bash_profile`


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
When you are done with the test, take down your infrastructure with:
$ terraform destroy
```

Another good example to explore is the "Manage instances with multiple attached volumes" example. You can find instructions for running this example in the [docs/compute/instances](https://github.com/oracle/terraform-provider-oci/tree/master/docs/examples/compute/instance) folder.

### More in this Series
* [Setting up Identity and Access Management on OCI using Terraform](TerraformAuth.md)
* [Installing Kubernetes on Oracle Cloud Infrastructure via Terraform](KubernetesWithTerraform.md)


#### License
Copyright (c) 2018, Oracle and/or its affiliates. All rights
reserved.

This content is licensed under the Universal Permissive
License 1.0.

See LICENSE.txt for more details.
