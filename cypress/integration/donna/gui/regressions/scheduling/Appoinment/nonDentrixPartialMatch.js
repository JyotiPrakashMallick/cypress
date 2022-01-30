/* AUTO-588 This code opens the create appt window in non dentrix account against an appointment have 
partial match. Username needs to add in development.json: 
"nondentrix_user" : "nondentrix@carecru.com", "nondentrix_pwd" : "carecru2021",
practice: Abeldent Atlantic, Group Name -> 0001 Inline edits */

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';
const testData = require("../../../../../../fixtures/api/patientmanagement/updateNonDentrixPatientData")

describe('Open the create new appointment window against an appt have partial match',function()
{
before(function (){

    cy.log("Log into application using API")    
    cy.apilogin(Cypress.env('nondentrix_user'),Cypress.env('nondentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
    cy.log("Create an appointment using API")
    cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
    let startDate = moment().add(4 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss") ;
    let endDate = moment().add(24 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
    cy.log("Read data from the fixture file")
    let patientData
    cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
        patientData = ptData
    cy.createApptApi(Cypress.env("token"),
        startDate,
        endDate,
        patientData.nonDentrixPatient.id
    )
    })
    cy.log('Move to schedule screen')
    cy.visit('/schedule')
    cy.log('Remove all the requests if present')
    cy.removeOnlineRequests()
})

    beforeEach(function (){
    cy.log("Log into application using API")    
    cy.apilogin(Cypress.env('nondentrix_user'),Cypress.env('nondentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
    })
    
afterEach(function(){
    cy.log('Revert the patient data to default')
    let patientData
    cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.nonDentrixPatient.id,
        patientData.nonDentrixPatientDefaultData.firstName,
        patientData.nonDentrixPatientDefaultData.lastName,
        patientData.nonDentrixPatientDefaultData.email,
        patientData.nonDentrixPatientDefaultData.birthDate,
        patientData.nonDentrixPatientDefaultData.mobilePhoneNumber,
        patientData.nonDentrixPatientDefaultData.homePhoneNumber,
        patientData.nonDentrixPatientDefaultData.cellPhoneNumber
        )    
    }) 
    cy.log('Remove all the requests if present')
    cy.removeOnlineRequests()
})  

it('Case 1 - update first name and create new appointment with partial match request',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/nonDentrixOnlineRequest').then((obData)=>{
        onlineBookingData=obData
    cy.doMyOnlineBooking(
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
    cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.nonDentrixPatient.id,
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
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Pranay Kumar')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Pranay Kumar').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
	cy.log("Validate if the pop-up message has appeared for linking the appointment")
    cy.get(schedulePageSelector.modalWindowTitle)
      .should('have.text', 'Could this be the same appointment?')
	cy.get(schedulePageSelector.modalWindowMsg)
      .should('have.text', 'We found one or more appointments that are similar. Please select the appointment you would like to link.')
    cy.log('Click on No appointment match, create new')
    cy.get(schedulePageSelector.createNewApptButton).click() 
    cy.log('select the patient')
    cy.addpatientandselectfromlist(testData.updateFirstName.completeName)
    cy.log('select the chair')
    cy.selectrandomchair()
    cy.log('select the practioner')
    //cy.selectrandompractitioner()
    cy.log('Click on Add button to create appointment')
    //hardcoding this as when we use the pageselector method the button is not seen.  
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text', 'Add')
      .click() 
    cy.log('Assert that the toast success message is displayed')
    var index = testData.updateFirstName.completeName.indexOf(' ');
    var firstname = testData.updateFirstName.completeName.substring(0, index);
    cy.asserttoastmessagesuccess(firstname, 'SuccessAdded a new Appointment for ')  
})

it('Case 2 - update first name and phone number and create new appointment with partial match request',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/nonDentrixOnlineRequest').then((obData)=>{
        onlineBookingData=obData
    cy.doMyOnlineBooking(
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

    cy.log('Update first name and phone number of patient')
    let patientData
    cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.nonDentrixPatient.id,
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
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Pranay Kumar')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Pranay Kumar').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log("Validate if the pop-up message has appeared for linking the appointment")
    cy.get(schedulePageSelector.modalWindowTitle)
    .should('have.text', 'Could this be the same appointment?')
    cy.get(schedulePageSelector.modalWindowMsg)
    .should('have.text', 'We found one or more appointments that are similar. Please select the appointment you would like to link.')
    cy.log('Click on No appointment match, create new')
    cy.get(schedulePageSelector.createNewApptButton).click() 
    cy.log('select the patient')
    cy.addpatientandselectfromlist(testData.updateFNameAndPhone.completeName)
    cy.log('select the chair')
    cy.selectrandomchair()
    cy.log('select the practioner')
   // cy.selectrandompractitioner()
    cy.log('Click on Add button to create appointment')
    //hardcoding this as when we use the pageselector method the button is not seen.  
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text', 'Add')
      .click() 
    cy.log('Assert that the toast success message is displayed')
    var index = testData.updateFNameAndPhone.completeName.indexOf(' ');
    var firstname = testData.updateFNameAndPhone.completeName.substring(0, index);
    cy.asserttoastmessagesuccess(firstname, 'SuccessAdded a new Appointment for ')  
})

it('Case 3 - update last name and phone number and create new appointment with partial match request',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/nonDentrixOnlineRequest').then((obData)=>{
        onlineBookingData=obData
    cy.doMyOnlineBooking(
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

    cy.log('Update last name and phone number of patient')
    let patientData
    cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.nonDentrixPatient.id,
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
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Pranay Kumar')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Pranay Kumar').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log("Validate if the pop-up message has appeared for linking the appointment")
    cy.get(schedulePageSelector.modalWindowTitle)
      .should('have.text', 'Could this be the same appointment?')
	cy.get(schedulePageSelector.modalWindowMsg)
      .should('have.text', 'We found one or more appointments that are similar. Please select the appointment you would like to link.')
    cy.log('Click on No appointment match, create new')
    cy.get(schedulePageSelector.createNewApptButton).click() 
    cy.log('select the patient')
    cy.addpatientandselectfromlist(testData.updateLNameAndPhone.completeName)
    cy.log('select the chair')
    cy.selectrandomchair()
    cy.log('select the practioner')
   // cy.selectrandompractitioner()
    cy.log('Click on Add button to create appointment')
    //hardcoding this as when we use the pageselector method the button is not seen.  
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text', 'Add')
      .click() 
    cy.log('Assert that the toast success message is displayed')
    var index = testData.updateLNameAndPhone.completeName.indexOf(' ');
    var firstname = testData.updateLNameAndPhone.completeName.substring(0, index);
    cy.asserttoastmessagesuccess(firstname, 'SuccessAdded a new Appointment for ')     
})

it('Case 4 - update birth date and phone number and create new appointment with partial match request',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/nonDentrixOnlineRequest').then((obData)=>{
        onlineBookingData=obData
    cy.doMyOnlineBooking(
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

    cy.log('Update birth date and phone number of patient')
    let patientData
    cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.nonDentrixPatient.id,
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
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Pranay Kumar')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Pranay Kumar').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log("Validate if the pop-up message has appeared for linking the appointment")
    cy.get(schedulePageSelector.modalWindowTitle)
      .should('have.text', 'Could this be the same appointment?')
	cy.get(schedulePageSelector.modalWindowMsg)
      .should('have.text', 'We found one or more appointments that are similar. Please select the appointment you would like to link.')
    cy.log('Click on No appointment match, create new')
    cy.get(schedulePageSelector.createNewApptButton).click() 
    cy.log('select the patient')
    cy.addpatientandselectfromlist(testData.updateBirthDateAndPhone.completeName)
    cy.log('select the chair')
    cy.selectrandomchair()
    cy.log('select the practioner')
    //cy.selectrandompractitioner()
    cy.log('Click on Add button to create appointment')
    //hardcoding this as when we use the pageselector method the button is not seen.  
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text', 'Add')
      .click() 
    cy.log('Assert that the toast success message is displayed')
    var index = testData.updateBirthDateAndPhone.completeName.indexOf(' ');
    var firstname = testData.updateBirthDateAndPhone.completeName.substring(0, index);
    cy.asserttoastmessagesuccess(firstname, 'SuccessAdded a new Appointment for ')
    })
})