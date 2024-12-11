const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
  screenshotsFolder: "cypress/screenshots",
  e2e: {
    defaultCommandTimeout: 30000,

    responseTimeout: 30000,

    viewportWidth: 1920,
    viewportHeight: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
