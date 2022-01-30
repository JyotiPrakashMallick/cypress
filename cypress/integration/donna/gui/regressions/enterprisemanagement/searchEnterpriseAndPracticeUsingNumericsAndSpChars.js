///<reference types="Cypress"/>
/*
EPIC: CRU-3304 Improve enterprise list search
AUTO-472-Ability to search practice with numerical
AUTO-473-Ability to search enterprise with special Characters
AUTO-471-Ability to search enterprise with numerical
AUTO-474-Ability to search practice with special Characters
*/

const testData = require('../../../../../fixtures/gui/enterprisemanagement/entPracSearchDataWithNumAndSpChar.json')

describe('To check if existing practice can be searched', () => {
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

    it('validate if an enterprise can be searched based on the numeric value present in its name', () => {
        cy.searchPracticeOrEnterprise(testData.enterprisenameNumerics)
        cy.searchEnterpriseNameWithNumerics(testData.enterprisenameNumerics)
    })

    it('validate if an enterprise can be searched based on the Special Chars present in its name', () => {
        cy.searchPracticeOrEnterprise(testData.enterprisenameSpChar)
        cy.searchEnterpriseNameWithSpChars(testData.enterprisenameSpChar)
    })

    it('validate if a practice can be searched based on the numeric value present in its name', () => {
        cy.searchPracticeOrEnterprise(testData.practiceNameNumerics)
        cy.searchPracticeNameWithSpChars(testData.practiceNameNumerics)
    })

    it('validate if a practice can be searched based on the Special Chars present in its name', () => {
        cy.searchPracticeOrEnterprise(testData.practiceNameSpChar)
        cy.searchPracticeNameWithSpChars(testData.practiceNameSpChar)
    })
})
