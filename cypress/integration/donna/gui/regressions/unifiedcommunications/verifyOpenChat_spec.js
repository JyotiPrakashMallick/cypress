/// <reference types="Cypress"/>
/* 
AUTO-556 Open Chat Conversations
Sub-Tasks
AUTO-530 Validate that when you flagged an open chat it still be in open tab and added to flagged tab
AUTO-511 Validate that when you flagged a open chat its still in open tab and added in flagged tab,closed tab/open/unread tab remains the same and flagged tab is incremented
Above two tasks are merged in one test

AUTO-541 Validate that the close button on the top of the chat appears for open chat
AUTO-543 Validate that by default the chat page displays the open conversations and sorted by recent conversations
Above two tasks are merged in one test

AUTO-538 Validate that all open conversation will appear in open tab and displays the number of open messages in parenthesis
*/

import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"
const randomMsg = require("crypto").randomBytes(4).toString('hex')

describe('Open Chat Conversation Features', {retries: 1}, () => {
    let cfData, openCountApi, openCountTextUI, openCountUI
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
    it('Verify that the close button on top of the chat appears for open chat', ()=>{
      // search patient chat
      cy.searchPatientChat(cfData.testPatient4)

      // assert close button and check mark appears
      cy.get(chatSelectors.header).should('have.text', 'Close')
      cy.get(chatSelectors.checkMark).should('be.visible')
  })
  it('Verify after flagging an open chat, it will still be in open tab and added to flagged tab, also the closed tab/open/unread tab remains the same', ()=>{     
      // unflag the chat if chat is already flagged
      cy.unFlagSelectedChat(cfData.testPatient4)    
      
      cy.getOpenCount(Cypress.env("token")).then(openChats =>{
      cy.log("Number of open chats are " + openChats)

      // click on filter button and select closed status from drop down
      cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
      cy.get(chatSelectors.statusDdl).eq(1).click()

     // count the chats in closed tab
     cy.getCountOfChats().then(closedChats =>{
     cy.log("Number of closed chats are " + closedChats)

     // count the chats in unread tab
     cy.getUnreadCount(Cypress.env("token")).then(unreadChats =>{
     cy.log("Number of unread chats are " + unreadChats)

      // count the chats in flagged tab
      cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats =>{
      cy.log("Number of flagged chats are " + flaggedChats)

      // search patient chat
      cy.searchPatientChat(cfData.testPatient4)

      // flag the chat by clicking on star icon
      cy.get(chatSelectors.unflaggedSelectedItem, {timeout: 10000}).click()
     
      // click on filter button and select flagged status from drop down
      cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
      
      cy.get(chatSelectors.statusDdl).eq(3).click()

      // assert flagged chat is present
      expect(cy.get(chatSelectors.chatList).contains(cfData.testPatient4))

      // assert count of flagged chats and verify flagged chat is incremented
      cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats2 =>{
      cy.log("New Number of Flagged chats are " + flaggedChats2)
      expect(flaggedChats2).to.be.eq(flaggedChats+1) })

      // click on filter button and select open status from drop down
      cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
      cy.get(chatSelectors.statusDdl).eq(0).click()

      // assert that the flagged chat is still Open
      cy.get(chatSelectors.chatList, {timeout: 10000}).scrollTo('bottom')
      cy.contains(cfData.testPatient4)

      // count the chats in open tab and assert open chats remain the same
      cy.getOpenCount(Cypress.env("token")).then(openChats2 =>{
        expect(openChats2).to.be.eq(openChats)
      })

    // click on filter button and select unread status from drop down
     cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
     cy.get(chatSelectors.statusDdl).eq(2).click()

     // assert flagged chat is not present in unread tab and it remains the same 
     cy.get(chatSelectors.chatList).should('not.contain', cfData.testPatient4) })
     cy.getUnreadCount(Cypress.env("token")).then(unreadChats2 =>{
      expect(unreadChats2).to.be.eq(unreadChats)
     })

     // click on filter button and select closed status from drop down
      cy.get(chatSelectors.chatFilterButton, {timeout:15000}).should('be.visible').click({force: true})
      cy.get(chatSelectors.statusDdl).eq(1).click()
  
      // count the chats in closed tab and assert closed chats remain the same
      cy.getCountOfChats().then(closedChats2 =>{
        expect(closedChats2).to.be.eq(closedChats)
       })
      })
    }) 
   cy.unFlagSelectedChat(cfData.testPatient4) 

   // click on filter button and select flagged status from drop down
   cy.get(chatSelectors.chatFilterButton, {timeout:15000}).should('be.visible').click({force: true})
   cy.get(chatSelectors.statusDdl).eq(3).click()

   // assert flagged chat is not present
   cy.get(chatSelectors.chatList).should('not.contain', cfData.testPatient4)
   })
  })

  it ('Verify that by default the chat page displays open conversations and sorted by recent conversations', ()=>{
    // verify default tab
    cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('have.text', 'Open ')
    
    // search patient
    cy.searchPatientChat(cfData.testPatient3)

     // click on Reopen link if present
     cy.get(chatSelectors.header, {timeout: 10000}).invoke('text').then((text)=>{
      if(text=='Reopen'){
        cy.get(chatSelectors.header).contains('Reopen').click()
      }
      else {cy.log('chat is already opened')}
   })

   // send message
    cy.get(chatSelectors.textArea).type('Auto msg '+ randomMsg + '{Enter}')
    cy.get(chatSelectors.sendButton).click()

    // assert message is sent
    expect(cy.contains('Auto msg '+ randomMsg))

    // assert most recent message appears on top of the chat list
    cy.get(chatSelectors.chatItems, {timeout: 10000}).eq(0).should('contain', cfData.testPatient3)
  
    // assert message
    cy.get(chatSelectors.chatItems).eq(0).should('contain', 'Auto msg '+ randomMsg)
  })
  it('Verify that all open conversation will appear in open tab and displays the number of open messages in parenthesis', ()=>{
    // verify Open tab is there by default
    cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('have.text', 'Open ')

    // click on status filter button
    cy.get(chatSelectors.chatFilterButton).click({force: true})

    cy.getOpenCount(Cypress.env("token")).then(openCount =>{
      openCountApi=openCount
      cy.log("Number of open chats in Api are " + openCountApi)

      cy.get(chatSelectors.statusDdl)
        .eq(0)
        .invoke('text').then((openText)=>{
        openCountTextUI=openText

        openCountUI=openText.replace(/\D/g,'')
        openCountUI=parseInt(openCountUI)
        
        // assert open count in api is equal to open count on ui
        expect(openCountUI).to.deep.equal(openCountApi)

        //assert the number of open messages in parenthesis
        expect(openCountTextUI).to.deep.equal('Open ' + '(' + openCountApi + ')')
      })
    })
  })  
})
