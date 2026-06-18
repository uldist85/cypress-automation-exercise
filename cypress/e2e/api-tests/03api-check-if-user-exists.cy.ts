it('API 3: Should verify login with valid details using fixture', () => {
    // 1. Paņemam datus no mūsu user fiksācijas faila
    cy.fixture('user').then((userData) => {
        
        // 2. Veicam POST pieprasījumu ar šiem datiem
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin',
            form: true, // Norāda, ka sūtām datus kā form-data parametrus
            body: {
                email: userData.email,
                password: userData.password
            }
        }).then((response) => {
            // Pārbaudām pamata HTTP statusu
            expect(response.status).to.eq(200);

            // Noparsējam tekstu par objektu (mūsu drošības spilvens)
            const responseBody = typeof response.body === 'string' 
                ? JSON.parse(response.body) 
                : response.body;

            // 3. Pārbaudām sistēmas atbildi (Response Code un Message)
            expect(responseBody.responseCode).to.eq(200);
            expect(responseBody.message).to.eq('User exists!');
            cy.log('User exists!');
            cy.log('Response Code: ' + responseBody.responseCode);
            cy.log(`User exists ${userData.email}.`);
        });
        
    });
});