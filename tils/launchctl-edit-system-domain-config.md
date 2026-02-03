---
title: "Launchctl | Edit System Domain Config"
date: 2021-03-30T17:45:58+07:00
tags: ["launchctl", "macos"]
---

# Launchctl | How to edit system domain configs

## Question

I messed up my launchctl configs while I was trying to disable FortiClient from starting on startup. I tried to use `launchctl disable ...` for services but ended up adding wrong entries to disable configuration.

## Answer

Edit `/private/var/db/com.apple.xpc.launchd/disabled*` files and delete wrong data

## What I Learned

1. How to login to single-user mode on macOS.

    > Press `Command-S` on system boot

1. Make data editable because in single user it is mounted as readonly

    In single-user mode run

    ```console
    $ cd /
    $ mount -uw /System/Volumes/Data
    ```

1. After macOS Catalina launched the mount mechanism changed and split between system data and user data. This why now we use `mount ...` from previous point, but before that you mounted whole system

    ```console
    $ /sbin/mount -uw /
    ```

## Resources

- https://eclecticlight.co/2019/10/08/macos-catalina-boot-volume-layout/
- https://apple.stackexchange.com/questions/375603/catalina-not-allowing-to-change-read-write-permissions-despite-having-sip-disabl
- https://apple.stackexchange.com/questions/388469/unable-to-mount-read-write-in-os-catalina-10-15-4-in-single-user-mode
- https://stackoverflow.com/questions/31206756/launchctl-remove-enabled-disabled-override
