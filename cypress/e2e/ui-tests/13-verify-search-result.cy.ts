import { productsPage } from "../../page_objects/ProductsPage";

describe('Product Search Test Suite', () => {

    it('Should return products matching the search keyword', () => {
        cy.visit('/products');

        const searchKeyword = 'Polo'; // Vārds, kuru meklēsim

        // 2. Šeit ir tavas iepriekšējās darbības (ierakstīt meklētājā un nospiest enter/pogu)
        cy.get('#search_product').type(searchKeyword);
        cy.get('#submit_search').click();

        // 3. Un te mēs izsaucam tavu jauno, jaudīgo pārbaudes funkciju:
        productsPage.verifySearchResultsContain(searchKeyword);
    });
});