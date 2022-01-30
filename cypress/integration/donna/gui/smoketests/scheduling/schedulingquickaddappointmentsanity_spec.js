/// <reference types="Cypress"/>

//import { beforeEach,afterAll } from "mocha"
import schedulePageSelector from  '../../../../../support/selectors/scheduling/schedulePageSelector'
/**
 * For this test please use an enterprise that is write capable
 */
describe('Schedulling Page Sanity Tests for adding appointment for a patient', function () {
  let scheduletestdata;
  before(()=>{
    cy.apilogin(Cypress.env('userwritePMS'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit(Cypress.env('pageSchedule'))
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false})
    cy.url().should('include', Cypress.env('pageSchedule'))
    cy.fixture('gui/scheduling/testdataschedulesanitypage').then((scheduledata)=>{
      scheduletestdata=scheduledata
     cy.log(scheduletestdata.patientSelectedWrite)
      })
  })

  it('allows user to add a patient in quick add appointment form',()=>{
    //Sets the needed variables for this test
    var uuid = require("uuid")
    var id = uuid.v4()
    cy.log('Asserts the quick add button is available and can be clicked for the logged user')
    cy.assertsquickaddbutton()
    cy.log('Assert that when quick add button is click it shows the Add Appointment Modal')
    cy.get(schedulePageSelector.appointmentForm).should('be.visible')      
    cy.log('Assert that user can add a patient in the quick add form ')
    cy.addpatientandselectfromlist(scheduletestdata.patientSelectedWrite) 
    cy.log('Asserts the current date is set by default')
    cy.getCurrentDatewithformatmmddyy().then(today=>{
      cy.selectrandomstartime(today)
    })
    cy.log('Asserts that user can select a random chair from the list of dropdown available for the practice')
    cy.selectrandomchair()
    cy.log('Asserts that user can select a random practitioner from the list of dropdown available for the practice')
    cy.selectrandompractitioner()
    cy.log('Asserts that user can add a random notes')
    cy.get(schedulePageSelector.noteTextbox)
      .should('be.visible')
      .type(id)
    cy.log('Asserts that user can click the add button ')
    //cy.get(schedulePageSelector.addButton)
    //hardcoding this as when we use the pageselector method the button is not seen.
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text','Add') 
      .click()
    cy.log('Assert that the toast success message is displayed')
    //this part extracts the first name only of patient
    var index = scheduletestdata.patientSelectedWrite.indexOf(' ');
    var firstname =scheduletestdata.patientSelectedWrite.substring(0, index);
    cy.asserttoastmessagesuccess(firstname,scheduletestdata.toastAptSuccess)   
})
})
