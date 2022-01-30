///<reference types="Cypress"/>
/*
EPIC- CRU-3581 Add & Edit practice information from Enterprises list.
AUTO-302-Verify superadmin user can erase 'External ID' from existing practice
AUTO-303-Verify Superadmin External-id with special Characters.
*/
const accountData = require('../../../../../fixtures/gui/automationworkflow/accounts.json')
const practiseData = require('../../../../../fixtures/gui/automationworkflow/practise.json')
var isContainExternalID = false
describe('This validates that user can erase existing External ID and Update it with special characters', () => {
    beforeEach(function () {
        cy.log('navigate to Enterprise list on successful log in')
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

    it('Verify Superadmin user can add External-id with special Characters.', () => {
        cy.log('***User is on Enterprise list section***')
        cy.searchAndSelectEnterprise(practiseData)
        cy.selectPractiseAndUpdateExternalIDWithSpecialCharacter(practiseData,isContainExternalID)

    })
    it('Verify superadmin user can remove External ID from existing practice', () => {
        cy.log('***User is on Enterprise list section***')
        isContainExternalID=true
        cy.searchAndSelectEnterprise(practiseData)
        cy.selectPractiseAndUpdateExternalIDWithSpecialCharacter(practiseData,isContainExternalID)

    })

   

})