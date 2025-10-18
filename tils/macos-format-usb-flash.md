---
title: "Macos | Format Usb Flash"
date: 2022-04-06T20:24:44+05:00
draft: false
tags: ["macos", "usb", "flash"]
---

# Macos | Format Usb Flash

## Story

I was having trouble formating my usb flash which was previously used os boot disk with ubunutu. It was formated with balena Etcher app

## Question

How to format usb flash in terminal?

## Answer

```console
$ diskutils list
# find usb flash
$ sudo diskutil eraseDisk FAT32 NEWDISKNAME /dev/disk2
```

## What I Learned

## Links

-   https://recoverit.wondershare.com/mac-tips/format-usb-drive-external-drive-mac.html
