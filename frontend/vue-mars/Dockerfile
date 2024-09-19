# Use an official Node.js runtime (Node.js 20)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./
#COPY --chown=node:node postcss.config.js ./
#COPY --chown=node:node . .

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .




# Expose 
EXPOSE 5173

# Serve the built app with Vite preview
CMD ["npm", "run", "build"]
