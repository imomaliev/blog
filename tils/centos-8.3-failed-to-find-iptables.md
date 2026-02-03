---
title: "Centos | 8.3 Failed To Find Iptables"
date: 2021-02-27T20:53:56+07:00
tags: ["docker", "centos"]
---

# CentOS | 8.3 failed to find iptables

## Question

Trying to install docker on CentOS 8.3, but for some reason systemd kept giving me errors

```console
$ systemctl status docker.service
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
   Active: activating (auto-restart) (Result: exit-code) since Thu 2021-02-25 04:59:07 UTC; 918ms ago
     Docs: https://docs.docker.com
  Process: 1285 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock (code=exited, status=1/FAILURE)
 Main PID: 1285 (code=exited, status=1/FAILURE)

Feb 25 04:59:07 yasnoponyatno systemd[1]: docker.service: Main process exited, code=exited, status=1/FAILURE
Feb 25 04:59:07 yasnoponyatno systemd[1]: docker.service: Failed with result 'exit-code'.
Feb 25 04:59:07 yasnoponyatno systemd[1]: Failed to start Docker Application Container Engine.
```

And

```console
$ journalctl -xe
Feb 25 04:59:09 yasnoponyatno systemd[1]: docker.service: Main process exited, code=exited, status=1/FAILURE
Feb 25 04:59:09 yasnoponyatno systemd[1]: docker.service: Failed with result 'exit-code'.
-- Subject: Unit failed
-- Defined-By: systemd
-- Support: https://access.redhat.com/support
--
-- The unit docker.service has entered the 'failed' state with result 'exit-code'.
Feb 25 04:59:09 yasnoponyatno systemd[1]: Failed to start Docker Application Container Engine.
-- Subject: Unit docker.service has failed
-- Defined-By: systemd
-- Support: https://access.redhat.com/support
--
-- Unit docker.service has failed.
--
-- The result is failed.
Feb 25 04:59:11 yasnoponyatno systemd[1]: docker.service: Service RestartSec=2s expired, scheduling restart.
Feb 25 04:59:11 yasnoponyatno systemd[1]: docker.service: Scheduled restart job, restart counter is at 3.
-- Subject: Automatic restarting of a unit has been scheduled
-- Defined-By: systemd
-- Support: https://access.redhat.com/support
--
-- Automatic restarting of the unit docker.service has been scheduled, as the result for
-- the configured Restart= setting for the unit.
Feb 25 04:59:11 yasnoponyatno systemd[1]: Stopped Docker Application Container Engine.
-- Subject: Unit docker.service has finished shutting down
-- Defined-By: systemd
-- Support: https://access.redhat.com/support
--
-- Unit docker.service has finished shutting down.
Feb 25 04:59:11 yasnoponyatno systemd[1]: docker.service: Start request repeated too quickly.
Feb 25 04:59:11 yasnoponyatno systemd[1]: docker.service: Failed with result 'exit-code'.
-- Subject: Unit failed
-- Defined-By: systemd
-- Support: https://access.redhat.com/support
--
-- The unit docker.service has entered the 'failed' state with result 'exit-code'.
Feb 25 04:59:11 yasnoponyatno systemd[1]: Failed to start Docker Application Container Engine.
-- Subject: Unit docker.service has failed
-- Defined-By: systemd
-- Support: https://access.redhat.com/support
--
-- Unit docker.service has failed.
--
-- The result is failed.
Feb 25 04:59:11 yasnoponyatno systemd[1]: docker.socket: Failed with result 'service-start-limit-hit'.
-- Subject: Unit failed
-- Defined-By: systemd
-- Support: https://access.redhat.com/support
--
-- The unit docker.socket has entered the 'failed' state with result 'service-start-limit-hit'.
```

## Answer

Install iptables

```console
dnf install iptables
```

## What I Learned

1. `iptables` is bolted into docker internals
   https://github.com/moby/moby/issues/26824
1. When installing iptables in CentOS 8 it actually installs shim script which converts `iptables`'s commands to `nf_tables`
1. Many Linux distros moving to nf_tables
   https://developers.redhat.com/blog/2020/08/18/iptables-the-two-variants-and-their-relationship-with-nftables/
