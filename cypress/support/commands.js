Cypress.Commands.add('apiRequest', (method, url, body, token) => {
    return cy.request({
        method,
        url: `https://gorest.co.in/public/v2${url}`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body,
        failOnStatusCode: false // If you do not want status codes to cause failures pass the option: failOnStatusCode: false../
    });
});
