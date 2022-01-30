/// <reference types="Cypress"/>

/* AUTO-584: User attempts to find appointment match after troubleshooting and a full match is found */
//        "dentrix_user": "dentrixpatientuser@carecru.com", "dentrix_pwd": "#carecru2021"

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';
var ptntName;

describe('User attempts to find appointment match after troubleshooting and a full match is found', function () {

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


    it('When User attempts to find appointment match after troubleshooting and a full match is found, then validate if it works as full-match case', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/postTroubleshootingData').then((obData) => {
            onlineBookingData = obData
            ptntName = onlineBookingData.fullMatchPatientTroubleshoot.patientName
            cy.doMyOnlineBooking(
                Cypress.env("token"),
                onlineBookingData.fullMatchPatientTroubleshoot.accountId,
                onlineBookingData.fullMatchPatientTroubleshoot.insuranceCarrier,
                onlineBookingData.fullMatchPatientTroubleshoot.patientUserId,
                onlineBookingData.fullMatchPatientTroubleshoot.practitionerId,
                onlineBookingData.fullMatchPatientTroubleshoot.requestingPatientUserId,
                onlineBookingData.fullMatchPatientTroubleshoot.serviceId,
                onlineBookingData.fullMatchPatientTroubleshoot.note
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
            cy.log('Click on button "Try Again"')
            cy.get(schedulePageSelector.secondBtnOnModal, { timeout: 3000 })
                .should('contain.text', 'Try Again')


            cy.log("Create an appointment using API")
            cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
            let startDate = moment().add(3, 'minutes').format("YYYY-MM-DD[T]HH:mm:ss");
            let endDate = moment().add(23, 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
            cy.log("Read data from the fixture file")
            let patientData
            cy.fixture('gui/scheduling/postTroubleshootingData').then((ptData) => {
                patientData = ptData
                cy.log('Patient id is ' + patientData.fullMatchPatientTroubleshoot.patientId)
                cy.createApptApi(Cypress.env("token"),
                    startDate,
                    endDate,
                    patientData.fullMatchPatientTroubleshoot.patientId
                )
            })

            cy.get(schedulePageSelector.secondBtnOnModal, { timeout: 3000 })
                .should('contain.text', 'Try Again').click()
            cy.log("Validate the Success toast message")
            cy.get(schedulePageSelector.fullMatchToastMessage, { timeout: 5000 })
                .should('be.visible')
                .should('contain.text', 'Request updated and Email confirmation sent to ')
        })
    })
})