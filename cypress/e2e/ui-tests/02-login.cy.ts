import { loginPage } from "../../page_objects/LoginPage";

describe('User Login Test Suite', () => {

    it('Should successfully login an existing user', () => {
        cy.visit('/');

        cy.get('.logo img').should('be.visible');

        cy.get('a[href="/login"]').click();

        cy.get('.login-form h2').should('have.text', 'Login to your account');

        cy.fixture('user').then((userData) => {
            loginPage.login(userData.email, userData.password);
        });

        cy.get(':nth-child(10) > a').should('contain.text', 'Uldis Test');

    });

});