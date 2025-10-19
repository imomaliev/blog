---
title: "Forticlient | Disable Launch At Login"
date: 2021-03-04T01:01:45+07:00
tags: ["forticlient", "vpn"]
---

# FortiClient | How to disable launch at login

## Question

FortiClient is automatically added to launch at login, and there is no simple way to disable this

## Answer

```console
$ sudo vim /Library/LaunchAgents/com.fortinet.forticlient.fct_launcher.plist
# edit <key>RunAtLoad</key> to <false/> value
```

## Resources

- https://forum.fortinet.com/tm.aspx?m=97324
