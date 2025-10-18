https://stackoverflow.com/a/25877937/3627387
```python
is_gunicorn = "gunicorn" in os.environ.get("SERVER_SOFTWARE", "")
```

[Uwsgi](https://github.com/unbit/uwsgi/blob/d58a832c81c2c96ae0f6e72614e1cc47f4b5d332/plugins/cgi/cgi_plugin.c#L853) and [Gunicorn](https://github.com/benoitc/gunicorn/blob/053e15c05c6f8a90c1850cc8cc2bad1bd2f3536a/gunicorn/arbiter.py#L52)
```python
# check if running via wsgi server. Gunicorn and uwsgi both support this.
# https://stackoverflow.com/a/25877937/3627387
IS_WSGI_SERVER = "SERVER_SOFTWARE" in environ
```