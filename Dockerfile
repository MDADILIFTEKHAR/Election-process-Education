# Stage 1: Build
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Accept build arguments for Vite
ARG VITE_OPENROUTER_API_KEY
ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_GOOGLE_TRANSLATE_API_KEY

# Set them as environment variables for the build
ENV VITE_OPENROUTER_API_KEY=$VITE_OPENROUTER_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_TRANSLATE_API_KEY=$VITE_GOOGLE_TRANSLATE_API_KEY

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
# Copy the custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port (Cloud Run uses $PORT)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
