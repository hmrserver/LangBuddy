FROM node:18.16.1-alpine AS build-stage

#Setting Environment Variables
ARG BACKEND_URL
ENV BACKEND_URL $BACKEND_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Step 2: Getting ready for Production
FROM nginx:1.21.6-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]