import { mainPageReqresPage } from '../../page_objects/reqres.page';

describe('login with mock response on ReqRes', () => {
    it('Should intercept login request and return mock data', () => {
        // 1. Interceptējam pareizo Clerk URL galapunktu (sign_ins)
        cy.intercept('POST', '**/client/sign_ins*', {
            statusCode: 200,
            body: {
                response: {
                    id: "sia_mock_123",
                    status: "needs_first_factor", // Pāriet uz nākamo soli (piem., paroles ievadi)
                    identifier: "test@example.com"
                }
            }
        }).as('loginRequest');

        // 2. Apciemojam lapu
        cy.visit(mainPageReqresPage.url);
        
        mainPageReqresPage
            .closePopupIfVisible()
            .clickGetStarted()
            .emailEnter('test@example.com')
            .clickContinue();

        // 3. Sagaidām pārtverto pieprasījumu
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response?.statusCode).to.eq(200);
            expect(interception.response?.body.response.id).to.eq('sia_mock_123');
            expect(interception.response?.body.response.status).to.eq('needs_first_factor');
        });
    });
});