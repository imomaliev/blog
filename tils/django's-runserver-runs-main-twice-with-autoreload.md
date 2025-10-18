## Context
- It runs twice due to forking https://stackoverflow.com/questions/16546652/why-does-django-run-everything-twice
- https://code.djangoproject.com/ticket/14606
- http://blog.dscpl.com.au/2010/03/improved-wsgi-script-for-use-with.html
- https://stackoverflow.com/questions/2110545/why-is-init-module-in-django-project-loaded-twice
- https://stackoverflow.com/questions/11149730/django-settings-py-seems-to-load-multiple-times
- https://nedbatchelder.com/blog/201112/duplicitous_django_settings.html
- https://stackoverflow.com/questions/16546652/why-does-django-run-everything-twice
- https://stackoverflow.com/questions/23539184/after-starting-process-how-to-get-parents-pid-in-the-child
- https://stackoverflow.com/questions/28489863/why-is-run-called-twice-in-the-django-dev-server

## Answer
- Use singleton https://github.com/pycontribs/tendo/blob/v0.3.0/src/tendo/singleton.py
- https://stackoverflow.com/questions/61219355/prevent-my-python-script-to-be-executed-twice-at-same-time
- https://tendo.readthedocs.io/en/latest/#module-tendo.singleton