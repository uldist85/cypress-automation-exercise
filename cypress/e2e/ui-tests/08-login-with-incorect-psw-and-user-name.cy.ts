import { loginPage } from "../../page_objects/LoginPage";

describe('Login with incorrect username and password Test Suite', () => {

    it('Should display error message for incorrect username and password', () => {
        cy.visit('/');  
        cy.get('.logo img').should('be.visible');
        cy.get('a[href="/login"]').click();
        cy.get('.login-form h2').should('have.text', 'Login to your account');  
        cy.fixture('user').then((userData) => {
            // 2. Izmantojam datus no faila: userData.email un userData.password
            loginPage.login(userData.incorrectEmail, userData.incorrectPassword);
        });
        cy.get('.login-form p').should('contain.text', 'Your email or password is incorrect!');
    })
})