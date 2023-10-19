# Currency converter application

- Deploy link - [open deploy](https://currencies-converter-sekaa4.netlify.app/).

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Install [Docker](https://docs.docker.com/engine/install/)
- Run docker desktop application, if you use windows or run docker engine if you use other system

## Downloading

```
git clone {repository URL}
```

go to the copied folder, in your terminal and complete next command:

```
cd currency-converter
git checkout develop
```

## Running application

- Create .env file (based on .env-example) in copied folder:

  - ./client on based ./client/.env-example
  - ./server on based ./server/.env-example

  - set enviroment variables according to description in .env-example files.

  P.S. The application uses mongodb database, if you will not provide MONGO_DB_API, in .env file, application will be used local db in database folder.

- Run next command in your terminal, for building images and docker containers up:

```
docker-compose up -d
```

After docker compose command complete and dockers starting you can open in your browser OpenAPI documentation by typing <http://localhost:3000/doc/> (port: 3000 as default for server) and execute test queries, and you can open the client application by following the link: <http://localhost:5000/> (port: 5000 as default for client).

You can change ports in .env file in the corresponding directories.

## Manual running application

### Installing NPM modules and building application

- for server

```
cd ./server
npm install
npm run build
npm run start:prod

```

- for client

```
cd ..
cd ./client
npm install
npm run build
npm run preview
```

## Work with Swagger (OpenAPI)

### Swagger (OpenAPI)

- link for server: [http://localhost:3000/doc](http://localhost:3000/doc) and test endpoints.
