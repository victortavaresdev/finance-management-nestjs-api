<h1 align="center">Personal Finance Management REST API</h1>

<h4 align="center">A Back-end Personal Finance Management application built with <a href="https://nestjs.com/" target="_blank">Nest</a>.</h4>

<p align="center">
  <a href="https://nodejs.dev/en/"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#license">License</a>
</p>

## Key Features

- CRUD Operations
  - CREATE, READ, UPDATE and DELETE resources
- Authentication / Authorization
  - Authentication implemented with Passport.js
  - Authorization implemented with CASL.js
- Data validation in DTO
- Error Handling with interceptors
- Extra security layer with
  - Helmet (security-related HTTP headers)
  - Rate limiting implemented with @nestjs/throttler
- API documented with Swagger.io

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/victortavaresdev/finance-management-nestjs-api.git

# Go into the repository
$ cd finance-management-nestjs-api

# Install dependencies
$ yarn or npm install

# Run the app
$ yarn start:dev or npm start:dev
```

## Technologies

This software uses the following technologies:

- [Node](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nest](https://nestjs.com/)
- [Postgres](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Passport](https://www.passportjs.org/)
- [CASL](https://casl.js.org/v6/en/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Helmet](https://helmetjs.github.io/)
- [Swagger](https://swagger.io/)

## License

MIT

---

<p align="left">
  <a href="https://www.linkedin.com/in/victor-tavares-dev/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
  </a>
  <a href="https://github.com/victortavaresdev">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
  </a>
  <a href="mailto:victortavaresdev@gmail.com">
      <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white">
  </a>
</p>
