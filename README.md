<h1 align="center">Wish List API</h1>
<h2 align="center">Backend API built with NestJS using Domain-Driven Design and Clean Architecture</h2>

<br/>

<p align="center">
    <img src="https://img.shields.io/badge/TypeScript-informational?style=flat&logo=typescript&logoColor=white" alt="TypeScript badge"/>
    <img src="https://img.shields.io/badge/NestJS-404D59?style=flat&logo=nestjs&color=CB3837" alt="NestJS badge"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" alt="MongoDB badge"/>
    <img src="https://img.shields.io/badge/Yarn-informational?style=flat&logo=Yarn&color=2C8EBB&logoColor=white" alt="Yarn badge"/>
    <img src="https://img.shields.io/badge/Jest-informational?style=flat&logo=Jest&color=2C8EBB&logoColor=white" alt="Jest badge"/>
    <img src="https://img.shields.io/badge/Docker-informational?style=flat&logo=docker&logoColor=white" alt="Docker badge"/>
</p>

Wish List API is a backend API to post wishes, you can publish and keep track of them, recording the progress you make, until you fulfill them.

## ✨ Features

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
- 📺 Presentation:
  - NestJS.
- 📚 Persistence:
  - MikroORM.
  - MongoDB.
- 👤 Authentication:
  - [Passport.js](http://www.passportjs.org/).
  - JWT Access Tokens.
  - Refresh Tokens.
  - Refresh Tokens rotation.
  - Refresh Tokens auto-revocation.
- 🛡️ Authorization:
  - User Roles.
  - Resource Ownership.
- 🧪 Testing:
  - Jest.
  - Coverage Report: 70%.
- 📝 Documentation:
  - [Swagger for NestJS](https://github.com/nestjs/swagger/).

## ⌚ Prerequisites

To run this Backend API make sure you have installed all of the following prerequisites on your machine:

- Node.js.
- TypeScript.
- Yarn.
- Docker.

## 💻 Install

```bash
# Environment Variables
mv '.env.example' '.env'

# Install dependencies
yarn

# Run Docker
docker-compose up
```

## 🚀 Running

```bash
# Run in development mode
yarn start

# Run in watch mode (development)
yarn start:dev

# Run in production mode
yarn start:prod
```

## 🧪 Tests

```bash
# Run tests
yarn test

# Run test coverage
yarn test:cov

# Run tests end to end
yarn test:e2e
```

## 🧑‍💻 Author

**JMOrbegoso**

- Website: [jmorbegoso.com](https://www.jmorbegoso.com)
- Twitter: [@JMOrbegosoDev](https://twitter.com/JMOrbegosoDev/)
- Github: [@JMOrbegoso](https://github.com/JMOrbegoso/)
- LinkedIn: [@jmorbegosodev](https://www.linkedin.com/in/jmorbegosodev/)
