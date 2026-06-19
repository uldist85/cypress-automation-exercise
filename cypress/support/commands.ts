// 1. Vispirms pasakām TypeScript, ka tāda komanda eksistē (Pašā augšā)
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}

// 2. Un tikai pēc tam nāk pati izpildes loģika (Atsevišķi apakšā)
import { loginPage } from '../page_objects/LoginPage';

Cypress.Commands.add('login', (email, password) => {
  loginPage.login(email, password); 
});

export {};