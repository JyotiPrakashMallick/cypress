/// <reference types="Cypress"/>

import tabChatSelectors from "../../../../../support/selectors/unifiedcommunications/textPatient/textPatientSelectors";
import searchPatientPageSelector from '../../../../../support/selectors/patientmanagement/searchPageSelector'
/*
**CCRU-1909 OLD UI Open/Close Chat Conversations
**AUTO-534 Validate that all closed and open conversation will appear in all tab
**AUTO-535 Validate that all flagged conversation will appear in flagged tab and displays the number of flagged unique messages in parenthesis
**AUTO-537 Validate that the filter bottom of the chat page will have the tabs for open/closed/unread /flagged and All conversation
*/
describe("Verify bottom filter,flagged tab counter and all tabs counts", {retries: 2}, () => {
  var trueCount=0, falseCount=0; 
  let flaggedCounterUI,flagAPiCounter,flaggedCounterTextUI,
  closedPatientChatID, OpenPatientChatID,firstNameDataOpen,firstNameDataClosed,lastNameDataOpen,lastNameDataClosed
  beforeEach(()=> {
    cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + 'auth')
    cy.visit('/chat/')
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
     
  })
  it('Validate that the filter bottom of the chat page will have the tabs for open/closed/unread /flagged and All conversation',{retries: 2}, () => {
 
    //checks for the filter at bottom of chat
    cy.get(tabChatSelectors.chatDropdown,{timeout:10000}).should('be.visible').click()
    cy.get(tabChatSelectors.chatTabOption).should('be.visible')
    
    //Open Tab
    cy.get(tabChatSelectors.chatTabElements)
      .eq(0)
      .invoke('text').then((openTab)=>{
    cy.log('OpenTabCount:' +openTab)
    cy.get(tabChatSelectors.chatTabElements)
       .eq(0) 
      .should('contain.text',openTab)
      })
 
    //Closed Tab
    cy.get(tabChatSelectors.chatTabElements)
      .eq(1)
      .should('contain.text','Closed')

    //Unread Tab   
    cy.get(tabChatSelectors.chatTabElements)
      .eq(2)
      .invoke('text').then((unreadTab)=>{
       cy.log('UreadTabCount:'+unreadTab)
       cy.get(tabChatSelectors.chatTabElements)
         .eq(2)  
         .should('contain.text',unreadTab)
     })
   //Flagged Tab
    cy.get(tabChatSelectors.chatTabElements)
      .eq(3)
      .invoke('text').then((flaggedTab)=>{
       cy.log('FlaggedTabCount:'+flaggedTab)
       cy.get(tabChatSelectors.chatTabElements)
         .eq(3) 
        .should('contain.text',flaggedTab)
    })
  //All Tab
  cy.get(tabChatSelectors.chatTabElements)
     .eq(4)
     .should('contain.text','All')    
     
    })

  it('Validate that all flagged conversation will appear in flagged tab and displays the number of flagged unique messages in parenthesis',()=>{
    //This asserts that there is existing flagged message    
  cy.getFlaggedTabs(Cypress.env('token')).then((flagged)=>{
    flagAPiCounter=flagged
      cy.get(tabChatSelectors.chatDropdown,{timeout:10000}).should('be.visible').click()
      cy.get(tabChatSelectors.chatTabOption).should('be.visible')  
      cy.get(tabChatSelectors.chatTabElements)
        .eq(3)
        .invoke('text').then((flaggedText)=>{
             flaggedCounterTextUI=flaggedText
             flaggedCounterUI= flaggedText.replace(/\D/g,'')
             flaggedCounterUI= parseInt(flaggedCounterUI)
         expect(flaggedCounterUI).to.deep.equal(flagAPiCounter)
         expect(flaggedCounterTextUI).to.deep.equal('Flagged '+'('+flagAPiCounter.toString()+')')
    })
    })
  });
  it('Validate that all closed and open conversation will appear in all tab',()=>{
 cy.getAllTabs(Cypress.env('token')).then((resp)=>{

      let allChatsTab=resp.body.entities.chats
      
      for (const [key, value] of Object.entries(allChatsTab)) {
        cy.log(value.isOpen);
        
        if (value.isOpen == true) {
          trueCount++;
          OpenPatientChatID=value.patientId 
        } else if (value.isOpen == false) {
          falseCount++;
          closedPatientChatID=value.patientId
        }
       
      }
      cy.log('countOpen: '+ trueCount)
      cy.log('countClosed: ' +falseCount)
      })
 
  })
})        
  