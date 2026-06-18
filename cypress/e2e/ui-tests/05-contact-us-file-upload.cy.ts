describe('File Upload Test Suite', () => {

    it('Should successfully upload a file', () => {
        cy.visit('/contact_us');
        cy.get('div.contact-form .title').should('contain.text', 'Get In Touch');


        cy.get('[data-qa="name"]').type('Uldis Test');
        cy.get('[data-qa="email"]').type('test@example.com');
        cy.get('[data-qa="subject"]').type('Test Subject');
        cy.get('[data-qa="message"]').type('This is a test message.');

        cy.get('[name="upload_file"]').selectFile('cypress/fixtures/example.json', { force: true });
        cy.get('[data-qa="submit-button"]').click();
        cy.get('.status.alert.alert-success').should('contain.text', 'Success! Your details have been submitted successfully.');
    })
})