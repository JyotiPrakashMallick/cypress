/// <reference types="Cypress"/>

/*
CRU-1239 PMS without Appointment Write Flow
Subtasks-
Auto-60- Verify that when user click no I'll do it later then the appointment modal will be close for non write capable pms
*/
import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector"
const bookingData = require("../../../../../../fixtures/gui/scheduling/testdatamodalInstruction.json")
describe('Verify that the new modal for adding patient and appointment for non write capable pms',function()
{
before(function (){


    cy.apilogin(Cypress.env('dentrix_user'),Cypress.env('dentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
    cy.visit('/schedule')
    cy.log('Remove all the requests if present')
    cy.removeOnlineRequests()
})

it("Verify that when user click no I'll do it later then the appointment modal will be close for non write capable pms",()=>
{

// do online booking via api
cy.doMyOnlineBooking(Cypress.env("token"),
bookingData.accountId,
bookingData.insuranceCarrier,
bookingData.patientUserId,
bookingData.practitionerId,
bookingData.requestingPatientUserId,
bookingData.serviceId,
bookingData.note)

//Accept online request

cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
.should('contain', bookingData.patientName)
cy.log('Click on that online request')
cy.get(schedulePageSelector.clickOnRequest)
.should('contain', bookingData.patientName).click()

//Click on Accept button
cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()

//Validate Modal window title
cy.get(schedulePageSelector.modalWindowTitle, { timeout: 3000 }).should('contain.text', 'Accept Appointment')
cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 }).should('include.text', bookingData.noteMsg1 + bookingData.noteMsg2)

cy.log('Click on button "NO, I will create this later"')
cy.get(schedulePageSelector.firsttBtnOnModal, { timeout: 3000 })
.should('contain.text', bookingData.buttonHeader1)
.click()

//Validate the user is directed to Patient details pop up
cy.get(schedulePageSelector.pageHeader,{timeout:10000}).should('include.text',bookingData.patientName)
.should('be.visible')

//Click on Reject Appointment button
cy.get(schedulePageSelector.buttonSelector).contains('Reject')
.should('be.visible').click()

})
})
