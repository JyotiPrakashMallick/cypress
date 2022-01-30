///<reference types="Cypress"/>
/*
EPIC: CRU-3304 Improve enterprise list search
AUTO-476-Ability to search practice that does not exist
AUTO-475-Ability to search enterprise that does not exist
*/

describe('This is a test for searching existing and not existing enterprise', () => {
    beforeEach(function () {
       
        cy.apilogin(Cypress.env('superadmin_email'),Cypress.env('superadmin_password'),Cypress.env('backendUrl')+"auth")
        cy.intercept(Cypress.env('backendUrl')+"/api/users/superadmins").as('waitForEnterpriseList')
        cy.visit('/admin/enterprises/list')
        cy.wait('@waitForEnterpriseList')
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
    })

    it('Verify that when searching for non existing practice and enterprise it  will display No Groups Found', () => {
        var uuid = require("uuid")
        var testEnterprisePractice = uuid.v4()
        cy.searchPracticeOrEnterprise(testEnterprisePractice)
       expect(cy.contains('No Groups Found'))
    })
})