# CRUD User API Tests with Cypress

## Overview
This project contains end-to-end tests for CRUD operations on the GoRest User API using Cypress. The tests ensure API functionality and demonstrate good test structuring.

## Prerequisites
- Node.js and npm installed.
- A valid GoRest API Bearer Token.

## Setup
1. Clone this repository:
   ```bash
   git clone <repository-link>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Replace `your_bearer_token_here` in `cypress/integration/crud_user_spec.js` with a valid Bearer Token.

## Run Tests
- To run the tests in headless mode:
  ```bash
  npx cypress run
  ```
- To run the tests in the Cypress GUI:
  ```bash
  npx cypress open
  ```