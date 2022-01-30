/// <reference types="Cypress"/>

/*
AUTO-318 Waitlist Enhancements: Performance - UI Pagination
Task-
AUTO-332 Verify the patients selected count when patients selected from different pages
AUTO-334 Verify the popover when user clicks on Patient name on waitlist
*/

import waitlistSelectors from '../../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'

describe('Waitlist Enhancements: Performance - UI Pagination', () => {

    //setup the test
    beforeEach(() => {
        cy.apilogin(Cypress.env('waitlistUser'),Cypress.env('waitlist_password'),Cypress.env('backendUrl')+"auth")
        cy.visit('/schedule') 
        
        cy.on('uncaught:exception', () => {
          // returning false here prevents Cypress from failing the test
          return false})
    })

    it('Verify correct count is displayed on the button when the patient is selected', ()=>{
      // click on waitlist button
      cy.get(waitlistSelectors.waitlist).click()

      // get the total count from waitlist header
      cy.get(waitlistSelectors.waitlistCount).then(($el)=>{
      const wCount = $el.text()

      // click on select all checkbox
      cy.get(waitlistSelectors.checkbox).eq(0).click()

      // Assert correct count is displayed on the button appearing on the footer
      cy.get(waitlistSelectors.footerButton).should('have.text', 'Send Text to ' + wCount + ' Patient')

      })
    })

    it('Verify the PopOver appears when user clicks on patient name on waitlist', ()=>{
      // click on waitlist button
      cy.get(waitlistSelectors.waitlist).click()

      // click on patient name
      cy.get(waitlistSelectors.patientName).click({force: true})

      // Assert pop over appears by checking labels
      cy.get(waitlistSelectors.popOverHeader).should('be.visible')
      expect(cy.contains("Contact Info"))
      expect(cy.contains("Next Appointment"))
      expect(cy.contains("Last Appointment"))
      expect(cy.contains("Address"))
  })
})
