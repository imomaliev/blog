---
title: "Wagtail | Create Page In Migration"
date: 2021-02-27T22:15:11+07:00
tags: ["wagtail", "django"]
---

# Wagtail | How to create page in migration

## Question

After data migration with `Page` model subclass object creation it doesn't appear in admin

## Answer

```python
# 1 - get your home page
home_page = HomePage.objects.first()  # this will get the first HomePage

# 2 - create a page instance, this is not yet stored in the DB
page = Page(
    title='title',
    slug='slug'
)

# 3 - create the new page as a child of the parent (home), this puts a new page in the DB
home_page.add_child(instance=page)

# 4a - create a revision of the page, assuming you want it published now
page.save_revision()

# 4b - create a revision of the page, without publishing
page.publish()
```

## Resources

- https://cfpb.github.io/consumerfinance.gov/migrations/#do-i-need-to-create-a-migration
- https://github.com/cfpb/consumerfinance.gov/blob/ef3597113c1fa6317389841eee5318326518db22/cfgov/v1/util/migrations.py
- https://stackoverflow.com/questions/47788080/how-can-i-create-page-and-set-its-streamfield-value-programmatically
- https://stackoverflow.com/questions/47749708/is-there-any-way-to-create-and-publish-pages-by-executing-python-script-in-wagta
- https://stackoverflow.com/questions/43040023/programatically-add-a-page-to-a-known-parent
- https://gist.github.com/veuncent/9dab311125401c1886eb7c6998f5f387
- https://github.com/wagtail/wagtail/issues/4613
- https://github.com/wagtail/wagtail/issues/1101
- https://github.com/wagtail/wagtail/issues/5535
- https://github.com/wagtail/wagtail/issues/742
- https://github.com/point97/marco-portal2/blob/5db51715ed6c929835c44ee335187620194ea3dd/marco_portal/portal/initial_data/migrations/0001_create_ocean_stories_container.py
- https://github.com/wagtail/wagtail/issues/5535
- https://github.com/wagtail/wagtail/pull/4621
