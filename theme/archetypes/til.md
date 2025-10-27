{{- $pathParts := split .File.ContentBaseName "-" -}}
{{- $topic := index $pathParts 0 | title -}}
{{- $titleParts := $pathParts | after 1 -}}
{{- $question := delimit $titleParts " " | title -}}
{{- $title := printf "%s | %s" $topic $question -}}
---
title: "{{ $title }}"
date: {{ .Date }}
tags: [{{ lower $topic }}]
---

# {{ $title }}

## Context

## Question

## Answer

## What I Learned

## Resources
