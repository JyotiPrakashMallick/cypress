///<reference types="Cypress"/>
/*
EPIC- CRU-3581 Add & Edit practice information from Enterprises list.
AUTO-300-Verify "cancel" & "close" button on edit practice dialouge box
AUTO-301-Verify "Organization & CSM Account Owner" cannot be edited in Edit pratice 
*/
const accountData = require('../../../../../fixtures/gui/automationworkflow/accounts.json')
const practiseData = require('../../../../../fixtures/gui/automationworkflow/practise.json')
var isContainExternalID = false
describe('This validates Edit Practice functionality for existing practice', () => {
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

    it('Verify "cancel" & "close" button on edit practice dialouge box', () => {
        cy.log('***User is on Enterprise list section***')
        cy.searchAndSelectEnterprise(practiseData)
        cy.verifyEditPractisePopUPFields(practiseData)

    })
    it('Verify "Organization & CSM Account Owner" cannot be edited in Edit pratice ', () => {
        cy.log('***User is on Enterprise list section***')
        cy.searchAndSelectEnterprise(practiseData)
        cy.verifyOrganizationAndCSMOwnerField(practiseData)

    })

    // afterEach(function(){
    //     cy.clearLocalStorage()
    // })
})