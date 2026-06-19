/// <reference types="cypress-real-events" />

import { loginPage } from "../../page_objects/LoginPage";

describe('Buy Item Test', () => {
    //noignore majas lapas kludu ignorēšana, lai tests neapstājas, ja lapā ir JS kļūdas
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Should successfully buy an item', () => {
        cy.visit('/');
        cy.get('a[href="/login"]').click();
        cy.get('.login-form h2').should('have.text', 'Login to your account');
        cy.fixture('user').then((userData) => {
            cy.login(userData.email, userData.password);
        });

        cy.get('.shop-menu .nav a').contains('Products').click();
        cy.get('.brands-name .nav a').contains('Polo').click();
        cy.contains('Green Side Placket Detail T-Shirt')
            .closest('.single-products')
            .parent() // pakāpjamies uz galveno rāmi
            .find('a').contains('View Product')
            .click();

        cy.get('button.cart').click();

        cy.get('u').contains('View Cart').click();

        cy.get('.cart_description').should('contain.text', 'Green Side Placket Detail T-Shirt');

        cy.get('.cart_total_price').should('contain.text', 'Rs. 1000');
        cy.get('.col-sm-6 > .btn').should('have.text', 'Proceed To Checkout').click();

        cy.get('.heading').should('contain.text', 'Address Details');

        cy.get('.container a.btn').should('have.text', 'Place Order').click();

        cy.get('.heading').should('contain.text', 'Payment');

        cy.get('[data-qa="name-on-card"]').type('Uldis Test');
        cy.get('[data-qa="card-number"]').type('5242424242424242');
        cy.get('[data-qa="cvc"]').type('313');
        cy.get('[data-qa="expiry-month"]').type('10');
        cy.get('[data-qa="expiry-year"]').type('2029');

        cy.get('[data-qa="pay-button"]').click();

        cy.get('[data-qa="order-placed"]').should('contain.text', 'Order Placed!');
        cy.get('a.btn-default').contains('Download Invoice').click();
        cy.wait(1000);

        cy.readFile('cypress/downloads/invoice.txt').should('exist');

        cy.readFile('cypress/downloads/invoice.txt').should('contain', 'Hi Uldis Test, Your total purchase amount is 1000. Thank you');
        cy.get('[data-qa="continue-button"]').should('have.text', 'Continue').click();
        cy.get('.shop-menu .nav a').contains('Home').should('be.visible');
    });


});