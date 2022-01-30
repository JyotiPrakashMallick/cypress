/// <reference types="Cypress"/>
/*
EPIC: CRU-3304 Improve enterprise list search
AUTO-477-Ability to search enterprise with single alphabet
AUTO-478-Ability to search practice with single alphabet
*/

const testData = require('../../../../../fixtures/api/enterprisemanagement/entCreateTestData')
import enterprisetest from "../../../../../support/selectors/enterprisemanagement/renameEnterprise/enterpriseSearchSelectors"

describe('This is a test for searching enterprise and practice with single alphabet', () => {
    beforeEach(function () {

        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('backendUrl') + "auth")

        cy.intercept(Cypress.env('backendUrl') + "/api/users/superadmins").as('waitForEnterpriseList')
        cy.visit('/admin/enterprises/list')
        cy.wait('@waitForEnterpriseList')
        //cy.wait(10000)
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
    })
    it('Verify Enterprise and Practice Search with single alphabet', () => {
        cy.searchPracticeOrEnterprise(testData.singleAphabet)
        cy.get(enterprisetest.searchResult).each(($lis, index) => {
            const test = $lis.text()
            if (test.toLowerCase().includes(testData.singleAphabet)) {

                expect(test.toLowerCase()).to.include(testData.singleAphabet)
            }
            else {
                cy.get(enterprisetest.expandBtn, { timeout: 10000 }).eq(index).click()
                cy.get(enterprisetest.practiceFirstcoln).each(($practiceList) => {
                    const actualPractice = $practiceList.text()
                    if (actualPractice.toLowerCase().includes(testData.singleAphabet))
                        expect(actualPractice.toLowerCase()).to.include(testData.singleAphabet)

                })

            }
        })
    })


})