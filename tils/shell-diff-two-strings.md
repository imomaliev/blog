---
title: "Shell | Diff Two Strings"
date: 2021-02-27T20:53:56+07:00
tags: ["shell"]
---

# Shell | How to diff 2 or more strings

## Question

I want to run diff on 2 strings

## Answer

https://stackoverflow.com/a/454549/3627387

```console
diff  <(echo "$string1" ) <(echo "$string2")
```

## What I Learned

1. How to run shasum on files on macOS
    ```console
    $ diff <(shasum -a 256 go1.15.8.linux-amd64.tar.gz) <(echo "d3379c32a90fdf9382166f8f48034c459a8cc433730bc9476d39d9082c94583b  go1.15.8.linux-amd64.tar.gz")
    ```
    **Note**: there are 2 spaces between sum and file
