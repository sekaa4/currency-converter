FROM node:18.16-alpine As development
WORKDIR /usr/app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "dev" ]
