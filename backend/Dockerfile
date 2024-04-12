# Use the official Node.js image based on Alpine Linux as the base image
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into container
COPY package*.json ./

# Install dependencies
RUN npm install

# copy prisma files
COPY prisma ./prisma

# generate prisma files
RUN npx prisma migrate

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 5000

# run app in dev mode
CMD ["npm", "run", "dev"]
# Production script
# CMD ["npm", "start",] // Prod
