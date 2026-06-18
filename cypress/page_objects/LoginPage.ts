class LoginPage {
  // 1. Definējam lokatorus kā klases elementus (lai tie nav "izmētāti" pa testu)
  private loginEmailInput = '[data-qa="login-email"]';
  private loginPasswordInput = '[data-qa="login-password"]';
  private loginButton = '[data-qa="login-button"]';
  private signupNameInput = '[data-qa="signup-name"]';
  private signupEmailInput = '[data-qa="signup-email"]';
  private signupButton = '[data-qa="signup-button"]';

  // 2. Izveidojam gatavu un atkārtoti izmantojamu funkciju (metodi)
  login(email: string, password: string) {
    cy.get(this.loginEmailInput).type(email);
    cy.get(this.loginPasswordInput).type(password);
    cy.get(this.loginButton).click();
  }

  // Funkcija reģistrācijai
  startSignup(name: string, email: string) {
    cy.get(this.signupNameInput).type(name);
    cy.get(this.signupEmailInput).type(email);
    cy.get(this.signupButton).click();
  }
}

// Eksportējam klases instanci, lai to varētu viegli importēt testos
export const loginPage = new LoginPage();