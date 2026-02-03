---
title: "Macos | Format Usb Flash"
date: 2022-04-06T20:24:44+05:00
tags: ["macos", "usb", "flash"]
---

# Macos | Format Usb Flash

## Context

I was having trouble formating my usb flash which was previously used os boot disk with ubunutu. It was formated with balena Etcher app

## Question

How to format usb flash in terminal?

## Answer

```console
$ diskutils list
# find usb flash
$ sudo diskutil eraseDisk FAT32 NEWDISKNAME /dev/disk2
```

## Resources

- https://recoverit.wondershare.com/mac-tips/format-usb-drive-external-drive-mac.html
