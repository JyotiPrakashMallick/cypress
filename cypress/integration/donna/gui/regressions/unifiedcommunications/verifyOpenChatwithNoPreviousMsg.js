/// <reference types="Cypress"/>
/* 
AUTO-556 Open Chat Conversations
Sub-Tasks
Auto-513 - Validate when a practice text a patient with no previous message, the counter for open tab is incremented, flagged tab remains the same count, unread tab remains the same count
Aito-533 - Validate when a practice text a patient with no previous message, it should go to open tab conversations
*/

import textPatient from "../../../../../support/selectors/unifiedcommunications/textPatient/textPatientSelectors";
import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors";
const testData = require('../../../../../fixtures/gui/unifiedcommunications/chattestdata.json')
const textToPatient = require("crypto").randomBytes(10).toString('hex')

describe('Validate when a practice text a patient with no previous message', () => {
  beforeEach(() => {
    cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + "auth")
    cy.visit('/chat/')
    cy.wait(5000)
    cy.on('uncaught:exception', () => {
      return false
    })
  })

  it('Validate when a practice text a patient with no previous message, it should go to open tab conversations', () => {
    cy.log("Store the count of Open, Flagged and Unread Chat before sending the message")

    // search patient chat
    cy.searchPatientChat(testData.patientwithNoPreviousMsg)
    cy.get(textPatient.patientHeader).should('have.text', testData.patientwithNoPreviousMsg)

    //Check if there is any existing message present
    if (!cy.get(textPatient.noMsg, { timeout: 10000 }) !== 'No message') {

      // Delete the existing chat
      cy.url().then(url => {
        const getUrl = url
        cy.log('Current URL is : ' + getUrl)
        const currentChatId = getUrl.split("/").pop();
        cy.log(currentChatId);
        cy.log('Delete the cureent chat for this user')
        cy.deleteChatId(Cypress.env('token'), currentChatId)

        // search patient chat
        cy.searchPatientChat(testData.patientwithNoPreviousMsg)
        cy.get(textPatient.patientHeader).should('have.text', testData.patientwithNoPreviousMsg)

      })
    }

    //Check the open chat counts
    cy.getOpenCount(Cypress.env("token")).then(openChats => {
      cy.log("Number of open chats are " + openChats)

      //Check the Flagged chat counts
      cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats => {
        cy.log("Number of flagged chats are " + flaggedChats)

        cy.getUnreadCount(Cypress.env("token")).then(unreadChats => {
          cy.log("Number of unread chats are " + unreadChats)

          //Validate that text 'No Message' is visible
          cy.get(textPatient.noMsg, { timeout: 10000 }).should('have.text', 'No messages')

          //Type the message and click Add button

          cy.get(textPatient.messageBox, { timeout: 10000 }).type(textToPatient)
          cy.get(textPatient.sendButton, { timeout: 10000 }).click()

          //Check Message went in Open tab
          cy.get(textPatient.chatDropdown, { timeout: 10000 }).click()
          cy.get(chatSelectors.statusDdl).eq(0).click() //Click on Open 

          //Validate last message appears in Open tab
          cy.log("Validate last sent message appears in Open tab")
          cy.get(textPatient.lastMessage).contains(textToPatient).should('be.visible')

          //Validate count of messages once a new message sent
          cy.log('Validate count of messages once a new message sent')

          // Verify Open chat counts increase by 1
          cy.getOpenCount(Cypress.env("token")).then(openChats2 => {

            expect(openChats2).to.be.eq(openChats + 1)
          })
          // Verify Flagged chat counts remains same
          cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats2 => {

            expect(flaggedChats2).to.be.eq(flaggedChats)
          })
          // Verify Unread chat counts remains same
          cy.getUnreadCount(Cypress.env("token")).then(unreadChats2 => {
            expect(unreadChats2).to.be.eq(unreadChats)
          })
        })
      })


    })

  })

})

