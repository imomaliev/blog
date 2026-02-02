---
title: "GitLab | Registry Login Error Parsing Http 403 Response"
date: 2021-02-27T20:53:56+07:00
tags: ["gitlab"]
---

# GitLab | Registry login error

## Question

Sometimes error messages very hard to understand

```console
$ docker login registry.gitlab.com
Authenticating with existing credentials...
Login did not succeed, error: Error response from daemon: Get https://registry.gitlab.com/v2/: error parsing HTTP 403 response body: unexpected end of JSON input: ""
```

## Answer

After digging through search results which weren't relevant and didn't help I found this
[https://gitlab.com/gitlab-org/gitlab/-/issues/207509](https://gitlab.com/gitlab-org/gitlab/-/issues/207509)

Turns out the issue was due to IP blocking. VPN solved this without problem.

## What I Learned

1. If you have 2FA enabled your regular login and password wouldn't work.

    > If you have Two-Factor Authentication enabled, use a Personal Access Token instead of a password.

    https://docs.gitlab.com/ee/user/profile/account/two_factor_authentication.html#personal-access-tokens
    https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html

2. "It’s Always DNS"
