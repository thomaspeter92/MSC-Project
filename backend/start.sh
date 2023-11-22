#!/bin/bash

# Name of your app
APP_NAME="express-backend"

# Build the Docker image
docker build -t $APP_NAME .

# Run the Docker container in detached mode with volume mounted for hot reloading
docker run -d -v $(pwd):/usr/src/app -p 8080:8080 $APP_NAME
