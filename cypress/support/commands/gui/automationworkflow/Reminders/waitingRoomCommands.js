// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("validateWaitingRoomScreenText", (selector, text) => {
    cy.get(selector,{timeout: 10000}).should('be.visible').contains(text)
}) 