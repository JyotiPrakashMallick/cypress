/* AUTO-589 This code opens the create appt window after clicking on Accept button in Online request in
non dentrix account has no match. Username needs to add in development.json: 
"nondentrix_user" : "nondentrix@carecru.com", "nondentrix_pwd" : "carecru2021",
practice: Abeldent Atlantic, Group Name -> 0001 Inline edits */

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector";
const testData = require("../../../../../../fixtures/api/patientmanagement/updateNonDentrixPatientData")

describe('User accepts appointment request that has no match',function()
{
before(function (){

    cy.log("Log into application using API")    
    cy.apilogin(Cypress.env('nondentrix_user'),Cypress.env('nondentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
    cy.on('uncaught:exception', (err, runnable) => {
        return false
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

it('create a new appt after clicking on Accept request and has no match',function(){
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

    cy.get(schedulePageSelector.todayDate, {timeout : 10000}).should('be.visible').click()
    cy.log('Validate that online request is present')
    cy.get(schedulePageSelector.onlineRequests, {timeout : 10000})
     .should('contain', 'Pranay Kumar')
    cy.log('Click on the online request') 
    cy.get(schedulePageSelector.clickOnRequest)
     .should('contain','Pranay Kumar').click()
    cy.log('Accept the request')
    cy.get(schedulePageSelector.acceptButton, {timeout : 3000}).click()
    cy.log('Validate Create or Connect a Patient window')
    cy.get(schedulePageSelector.createOrConnectPatientWnd)
      .should('contain', 'Create or Connect a Patient')
    cy.get(schedulePageSelector.connectPatientButton, {timeout : 5000}).click()    
    cy.log('select the chair')
    cy.selectrandomchair()
    cy.log('Click on Add button to create appointment')
    //hardcoding this as when we use the pageselector method the button is not seen.  
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text', 'Add')
      .click() 
    cy.log('Assert that the toast success message is displayed')
    var index = testData.nonDentrixPatientDefaultData.completeName.indexOf(' ');
    var firstname = testData.nonDentrixPatientDefaultData.completeName.substring(0, index);
    cy.asserttoastmessagesuccess(firstname, 'SuccessAdded a new Appointment for ')  
})
})