/// <reference types="Cypress"/>

import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector"
const testData = require("../../../../../../fixtures/gui/scheduling/quickAppointment/appointmenttestData")
import uihelper from "../../../smoketests/common/UIHelper"
const newPatient = require("crypto").randomBytes(4).toString('hex')

describe('Verify that when we navigate to future date appointment displays in schedule page', () => {
  before(function () {

    cy.apilogin(testData.username, testData.pwd, Cypress.env('backendUrl') + 'auth')
    cy.visit('/schedule')
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

  })
  it('Vrify future date appointments are displays for existing Patients', () => {
    cy.get(schedulePageSelector.todayDate,{timeout:10000}).should('be.visible').click()

    //Set future Date
    const today = new Date()
    today.setDate(today.getDate() + 4);
    const futureDate = today.toLocaleString('default', { day: 'numeric' })
    cy.log("this is future date:" + futureDate)

    cy.log('Asserts that user can navigate to future date')
    cy.get(schedulePageSelector.calendarDate).contains(futureDate).click()
    cy.get(schedulePageSelector.quickAddbutton).click()
    cy.get(schedulePageSelector.appointmentForm).should('be.visible')
    cy.get(schedulePageSelector.headerText).should('have.text', 'Add Appointment')

    //Add Apointment for existing Patient
    cy.addpatientandselectfromlist(testData.patientName,{timeout:10000})

    cy.selectrandomchair()
    cy.selectrandompractitioner()

    //Click on add button

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

    //Cancel Appointment

    //Validate appointment is present in future date
    cy.log('Validate Appointment is present in future date')
    cy.get(schedulePageSelector.datelabel)
      .should('be.visible')
      .should('include.text', futureDate)
    cy.log('Verify the Cancelled appointment is deleted')
    cy.contains(futureDate).click()
    cy.get(schedulePageSelector.createdAppointment).contains(testData.patientName).click()

    cy.get(schedulePageSelector.editAppointment).click()
    cy.get(schedulePageSelector.headerText).should('have.text', 'Edit Appointment')
    cy.get(schedulePageSelector.cancelAppointment).click()
    cy.contains('Save').click()
    //Validate Toast Message after Appointment deletion

    cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 4000 })
      .should('be.visible')
      .should('have.text', testData.toastAptDeleted1 + firstname + testData.AptDeleted2)

    cy.log('Verify deleted Appointment is not present ')
    cy.get(schedulePageSelector.createdAppointment, { timeout: 1000 }).should('not.have.text', testData.patientName)

    //Create new patient through API    
    cy.apiCreatePatient(newPatient, testData.lastName, testData.gender, testData.email, Cypress.env('token'))
    cy.get(schedulePageSelector.quickAddbutton).click()
    cy.get(schedulePageSelector.appointmentForm).should('be.visible')
    cy.get(schedulePageSelector.headerText).should('have.text', 'Add Appointment')

    //Add Apointment for new Patient
    cy.log('Adding Apointment for new Patient')
    cy.addpatientandselectfromlist(newPatient)

    cy.selectrandomchair()
    cy.selectrandompractitioner()

    //cy.get(schedulePageSelector.addButton)
    //hardcoding this as when we use the pageselector method the button is not seen.  
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text', 'Add')
      .click()
    cy.log('Assert that the toast success message is displayed')
    //this part extracts the first name only of patient
    var index = newPatient.indexOf(' ');
    var firstname = newPatient.substring(0, index);
    cy.asserttoastmessagesuccess(newPatient, testData.toastAptSuccess)

    //Validate appointment is present in future date
    cy.log('Validate Appointment is present in future date')
    cy.get(schedulePageSelector.datelabel)
      .should('be.visible')
      .should('include.text', futureDate)
    cy.log('Verify the Cancelled appointment is deleted')

    //Cancel Appoint created for new Patient
    cy.contains(futureDate).click()
    cy.get(schedulePageSelector.createdAppointment).contains(newPatient).click()
    //cy.get(schedulePageSelector.createdAppointment).contains(firstname).click()
    cy.get(schedulePageSelector.editAppointment).click()
    cy.get(schedulePageSelector.headerText).should('have.text', 'Edit Appointment')
    cy.get(schedulePageSelector.cancelAppointment).click()
    cy.contains('Save').click()
    //Validate Toast Message after Appointment deletion

    cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 4000 })
      .should('be.visible')
      .should('have.text', testData.toastAptDeleted1 + newPatient + testData.AptDeleted2)

    cy.log('Verify deleted Appointment is not present ')
    cy.get(schedulePageSelector.createdAppointment, { timeout: 1000 }).should('not.have.text', newPatient)


  })
})