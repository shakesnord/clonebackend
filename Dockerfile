# Use the Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

COPY . .

RUN tsc

EXPOSE 3000

# Command to start the application
CMD ["node", "dist/index.js"]
