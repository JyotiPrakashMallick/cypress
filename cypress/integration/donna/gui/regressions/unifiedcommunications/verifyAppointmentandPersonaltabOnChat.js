/// <reference types="Cypress"/>

import textPatient from "../../../../../support/selectors/unifiedcommunications/textPatient/textPatientSelectors";
const testData = require('../../../../../fixtures/gui/unifiedcommunications/chattestdata')

describe("Verify Chat window for multiple functinalities", () => {
  before(function () {
    cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + 'auth')
 
    cy.visit('/chat/')
  
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
  })
  it('Verify when user types in search field, patient name suggestions should be shown', () => {
    cy.get(textPatient.patientSearchbox, { timeout: 10000 }).type(testData.patientName)

    //Verify when user types in search field, patient name suggestions should be shown
    cy.get(textPatient.listofPatients)
      .should('includes.text', testData.patientName)

    //Select Patient from suggested list
    cy.get(textPatient.patientlist, { timeout: 10000 }).click()
    cy.get(textPatient.messageBox).should('be.visible')
    cy.get(textPatient.tabsonChat).contains('Personal')
      .should('be.visible')
      .click()
    cy.get(textPatient.tabsonChat).contains('Appointments')
      .should('be.visible')
      .click()
  })
  it('Verify pencil icon on chat directs to search field', () => {
    cy.get(textPatient.pencilIcon).click()
    cy.get(textPatient.newMsg).contains('New message')
      .should('be.visible')
    cy.get(textPatient.typeNameofPatient).should('be.visible')
  })
  it('Verify chat loads properly when user tries to move from different tabs to chat', () => {

    //Navigate to another tab from chat
   cy.get(textPatient.schedulePage,{timeout:5000}).click()
   cy.log("Validate the navigation on different pages")
 //  cy.get('[href="/schedule"]').click()
   cy.on('uncaught:exception', (err, runnable) => {
    return false
  })

    //Navigate back to Chat Page
  cy.get(textPatient.chatPage,{timeout:5000}).click()
   // cy.get('[href="/chat"]').click()
    //cy.get('[href="/schedule"] > .styles__navItem___XcCRb')

    cy.log("Validate user is navigated to chat page")
    cy.get(textPatient.pencilIcon).click()
    cy.get(textPatient.newMsg).contains('New message')
      .should('be.visible')
    cy.get(textPatient.typeNameofPatient).should('be.visible')
    cy.url().should('include', '/chat/')
  })
})
