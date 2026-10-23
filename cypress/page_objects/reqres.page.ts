export class MainPageReqresPage {
    url = 'https://app.reqres.in/';
    private signUpButtonText = 'Get Started';
    private emailInput = '[name="identifier"]';
    private continueButton = '.cl-formButtonPrimary';

    // Metodes darbībām ar elementiem
    clickGetStarted(): this {
        cy.contains('button', this.signUpButtonText).click({ force: true });
        return this;
    }

    emailEnter(email: string): this {
        cy.get(this.emailInput).type(email);
        return this;
    }

    clickContinue(): this {
        //pirmais this nosaka tipu, kas ir pati objekta klase
        //this ir TypeScript tipa norāde
        //lai typescript saprastu, ka šī funkcija atgriež pašu objektu, uz kura tā tika izsaukta
        // this norāda uz pašu MainPageReqresPage klases objektu, uz kura tika izsaukta šī metode

        cy.get(this.continueButton).click();
        //Tu izveido MainPageReqresPage klases objektu, kuram ir šie mainīgie un metodes.
        //Tāpēc, piemēram, this.continueButton nozīmē: paņem continueButton vērtību no šī objekta.
        return this;
        //return this	Atgriež pašreizējo objektu(MainPageReqresPage) no funkcijas/ Tā ir komanda, kas pasaka: „Atgriez šo objektu.”
        //return this — ļauj ķēdēt metodes.
        //bez return this mēs nevarētu izpildīt nākamās funkcijas no šī objekta
        //nevarētu izveidot šādu metožu ķēdi! Taču nākamās funkcijas joprojām varētu izsaukt atsevišķi.
        //Return this ļauj ķēdēt metodes, jo tas atgriež pašu objektu, uz kura var izsaukt citas metodes.
        //Cypress projektā tas nozīmē: clickContinue() veic klikšķi un pēc tam atgriež mainPageReqresPage objektu, 
        // lai tu varētu turpināt izsaukt, piemēram, .emailEnter() vai citas šī objekta metodes.
        //return this ir reāla JavaScript darbība, kas atgriež objektu.
    }

    closePopupIfVisible(): this {
        cy.wait(1500);
        cy.get('body').then(($body) => {
            if ($body.find('.cl-modalBackdrop').length > 0) {
                cy.get('body').type('{esc}');   // Clerk modālie logi aizveras ar Esc
                cy.get('.cl-modalBackdrop').should('not.exist');
            }
        });
        return this;
    }
}

export const mainPageReqresPage = new MainPageReqresPage();