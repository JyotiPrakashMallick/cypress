// ***********************************************
// create various custom commands for widget page
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

import onlineBookingwidgetSelector from '../../../selectors/scheduling/onlineBookingWidgetSelector'

  // GetiFrame Command
  Cypress.Commands.add('getIframeBody', () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    cy.log('getIframeBody')
  
    return cy
    .get('iframe[id="CareCruIframe"]', { log: false })
    .its('0.contentDocument.body', { log: false }).should('not.be.empty')
    // wraps "body" DOM element to allow
    .then((body) => cy.wrap(body, { log: false }))
  })