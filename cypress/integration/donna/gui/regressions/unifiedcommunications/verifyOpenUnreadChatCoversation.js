/// <reference types="Cypress"/>

/* 
CCRU-1909 Open Chat Conversations
Subtasks:

Auto-510- Validate that when an open message is marked as unread for a conversation it will still be in open tab and appears also in unread tab, the counter for open/flagged remains the same and unread tab is incremented
Auto-536- Validate that all unread conversation will appear in unread tab and displays the number of unread unique messages in parenthesis
*/
import textPatient from "../../../../../support/selectors/unifiedcommunications/textPatient/textPatientSelectors";
import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"

const testData = require('../../../../../fixtures/gui/unifiedcommunications/chattestdata.json')

describe('Verify Open Chat Features', () => {
    before(function () {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + "auth")
        cy.visit('/chat/')
     //   cy.wait(10000)
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })
    it('Validate that all unread conversation will appear in unread tab and displays the number of unread unique messages in parenthesis', () => {
        cy.log('Validate that when an open message is marked as unread for a conversation it will still be in open tab and appears also in unread tab, the counter for open/flagged remains the same and unread tab is incremented')

        //Check the open chat counts
        cy.getOpenCount(Cypress.env("token")).then(openChats => {
            cy.log("Number of open chats are " + openChats)

            // click on filter button and select Flagged status from drop down
            cy.get(textPatient.chatDropdown, { timeout: 10000 }).should('be.visible').click({ force: true })
            cy.get(textPatient.flaggedChat).click()

            //Check the Flagged chat counts
            cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats => {
                cy.log("Number of flagged chats are " + flaggedChats)

                // click on filter button and select Unread status from drop down

                cy.get(textPatient.chatDropdown, { timeout: 10000 }).should('be.visible').click({ force: true })
                
                cy.getUnreadCount(Cypress.env("token")).then(unreadChats => {
                    cy.log("Number of unread chats are " + unreadChats)

                    //Search Patient by name
                    cy.get(textPatient.patientSearchbox, { timeout: 10000 }).type(testData.patientName)

                    //Select Patient from suggested list and click on selected Patient
                    cy.get(textPatient.patientlist, { timeout: 10000 }).click()


                    //Mark the message as Unread in Open Chat area
                    
                    cy.get(textPatient.unreadDotIcon).eq(0).click()
                    cy.get(textPatient.markUnread).click({force:true})

                    //Select Unread messages from list
                   cy.get(textPatient.chatTabButton, { timeout: 10000 })
                      .click()                  
                  cy.get(textPatient.unreadChat).click()

                  cy.getUnreadCount(Cypress.env("token")).then(unreadChats2 => {
                    expect(unreadChats2).to.be.eq(unreadChats + 1)
                    cy.log('Validate that all unread conversation will appear in unread tab and displays the number of unread unique messages in ')
                    cy.get(textPatient.chatTabButton, { timeout: 10000 })
                      .click()                  
                   cy.get(textPatient.unreadChat).click()
                    
                    cy.get(textPatient.unreadChat, { timeout: 10000 })
                      .should('include.text','(' + unreadChats2 + ')')
                    
                  cy.get(textPatient.unreadPatientData).should('include.text',testData.patientName)})

                      // Verify Open chat counts remains same
                       cy.getOpenCount(Cypress.env("token")).then(openChats2 => {

                              expect(openChats2).to.be.eq(openChats)
                         })
                    // Verify Flagged chat counts remains same
                       cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats2 => {

                               expect(flaggedChats2).to.be.eq(flaggedChats)
                       }) 
                  
               
        })
        //click the patient chat to make it unread status :D 
        cy.get(textPatient.newMsg).contains(testData.patientName)
        .should('be.visible').click()

    })
     
})
    })
})  