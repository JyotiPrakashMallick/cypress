// <reference types="Cypress"/>

/* 
CCRU-1909 Open Chat Conversations
Subtasks:

Auto-550- Validate that when practice marks a conversation in closed chat as unread it should be reopened
Auto-525- Validate that after marking a message as unread for a message in close tab, the counter for the open tab is incremented,unread incremented and flagged remain the same
*/
import textPatient from "../../../../../support/selectors/unifiedcommunications/textPatient/textPatientSelectors";
import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"
const testData = require('../../../../../fixtures/gui/unifiedcommunications/chattestdata.json')

describe('Verify Closed Chat Features', () => {
    beforeEach(function () {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + "auth")
        
        cy.visit('/chat/')
       
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    it('Validate that when practice marks a conversation in closed chat as unread it should be reopened', () => {

        //Search Patient by name
        cy.get(textPatient.patientSearchbox, { timeout: 10000 }).type(testData.patientName2)

        //Select Patient from suggested list and click on selected Patient
        cy.get(textPatient.patientlist, { timeout: 10000 }).contains(testData.patientName2).click()

        // click on Close link to close (if present) the conversation
        cy.get(chatSelectors.header, { timeout: 10000 }).invoke('text').then((text) => {
            if (text == 'Close') {
                cy.contains('Close').click()
            }
            else { cy.log('chat is already closed') }
        })

        //Select Closed Chat from list
        cy.get(textPatient.chatDropdown, { timeout: 10000 }).should('be.visible').click({ force: true })
        cy.get(textPatient.closedChat,{timeout:10000}).click()

        //Check Patient is present in Closed Chat
       // cy.get('li.styles__chatListItem___3423E', { timeout: 10000 }).contains(testData.patientName2).click()
        cy.get(textPatient.listofClosedChat, { timeout: 10000 }).contains(testData.patientName2).click()
        //Check the Reopen Button is visible
        cy.get(chatSelectors.header, { timeout: 10000 }).contains("Reopen")

    })

    it('Validate that after marking a message as unread for a message in close tab, the counter for the open tab is incremented,unread incremented and flagged remain the same', () => {

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
                cy.get(textPatient.unreadChat).click()

                cy.getUnreadCount(Cypress.env("token")).then(unreadChats => {
                    cy.log("Number of unread chats are " + unreadChats)

                    //Search Patient by name
                    cy.get(textPatient.patientSearchbox, { timeout: 10000 }).type(testData.patientName2)

                    //Select Patient from suggested list and click on selected Patient
                    cy.get(textPatient.patientlist, { timeout: 10000 }).contains(testData.patientName2).click()

                    //Mark the message as Unread in Open Chat area
                    cy.get(textPatient.unreadDotIcon, { timeout: 10000 }).eq(0).click()
                    cy.get(textPatient.markUnread).click()

                    //Adding this line
                    cy.intercept(Cypress.env('backendUrl')+"api/chats/unread/count").as('waitForUnreadComplete')
                    cy.wait('@waitForUnreadComplete')

                    //Select Unread messages from list
                   // cy.get(textPatient.chatDropdown, { timeout: 10000 }).click()
                    cy.get(textPatient.unreadDropdown, { timeout: 10000 })
                      .click()

                    // Verify Unread chat counts is increamented by 1
                    cy.getUnreadCount(Cypress.env("token")).then(unreadChats2 => {
                        expect(unreadChats2).to.be.eq(unreadChats + 1)

                        // Verify Open chat counts increase by 1
                        cy.getOpenCount(Cypress.env("token")).then(openChats2 => {

                            expect(openChats2).to.be.eq(openChats + 1)
                        })
                        // Verify Flagged chat counts remains same
                        cy.getFlaggedCount(Cypress.env("token")).then(flaggedChats2 => {

                            expect(flaggedChats2).to.be.eq(flaggedChats)
                        })
                    })

                })
            })
        })
    })
})