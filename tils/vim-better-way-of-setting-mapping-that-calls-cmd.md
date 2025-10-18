---
title: "Vim | Better Way Of Setting Mapping That Calls Cmd"
date: 2021-03-23T23:45:32+07:00
tags: ["vim"]
---

# Vim | Better way of setting mapping that calls command mode

## Question

I was trying to create mapping that will not be run for `help` filetype but during that I found out how to propperly set mapping that will run function in command mode

## Answer

`<Cmd>`!

> The \<Cmd\> pseudokey begins a "command mapping", which executes the command directly (without changing modes). Where you might use ":...\<CR\>" in the {lhs} of a mapping, you can instead use "\<Cmd\>...\<CR\>".

```vim
nnoremap <buffer> <C-]> <Cmd>call JumpToTagWithLocationList()<CR>
```

There is `<Cmd>` argument for `:map`. For more info `:h :map-<cmd>`

## What I Learned

1. How to exclude in autocmd https://stackoverflow.com/a/28838030/3627387
1. There is `<buffer>` setting for `:map`
