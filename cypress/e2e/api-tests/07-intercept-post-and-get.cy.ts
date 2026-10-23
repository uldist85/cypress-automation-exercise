describe('RESTful API chaining tests', () => {
    // Pirmais tests - izveidojam jaunu objektu ar POST pieprasījumu
    // Definējam mainīgo globāli faila ietvaros
    let createdObjectId: string;

    it('Should create a new object via POST API', () => {
        cy.request('POST', 'https://api.restful-api.dev/objects', {
            name: "Apple MacBook Pro 16",
            data: { year: 2026, price: 1849.99 }
        }).then((response) => {
            expect(response.status).to.eq(200);
            
            // Ierakstām saņemto ID mūsu mainīgajā
            createdObjectId = response.body.id;
            cy.log('Izveidotais ID ir: ' + createdObjectId);
        });
    });

    it('Should retrieve the created object via GET API', () => {
        // Pārliecināmies, ka ID eksistē, un izmantojam to GET pieprasījumā
        expect(createdObjectId, 'ID jābūt saglabātam no iepriekšējā testa').to.be.a('string');

        cy.request('GET', `https://api.restful-api.dev/objects/${createdObjectId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(createdObjectId);
        });
    });
});