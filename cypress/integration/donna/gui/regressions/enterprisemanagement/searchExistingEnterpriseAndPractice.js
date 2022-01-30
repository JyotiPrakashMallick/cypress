///<reference types="Cypress"/>
/*
EPIC: CRU-3304 Improve enterprise list search
AUTO-470-Ability to search practice
AUTO-469-Ability to search enterprise
*/

const testData = require('../../../../../fixtures/gui/enterprisemanagement/entPracSearchData.json')
testData.forEach((data) => {
    describe('This validates the ability to search the existing enterprise or practice', () => {
        beforeEach(function () {
            cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('backendUrl') + "auth")
            cy.intercept(Cypress.env('backendUrl') + "/api/users/superadmins").as('waitForEnterpriseList')
            cy.visit('/admin/enterprises/list')
            // cy.wait(5000)                    
            cy.wait('@waitForEnterpriseList')
            cy.on('uncaught:exception', (err, runnable) => {
                return false
            });
        })

        it('validate if a existing Enterprise name has been displayed on search', () => {
            cy.searchPracticeOrEnterprise(data.enterprisename)
            cy.searchEnterpriseName(data.enterprisename)
        })

        it('validate if a existing practice name is displayed on search ', () => {
            cy.searchPracticeOrEnterprise(data.practiceName)
            cy.searchPracticeName(data.practiceName)
        })
    })
})