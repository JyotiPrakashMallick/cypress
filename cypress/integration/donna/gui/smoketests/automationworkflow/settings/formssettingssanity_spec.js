/// <reference types="Cypress"/>

import formspage from "../../../../../../support/selectors/automationworkflow/settings/formpage";

const forms = require('../../../../../../fixtures/gui/automationworkflow/setting/formpage.json')

describe('Forms Page Sanity Test', () => {

    //Setup the test
    before(function () {
        cy.apilogin(Cypress.env('username'),Cypress.env('password'),Cypress.env('backendUrl') + "auth")
        cy.visit('settings')
        cy.get(formspage.formsButton).contains('Forms').click()
        cy.url().should('include', '/settings/forms')
        cy.on('uncaught:exception', (err, runnable) => {
            return false})
    })

    it('Check Forms Presents', () => {
        cy.get(formspage.formsTable).should('be.visible')
        cy.get(formspage.formRows)
            .then(listing => {
                const listingCount = Cypress.$(listing).length;
                expect(listing).to.have.length(listingCount);
            });
    })

    it('Verify Form Text is correct', () => {

        var len = forms.forms.length

        forms.forms.forEach(form => {
            cy.getFormNames(formspage.formsName, form.name, len)
        })

    })

    it('Verify Link copied in clipboard when click on it', () => {
        cy.validateCopyCommand(formspage.formsShortUrl)
    })

    it("Verify Form Short Url is Active and redirect", () => {
        cy.validateShortUrlActive(formspage.formsShortUrl)
    })
})