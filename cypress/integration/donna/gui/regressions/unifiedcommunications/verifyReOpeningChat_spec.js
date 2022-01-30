/// <reference types="Cypress"/>
/* 
AUTO-556 Open Chat Conversations
Sub-Tasks
AUTO-508 Validate that re-opening a closed message it goes to open tab conversations
AUTO-554 Validate that when re-opening a closed chat the counter for open tab is incremented,unread remain the same count, flagged remain the same count
Above two tasks are merged in one test
*/

import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"

describe('Re-Open Chat Conversation Features',{retries: 1}, () => {
    let cfData
    //setup the test
    beforeEach(() => {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl')+"auth")
        
        cy.fixture('gui/unifiedcommunications/chattestdata').then((cf)=>{
            cfData=cf
        })
        cy.visit('/chat/') 

        cy.on('uncaught:exception', (err, runnable) => {
          return false })
    })

    it ('Verify that re-opening a closed message it goes to open tab conversations, counter for open tab is incremented, unread and flagged remain the same', ()=>{
      // search patient chat
     cy.searchPatientChat(cfData.testPatient5)

       // click on Close link if present
     cy.get(chatSelectors.header, {timeout: 10000}).invoke('text').then((text)=>{
        if(text=='Close'){
           cy.contains('Close').click()
           expect(cy.contains('Successfully closed conversation'))
        }
        else {cy.log('chat is already closed')}
     })

      cy.getOpenCount(Cypress.env("token")).then(openChats =>{
      cy.log("Number of open chats are " + openChats)

      cy.getUnreadCount(Cypress.env("token")).then(unreadChats =>{
      cy.log("Number of Unread chats are " + unreadChats)

      cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats =>{
      cy.log("Number of Unread chats are " + flaggedChats)

      // click on Re-Open link
      cy.get(chatSelectors.header).contains('Reopen', {timeout: 10000}).click()
      expect(cy.contains('Successfully reopened conversation'))

     // click on filter button and select open status from drop down
     cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
     cy.get(chatSelectors.statusDdl).eq(0).click()

      // assert chat is moved to open tab
      cy.get(chatSelectors.chatList, {timeout: 10000}).within(()=>{
      expect(cy.contains(cfData.testPatient5))
      })
      
      // assert open chat is incremented
      cy.getOpenCount(Cypress.env("token")).then(openChats2 =>{
      expect(openChats2).to.be.eq(openChats + 1)

      // assert unread chat remain the same
      cy.getUnreadCount(Cypress.env("token")).then(unreadChats2 =>{
      expect(unreadChats2).to.be.eq(unreadChats)

      // assert flagged chat remain the same
      cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats2 =>{
      expect(flaggedChats2).to.be.eq(flaggedChats)
       })
     })
    })
      // click on filter button and select closed status from drop down
      cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
      cy.get(chatSelectors.statusDdl).eq(1).click()

      // assert chat is not present in closed tab
      cy.get(chatSelectors.chatList, {timeout: 10000}).should('not.contain', cfData.testPatient5)

      // search patient chat and change it to its default status: Closed
      cy.searchPatientChat(cfData.testPatient5)

      // click on Close link
      cy.contains('Close').click()
      expect(cy.contains('Successfully closed conversation'))
      })
     })
    })
  })
})
