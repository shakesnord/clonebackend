# Use Node.js 18 (LTS) instead of 14
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies (including Prisma & Helmet)
RUN npm install

# Install TypeScript globally (optional, can be a devDependency instead)
RUN npm install -g typescript

# Copy the rest of the files
COPY . .

# Compile TypeScript
RUN tsc

EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]