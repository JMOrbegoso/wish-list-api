<h1 align="center">Wish List API ๐</h1>
<h2 align="center">Backend REST API built with NestJS and following the principles of Domain-Driven Design and Clean Architecture</h2>

<br/>

<p align="center">
    <img src="https://img.shields.io/badge/TypeScript-informational?style=flat&logo=typescript&logoColor=white" alt="TypeScript badge"/>
    <img src="https://img.shields.io/badge/NestJS-404D59?style=flat&logo=nestjs&color=CB3837" alt="NestJS badge"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" alt="MongoDB badge"/>
    <img src="https://img.shields.io/badge/Yarn-informational?style=flat&logo=Yarn&color=2C8EBB&logoColor=white" alt="Yarn badge"/>
    <img src="https://img.shields.io/badge/Jest-informational?style=flat&logo=Jest&color=2C8EBB&logoColor=white" alt="Jest badge"/>
    <img src="https://img.shields.io/badge/Docker-informational?style=flat&logo=docker&logoColor=white" alt="Docker badge"/>
</p>

Wish List API is a backend REST API where you can publish your wishes, share them, and keep them on track, recording the progress you make, until you fulfill them.

## โจ Features

- Built with TypeScript.
- Domain-Driven Design (DDD):
  - Value Objects.
  - Entities.
  - Aggregates.
- Clean Architecture:
  - Domain Layer.
  - Application Layer.
  - Infrastructure Layer.
- Design Patterns:
  - [Repository Pattern](https://blog.jmorbegoso.com/post/repository-pattern/).
  - [Unit of Work](https://blog.jmorbegoso.com/post/unit-of-work-pattern/).
  - [Static Factory Method Pattern](https://blog.jmorbegoso.com/post/static-factory-method-pattern/).
- Command Query Responsibility Segregation (CQRS).
- ๐บ Presentation:
  - NestJS.
- ๐ Persistence:
  - MikroORM.
  - MongoDB.
- ๐ค Authentication:
  - [Passport.js](http://www.passportjs.org/).
  - JWT Access Tokens.
  - Refresh Tokens.
  - Refresh Tokens rotation.
  - Refresh Tokens auto-revocation.
- ๐ก๏ธ Authorization:
  - User Roles.
  - Resource Ownership.
- ๐งช Testing:
  - Jest.
  - Supertest (e2e).
  - Coverage Report: 70%.
- ๐ Documentation:
  - [Swagger for NestJS](https://github.com/nestjs/swagger/).

## โ Prerequisites

To run this Backend API make sure you have installed all of the following prerequisites on your machine:

- Node.js.
- TypeScript.
- Yarn.
- Docker.

## ๐ป Install

```bash
# Environment Variables
cp '.env.example' '.env' # Development
cp '.env.example' '.test.env' # Tests

# Install dependencies
yarn

# Run MongoDB database in Docker ๐
docker-compose up # Development
docker-compose -f docker-compose.e2e.yml --env-file ./.test.env up # Tests
```

## ๐ Running

```bash
# Run in development mode
yarn start

# Run in watch mode (development)
yarn start:dev

# Run in production mode
yarn start:prod
```

## ๐งช Tests

```bash
# Run tests
yarn test

# Run test coverage
yarn test:cov

# Run tests end to end
yarn test:e2e
```

## ๐งโ๐ป Author

**JMOrbegoso**

- Website: [jmorbegoso.com](https://www.jmorbegoso.com)
- Twitter: [@JMOrbegosoDev](https://twitter.com/JMOrbegosoDev/)
- Github: [@JMOrbegoso](https://github.com/JMOrbegoso/)
- LinkedIn: [@jmorbegosodev](https://www.linkedin.com/in/jmorbegosodev/)
