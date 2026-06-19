import { productsPage } from '../../page_objects/ProductsPage';

describe('Filter by Brand Name Test Suite', () => {

    it('Should successfully filter products by brand name', () => {
        cy.visit('/products');
        productsPage.filterByBrand('Polo');
        cy.get('.title').should('contain.text', 'Polo Products');
        cy.get('.single-products').should('have.length', 6);
        cy.get('.title').each(($el) => {
            const text = $el.text().toLowerCase();

            expect(text).to.include('polo');
           
        });
    });

}); 



