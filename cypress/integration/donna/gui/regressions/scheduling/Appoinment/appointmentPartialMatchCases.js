/// <reference types="Cypress"/>

/* AUTO-575 User accepts appointment request that has a partial match and the requested date and start time is within 6 months of the match 
AUTO-575 : User links an existing appointment to a partially matched request */
//        "dentrix_user": "dentrixpatientuser@carecru.com", "dentrix_pwd": "#carecru2021"

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';

describe('Appointment Linking functionality for Partial Match scenarios, where the gap between online appt request & the existing appointment is within 6 months', function () {

    before(function (){

        cy.log("Log into application using API")    
        cy.apilogin(Cypress.env('dentrix_user'),Cypress.env('dentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.log("Create an appointment using API")
        cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
        let startDate = moment().add(3 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss") ;
        let endDate = moment().add(23 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
        cy.log("Read data from the fixture file")
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData)=>{
            patientData = ptData
        cy.log('Patient id is '+patientData.patient.id)
        cy.createApptApi(Cypress.env("token"),
            startDate,
            endDate,
            patientData.patient.id
        )
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.log('Remove all the requests if present')
        cy.removeOnlineRequests()
    })
    
        beforeEach(function (){
        cy.log("Log into application using API")    
        cy.apilogin(Cypress.env('dentrix_user'),Cypress.env('dentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        })
        
    afterEach(function(){
        cy.log('Revert the patient data to default')
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData)=>{
            patientData = ptData
        cy.updatePatient(Cypress.env("token"),
            patientData.patient.id,
            patientData.defaultData.firstName,
            patientData.defaultData.lastName,
            patientData.defaultData.email,
            patientData.defaultData.birthDate,
            patientData.defaultData.mobilePhoneNumber,
            patientData.defaultData.homePhoneNumber,
            patientData.defaultData.cellPhoneNumber
            )    
        }) 
        cy.log('Remove all the requests if present')
        cy.removeOnlineRequests()
    })  
    it('Validate Patial Match Case 1 - No difference in patient parameters, but gap between online request & existing appointment is within 6 months', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/partialMatchOnlineBooking').then((obData) => {
            onlineBookingData = obData
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
        })

        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        // cy.wait(10000)
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Validate that online request is present')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', 'Holly White')
        cy.log('Click on the online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', 'Holly White').click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log("Validate if the pop-up message has appeared for linking the appointment")
        cy.linkApptForPartialMatch()
    })

    it('Validate Patial Match Case 2 - when patient\'s phone number mismatches, and gap between online request & existing appointment is within 6 months', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/partialMatchOnlineBooking').then((obData) => {
            onlineBookingData = obData
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
        })
        cy.log('Update phone number of patient')
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData) => {
            patientData = ptData
            cy.updatePatient(Cypress.env("token"),
                patientData.patient.id,
                patientData.updatePhoneNumber.firstName,
                patientData.updatePhoneNumber.lastName,
                patientData.updatePhoneNumber.email,
                patientData.updatePhoneNumber.birthDate,
                patientData.updatePhoneNumber.mobilePhoneNumber,
                patientData.updatePhoneNumber.homePhoneNumber,
                patientData.updatePhoneNumber.cellPhoneNumber
            )
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Validate that online request is present')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', 'Holly White')
        cy.log('Click on the online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', 'Holly White').click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log("Validate if the pop-up message has appeared for linking the appointment")
        cy.linkApptForPartialMatch()
    })

    it('Validate Patial Match Case 3 - when patient\'s last name mismatches, and gap between online request & existing appointment is within 6 months', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/partialMatchOnlineBooking').then((obData) => {
            onlineBookingData = obData
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
        })
        cy.log('Update last name of patient')
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData) => {
            patientData = ptData
            cy.updatePatient(Cypress.env("token"),
                patientData.patient.id,
                patientData.updateLastName.firstName,
                patientData.updateLastName.lastName,
                patientData.updateLastName.email,
                patientData.updateLastName.birthDate,
                patientData.updateLastName.mobilePhoneNumber,
                patientData.updateLastName.homePhoneNumber,
                patientData.updateLastName.cellPhoneNumber
            )
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Validate that online request is present')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', 'Holly White')
        cy.log('Click on the online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', 'Holly White').click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log("Validate if the pop-up message has appeared for linking the appointment")
        cy.linkApptForPartialMatch()
    })


    it('Validate Patial Match Case 4 - when patient\'s First name mismatches, and gap between online request & existing appointment is within 6 months', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/partialMatchOnlineBooking').then((obData) => {
            onlineBookingData = obData
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
        })
        cy.log('Update first name of patient')
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData) => {
            patientData = ptData
            cy.updatePatient(Cypress.env("token"),
                patientData.patient.id,
                patientData.updateFirstName.firstName,
                patientData.updateFirstName.lastName,
                patientData.updateFirstName.email,
                patientData.updateFirstName.birthDate,
                patientData.updateFirstName.mobilePhoneNumber,
                patientData.updateFirstName.homePhoneNumber,
                patientData.updateFirstName.cellPhoneNumber
            )
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Validate that online request is present')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', 'Holly White')
        cy.log('Click on the online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', 'Holly White').click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log("Validate if the pop-up message has appeared for linking the appointment")
        cy.linkApptForPartialMatch()
    })

    it('Validate Patial Match Case 5 - when patient\'s First name & Phone Number mismatches, and gap between online request & existing appointment is within 6 months', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/partialMatchOnlineBooking').then((obData) => {
            onlineBookingData = obData
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
        })
        cy.log('Update first name & phone Number of patient')
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData) => {
            patientData = ptData
            cy.updatePatient(Cypress.env("token"),
                patientData.patient.id,
                patientData.updateFNameAndPhone.firstName,
                patientData.updateFNameAndPhone.lastName,
                patientData.updateFNameAndPhone.email,
                patientData.updateFNameAndPhone.birthDate,
                patientData.updateFNameAndPhone.mobilePhoneNumber,
                patientData.updateFNameAndPhone.homePhoneNumber,
                patientData.updateFNameAndPhone.cellPhoneNumber
            )
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Validate that online request is present')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', 'Holly White')
        cy.log('Click on the online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', 'Holly White').click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log("Validate if the pop-up message has appeared for linking the appointment")
        cy.linkApptForPartialMatch()
    })

    it('Validate Patial Match Case 6 - when patient\'s Birthday & Phone Number mismatches, and gap between online request & existing appointment is within 6 months', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/partialMatchOnlineBooking').then((obData) => {
            onlineBookingData = obData
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
        })
        cy.log('Update birthday & phone Number of patient')
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData) => {
            patientData = ptData
            cy.updatePatient(Cypress.env("token"),
                patientData.patient.id,
                patientData.updateBirthDateAndPhone.firstName,
                patientData.updateBirthDateAndPhone.lastName,
                patientData.updateBirthDateAndPhone.email,
                patientData.updateBirthDateAndPhone.birthDate,
                patientData.updateBirthDateAndPhone.mobilePhoneNumber,
                patientData.updateBirthDateAndPhone.homePhoneNumber,
                patientData.updateBirthDateAndPhone.cellPhoneNumber
            )
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Validate that online request is present')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', 'Holly White')
        cy.log('Click on the online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', 'Holly White').click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log("Validate if the pop-up message has appeared for linking the appointment")
        cy.linkApptForPartialMatch()
    })


    it('Validate Patial Match Case 7 - when patient\'s Birthday & First name mismatches, and gap between online request & existing appointment is within 6 months', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/partialMatchOnlineBooking').then((obData) => {
            onlineBookingData = obData
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
        })
        cy.log('Update Birthday & First name of patient')
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData) => {
            patientData = ptData
            cy.updatePatient(Cypress.env("token"),
                patientData.patient.id,
                patientData.updateFNameAndBirthDate.firstName,
                patientData.updateFNameAndBirthDate.lastName,
                patientData.updateFNameAndBirthDate.email,
                patientData.updateFNameAndBirthDate.birthDate,
                patientData.updateFNameAndBirthDate.mobilePhoneNumber,
                patientData.updateFNameAndBirthDate.homePhoneNumber,
                patientData.updateFNameAndBirthDate.cellPhoneNumber
            )
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Validate that online request is present')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', 'Holly White')
        cy.log('Click on the online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', 'Holly White').click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log("Validate if the pop-up message has appeared for linking the appointment")
        cy.linkApptForPartialMatch()
    })


    it('Validate Patial Match Case 8 - when patient\'s Last Name & Phone number mismatches, and gap between online request & existing appointment is within 6 months', function () {
        cy.log('Raise an online appointment request')
        let onlineBookingData
        cy.fixture('gui/scheduling/partialMatchOnlineBooking').then((obData) => {
            onlineBookingData = obData
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
        })
        cy.log('Update Last Name & Phone Number of patient')
        let patientData
        cy.fixture('gui/scheduling/updatePatientDataPartialMatch').then((ptData) => {
            patientData = ptData
            cy.updatePatient(Cypress.env("token"),
                patientData.patient.id,
                patientData.updateLNameAndPhone.firstName,
                patientData.updateLNameAndPhone.lastName,
                patientData.updateLNameAndPhone.email,
                patientData.updateLNameAndPhone.birthDate,
                patientData.updateLNameAndPhone.mobilePhoneNumber,
                patientData.updateLNameAndPhone.homePhoneNumber,
                patientData.updateLNameAndPhone.cellPhoneNumber
            )
        })
        cy.log('Move to schedule screen')
        cy.visit('/schedule')
        cy.get(schedulePageSelector.todayDate, { timeout: 10000 }).should('be.visible').click()
        cy.log('Validate that online request is present')
        cy.get(schedulePageSelector.onlineRequests, { timeout: 10000 })
            .should('contain', 'Holly White')
        cy.log('Click on the online request')
        cy.get(schedulePageSelector.clickOnRequest)
            .should('contain', 'Holly White').click()
        cy.log('Accept the request')
        cy.get(schedulePageSelector.acceptButton, { timeout: 3000 }).click()
        cy.log("Validate if the pop-up message has appeared for linking the appointment")
        cy.linkApptForPartialMatch()
    })
})