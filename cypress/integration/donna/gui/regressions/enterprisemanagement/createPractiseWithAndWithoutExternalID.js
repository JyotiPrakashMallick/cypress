///<reference types="Cypress"/>
/*
EPIC- CRU-3581 Add & Edit practice information from Enterprises list.
AUTO-296-Verify superadmin user can create a practice with 'External ID'
AUTO-297-Verify superadmin user can create a practice without 'External ID'
*/
const accountData = require('../../../../../fixtures/gui/automationworkflow/accounts.json')
const practiceData = require('../../../../../fixtures/gui/automationworkflow/practise.json')
describe('This validates Add & Edit practice information from Enterprises list', () => {
    let externalID
    beforeEach(function () {
        cy.log('navigate to Practise section on successful log in')
        cy.intercept(Cypress.env('backendUrl')+"api/users/superadmins").as('waitForEnterpriseList')
        cy.uiLoginByAPI(accountData[3].adminusername, accountData[3].adminpwd, Cypress.env('backendUrl') + "auth")
        cy.visit('/admin/enterprises/list')
        cy.wait('@waitForEnterpriseList')
        
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          });
          cy.log('***User Logged in with ' + accountData[3].profile + ' Profile***')
        // cy.wait(4000)
    })

    it('Verify superadmin user can create a practice with External ID', () => {
        cy.log('***User is on Enterprise section***')
        externalID=true
        cy.createPractice(practiceData,externalID)

    })

    it('Verify superadmin user can create a practice without External ID', () => {
        cy.log('***User is on Enterprise section***')
        externalID=false
        cy.createPractice(practiceData,externalID)

    })

})