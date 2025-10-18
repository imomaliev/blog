https://stackoverflow.com/questions/42283265/how-to-determine-if-running-current-process-is-parent
```python
import os

pid = os.getpid()
parent_pid = os.getppid()
```

https://stackoverflow.com/a/23539446/3627387
```python
import psutil, os
psutil.Process(os.getpid()).ppid()
```
