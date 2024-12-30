const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',  // Use mochawesome reporter
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',  // Directory where reports will be stored
    overwrite: false,              // Prevent overwriting previous reports
    html: true,                    // Generate HTML report
    json: true,                    // Generate JSON report
  },
  screenshotsFolder: "cypress/screenshots",  // Folder for screenshots
  e2e: {
    defaultCommandTimeout: 30000,  // Timeout for each Cypress command (30s)
    responseTimeout: 30000,        // Timeout for server responses (30s)
    
    viewportWidth: 1920,           // Set viewport width
    viewportHeight: 1280,          // Set viewport height

    setupNodeEvents(on, config) {
      // Setup Mochawesome reporter plugin for handling the reporting process
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});