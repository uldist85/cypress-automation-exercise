describe('User Registration Test Suite', () => {

    it('Should successfully register a new user', () => {
        cy.visit('/');

        cy.get('.logo img').should('be.visible');

        cy.get('a[href="/login"]').click();

        cy.get('.signup-form h2').should('have.text', 'New User Signup!');

        // Ievadām vārdu un unikālu e-pastu
        // Tā kā e-pastam jābūt jaunam katru reizi, izmantojam Timestamp
        const uniqueEmail = `testuser_${Date.now()}@test.com`;

        cy.get('[data-qa="signup-name"]').type('Uldis Test');
        cy.get('[data-qa="signup-email"]').type(uniqueEmail);


        cy.get('[data-qa="signup-button"]').click();


        cy.get('.login-form h2').first().should('contain.text', 'Enter Account Information');


        cy.get('#id_gender1').click(); // Izvēlas "Mr."
        cy.get('[data-qa="password"]').type('ManaParole123');

        cy.get('[data-qa="days"]').select('10');
        cy.get('[data-qa="months"]').select('May');
        cy.get('[data-qa="years"]').select('1990');


        cy.get('#newsletter').check();
        cy.get('#optin').check();

        cy.get('[data-qa="first_name"]').type('Uldis');
        cy.get('[data-qa="last_name"]').type('Test');
        cy.get('[data-qa="company"]').type('Test Company');
        cy.get('[data-qa="address"]').type('123 Test Street');
        cy.get('[data-qa="address2"]').type('Apt 4B');
        cy.get('[data-qa="country"]').select('United States');  
        cy.get('[data-qa="state"]').type('California');
        cy.get('[data-qa="city"]').type('Los Angeles');
        cy.get('[data-qa="zipcode"]').type('90001');
        cy.get('[data-qa="mobile_number"]').type('+1234567890');

        cy.get('[data-qa="create-account"]').click();

        cy.get('.title').should('contain.text', 'Account Created!');    

    });

});