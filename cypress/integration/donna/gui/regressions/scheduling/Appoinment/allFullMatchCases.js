/* AUTO-574 This code links the online appointment request with an appointment have full match
user: manish.vashisth@carecru.com, practice: Dentrix G6.1 Connector 3.11.2-RC3, 
Group Name -> Dental Space DENTRIX */

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';

describe('Link the online appt request with an appt have full match',function()
{
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
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.log('Patient id is '+patientData.fullMatchPatient.id)
    cy.createApptApi(Cypress.env("token"),
        startDate,
        endDate,
        patientData.fullMatchPatient.id
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
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.fullMatchPatient.id,
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

it('Case 1 - link complete match request to an appointment',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/fullMatchOnlineBook').then((obData)=>{
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

    cy.log('Move to schedule screen')
    cy.visit('/schedule')
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Jay Pritchett')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Jay Pritchett').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log("Validate the Success toast message")
    cy.get(schedulePageSelector.fullMatchToastMessage, {timeout : 5000})    
     .should('be.visible')
     .should('have.text', 'Request updated and Email confirmation sent to Jay Pritchett')
})

it('Case 2- update the phone number and then link online request to an appointment',function(){
    
    cy.log('Create an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/fullMatchOnlineBook').then((obData)=>{
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

    cy.log('Update phone number of patient')
    let patientData
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.fullMatchPatient.id,
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
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Jay Pritchett')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Jay Pritchett').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log("Validate the Success toast message")
    cy.get(schedulePageSelector.fullMatchToastMessage, {timeout : 5000})
     .should('be.visible')
     .should('have.text', 'Request updated and Email confirmation sent to Jay Pritchett')
})

it('Case 3- update the birth date and then link online request to an appointment',function(){
    
    cy.log('Create an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/fullMatchOnlineBook').then((obData)=>{
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

    cy.log('Update birth date of patient')
    let patientData
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.fullMatchPatient.id,
        patientData.updateBirthDate.firstName,
        patientData.updateBirthDate.lastName,
        patientData.updateBirthDate.email,
        patientData.updateBirthDate.birthDate,
        patientData.updateBirthDate.mobilePhoneNumber,
        patientData.updateBirthDate.homePhoneNumber,
        patientData.updateBirthDate.cellPhoneNumber
        )    
    })

    cy.log('Move to schedule screen')
    cy.visit('/schedule')
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Jay Pritchett')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Jay Pritchett').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log("Validate the Success toast message")
    cy.get(schedulePageSelector.fullMatchToastMessage, {timeout : 5000})
     .should('be.visible')
     .should('have.text', 'Request updated and Email confirmation sent to Jay Pritchett')
})

it('Case 4- update the last name and then link online request to an appointment',function(){
    
    cy.log('Create an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/fullMatchOnlineBook').then((obData)=>{
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

    cy.log('Update last name of patient')
    let patientData
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.fullMatchPatient.id,
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
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Jay Pritchett')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Jay Pritchett').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log("Validate the Success toast message")
    cy.get(schedulePageSelector.fullMatchToastMessage, {timeout : 5000})
      .should('be.visible')
      .should('have.text', 'Request updated and Email confirmation sent to Jay PritchettLast')
})

it('Case 5 - update birth date and first name and link partial match request to an appointment',function(){
    cy.log('Create an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/fullMatchOnlineBook').then((obData)=>{
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

    cy.log('Update first name and birth date of patient')
    let patientData1
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData1 = ptData
    cy.updatePatient(Cypress.env("token"),
    patientData1.fullMatchPatient.id,
    patientData1.updateFirstNameAndBirthDate.firstName,
    patientData1.updateFirstNameAndBirthDate.lastName,
    patientData1.updateFirstNameAndBirthDate.email,
    patientData1.updateFirstNameAndBirthDate.birthDate,
    patientData1.updateFirstNameAndBirthDate.mobilePhoneNumber,
    patientData1.updateFirstNameAndBirthDate.homePhoneNumber,
    patientData1.updateFirstNameAndBirthDate.cellPhoneNumber
        )    
    })
    cy.log('Move to schedule screen')
    cy.visit('/schedule')
    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Jay Pritchett')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Jay Pritchett').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log("Validate if the pop-up message has appeared for linking the appointment")
    cy.getMatchedApptsCount()
})
})