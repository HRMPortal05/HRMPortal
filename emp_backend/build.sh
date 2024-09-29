#!/bin/bash

echo "Building Project..."

# Exit immediately if a command exits with a non-zero status
set -o errexit

# Navigate to the backend directory if necessary
# Make sure to adjust this if the script is not inside emp_backend

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --no-input

# Run migrations
echo "Applying database migrations..."
python manage.py migrate

echo "Creating superuser..."
python manage.py shell <<EOF > superuser_creation.log 2>&1
from django.contrib.auth import get_user_model
from django.core.exceptions import IntegrityError

User = get_user_model()

# Set superuser credentials
superuser_name = 'administrator'
superuser_email = 'hrmportal05@gmail.com'
superuser_password = 'Hrmportal@005'

try:
    User.objects.create_superuser(superuser_name, superuser_email, superuser_password)
except IntegrityError:
    print("Superuser already exists. Skipping creation.")
EOF

echo "Build completed successfully."