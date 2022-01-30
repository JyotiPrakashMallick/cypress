/* AUTO-430 We will create an appointment and edit it with different fields. */ 
//user: autouser@mailinator.com, practice: 01 Lee Practice 01 

import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors';
import commonSelectors from '../../../../../../support/selectors/common/commonSelectors';
import schedulePageSelector from  '../../../../../../support/selectors/scheduling/schedulePageSelector';
//import generalPage from "../../../../../../support/selectors/enterprisemanagement/
const testData = require("../../../../../../fixtures/gui/scheduling/quickAppointment/appointmenttestData")

describe ('Create appointment and edit the newly created appointment fields',function()
{   
  beforeEach(function (){
 
    cy.log("Log into application using API")    
    cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit('/schedule',{timeout : 10000})
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    }) 
    })    

it.only('Confirm the appointment and update Time, Chair, Practioner', function(){
    cy.log("Create an appointment using API")
    cy.get(schedulePageSelector.todayDate,{timeout:10000}).should('be.visible').click()
    cy.log('Click on quick add')
    cy.get(schedulePageSelector.quickAddbutton,{timeout:10000}).click()
    cy.log('Appointment form should be visible')
    cy.get(schedulePageSelector.appointmentForm,{timeout:10000}).should('be.visible')
    cy.get(schedulePageSelector.headerText,{timeout:10000}).should('have.text', 'Add Appointment')

    cy.log('select the patient')
    cy.addpatientandselectfromlist(testData.patientName)
    cy.log('select the chair')
    cy.selectrandomchair()
    cy.log('select the practioner')
    cy.selectrandompractitioner()
    cy.log('Click on Add button to create appointment')
    cy.log('Asserts that user can add a random notes')
    //cy.get(schedulePageSelector.addButton)
    //hardcoding this as when we use the pageselector method the button is not seen.  
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text', 'Add')
      .click()
    cy.log('Assert that the toast success message is displayed')
    //this part extracts the first name only of patient
    var index = testData.patientName.indexOf(' ');
    var firstname = testData.patientName.substring(0, index);
    cy.asserttoastmessagesuccess(firstname, testData.toastAptSuccess)
    cy.log('Validate appointment is created')
    cy.get(schedulePageSelector.createdAppointment).contains(testData.patientName).eq(0).click()
    
    cy.log('Open the created appointment')
    cy.get(schedulePageSelector.editAppointment,{timeout:10000}).click()
    cy.log('Edit the fields of appointment')
    cy.get(schedulePageSelector.headerText,{timeout:10000}).should('have.text', 'Edit Appointment')
    cy.log('Select the Confirm appointment checkbox')
    cy.get(schedulePageSelector.confirmAppointment,{timeout:10000}).click()
    cy.log('Update the start time')
    cy.enterDropDownValue(schedulePageSelector.startTimeSelector,'08:00 AM{enter}')
    //cy.log('Update the chair of appointment')
    //cy.selectrandomchair()
    cy.log('Update the practioner of appointment')
    cy.selectrandompractitioner()
    cy.wait(6000)
    cy.log('Save the appointment with updated data')
    cy.contains('Save',{timeout:6000}).click()

    cy.log('Validate that appointment is updated')
    cy.get(schedulePageSelector.createdAppointment,{timeout:10000})
    .should('contain',testData.patientName)
    .and('contain', '8 - 9am')
    
    //Cancel appointment
    cy.log('Cancel the updated appointment')
    cy.get(schedulePageSelector.createdAppointment,{timeout:10000}).contains(testData.patientName).click()

    cy.get(schedulePageSelector.editAppointment,{timeout:6000}).click()
    cy.get(schedulePageSelector.headerText,{timeout:10000}).should('have.text', 'Edit Appointment')
    cy.log('Cancel the appointment')
    cy.get(schedulePageSelector.cancelAppointment,{timeout:10000}).click()
    cy.contains('Save').click()

    //Validate Toast Message after Appointment deletion
    cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 1000 })
      .should('be.visible')
     // .should('have.text', testData.toastAptDeleted1 + firstname + testData.AptDeleted2)

    cy.log('Verify deleted Appointment is not present ')
    cy.get(schedulePageSelector.createdAppointment, { timeout: 1000 }).should('not.have.text', testData.patientName)
    })
})
