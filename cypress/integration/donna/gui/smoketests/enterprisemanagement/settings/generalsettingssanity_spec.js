/// <reference types="Cypress"/>

import generalPage from "../../../../../../support/selectors/enterprisemanagement/generalPage";
const datas = require('../../../../../../fixtures/gui/enterprisemanagement/setting/generalpage.json')

/* 
:> Steps to Run this sanity test
1. Use the Demo PPTX 1 Enterprise
2. Login with the Owner Account (test123456@mailinator.com)
 */
describe('General Page Sanity Test', () => {

    //Setup the test
    before(function () {
        cy.apilogin(Cypress.env('genemail'),Cypress.env('password'),(Cypress.env('backendUrl') + "auth"))
        cy.visit('/settings')
        cy.url().should('include', '/settings/practice/general')
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})
    })
    it('Check titles', () => {
        cy.get(generalPage.practiceHeader).should('be.visible').should('have.text', 'Practice Details')
        //Scroll to center
        cy.get(generalPage.formsBody).scrollTo('center')
        cy.get(generalPage.addressTitle).should('be.visible').should('have.text', 'Address Information')
    })

    it('Practice Details are correct populated', function () {

        //Scroll to top
        cy.get(generalPage.formsBody).scrollTo('top')

        //Practice Details Validation
        cy.get(generalPage.name).should('be.visible').should('have.value', datas.Name)
        cy.get(generalPage.website).should('be.visible').should('have.value', datas.Website)
        cy.get(generalPage.phoneNumber).should('be.visible').should('have.value', datas.ContactNumber)
        cy.get(generalPage.email).should('be.visible').should('have.value', datas.ContactEmail)
        cy.get(generalPage.praticeSaveButton).should('be.visible').should('be.disabled')

        //Scroll to center
        cy.get(generalPage.formsBody).scrollTo('center')

        cy.get(generalPage.streetAddress).should('be.visible').should('have.value', datas.StreetAddress)

        //Scroll to bottom
        cy.get(generalPage.formsBody).scrollTo('bottom')

        //Address Information Validation
        cy.get(generalPage.country).should('be.visible').should('have.text', datas.Country)
        cy.get(generalPage.province).should('be.visible').should('have.text', datas.Province)
        cy.get(generalPage.city).should('be.visible').should('have.value', datas.City)
        cy.get(generalPage.postalCode).should('be.visible').should('have.value', datas.PostalCode)
        cy.get(generalPage.addressSaveButton).should('be.visible').should('be.disabled')
    })

})

