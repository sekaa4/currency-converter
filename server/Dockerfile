FROM node:18.16-alpine As development
WORKDIR /usr/app
COPY package*.json .
COPY . .
RUN npm ci
CMD [ "npm", "run", "start:dev" ]
