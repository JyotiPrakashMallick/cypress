/// <reference types="Cypress"/>

/* AUTO-590 : User accepts appointment request for a patient and opts to create a new patient
AUTO-591 : User accepts appointment request for a patient and opts to connect the patient */
// Credentials used ::         "nondentrix_user": "autowritecapable@mailinator.com", "nondentrix_pwd": "#carecru2021",

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';
var ptntName;
describe('This Spec covers the functionality of "Creation of new Patient" & "connection with existing patient"; when the user receives an appointment request in CCP for a patient that has no appointments', function () {

    beforeEach(function (){

        cy.log("Log into application using API")    
        cy.apilogin(Cypress.env('nondentrix_user'),Cypress.env('nondentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule'),
        cy.log('Remove all the requests if present')
        cy.removeOnlineRequests()
    })
    
    it('Validate if "create new Patient" modal window appears when the User accepts appointment request for a patient and opts to create a new patient', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/onlineBookingData').then((obData) => {
            onlineBookingData = obData
            ptntName = onlineBookingData.patientName
            cy.log('patient name hai'+ ptntName)
            cy.doMyOnlineBookingWithin6Months(
                Cypress.env("token"),
                onlineBookingData.accountId,
                onlineBookingData.insuranceCarrier,
                onlineBookingData.patientUserId,
                onlineBookingData.practitionerId,
                onlineBookingData.requestingPatientUserId,
                onlineBookingData.serviceId,
                onlineBookingData.note
            )
            cy.log('patient name hai'+ ptntName)
            cy.log('Move to schedule screen')
            cy.visit('/schedule')
            cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
            cy.log('Validate that online request is present')   
            cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 }).should('contain', ptntName)
            cy.log('Click on the online request')
            cy.get(schedulePageSelector.clickOnRequest)
                .should('contain', ptntName).click()
            cy.log('Accept the request')
            cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
            cy.log('Validate if modal window appeared for "Create or Connect a Patient"')
            cy.get(schedulePageSelector.modalWindowTitle, { timeout: 3000 }).should('contain.text', 'Create or Connect a Patient')
            cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 }).should('contain.text', 'It looks like '+ptntName+ ' already exists in your system. Let\'s connect this request with their patient record. Please select one of the following options and then click on Connect Patient.')
            cy.log('Validate the presence of 2 buttons: "Create New Patient" & "Connect Patient"; and click on the first one')
            cy.get(schedulePageSelector.connectPtntBtn, { timeout: 3000 })
            .should('contain.text', 'Connect Patient')
            cy.get(schedulePageSelector.createPtntBtn, { timeout: 3000 })
                .should('contain.text', 'Create New Patient')
                .click()
            cy.log('Validate if another window modal opens with the same title as "Create New Patient"')
            cy.get(schedulePageSelector.modalWindowTitle, { timeout: 3000 }).should('contain.text', 'Create New Patient')
            cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 }).should('contain.text', '*This will create a new patient in your practice software and in CareCru')
        })
    })

    it('Validate if the Accept Appointment modal window appears, When the user selects an existing patient and opts to connect by clicking on \'Connect Patient"', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/onlineBookingData').then((obData) => {
            onlineBookingData = obData
            ptntName = onlineBookingData.patientName
            cy.log('patient name hai'+ ptntName)    
            cy.doMyOnlineBookingWithin6Months(
                Cypress.env("token"),
                onlineBookingData.accountId,
                onlineBookingData.insuranceCarrier,
                onlineBookingData.patientUserId,
                onlineBookingData.practitionerId,
                onlineBookingData.requestingPatientUserId,
                onlineBookingData.serviceId,
                onlineBookingData.note
            )
            cy.log('patient name hai'+ ptntName)
            cy.log('Move to schedule screen')
            cy.visit('/schedule')
            cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
            cy.log('Validate that online request is present')
            cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
                .should('contain', ptntName)
            cy.log('Click on the online request')
            cy.get(schedulePageSelector.clickOnRequest)
                .should('contain', ptntName).click()
            cy.log('Accept the request')
            cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
            cy.log('Validate if modal window appeared for "Create or Connect a Patient"')
            cy.get(schedulePageSelector.modalWindowTitle, { timeout: 3000 }).should('contain.text', 'Create or Connect a Patient')
            cy.get(schedulePageSelector.modalWindowMsg, { timeout: 3000 }).should('contain.text', 'It looks like '+ptntName+ ' already exists in your system. Let\'s connect this request with their patient record. Please select one of the following options and then click on Connect Patient.')
            cy.log('Validate the presence of 2 buttons: "Create New Patient" & "Connect Patient"; and click on the first one')
            cy.get(schedulePageSelector.createPtntBtn, { timeout: 3000 })
            .should('contain.text', 'Create New Patient')
            cy.get(schedulePageSelector.connectPtntBtn, { timeout: 3000 })
                .should('contain.text', 'Connect Patient')
                .click()
            cy.log('Validate if another window modal opens with the same title as "Accept Appointment"')
            cy.get(schedulePageSelector.acceptApptWindow, { timeout: 3000 }).should('contain.text', 'Accept Appointment')
        })
    })
})