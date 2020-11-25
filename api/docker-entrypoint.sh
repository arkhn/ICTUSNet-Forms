#!/bin/bash

# Wait for db
sleep 5

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Create superuser
echo "Create superuser"
django-admin createsuperuser --noinput

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000

