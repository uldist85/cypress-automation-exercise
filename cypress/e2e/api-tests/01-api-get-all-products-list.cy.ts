describe('Automation Exercise - API Tests', () => {

    it('API 1: Should get all products list with valid JSON structure', () => {
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/productsList'
        }).then((response) => {
            // Pārbaudām pamata HTTP statusu
            expect(response.status).to.eq(200);

            // Tā kā šis API reizēm atgriež stringu, ko vajag noparsēt:
            const responseBody = typeof response.body === 'string' 
                ? JSON.parse(response.body) 
                : response.body;

            // Pārbaudām, vai atbildes kods pašā JSON ir 200
            expect(responseBody.responseCode).to.eq(200);

            // Pārbaudām, vai īpašība 'products' ir saraksts (masīvs)
            expect(responseBody.products).to.be.an('array');

            // Pārbaudām, vai saraksts nav tukšs (tajā ir vismaz 1 produkts)
            expect(responseBody.products.length).to.be.greaterThan(0);

            // Pārbaudām, vai pirmajam produktam ir ID un nosaukums (datu integritāte)
            expect(responseBody.products[0]).to.have.property('id');
            expect(responseBody.products[0]).to.have.property('name');
        });
    });

});