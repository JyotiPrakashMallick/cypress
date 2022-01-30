/// <reference types="Cypress"/>

/* 
EPIC 
AUTO-304 Handle Account And Enterprise Switch when CPP is using EM Authentication
Sub-Tasks
AUTO-305 Verify switching to other practice in the enterprise
AUTO-306 Verify enterprise with single practice
AUTO-307 Verify switching to other enterprise
AUTO-308 Verify selecting an enterprise with no practices
*/

import addEditEnterprise from '../../../../../support/selectors/enterprisemanagement/addEditEnterprise'

describe('Handle Account And Enterprise Switch when CPP is using EM Authentication', {retries:1}, ()=>{
    let EnterpriseData

    beforeEach(()=>{
      cy.apilogin(Cypress.env('superadmin_email'),Cypress.env('superadmin_password'),Cypress.env('backendUrl')+"auth")

      cy.visit('/admin/enterprises/list')

       cy.on("uncaught:exception", () => {
        // returning false here prevents Cypress from failing the test
        return false})

       // load data from fixtures
      cy.fixture('gui/enterprisemanagement/addEditEnterprise').then((edata)=>{
      EnterpriseData=edata
      })

      cy.intercept(Cypress.env('backendUrl')+"api/enterprises/switch").as('selectPractice')
      cy.intercept(Cypress.env('backendUrl')+"api/users/superadmins").as('waitForResult')

    })

    it('Verify when user selects an enterprise with no practice then system wont switch to enterprise', ()=>{
       cy.searchEnterprise(EnterpriseData.enterpriseWithNoPractice)

       cy.get(addEditEnterprise.selectPractice, {timeout : 10000}).click()

       cy.wait('@selectPractice').its('response.statusCode').should('not.eq', 200)
    })
    
    it('Verify user can select an enterprise with one practice', ()=>{
        cy.searchEnterprise(EnterpriseData.enterpriseWithOnePractice)

        cy.get(addEditEnterprise.selectPractice, {timeout : 10000}).click()
        cy.wait('@waitForResult').its('response.statusCode').should('eq', 200)

        // go to account settings and assert the practice
        cy.visit('/settings/practice/general')

        cy.get(addEditEnterprise.pracName, {timeout : 10000}).should('have.value', EnterpriseData.practiceOne)
    })

    it('Verify user can switch to another enterprise having multiple practices', ()=>{
        cy.searchEnterprise(EnterpriseData.enterpriseWithTwoPractice)

        cy.get(addEditEnterprise.selectPractice, {timeout : 10000}).click()
        cy.wait('@waitForResult').its('response.statusCode').should('eq', 200)

        // assert enterprise is switched
        cy.get(addEditEnterprise.enterpriseHeader, {timeout : 10000}).should('have.text', EnterpriseData.enterpriseWithTwoPractice)
    })

    it('Verify user can switch to another practice within an enterprise', ()=>{
        cy.searchEnterprise(EnterpriseData.enterpriseWithTwoPractice)

        cy.get(addEditEnterprise.selectPractice, {timeout : 10000}).should('be.visible').click()
        cy.wait('@waitForResult').its('response.statusCode').should('eq', 200)

        // assert enterprise is switched
        cy.get(addEditEnterprise.enterpriseHeader, {timeout : 10000}).should('have.text', EnterpriseData.enterpriseWithTwoPractice)

        // switch practice
        cy.get(addEditEnterprise.practiceDdl).should('be.visible').click()
        cy.contains(EnterpriseData.cypressPracticeOne).click()
        cy.wait('@waitForResult').its('response.statusCode').should('eq', 200)

        // go to account settings and assert the practice
        cy.visit('/settings/practice/general')

        cy.get(addEditEnterprise.pracName, {timeout : 10000}).should('have.value', EnterpriseData.cypressPracticeOne) 
    })
})
