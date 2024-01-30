# FROM node:lts-alpine
# WORKDIR /usr/app
# COPY package*.json ./
# RUN npm install
# COPY . . 
# EXPOSE 8080
# RUN npm run build
# CMD ["node", "dist/app.js"]

# Use an official Node runtime as a parent image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

COPY prisma ./prisma/

# Install dependencies
# Note: Using npm ci is recommended in production environments for faster, more reliable builds
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# # Run Prisma migrations
# RUN 

# Expose the port the app runs on
EXPOSE 8080

CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "./src/app.ts"]
