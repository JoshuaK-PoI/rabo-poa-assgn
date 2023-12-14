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

## Application install

Clone the repository to your local machine:

```bash
git clone https://github.com:__TODO__/__TODO__.git
```

To install the application dependencies, run the following command in the root directory
of the project:

```bash
npm install
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

# Testing the application

To run the unit tests, run the following command in the root directory of the project:

```bash
npm run test -- -- --no-watch
```

or

```bash
ng test --no-watch
```

To show coverage reports, run the following command in the root directory of the project:

```bash
npm run test -- -- --no-watch --code-coverage
```

or

```bash
ng test --no-watch --code-coverage
```
