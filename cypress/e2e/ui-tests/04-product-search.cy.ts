import { productsPage } from '../../page_objects/ProductsPage';

describe('Product Search Test Suite', () => {

    it('Should successfully search for a product', () => {
        cy.visit('/products');
        productsPage.searchProduct('T-Shirt');
        cy.get('.title').should('contain.text', 'Searched Products');
        cy.get('.single-products').should('have.length', 3);
        cy.get('.productinfo p').each(($el) => {
            const text = $el.text().toLowerCase();

            expect(text).to.include('t');
            expect(text).to.include('shirt');
        });
    });

}); 