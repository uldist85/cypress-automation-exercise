it('API 2: Should refuse POST request to products list with 405 error', () => {
    cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/productsList',
        failOnStatusCode: false // Pasakām Cypress, ka 405 kods šoreiz ir OK un testu gāzt nevajag
    }).then((response) => {
        // 1. Pārbaudām, vai HTTP statuss ir tieši 405
        expect(response.status).to.eq(200); // Šī konkrētā lapa atgriež 200 HTTP, bet JSON iekšienē ieliek 405

        const responseBody = typeof response.body === 'string' 
            ? JSON.parse(response.body) 
            : response.body;

        // 2. Pārbaudām, vai sistēmas atbildes kods ir 405
        expect(responseBody.responseCode).to.eq(405);

        // 3. Pārbaudām, vai paziņojuma teksts ir precīzs
        expect(responseBody.message).to.eq('This request method is not supported.');
    });
});