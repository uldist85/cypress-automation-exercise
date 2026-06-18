it('API 5: Should successfully search for products by keyword', () => {
    const searchKeyword = 'tshirt'; // Vari nomainīt uz 'top' vai 'jean'

    cy.log(`Veicam produktu meklēšanu ar atslēgvārdu: ${searchKeyword}`);

    cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/searchProduct',
        form: true, // Sūtām kā form-data parametru
        body: {
            search_product: searchKeyword // Meklēšanas parametrs no API dokumentācijas
        }
    }).then((response) => {
        // Pārbaudām HTTP statusu
        expect(response.status).to.eq(200);

        // Mūsu drošības spilvens (string -> objekts)
        const responseBody = typeof response.body === 'string' 
            ? JSON.parse(response.body) 
            : response.body;

        // 1. Pārbaudām sistēmas atbildes kodu JSON iekšienē
        expect(responseBody.responseCode).to.eq(200);

        // 2. Pārbaudām, vai atbildē ir produktu masīvs (saraksts)
        expect(responseBody.products).to.be.an('array');
        expect(responseBody.products.length).to.be.greaterThan(0);

        // Izlogojam, cik produkti tika atrasti
        cy.log(`Atrasto produktu skaits: ${responseBody.products.length}`);

        // 3. SENIOR QA LĪMENIS: Pārbaudām, vai pirmajā produktā tiešām ir meklētais vārds
        // Pārvēršam produkta nosaukumu uz mazajiem burtiem (lowercase), lai meklēšana nebūtu jutīga pret lielajiem burtiem
        const firstProductName = responseBody.products[0].name.toLowerCase();
        expect(firstProductName).to.include(searchKeyword.toLowerCase());
        
        cy.log('Pirmā atrastā produkta nosaukums: ' + responseBody.products[0].name);
    });
});