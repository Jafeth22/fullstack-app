FROM node:21

# Working directory inside Docker
WORKDIR /usr/src/app

# Copy files into Docker
# This case, it is copying all files but not those that are inside .dockerignore
COPY . .

# Install deps
RUN npm install

# Exposing app port
EXPOSE 3001

# This is to run a script, it is like = npm run start:dev
CMD ["npm", "run", "start:dev"]

