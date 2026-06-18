class ProductsPage {
  // 1. Definējam lokatorus
  private searchInput = '#search_product'; // Meklēšanas lauka ID
  private searchButton = '#submit_search'; // Meklēšanas pogas ID
  private productItems = '.single-products'; // Paša produkta rāmītis sarakstā
  private allProductNames = '.productinfo p'; // Produkta nosaukuma teksts kartītē

  // 2. Funkcija produkta meklēšanai
  searchProduct(productName: string) {
    cy.get(this.searchInput).type(productName);
    cy.get(this.searchButton).click();
  }

  // 3. Funkcija, lai atvērtu konkrēta zīmola (Brand) sadaļu kreisajā izvēlnē
  filterByBrand(brandName: string) {
    cy.get('.brands-name .nav a').contains(brandName).click();
  }

  // 4. Funkcija, kas atrod produktu pēc nosaukuma un uzspiež "View Product"
  viewProductDetails(productName: string) {
    cy.contains(productName)
      .closest(this.productItems)
      .parent()
      .find('a')
      .contains('View Product')
      .click();
  }

  // 5. Pārbaudes funkcija (Assertion) – pārbauda, vai visi meklēšanas rezultāti satur meklēto vārdu
  verifySearchResultsContain(keyword: string) {
    cy.get(this.allProductNames).each(($el) => {
      // .each() iziet cauri katram atrastajam produkta nosaukumam sarakstā
      cy.wrap($el).should('contain.text', keyword);
    });
  }
}

export const productsPage = new ProductsPage();