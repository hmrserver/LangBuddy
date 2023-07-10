FROM node:18.16.1-alpine

#Setting Environment Variables
ARG BACKEND_URL
ENV BACKEND_URL $BACKEND_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY . .
COPY . .

RUN addgroup app && adduser -S -G app app
RUN chown -R app:app /app
USER app

EXPOSE 3000

CMD ["npm", "start"]