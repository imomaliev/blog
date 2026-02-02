---
title: "Bash | 'source' Redefines Variables"
date: 2021-03-14T22:43:33+07:00
tags: ["bash"]
---

# Bash | `source` redefines variables

## Question

I was trying to implement new plugin for tmux https://github.com/imomaliev/tmux-keyboard-layout, but for some reason I kept having an issue with tpm plugin update functionality not working propperly. At the begging I thought this was issue with my plugin or tmux setup.

## Answer

Be careful when using `source` in bash it could redefine existing variables

## What I Learned

1. Turns out the issue was with tpm itself, there was regression introduced in https://github.com/tmux-plugins/tpm/pull/198. Which I fixed in https://github.com/tmux-plugins/tpm/pull/200
