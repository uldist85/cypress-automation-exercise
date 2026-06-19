import {productsPage} from "../../page_objects/ProductsPage";

describe('View Product Test Suite', () => {
    it('Should successfully view a product', () => {
        cy.visit('/products');
        productsPage.viewProductDetails('Blue Top');
        cy.get('.product-information h2').should('contain.text', 'Blue Top');
        cy.get('.product-information p').should('contain.text', 'Women');
        cy.get('.product-information p').should('contain.text', 'Availability: In Stock');
        cy.get('.product-information p').should('contain.text', 'Condition: New');
        cy.get('.product-information p').should('contain.text', 'Brand: Polo');


        });
    });