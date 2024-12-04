# CRUD User API Tests with Cypress

## Overview
This project contains end-to-end tests for CRUD (Create, Read, Update, Delete) operations on the GoRest User API using Cypress. The tests ensure the API's functionality and demonstrate best practices for test structuring, including clear, maintainable code and robust test scenarios.

## Test Strategy
Our test strategy focuses on the following:
- **End-to-End Testing**: Simulating real user interactions with the API to ensure correct behavior from start to finish.
- **Comprehensive Coverage**: Ensuring that all CRUD operations are covered, including scenarios for successful operations, validation errors, and edge cases.
- **Validation of API Responses**: Verifying that responses include expected status codes, content, and proper error messages.
- **Reusability**: Using helper functions and reusable commands to keep tests concise and maintainable.

## Test Coverage
The test suite covers the following scenarios:

### Create User
- Successful creation of a new user with valid data.
- Attempt to create a user with a duplicate email address.

### Read User
- Retrieval of a user by ID to confirm details match the expected output.
- Verification of handling 404 errors when trying to read a non-existent user.

### Update User
- Successful update of an existing user's information.
- Validation of response status and content after an update.

### Delete User
- Successful deletion of an existing user.
- Verification of handling 404 errors when trying to delete a non-existent user.

### Additional Tests
- Ensure that duplicate creation attempts return the appropriate error response.
- Verify that updating a user with a non-existent ID results in a proper error.

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
5. **Update `cypress.config.js`**: Ensure that the `projectId` property is set with your unique project ID from the Cypress Dashboard.

## GitHub Actions CI/CD Integration
To run the tests in a continuous integration/continuous deployment (CI/CD) pipeline, we use GitHub Actions. The workflow is configured to run the tests automatically on push or pull request events.

### Setup GitHub Actions
1. Ensure your GitHub repository has a `secrets` setting for storing the API token securely.
2. Create a `.github/workflows/cypress.yml` file in your repository with the following content:
   ```yaml
   name: Run Cypress Tests

   on:
     push:
       branches:
         - main
     pull_request:
       branches:
         - main

   jobs:
     cypress-run:
       runs-on: ubuntu-latest  # or ubuntu-22.04 if preferred

       strategy:
         matrix:
           node-version: [16]  # Adjust if you need a different Node version

       steps:
         - name: Checkout repository
           uses: actions/checkout@v3  

         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
             node-version: ${{ matrix.node-version }}

         - name: Install dependencies
           run: npm ci  

         - name: Run Cypress Tests
           uses: cypress-io/github-action@v6  
           with:
             record: true
           env:
             CYPRESS_API_TOKEN: ${{ secrets.CYPRESS_API_TOKEN }}
             CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

## Connecting GitHub Actions with Cypress Dashboard
To integrate Cypress with GitHub Actions and the Cypress Dashboard:

1. **CYPRESS_RECORD_KEY**: Create an account on the [Cypress Dashboard](https://dashboard.cypress.io) and obtain your record key from your project settings.
2. **Add the Record Key to GitHub Secrets**:
   - Go to your GitHub repository.
   - Navigate to `Settings` > `Secrets` > `Actions` > `New repository secret`.
   - Add `CYPRESS_RECORD_KEY` as the name and paste the record key as the value.

3. **Update GitHub Actions Workflow**:
   Modify the `.github/workflows/cypress.yml` file to include the `--record` flag for recording test results and the `CYPRESS_RECORD_KEY` as an environment variable:
   ```yaml
   - name: Run Cypress Tests
     uses: cypress-io/github-action@v6  # Cypress GitHub Action
     with:
       record: true
     env:
       CYPRESS_API_TOKEN: ${{ secrets.CYPRESS_API_TOKEN }}
       CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
       GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

4. **Update `cypress.config.js`**: Ensure that the `projectId` property is set with your unique project ID from the Cypress Dashboard.

## Custom Commands for Code Reusability
To enhance code reusability and simplify test implementation, custom commands can be created. For example, the following custom command simplifies making API requests:

```javascript
Cypress.Commands.add('apiRequest', (method, url, body, token) => {
    return cy.request({
        method,
        url: `https://gorest.co.in/public/v2${url}`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body,
        failOnStatusCode: false // If you do not want status codes to cause failures, pass the option: failOnStatusCode: false
    });
});
```

This command helps standardize API calls across test cases, making tests more maintainable and less repetitive.

## Run Tests
- To run the tests in headless mode:
  ```bash
  npx cypress run
  ```
- To run the tests in the Cypress GUI:
  ```bash
  npx cypress open
  ```

## Detailed Test Cases

### Test Case 1: Create a User
- **Description**: Tests the creation of a user with unique email.
- **Expected Outcome**: Response status is 201, and the created user details are returned.

### Test Case 2: Attempt to Create a User with the Same Email
- **Description**: Tests that the API prevents creating a user with an already existing email.
- **Expected Outcome**: Response status is 422, with an error message indicating that the email has already been taken.

### Test Case 3: Retrieve a Created User
- **Description**: Verifies that the details of a created user can be retrieved by ID.
- **Expected Outcome**: Response status is 200, with the correct user details returned.

### Test Case 4: Update a User
- **Description**: Tests updating the details of an existing user.
- **Expected Outcome**: Response status is 200, and the updated user details are verified.

### Test Case 5: Delete a User
- **Description**: Verifies that a user can be deleted by ID.
- **Expected Outcome**: Response status is 204, confirming successful deletion.

### Test Case 6: Verify Deletion
- **Description**: Checks that an attempt to retrieve a deleted user returns a 404 error.
- **Expected Outcome**: Response status is 404 with an error message indicating the resource is not found.

## Notes
- Ensure the GoRest API token is kept secure and not exposed in the source code.
- Customize the email generation logic as needed to avoid conflicts with existing users.



