---
title: "Publish Blog to Github Pages"
date: 2025-10-07T22:58:43+01:00
draft: true
---

https://gohugo.io/getting-started/quick-start/#configure-the-site

Note: info about why https://imomaliev.github.io/blog/

https://gohugo.io/host-and-deploy/host-on-github-pages/

```
$ mkdir -p .github/workflows
$ touch .github/workflows/hugo.yaml
```

```yaml
cd site/
./site/public
```

## Custom domain

https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Setup A and AAAA

A vs CNAME?

https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/

### Troubleshooting

- If it did not work switch `Proxied` in Clouldlfare
- Check if you have `Page Rules` enabled

```console
$ dig imomaliev.com +noall +answer -t A
$ dig imomaliev.com +noall +answer -t AAAA
```

```console
$ git commit -m 'setup custom domain'
```

## Verifying domain

https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
