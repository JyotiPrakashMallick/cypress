/// <reference types="Cypress"/>

import tabChatSelectors from "../../../../../support/selectors/unifiedcommunications/textPatient/textPatientSelectors";
import patientSelectors from '../../../../../support/selectors/patientmanagement/patientmanagement'
import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"

/*
**CCRU-1909 OLD UI Open/Close Chat Conversations
**AUTO-529 Validate when practitioner select to text a patient it goes to the patient chat page and display the correct category of the chat (close or open)
*/
describe("Validate when practitioner select to text a patient it goes to the patient chat page and display the correct category of the chat (close or open)", () => {

  beforeEach(()=> {
    cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + 'auth')
    cy.visit("/patients/"+Cypress.env('patientIDRecord'))
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
     
  })
  it.only('Validate when practitioner select to text a patient it goes to the patient chat page and display the correct category of the chat (close or open)', () => {
    
    
    cy.get(patientSelectors.actionButton,{timeout:10000})
      .should('have.text','Actions') 

    cy.get(patientSelectors.actionButton)
      .should('be.visible')
      .click()
    cy.get(patientSelectors.textPatient,{timeout:10000})
      .should('be.visible')
      .click()
    cy.intercept(Cypress.env('backendUrl')+"api/chats/count/categories").as('waitForChatCategories')
    cy.wait('@waitForChatCategories')
    cy.get(tabChatSelectors.patientName,{timeout:10000})
      .should('be.visible')
      .should('have.text','Xander Ford')  
    cy.get(tabChatSelectors.chatStatus,{timeout:10000})
      .should('be.visible')
      .should('have.text','Close')
    cy.get(tabChatSelectors.messageBox)
      .should('be.visible')  
    cy.get(tabChatSelectors.sendButton)
      .should('be.visible')  
  
})        
})