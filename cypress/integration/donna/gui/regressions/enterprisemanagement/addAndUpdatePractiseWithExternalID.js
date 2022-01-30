///<reference types="Cypress"/>
/*
EPIC- CRU-3581 Add & Edit practice information from Enterprises list.
AUTO-298-Verify superadmin user can add 'External ID' to existing practice
AUTO-299-Verify superadmin user can update/edit 'External ID' for a practice
*/
const accountData = require('../../../../../fixtures/gui/automationworkflow/accounts.json')
const practiseData = require('../../../../../fixtures/gui/automationworkflow/practise.json')
var isContainExternalID = false
describe('This validates Add & Edit practice information from Enterprises list', () => {
    beforeEach(function () {
        cy.log('navigate to Enterprise list  on successful log in')
        cy.uiLoginByAPI(accountData[3].adminusername, accountData[3].adminpwd, Cypress.env('backendUrl') + "auth")
        cy.intercept(Cypress.env('backendUrl')+"api/users/superadmins").as('waitForEnterpriseList')
        cy.visit('/admin/enterprises/list')
        cy.wait('@waitForEnterpriseList')
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.log('***User Logged in with ' + accountData[3].profile + ' Profile***')
        // cy.wait(4000)
    })

    it('Creating data Prerequisite', () => {
        cy.log('***User is on Enterprise list section***')
        cy.searchAndSelectEnterprise(practiseData)
        cy.preRequsiteForExternalID()

    })
    it('Verify superadmin user can add External ID to existing practice', () => {
        cy.log('***User is on Enterprise list section***')
        cy.searchAndSelectEnterprise(practiseData)
        cy.addOrUpdateExternalIdToExistingPractise(practiseData, isContainExternalID)

    })

    it('Verify superadmin user can Update External ID to existing practice', () => {
        cy.log('***User is on Enterprise list section***')
        isContainExternalID = true
        cy.searchAndSelectEnterprise(practiseData)
        cy.addOrUpdateExternalIdToExistingPractise(practiseData, isContainExternalID)
        // cy.selectPractiseAndAddOrUpdateExternalID(practiseData, isContainExternalID)

    })

})