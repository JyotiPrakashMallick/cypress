/// <reference types="Cypress"/>

/** 
 * AUTO-465 Update the AUTO_UPDATE value in Integrations/NASA is set to 1 for the test practice
 */
const accountData = require('../../../../../../fixtures/gui/automationworkflow/accounts.json')
describe('This validates That AUTO_UPDATE value is set to 1 in NASA settings ',{retries:2} () => {
  before(function () {
    cy.log('navigate to NASA Integration settings')
    cy.uiLoginByAPI(accountData[3].adminusername, accountData[3].adminpwd, Cypress.env('backendUrl') + "auth")
    cy.intercept('https://test-backend.carecru.com/api/accounts').as('waitForIntegrationTab')
    cy.visit('/admin/integrations',{timeout:20000})
    cy.wait('@waitForIntegrationTab').its('response.statusCode').should('eq', 200)
    // cy.intercept('https://test-backend.carecru.com/auth').as('waitForAccountLogin')
    // cy.wait('@waitForAccountLogin').its('response.statusCode').should('eq', 200)
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    });
    cy.log('***User Logged in with ' + accountData[3].profile + ' Profile***')
  })


  it('verify AutoUpdate Enabled feature', () => {
    cy.fetchAccountIdAndSet(Cypress.env('token')).then((res) => {
      let practiseName
      cy.log('****ACCOUNT ID:***', res.body.accountId)
      cy.log('****Selected Practise:***', res.body.account.name)
      practiseName=res.body.account.name
      cy.getAccountConfigurationAndUpdateAutoEnabled(practiseName)
    })
    
  })
})

