/// <reference types="Cypress"/>
/* 
AUTO-556 Open Chat Conversations
Sub-Tasks
AUTO-528 Validate when a practice text a patient with previously closed message the whole chat thread will be re-opened
AUTO-509 Validate that practitioner reply to a closed message, the counter for open tab is incremented
Above two tasks are merged in one test
*/

import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"
const randomMsg = require("crypto").randomBytes(6).toString('hex')

describe('Re-Open Chat Conversation when practitioner replies to a patient',{retries: 1}, () => {
    let cfData
    //setup the test
    beforeEach(() => {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl')+"auth")
        
        cy.fixture('gui/unifiedcommunications/chattestdata').then((cf)=>{
            cfData=cf
        })
        cy.visit('/chat/') 

        cy.on('uncaught:exception', () => {
          return false })
    })

    it ('Verify when a practice text a patient with previously closed message, whole chat thread will be re-opened & counter for open tab is incremented', ()=>{
        // search patient chat
        cy.searchPatientChat(cfData.testPatient5)
  
        // click on Close link, if present
        cy.get(chatSelectors.header, {timeout: 10000}).invoke('text').then((text)=>{
          if(text=='Close'){
          cy.contains('Close').click()
          expect(cy.contains('Successfully closed conversation'))
        }
       else {cy.log('Chat is already closed')}
     })
  
     cy.getOpenCount(Cypress.env("token")).then(openChats =>{
      cy.log("Number of open chats are " + openChats)
  
      // assert chat is closed
      expect(cy.contains('Reopen'), {timeout: 10000})
  
     // send message 
     cy.get(chatSelectors.textArea, {timeout: 10000}).type('Auto msg '+ randomMsg + '{Enter}')
     cy.get(chatSelectors.sendButton).click()
     expect(cy.contains('Auto msg '+ randomMsg), {timeout: 10000})
  
     cy.visit('/chat/')
  
     // page lands on open status messages, now assert patient chat is present there
     expect(cy.contains(cfData.testPatient5, {timeout: 10000}))
  
     // count the chats in open tab and assert count is incremented
     cy.getOpenCount(Cypress.env("token")).then(openChats2 =>{
      expect(openChats2).to.be.eq(openChats + 1)
     })
  
     // search patient chat and change it to status: Closed
     cy.searchPatientChat(cfData.testPatient5)
  
     // assert close button is shown on chat
     cy.get(chatSelectors.header, {timeout: 12000}).invoke('text').then((text)=>{
      expect(text).to.contain('Close') })
  
     // click on Close link
     cy.contains('Close').click()
     expect(cy.contains('Successfully closed conversation'))
    })
  })
})
