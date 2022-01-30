/// <reference types="Cypress"/>

import waitlistSelectors from '../../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'

describe('Regression test for verifying mass text is being sent to the patients on waitlist', function(){

    before(function(){

        cy.apilogin(Cypress.env('waitlistUser'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
        cy.visit('/schedule')
        cy.url().should('include', '/schedule')
        cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})
        cy.get(waitlistSelectors.waitlistTabButton)
          .should('be.visible')
          .click()

    })

    it('verify mass text can be sent to all patients on waitlist', function(){

        cy.get(waitlistSelectors.selectAllChkbox)
          .check({force: true})

        cy.get(waitlistSelectors.sendButton)
          .should('be.visible')
          .click()

        cy.get(waitlistSelectors.msgBox)
          .should('be.visible')
          .type('{selectall}')
          .type('Hey, This is a test message')

        cy.get(waitlistSelectors.sendTextButton)
          .should('be.visible')
          .click()

        //assert the text sent to all patients

        cy.get(waitlistSelectors.responseMsg)
          .contains('Message successfully sent to ')

        cy.get(waitlistSelectors.textMsg)
          .should('have.text','Hey, This is a test message')
    })
})