import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Šeit mēs definējam mājaslapas pamata adresi,
    // lai testos varētu rakstīt vienkārši cy.visit('/')
    baseUrl: 'https://automationexercise.com',
    
    // Šis pasaka Cypress, kur meklēt tavus testus
    specPattern: 'cypress/e2e/**/*.cy.ts',
    
    // Ekrāna izmērs, kurā izpildīsies testi (ērti dizainam)
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Izslēdzam video ierakstīšanu katram testam, lai ekonomētu datora resursus
    video: false,
    
    // Ja tests nokrīt, Cypress mēģinās to izpildīt vēlreiz (noderīgi pret "gļukiem")
    retries: {
      runMode: 2,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      // Šeit nākotnē varēsi likt dažādus spraudņus (plugins)
      return config;
    },
  },
});