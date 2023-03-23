
python manage.py migrate

gunicorn --worker-tmp-dir /dev/shm backend.wsgi --timeout 120 --workers=3 --worker-class=gevent --threads=3 --worker-connections=1000 