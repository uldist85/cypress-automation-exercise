import { defineConfig } from "cypress";
import * as fs from "fs";

export default defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com/", 
    setupNodeEvents(on, config) {
      on('task', {
        deleteOldReportsAndScreenshots() {
          if (fs.existsSync('cypress/screenshots')) {
            fs.rmSync('cypress/screenshots', { recursive: true, force: true });
          }
          if (fs.existsSync('cypress/results/spelling-errors.json')) {
            fs.unlinkSync('cypress/results/spelling-errors.json');
          }
          if (fs.existsSync('cypress/results/pages.json')) {
            fs.unlinkSync('cypress/results/pages.json');
          }
          return null;
        }
      });
      return config;
    },
  },
});