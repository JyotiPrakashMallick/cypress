/* AUTO-579, 580, 582 This code allows to open the window which we get after clicking on 'No appointment match, create new'
user: dentrixpatientuser, practice: Dentrix G6.1 Connector 3.11.2-RC3, 
Group Name -> Dental Space DENTRIX */

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
import moment from 'moment';

describe('Link the online appt request with an appt have partial match',function()
{
before(function (){

    cy.log("Log into application using API")    
    cy.apilogin(Cypress.env('dentrix_user'),Cypress.env('dentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
    cy.log("Create an appointment using API")
    cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
    let startDate = moment().add(10 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss") ;
    let endDate = moment().add(20 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
    cy.log("Read data from the fixture file")
    let patientData
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.log('Patient id is '+patientData.partialMatchPatient.id)
    cy.createApptApi(Cypress.env("token"),
        startDate,
        endDate,
        patientData.partialMatchPatient.id
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
        patientData.partialMatchPatient.id,
        patientData.partialMatchDefaultData.firstName,
        patientData.partialMatchDefaultData.lastName,
        patientData.partialMatchDefaultData.email,
        patientData.partialMatchDefaultData.birthDate,
        patientData.partialMatchDefaultData.mobilePhoneNumber,
        patientData.partialMatchDefaultData.homePhoneNumber,
        patientData.partialMatchDefaultData.cellPhoneNumber
        )    
    }) 
    cy.log('Remove all the requests if present')
    cy.removeOnlineRequests()
})   

it('Case 1 - update first name-> User does not identify a match and opts to create a new one',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/partialMatchOnlineBook').then((obData)=>{
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
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.partialMatchPatient.id,
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
     .should('contain', 'FullMatch FullMatch')
    cy.log('Click on the online request')   
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','FullMatch FullMatch').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log('Click on No appointment match, create new button')	
    cy.get(schedulePageSelector.noApptMatchButton, {timeout : 3000}).click()
    cy.log('Validate that appointment detail window is opened')
    cy.get(schedulePageSelector.apptDetailWindow)
      .should('contain', 'Have you created this appointment and patient in your PMS?')
    cy.log('No I will do it later button should be enabled and then click on that')
    cy.get(schedulePageSelector.selectNotToCreateAppt)
      .should('be.enabled').click()
    cy.log('Request Accept/Reject window should be opened now')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000})
      .should('be.visible') 
    cy.log('Close the online request window')
    cy.get(schedulePageSelector.closeRequestWindow).click()
})

it('Case 2 - update first name and phone number-> User does not identify a match and opts to create a new one',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/partialMatchOnlineBook').then((obData)=>{
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
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.partialMatchPatient.id,
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
     .should('contain', 'FullMatch FullMatch')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','FullMatch FullMatch').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log('Click on No appointment match, create new button')	
    cy.get(schedulePageSelector.noApptMatchButton, {timeout : 3000}).click()
    cy.log('Validate that appointment detail window is opened')
    cy.get(schedulePageSelector.apptDetailWindow)
      .should('contain', 'Have you created this appointment and patient in your PMS?')
    cy.log('No I will do it later button should be enabled and then click on that')
    cy.get(schedulePageSelector.selectNotToCreateAppt)
    .should('be.enabled').click()
    cy.log('Request Accept/Reject window should be opened now')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000})
    .should('be.visible') 
    cy.log('Close the online request window')
    cy.get(schedulePageSelector.closeRequestWindow).click()
})

it('Case 3 - update last name and phone number-> User does not identify a match and opts to create a new one',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/partialMatchOnlineBook').then((obData)=>{
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
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.partialMatchPatient.id,
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
     .should('contain', 'FullMatch FullMatch')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','FullMatch FullMatch').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log('Click on No appointment match, create new button')	
    cy.get(schedulePageSelector.noApptMatchButton, {timeout : 3000}).click()
    cy.log('Validate that appointment detail window is opened')
    cy.get(schedulePageSelector.apptDetailWindow)
      .should('contain', 'Have you created this appointment and patient in your PMS?')
    cy.log('No I will do it later button should be enabled and then click on that')
    cy.get(schedulePageSelector.selectNotToCreateAppt)
    .should('be.enabled').click()
    cy.log('Request Accept/Reject window should be opened now')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000})
    .should('be.visible') 
    cy.log('Close the online request window')
    cy.get(schedulePageSelector.closeRequestWindow).click()
})

it('Case 4 - update birth date and phone number-> User does not identify a match and opts to create a new one',function(){
    cy.log('Raise an online appointment request')
    let onlineBookingData
    cy.fixture('api/patientmanagement/partialMatchOnlineBook').then((obData)=>{
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
    cy.fixture('api/patientmanagement/updatePatientData').then((ptData)=>{
        patientData = ptData
    cy.updatePatient(Cypress.env("token"),
        patientData.partialMatchPatient.id,
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
     .should('contain', 'FullMatch FullMatch')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','FullMatch FullMatch').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log('Click on No appointment match, create new button')	
    cy.get(schedulePageSelector.noApptMatchButton, {timeout : 3000}).click()
    cy.log('Validate that appointment detail window is opened')
    cy.get(schedulePageSelector.apptDetailWindow)
      .should('contain', 'Have you created this appointment and patient in your PMS?')
    cy.log('No I will do it later button should be enabled and then click on that')
    cy.get(schedulePageSelector.selectNotToCreateAppt)
    .should('be.enabled').click()
    cy.log('Request Accept/Reject window should be opened now')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000})
    .should('be.visible') 
    cy.log('Close the online request window')
    cy.get(schedulePageSelector.closeRequestWindow).click()
    })
})  
