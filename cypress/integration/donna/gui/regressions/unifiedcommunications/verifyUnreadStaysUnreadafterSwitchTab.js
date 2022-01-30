/// <reference types="Cypress"/>
import tabChatSelectors from "../../../../../support/selectors/unifiedcommunications/textPatient/textPatientSelectors"
import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"

/*
**CCRU-1909 OLD UI Open/Close Chat Conversations
**AUTO-547 Validate that the first Unread Messages is not mark as read when practice switch between Chat Filters
*/
describe("Validate that the first Unread Messages is not mark as read when practice switch between Chat Filters", () => {
    let unreadCounterBeforeSwitch, unreadCounterAfterSwitch;
  beforeEach(()=> {
    cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + 'auth')
    cy.visit('/chat/')
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
     
  })
  it('Validate that the first Unread Messages is not mark as read when practice switch between Chat Filters', () => {
    //search for patient  
    cy.get(chatSelectors.search, {timeout: 10000})
      .should('be.visible')
      .type('Xander')
    cy.contains('Xander', {timeout: 10000})
      .click()

    //Selects the message from patient  
    cy.get(tabChatSelectors.bubbleMessageFrPatient)
      .should('be.visible')
      .click()
    cy.get(tabChatSelectors.ellipseIconUnread)
      .trigger('mouseover')
      .click()
    //Mark the message as unread  
    cy.get(tabChatSelectors.unreadButton)
      .should('be.visible')
      .click()
      cy.get(tabChatSelectors.chatTabButton, { timeout: 10000 })
      .click()

     cy.getUnreadCount(Cypress.env('token')).then(unreadChatCount=>{
        unreadCounterBeforeSwitch=unreadChatCount
     })
     //switch tabs
     cy.reload()
     cy.get(tabChatSelectors.chatDropdown,{timeout:10000})
       .should('be.visible')
       .click({force: true})
   
    //Select All  
    cy.get(chatSelectors.statusDdl,{timeout:10000}).eq(4).click()  
  
   
    //Checks the count of unread stays the same
    cy.get(tabChatSelectors.chatTabElements)
      .eq(2)
      .invoke('text').then((unreadTab)=>{
       cy.log('UreadTabCount:'+unreadTab)
       cy.get(tabChatSelectors.chatTabElements)
         .eq(2)  
         .should('contain.text',unreadTab)
         unreadCounterAfterSwitch= unreadTab.replace(/\D/g,'')
         unreadCounterAfterSwitch= parseInt(unreadCounterAfterSwitch)
         expect(unreadCounterAfterSwitch).to.deep.equal(unreadCounterBeforeSwitch)
     }) 

    })
})