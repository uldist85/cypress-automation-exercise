import { loginPage } from "../../page_objects/LoginPage";

describe('Logout Test Suite', () => {

    it('Should successfully logout an existing user', () => {
        cy.visit('/');
        cy.get('.logo img').should('be.visible');
        cy.get('a[href="/login"]').click();
        cy.fixture('user').then((userData) => {
            cy.login(userData.email, userData.password);
        });
        cy.get(':nth-child(10) > a').should('contain.text', 'Uldis Test');
        cy.get('a[href="/logout"]').click();
        cy.get('.login-form h2').should('have.text', 'Login to your account');
    })
})