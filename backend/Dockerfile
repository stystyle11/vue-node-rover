# Use an official Node.js runtime (Node.js 20)
FROM node:20-alpine
 
# Create app directory
WORKDIR /app
 
# Copy dependency definitions
COPY --chown=node:node package*.json ./
 
# Install dependencies

RUN npm ci
 
# Get all the code needed to run the app
COPY . .
 
CMD ["npm", "run", "start"]