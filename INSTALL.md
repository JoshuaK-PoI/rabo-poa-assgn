# Installation

## Prerequisites

This project requires that you have the following installed:

- [Node.js (v18 or higher)](https://nodejs.org/en/download/)

## Recommendations

If you want to make use of the `ng` commands to start the application,
use the following command to install the Angular CLI globally:

```bash
npm install -g @angular/cli
```

# Usage

## Starting the application

If you have the Angular CLI installed globally, you can start the application
by running the following command in the root directory of the project:

```bash
ng serve
```

If you do not have the Angular CLI installed globally, you can start the
application by running the following command in the root directory of the
project:

```bash
npm run start
```

# Seeding fake customer data

The project is already supplied with a `customers.json` file in `src/assets`. If you wish to seed new data, run the following command:

```bash
npm run seed
```
