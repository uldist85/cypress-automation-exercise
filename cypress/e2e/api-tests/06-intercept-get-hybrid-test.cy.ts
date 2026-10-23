import { productsPage } from '../../page_objects/ProductsPage';

describe('product search API intercept test', () => {
  it('Should intercept product search request', () => {

    cy.intercept('GET', '**/products?search=tshirt').as('productSearch');

    cy.visit('/products');

    cy.contains('Products').click();
    productsPage.searchProduct('tshirt');
  

    cy.wait('@productSearch').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
    });

  });
});