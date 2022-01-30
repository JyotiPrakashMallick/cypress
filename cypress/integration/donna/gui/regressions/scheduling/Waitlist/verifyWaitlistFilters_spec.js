/// <reference types="Cypress"/>

/*
AUTO-318 Waitlist Enhancements: Performance - UI Pagination
Task-
AUTO-333 Verify the filters are displayed on every page
*/

import waitlistSelectors from '../../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'

describe('Verify Waitlist Filters', () => {

    //setup the test
    before(() => {
        cy.apilogin(Cypress.env('waitlistUser'),Cypress.env('waitlist_password'),Cypress.env('backendUrl')+"auth")
        cy.visit('/schedule')  
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})
    })

    it('Verify all the filters are displayed on the waitlist page', ()=> {
      cy.get(waitlistSelectors.waitlist).click()
     
      cy.get(waitlistSelectors.waitlistHeader).within( ()=>{
          
      // Assert filters
      expect(cy.contains('Reasons'))
      expect(cy.contains('Practitioners'))
      expect(cy.contains('Units'))
      expect(cy.contains('Days'))
      expect(cy.contains('Times'))
      })
    })
})
