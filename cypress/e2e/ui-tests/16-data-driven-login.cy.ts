import { loginPage } from "../../page_objects/LoginPage";
import loginTestData from "../../fixtures/loginTestData.json";
import { LoginTestData } from "../../support/types";


describe('Data-Driven Login Tests', () => {
    loginTestData.forEach((testData: LoginTestData) => {
        it(testData.testName, () => {
            cy.visit('/');

            cy.get('a[href="/login"]').click();

            loginPage.login(testData.email, testData.password);

            if (testData.expectedResult === 'success') {

                cy.contains('a', 'Logged in as')
                    .should('be.visible')
                    .and('contain.text', 'Uldis Test');

            } else {

                cy.get('.login-form')
                    .should('contain.text', 'Your email or password is incorrect!');

            }

        });
    });
});