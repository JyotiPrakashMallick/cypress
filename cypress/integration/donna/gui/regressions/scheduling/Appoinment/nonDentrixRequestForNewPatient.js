/* AUTO-592 This code opens the create new patient window after clicking on Accept button in Online 
request in non dentrix account. Username needs to add in development.json: 
"nondentrix_user" : "nondentrix@carecru.com", "nondentrix_pwd" : "carecru2021",
practice: Abeldent Atlantic, Group Name -> 0001 Inline edits */

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';

describe('User accepts appointment request for a new patient for write capable PMS', function () {
    before(function () {

        cy.log("Log into application using API")
        cy.apilogin(Cypress.env('nondentrix_user'), Cypress.env('nondentrix_pwd'), (Cypress.env('backendUrl') + "auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.log('Remove all the requests if present')
        cy.removeOnlineRequests()
        cy.log("Log into online booking application using API")
        cy.apiloginOnlineBooking(Cypress.env('nonDentrixBookingPortal_email'), Cypress.env('nonDentrixBookingPortal_pwd'), (Cypress.env('backendUrl') + "my/auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    it('Validate if create patient window opens after clicking on Accept in the online appt request', function () {
        var crypto = require("crypto");
        var fName = crypto.randomBytes(8).toString('hex');
        var lName = crypto.randomBytes(6).toString('hex');
        var email = crypto.randomBytes(8).toString('hex') + '@abc.com';
        let birthDate = moment().subtract(25, 'years').format("MM/DD/YYYY")
        let mobNumber = Math.floor(Math.random() * (9999999999 - 2222222222 + 1)) + 2222222222;
        cy.log(fName)
        cy.log(lName)
        cy.log(birthDate)
        cy.log(mobNumber)
        cy.log(email)
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
            cy.fixture('api/patientmanagement/nonDentrixOnlineRequest').then((ptData) => {
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
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Check if the online request is available with the non-existing Patient')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', fName)
        cy.log('Click on that online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', fName).click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log('Validate Create or Connect a Patient window')
        cy.get(schedulePageSelector.createOrConnectPatientWnd).invoke('text').then((text) => {
            cy.log("Patient window popup Title", text)
            if (text == "Create or Connect a Patient") {
                cy.get(schedulePageSelector.createNewPatientButton).click()
                cy.log('Click on Save button to create new patient')
                cy.get(schedulePageSelector.createPatientSaveButton).click()
                cy.get(schedulePageSelector.toastSuccessMessage)
                    .should('be.visible')
                    .should('have.text', 'SuccessNew Patient Added.')
            } else {
                cy.log("Create new patient directly without connecting to existing patient")
                cy.get(schedulePageSelector.createOrConnectPatientWnd).should("have.text","Create New Patient")
                cy.get(schedulePageSelector.createPatientSaveButton).click()
                cy.get(schedulePageSelector.toastSuccessMessage)
                    .should('be.visible')
                    .should('have.text', 'SuccessNew Patient Added.')
            }
        })

        //    if(cy.get(schedulePageSelector.createOrConnectPatientWnd).should('contain','Create or Connect a Patient'))
        //    { 
        //    cy.get(schedulePageSelector.createNewPatientButton, {timeout : 5000}).click()    
        //     cy.log('Click on Save button to create new patient')
        //     cy.get(schedulePageSelector.createPatientSaveButton, {timeout: 5000}).click()
        //     cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 1000 })
        //       .should('be.visible')
        //       .should('have.text', 'SuccessNew Patient Added.')
        //    }else{
        //     cy.get(schedulePageSelector.createNewPatientWindow, {timeout: 3000})
        //       .should('contain', 'Create New Patient')
        //     cy.get(schedulePageSelector.createPatientSaveButton, {timeout: 5000}).click()
        //     cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 1000 })
        //       .should('be.visible')
        //       .should('have.text', 'SuccessNew Patient Added.')
        //    }

        /*  cy.get(schedulePageSelector.createPatientSaveButton, {timeout: 5000}).click()
          cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 1000 })
            .should('be.visible')
            .should('have.text', 'SuccessNew Patient Added.')*/
    })
})
