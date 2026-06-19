import { productsPage } from "../../page_objects/ProductsPage";

describe('Product Search Test Suite', () => {

    it('Should return products matching the search keyword', () => {
        cy.visit('/products');

        const searchKeyword = 'Polo'; // Vārds, kuru meklēsim

        cy.get('#search_product').type(searchKeyword);
        cy.get('#submit_search').click();

        productsPage.verifySearchResultsContain(searchKeyword);
    });
});