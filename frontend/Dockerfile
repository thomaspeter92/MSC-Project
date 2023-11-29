FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "run", "dev"]