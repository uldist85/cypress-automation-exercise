import { loginPage } from "../../page_objects/LoginPage";

describe('Add review on product', () => {
    it('Should add review on product', () => {
        cy.visit('/');
        cy.get('.logo img').should('be.visible');
        cy.get('a[href="/login"]').click();
        cy.fixture('user').then((userData) => {
            loginPage.login(userData.email, userData.password);
        }
        );
        cy.get(':nth-child(10) > a').should('contain.text', 'Uldis Test');
        cy.get('a[href="/product_details/1"]').click();
        cy.get('.product-information h2').should('have.text', 'Blue Top');
        
        cy.get('#name').type('Uldis Test');
        cy.get('#email').type('testuser_1781766657888@test.com');
        cy.get('[name="review"]').type('This is a great product!');
        cy.get('#button-review').click();
        cy.get('.alert-success > span').should('contain.text', 'Thank you for your review.');
    });
});