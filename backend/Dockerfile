# Dockerfile for backend (can be used with Fly.io, Railway, or any Docker platform)
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose port
EXPOSE 10000

# Start the application
CMD ["npm", "start"]
