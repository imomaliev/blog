---
title: "Helping Github and Cloudflare Shake Hands"
date: "2026-01-24T23:18:00Z"
tags: ["github-pages", "cloudflare", "dns", "cloudflare-dns"]
---

I am using [Cloudflare DNS](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) for my domain, and I did not know that there were additional steps I needed to take for the domain to work properly and have HTTPS enabled.

1. To pass the DNS check on GitHub's side, disable [proxying through Cloudflare](https://developers.cloudflare.com/dns/proxy-status/).

    From this:

    <!-- FIXME: images with relative path break when shown via .Summary -->
    <!-- https://discourse.gohugo.io/t/summary-using-images-from-page-bundles/42187/4 -->

    ![proxied record](proxied-record.png)

    To this:

    ![dns only record](dns-only-record.png)

    If you not do this GitHub will yell at you with:

    > Domain's DNS record could not be retrieved. For more information, see documentation (InvalidDNSError).

1. Add `CNAME` for `www` record.

    Otherwise, you will see this error:
    ![www dns error](www-dns-error.png)
1. Wait until GitHub Pages's settings see new DNS records.
1. Check the ["Enforce HTTPS"](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https?versionId=free-pro-team%40latest&productId=pages&restPage=configuring-a-custom-domain-for-your-github-pages-site%2Cmanaging-a-custom-domain-for-your-github-pages-site) setting.
1. GitHub's interface is very finicky so after you are sure everything looks good, close it and do not touch it anymore.

> [!warning]
> Re-enabling Claudlfare proxying will cause certificate renewal to fail, so keep these DNS records "DNS Only".

## Troubleshooting

If after all this GitHub still is not happy, try switching Cloudflare's TLS config from "Automatic" to "Full".
