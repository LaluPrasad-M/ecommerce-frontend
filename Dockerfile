# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependencies installation
COPY package*.json ./

# Install only production dependencies (skip dev dependencies)
RUN npm install --omit=dev

# Copy the rest of the application files
COPY . .

# Build the app for production (if required)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
