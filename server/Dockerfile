FROM node:18.16-alpine As development

RUN mkdir /app && chown node:node /app

WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY . .
USER node

FROM node:18.16-alpine As build

WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

FROM node:18.16-alpine As production

COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
