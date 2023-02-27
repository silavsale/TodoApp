FROM node

# Create a new directory for our application files

WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json .

# Install dependencies
RUN yarn

# Copy the rest of the application files to the container
COPY . . 

# Expose the port that the server will listen on
EXPOSE 3000

# Start the server
CMD ["yarn", "dev"]