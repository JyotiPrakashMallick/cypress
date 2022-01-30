/// <reference types="Cypress"/>
/* 
AUTO-555 Closed Conversations
Sub-Tasks
AUTO-545 Validate that when you flagged a closed chat its still in closed tab and added in flagged tab
AUTO-512 Validate that when you flagged a closed chat its still in closed tab and added in flagged tab, closed tab/open/unread tab remains the same and flagged tab is incremented
Above two tasks are merged in one test

AUTO-539 Validate that after closing an open message with unread conversation it goes to closed tab
AUTO-552 Validate that after closing an unread open chat, it goes to closed tab and  the counter for open tab is decremented, unread decremented, flagged remain the same count
Above two tasks are merged in one test

AUTO-549 Validate that the re-open button on the top of the chat appears for closed chat
*/
import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"

describe('Closed Conversation Features', {retries: 1}, () => {
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
    it('Validate that when you flag a closed chat its still in closed tab and added in flagged tab, closed tab/open/unread tab remains the same and flagged tab is incremented', ()=>{
       // unflag the chat if chat is already flagged
       cy.unFlagSelectedChat(cfData.testPatient6)    

       // click on Close link, if present
       cy.get(chatSelectors.header, {timeout: 10000}).invoke('text').then((text)=>{
        if(text=='Close'){
          cy.get(chatSelectors.header).contains('Close').click()
           cy.log('Conversation is closed now')
        }
        else {cy.log('Conversation is already closed')}
       })

      cy.getOpenCount(Cypress.env("token")).then(openChats =>{
        cy.log("Number of open chats are " + openChats)
  
        // click on filter button and select closed status from drop down
        cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
        cy.get(chatSelectors.statusDdl).eq(1).click()
  
       // count the chats in closed tab
       cy.getCountOfChats().then(closedChats =>{
       cy.log("Number of closed chats are " + closedChats)
  
       // click on filter button and select unread status from drop down
       cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
       cy.get(chatSelectors.statusDdl).eq(2).click()
  
       // count the chats in unread tab
       cy.getUnreadCount(Cypress.env("token")).then(unreadChats =>{
       cy.log("Number of unread chats are " + unreadChats)
  
       // click on filter button and select flagged status from drop down
        cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
        cy.get(chatSelectors.statusDdl).eq(3).click()
  
        // count the chats in flagged tab
        cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats =>{
        cy.log("Number of flagged chats are " + flaggedChats)
  
        // search patient chat
        cy.searchPatientChat(cfData.testPatient6)

       // flag the chat by clicking on star icon
       cy.get(chatSelectors.unflaggedSelectedItem, {timeout: 10000}).click()
     
      // click on filter button and select flagged status from drop down
      cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
      cy.get(chatSelectors.statusDdl).eq(3).click()

      // assert flagged chat is present
      expect(cy.get(chatSelectors.chatList).contains(cfData.testPatient6))

      // assert count of flagged chats and verify flagged chat is incremented
      cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats2 =>{
      cy.log("New Number of Flagged chats are " + flaggedChats2)
      expect(flaggedChats2).to.be.eq(flaggedChats+1) })

      // click on filter button and select open status from drop down
      cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
      cy.get(chatSelectors.statusDdl).eq(0).click()

      // count the chats in open tab and assert open chats remain the same
      cy.getOpenCount(Cypress.env("token")).then(openChats2 =>{
        expect(openChats2).to.be.eq(openChats)
       })

       // click on filter button and select unread status from drop down
     cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
     cy.get(chatSelectors.statusDdl).eq(2).click()

     // assert unread tab remains the same 
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
    cy.unFlagSelectedChat(cfData.testPatient6) 
   })
  })
})
  it('Validate that re-open button on top of the chat appears for closed chat', ()=>{
    // search patient chat
    cy.searchPatientChat(cfData.testPatient6)

    // assert close button and check mark appears
    cy.get(chatSelectors.header).should('have.text', 'Reopen')
    cy.get(chatSelectors.redoIcon).should('be.visible')
  })
  it('Validate that after closing an unread open chat, it goes to closed tab and counter for open tab is decremented, unread decremented, flagged remain the same count', ()=>{
    // search patient
    cy.searchPatientChat(cfData.testPatient7)

    // click on Reopen link if present
    cy.get(chatSelectors.header, {timeout: 10000}).invoke('text').then((text)=>{
     if(text=='Reopen'){
      cy.get(chatSelectors.header).contains('Reopen').click()
        expect(cy.contains("Successfully reopened conversation"))
     }
     else {cy.log('chat is already opened')}
    })

    // mark the chat as unread
    cy.get(chatSelectors.unreadEllipsis).last().trigger('mouseover')
    cy.get(chatSelectors.markUnread).click()

    // get open chat count
    cy.getOpenCount(Cypress.env("token")).then(openChats =>{
      cy.log("Number of open chats are " + openChats)

    // get unread chat count
    cy.getUnreadCount(Cypress.env("token")).then(unreadChats =>{
      cy.log("Number of unread chats are " + unreadChats)

    // count flagged chat count
    cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats =>{
    cy.log("Number of flagged chats are " + flaggedChats)

    // search patient chat and change it to close status
    cy.searchPatientChat(cfData.testPatient7)

    // click on Close link
    cy.contains('Close').click()
    expect(cy.contains('Successfully closed conversation'))

    // click on filter button and select closed status from drop down
    cy.get(chatSelectors.chatFilterButton, {timeout:12000}).should('be.visible').click({force: true})
    cy.get(chatSelectors.statusDdl).eq(1).click()

    // assert closed chat is present
    expect(cy.get(chatSelectors.chatList, {timeout: 10000}).contains(cfData.testPatient7))

    // assert open count is decremented
    cy.getOpenCount(Cypress.env("token")).then(openChats2 =>{
      expect(openChats2).to.be.eq(openChats - 1)

    // assert unread count is decremented
    cy.getUnreadCount(Cypress.env("token")).then(unreadChats2 =>{
      expect(unreadChats2).to.be.eq(unreadChats - 1)

    // assert flagged count remain the same
    cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats2 =>{
      expect(flaggedChats2).to.be.eq(flaggedChats) }) }) })

    // search patient
    cy.searchPatientChat(cfData.testPatient7)  
    // re-open the chat   
    cy.get(chatSelectors.header).contains('Reopen').click()
    expect(cy.contains("Successfully reopened conversation"))
     })
    })
   })
  })
})
