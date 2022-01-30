/// <reference types="Cypress"/>

import waitlistSelectors from '../../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'

describe('Regression tests for waitlisting through booking widget', function() {

    let bookingData
    //setup the test
    beforeEach(() => {
      
        cy.fixture('api/scheduling/onlineBookingWaitlist').then((obData)=>{
            bookingData=obData
        })
        cy.apilogin(Cypress.env('waitlistUser'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth")) 
          
    })

    it('Verify user is able to make an online booking request with waitlist', ()=>{
      // do online booking via api
      cy.createOnlineBooking(Cypress.env("token"),
                          bookingData.accountId,
                          bookingData.insuranceCarrier,
                          bookingData.patientUserId,
                          bookingData.practitionerId,
                          bookingData.requestingPatientUserId,
                          bookingData.serviceId,
                          bookingData.note)

    cy.createWaitspotForOnlineBookingAppt(Cypress.env("token"),
                          bookingData.accountId,bookingData.patientUserId,bookingData.practitionerId,bookingData.reasonId)
    })

    it('Verify booking request have been created and waitlist spot is created', ()=>
    {
        cy.visit(Cypress.env('baseUrl') + "schedule")
        cy.url().should('include',Cypress.env('baseUrl'))
        cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})

        cy.get(waitlistSelectors.waitlistTabButton)
          .should('be.visible')
          .click()

        cy.get(waitlistSelectors.filterByName, {timeout : 3000}).type(bookingData.patientName)
        expect(cy.contains(bookingData.patientName))

        cy.get(waitlistSelectors.firstCheckbox, {timeout : 3000})
          .should('be.visible')
          .click({force:true})
        
        //Remove patient from waitlist
        cy.contains("Remove from Waitlist")
          .click()
        
        cy.on('window:confirm', () => true)
    })
})

