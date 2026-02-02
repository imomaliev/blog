---
title: "Terraform | Disable Warnings"
date: 2023-11-02T14:21:48+0000
tags: ["terraform"]
---

# Terraform | Disable Warnings

## Context

## Question

How to disable warnings in terraform?

## Answer

Running the commands using that flag:

```console
$ terraform plan -compact-warnings
```

Or defining them as environment variables:

```console
export TF_CLI_ARGS_plan="-compact-warnings"
export TF_CLI_ARGS_apply="-compact-warnings"
```


## What I Learned

## Resources

- https://stackoverflow.com/questions/66615270/how-to-temporarily-silent-terraform-warnings
