it('API 4: Should get user account details by email using fixture', () => {
    // 1. Paņemam e-pastu no fiksācijas faila
    cy.fixture('user').then((userData) => {
        
        cy.log(`Get data about user: ${userData.email}`);

        // 2. Veicam GET pieprasījumu ar query parametru
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/getUserDetailByEmail',
            qs: {
                email: userData.email // Cypress pats šo smuki piekabinās pie URL
            }
        }).then((response) => {
            // Pārbaudām pamata HTTP statusu
            expect(response.status).to.eq(200);

            // Mūsu drošības spilvens (string -> objekts)
            const responseBody = typeof response.body === 'string' 
                ? JSON.parse(response.body) 
                : response.body;

            // 3. Pārbaudām sistēmas atbildes kodu JSON iekšienē
            expect(responseBody.responseCode).to.eq(200);

            // 4. Pārbaudām, vai atbilde satur 'user' objektu
            expect(responseBody).to.have.property('user');
            
            // Izlogojam lietotāja vārdu no datubāzes, lai redzētu, kas tur slēpjas
            cy.log('Found user: ' + responseBody.user.name);
            cy.log('Found user email: ' + responseBody.user.email);

            // 5. Pārbaudām, vai datubāzē esošais e-pasts sakrīt ar to, ko mēs prasījām
            expect(responseBody.user.email).to.eq(userData.email);

            // Papildu drošībai varam pārbaudīt, vai profilam ir galvenie lauki
            expect(responseBody.user).to.have.property('name');
            expect(responseBody.user).to.have.property('first_name');
            expect(responseBody.user).to.have.property('last_name');
        });
        
    });
});