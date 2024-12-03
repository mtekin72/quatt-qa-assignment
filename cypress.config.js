// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gorest.co.in/public/v2',
    specPattern: 'cypress/integration/**/*.js', // Ensure this matches your file path
  },
});
