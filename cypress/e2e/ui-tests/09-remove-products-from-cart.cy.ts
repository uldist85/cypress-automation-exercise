import { loginPage } from "../../page_objects/LoginPage";

describe('Remove products from cart Test Suite', () => {

    it('Should display error message for incorrect username and password', () => {
        cy.visit('/');
        cy.get('.logo img').should('be.visible');
        cy.get('a[href="/login"]').click();
        cy.fixture('user').then((userData) => {
            cy.get('.login-form h2').should('have.text', 'Login to your account');
            loginPage.login(userData.email, userData.password);

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

            cy.get('.cart_delete').click();
            cy.get('.cart_delete').should('not.exist');
            cy.get('.cart_total_price').should('not.exist');
            cy.get('#empty_cart').should('contain.text', 'Cart is empty!');

        })
    })
})