---
title: "Python | Get Process Pid And Parent Process Pid"
date: 2023-11-02T14:21:48+0000
tags: ["python"]
---

# Python | Get Process Pid And Parent Process Pid

## Context

## Question

How to determine if running current process is parent?

## Answer

```python
import os

## Answer

pid = os.getpid()
parent_pid = os.getppid()
```

https://stackoverflow.com/a/23539446/3627387
```python
import psutil, os
psutil.Process(os.getpid()).ppid()
```

## What I Learned

## Resources

- https://stackoverflow.com/questions/42283265/how-to-determine-if-running-current-process-is-parent
