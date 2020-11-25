#!/bin/bash

# Wait for db
sleep 5

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

python

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000
