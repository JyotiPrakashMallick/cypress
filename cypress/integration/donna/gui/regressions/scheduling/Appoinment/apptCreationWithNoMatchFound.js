/// <reference types="Cypress"/>

/* This Spec covers below tickets
AUTO-581 User confirms creation of an appointment and no match is found
AUTO-61 : Verify that when user click yes I have created the appointment for new patient appointment request not yet created in pms then trouble shooting modal appeared
AUTO-62 :Verify that when user click try again button it will display the no matched appointment modal*/

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';

describe('This functionality coveres a few cases when user tries to Accept the online Appt-request for a non-existing patient', function () {
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

    beforeEach(function () {
        cy.log("Log into online booking application using API")
        cy.apiloginOnlineBooking(Cypress.env('bookingPortal_email'), Cypress.env('bookingPortal_pwd'), (Cypress.env('backendUrl') + "my/auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.log("Log into application using API")
        cy.apilogin(Cypress.env('dentrix_user'), Cypress.env('dentrix_pwd'), (Cypress.env('backendUrl') + "auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    //        AUTO-581 User confirms creation of an appointment and no match is found
    it('Validate if the "Accept Appointment" troubleshoot window modal opens with "Try Again" button after clicking on "Yes, I have created the appt" button for the first time, when No match found for the online appt request', function () {
        var crypto = require("crypto");
        var fName = crypto.randomBytes(8).toString('hex');
        var lName = crypto.randomBytes(6).toString('hex');
        var email
        let birthDate = moment().subtract(25, 'years').format("MM/DD/YYYY")
        let mobNumber = Math.floor(Math.random() * (9999999999 - 2222222222 + 1)) + 2222222222;
        cy.log(fName)
        cy.log(lName)
        cy.log(birthDate)
        cy.log(mobNumber)
        cy.log('Get the patientUserId, generated during the online booking for a non-registered patient')
        cy.apiGetPatientUsrIdForNonExistingPtnt(Cypress.env("onlineBookingtoken"),
            fName,
            lName,
            birthDate,
            mobNumber,
            email
        ).then((id) => {
            cy.log(JSON.stringify(id))
            var ptusrid = id.toString()
            let patientData
            cy.fixture('gui/scheduling/onlineBookingNonExistingData').then((ptData) => {
                patientData = ptData
                cy.onlineBookingForNonExistingPtnt(Cypress.env('token'),
                    ptusrid,
                    patientData.accountId,
                    patientData.insuranceCarrier,
                    patientData.practitionerId,
                    patientData.requestingPatientUserId,
                    patientData.serviceId,
                    patientData.note,
                    patientData.appointmentType
                )
            })
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Check if the online request is available with the non-existing Patient')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', fName)
        cy.log('Click on that online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', fName).click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()

        cy.log('Check if the "Accept Appointment" confirmation window opens with the msg- "Have you created this appointment and patient in your PMS? If not, please add the appointment and patient."')
        cy.get(schedulePageSelector.modalWindowTitle, { timeout: 3000 }).should('contain.text', 'Accept Appointment')
        cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 }).should('contain.text', 'Have you created this appointment and patient in your PMS?')
        cy.log('Validate the presence of 2 buttons: "No, I\'ll do this later" & "Yes, I have created the appt"; and click on the latter one')
        cy.get(schedulePageSelector.firsttBtnOnModal, { timeout: 3000 })
            .should('contain.text', 'No, I\'ll do this later')
        cy.get(schedulePageSelector.secondBtnOnModal, { timeout: 3000 })
            .should('contain.text', 'Yes, I have created the appt')
            .click()
        cy.log('Validate if another window modal opens with the same title as "Accept Appointment" & msg as "We did not find the appointment. Please ensure you have correctly entered the following appointment details into your PMS and try again."')
        cy.get(schedulePageSelector.modalWindowTitle, { timeout: 3000 }).should('contain.text', 'Accept Appointment')
        cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 }).should('contain.text', 'We did not find the appointment. Please ensure you have correctly entered the following')
    })

    // AUTO-61 : Verify that when user click yes I have created the appointment for new patient appointment request not yet created in pms then trouble shooting modal appeared
    it('Validate the content present on the window modal appeared after clicking on "Yes, I have created the appt" button', function () {
        cy.log('Check if Appointment Summary text is mentioned on the window modal')
        cy.get(schedulePageSelector.apptSummaryHeading, { timeout: 3000 }).should('contain.text', 'Appointment Summary')
        cy.log('check if "show more" link is clickable on that window modal')
        cy.get(schedulePageSelector.showMoreButton, { timeou00t: 3000 }).should('contain.text', 'Show more')
        cy.get(schedulePageSelector.showMoreButton, { timeou00t: 3000 }).should('not.be.disabled')
        cy.log('Validate the presence of 2 buttons: "No, I\'ll do this later" & "Try Again"; and click on the latter one')
        cy.get(schedulePageSelector.firsttBtnOnModal, { timeout: 3000 })
            .should('contain.text', 'No, I\'ll do this later')
        cy.get(schedulePageSelector.secondBtnOnModal, { timeout: 3000 })
            .should('contain.text', 'Try Again')
    })

    // AUTO-62 :Verify that when user click try again button it will display the no matched appointment modal
    it('Validate if the same window modal re-appears after clicking on "Try Again" button', function () {
        cy.log('Check if same trouble-shoot window re-appears with the exact content, as just its previous window')
        cy.get(schedulePageSelector.secondBtnOnModal, { timeout: 3000 })
            .should('contain.text', 'Try Again')
            .click()
        cy.log('Check if same trouble-shoot window re-appears with the exact content, as just its previous window')
        cy.get(schedulePageSelector.modalWindowTitle, { timeout: 5000 }).should('contain.text', 'Accept Appointment')
        cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 })
            .should('contain.text', 'We did not find the appointment. Please ensure you have correctly entered the following')
            .should('contain.text', 'appointment details into your PMS and try again.')
        cy.log('Check if Appointment Summary text is mentioned on the window modal')
        cy.get(schedulePageSelector.apptSummaryHeading, { timeout: 3000 }).should('contain.text', 'Appointment Summary')
        cy.log('Validate the presence of 2 buttons: "No, I\'ll do this later" & "Try Again"; and click on the latter one')
        cy.get(schedulePageSelector.firsttBtnOnModal, { timeout: 3000 })
            .should('contain.text', 'No, I\'ll do this later')
        cy.get(schedulePageSelector.secondBtnOnModal, { timeout: 3000 })
            .should('contain.text', 'Try Again')
    })

})