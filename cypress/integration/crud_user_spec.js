describe('CRUD Operations for User API', () => {
    const token = '8cded18945a8fd3ea5d3ea0b13b341ff9ffad692c2cda0ba2b1f47124302032c'; //
    let userId;

    it('Create a user', () => {
        const email = `john.doe.${Date.now()}@test.com`;
        cy.apiRequest('POST', '/users', {
            name: 'John Doe',
            gender: 'male',
            email: `john.doe.${Date.now()}@test.com`,
            status: 'active'
        }, token).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq('John Doe');
            expect(response.body.status).to.eq('active');
            expect(response.body.email).to.eq(email);
            userId = response.body.id;
        });
    });

    it('Retrieve the created user', () => {
        cy.apiRequest('GET', `/users/${userId}`, null, token).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', userId);
            expect(response.body.name).to.eq('John Doe');
            expect(response.body.status).to.eq('active');
        });
    });

    it('Update the user', () => {
        cy.apiRequest('PUT', `/users/${userId}`, {
            name: 'John Updated',
            status: 'inactive'
        }, token).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'John Updated');
            expect(response.body.status).to.eq('inactive');
        });
    });

    it('Delete the user', () => {
        cy.apiRequest('DELETE', `/users/${userId}`, null, token).then(response => {
            expect(response.status).to.eq(204);
        });
    });

    it('Verify the user is deleted', () => {
        cy.apiRequest('GET', `/users/${userId}`, null, token).then(response => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'Resource not found');
        });
    });

    it('Create another user and ensure unique ID', () => {
        cy.apiRequest('POST', '/users', {
            name: 'Jane Smith',
            gender: 'female',
            email: `jane.smith.${Date.now()}@test.com`,
            status: 'active'
        }, token).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq('Jane Smith');
            expect(response.body.status).to.eq('active');
            expect(response.body.id).to.not.eq(userId); // Validate that ID is different from the previous user
        });
    });
});

