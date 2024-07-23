FROM node:21

# Establish the directory inside the container
WORKDIR /usr/src/app

# Copy this files before others
# This uses cache of Docker when the dependencies does not change
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all changes
COPY . .

# Build the app inside the container
RUN npm run build

# Expose the port
EXPOSE 3000

# Start de app
CMD ["npm", "run", "dev"]
