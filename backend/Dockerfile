# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

RUN npm cache clean --force

# Install production dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Make your app available on port 3001
EXPOSE 3001

# Define the command to run your app
CMD ["node", "server.js"]
