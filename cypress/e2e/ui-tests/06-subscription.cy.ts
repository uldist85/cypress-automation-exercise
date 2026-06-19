import { loginPage } from "../../page_objects/LoginPage";

describe('Subscription Test Suite ', () => {
    it('Should successfully subscribe to newsletter', () => {
        cy.visit('/');
        cy.get('.logo img').should('be.visible');
        cy.get('a[href="/login"]').click();

        cy.fixture('user').then((userData) => {
            cy.login(userData.email, userData.password);
        });

        cy.get('.footer-widget').scrollIntoView();
        cy.get('#susbscribe_email').type('uldistest@test.com');
        cy.get('#subscribe').click();
        cy.get('.alert-success').should('contain.text', 'You have been successfully subscribed!');

    })

})
