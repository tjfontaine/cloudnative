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

resource "oci_identity_group" "group1" {
  name = "developers"
  description = "developer group created by terraform"
}

resource "oci_identity_user_group_membership" "user-group-mem1" {
  compartment_id = "${var.tenancy_ocid}"
  user_id = "${oci_identity_user.user1.id}"
  group_id = "${oci_identity_group.group1.id}"
}
