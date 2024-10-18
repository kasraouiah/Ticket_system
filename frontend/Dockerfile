# Step 1: Build the application
FROM node:lts-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the application (e.g., for a frontend framework)
RUN npm run build

# Step 2: Configure Nginx
FROM nginx:1.23.2-alpine

# Copy the Nginx configuration file to the appropriate location
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Create an Nginx PID file and set ownership for various directories
RUN touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Switch to the Nginx user for security reasons
USER nginx

# Expose port 5173 for the application
EXPOSE 5173

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
