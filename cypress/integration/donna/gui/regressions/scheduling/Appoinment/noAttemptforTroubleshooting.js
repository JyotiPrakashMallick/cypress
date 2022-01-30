/// <reference types="Cypress"/>

/* AUTO-586: User does not attempt to find appointment match after troubleshooting message */
//        "dentrix_user": "dentrixpatientuser@carecru.com", "dentrix_pwd": "#carecru2021"

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';
var ptntName;
describe('User does not attempt to find appointment match after troubleshooting message', function () {

    before(function () {

        cy.log("Log into application using API")
        cy.apilogin(Cypress.env('dentrix_user'), Cypress.env('dentrix_pwd'), (Cypress.env('backendUrl') + "auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.log('Remove all the requests if present')
        cy.removeOnlineRequests()
    })


    it('When User does not attempt to find appointment match after troubleshooting message & opt for later option, then validate if that modal window closes', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/postTroubleshootingData').then((obData) => {
            onlineBookingData = obData
            ptntName = onlineBookingData.noAttemptData.patientName
            cy.doMyOnlineBookingWithin6Months(
                Cypress.env("token"),
                onlineBookingData.noAttemptData.accountId,
                onlineBookingData.noAttemptData.insuranceCarrier,
                onlineBookingData.noAttemptData.patientUserId,
                onlineBookingData.noAttemptData.practitionerId,
                onlineBookingData.noAttemptData.requestingPatientUserId,
                onlineBookingData.noAttemptData.serviceId,
                onlineBookingData.noAttemptData.note
            )
            cy.log('Move to schedule screen')
            cy.visit('/schedule')
            cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
            cy.log('Check if the online request is available with the non-existing Patient')
            cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
                .should('contain', ptntName)
            cy.log('Click on that online request')
            cy.get(schedulePageSelector.clickOnRequest)
                .should('contain', ptntName).click()
            cy.log('Accept the request')
            cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
            cy.log('Check if the "Accept Appointment" confirmation window opens with the msg- "Have you created this appointment and patient in your PMS? If not, please add the appointment and patient."')
            cy.get(schedulePageSelector.modalWindowTitle, { timeout: 3000 }).should('contain.text', 'Accept Appointment')
            cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 }).should('contain.text', 'Have you created this appointment and patient in your PMS?')
            cy.log('Click on button "Yes, I have created the appt"')
            cy.get(schedulePageSelector.secondBtnOnModal, { timeout: 3000 })
                .should('contain.text', 'Yes, I have created the appt')
                .click()
            cy.log('Validate if another window modal opens with the same title as "Accept Appointment" & msg as "We did not find the appointment. Please ensure you have correctly entered the following appointment details into your PMS and try again."')
            cy.get(schedulePageSelector.modalWindowTitle, { timeout: 3000 }).should('contain.text', 'Accept Appointment')
            cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 }).should('contain.text', 'We did not find the appointment. Please ensure you have correctly entered the following')
            cy.log('Click on button "No, I\'ll do this later"')
            cy.get(schedulePageSelector.firsttBtnOnModal, { timeout: 3000 })
                .should('contain.text', 'No, I\'ll do this later').click()
            cy.get(schedulePageSelector.acceptOrRejectPopUp).should('be.visible')
        })
    })
})