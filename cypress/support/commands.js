// Cypress.Commands.add('apiRequest', (method, url, body, token) => {
//     return cy.request({
//         method,
//         url: `https://gorest.co.in/public/v2${url}`,
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         body,
//         failOnStatusCode: false // If you do not want status codes to cause failures pass the option: failOnStatusCode: false..
//     });
// });


Cypress.Commands.add('apiRequest', (method, url, body, token) => {
    const baseUrl = Cypress.config('baseUrl'); // Get baseUrl from Cypress config
    const headers = {
      Authorization: `Bearer ${token}`,  // Use the retrieved token
      'Content-Type': 'application/json'
    };
  
    // Log the entire request for debugging
    Cypress.log({
      name: 'apiRequest',
      displayName: 'API Request',
      consoleProps: () => {
        return {
          Method: method,
          URL: `${baseUrl}${url}`,
          Headers: headers,
          Body: body
        };
      }
    });
  
    return cy.request({
      method: method,                // Pass method explicitly
      url: `${baseUrl}${url}`,    // Use baseUrl from config
      headers: headers,
      body: body,
      failOnStatusCode: false
    });
  });