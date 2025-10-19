---
title: "Plist | Reading Information"
date: 2025-10-18T22:18:45+0100
tags: ["plist", "macos"]
---

# Plist | Reading Information

## Context

How to figure out keyboard layout?

## Question

How to read from plist?

## Answer

```console
$ defaults export ~/Library/Preferences/com.apple.HIToolbox.plist - | plutil -extract 'AppleSelectedInputSources.1.KeyboardLayout Name' raw -
```

The ones below will show only cached data or not in structured way

```console
$ /usr/libexec/PlistBuddy -c 'Print "AppleSelectedInputSources:1:KeyboardLayout Name"' ~/Library/Preferences/com.apple.HIToolbox.plist

$ defaults read ~/Library/Preferences/com.apple.HIToolbox.plist AppleSelectedInputSources | grep "KeyboardLayout Name" | cut -f 2 -d "=" | tr -d ' ;."'

$ plutil -extract "AppleSelectedInputSources.1.KeyboardLayout Name" raw ~/Library/Preferences/com.apple.HIToolbox.plist

$ cat ~/Library/Preferences/com.apple.HIToolbox.plist | plutil -extract "AppleSelectedInputSources.1.KeyboardLayout Name" raw -

$ defaults export ~/Library/Preferences/com.apple.HIToolbox - | plutil -extract "AppleSelectedInputSources.1.KeyboardLayout Name" raw -
```

## What I Learned

## Resources

- https://github.com/captam3rica/plistbuddy-guide
