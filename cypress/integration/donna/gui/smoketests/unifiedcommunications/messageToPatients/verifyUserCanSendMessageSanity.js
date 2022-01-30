/// <reference types="Cypress"/>

import moment from "moment";
import textPatient from "../../../../../../support/selectors/unifiedcommunications/textPatient/textPatientSelectors";
const textToPatient = require("crypto").randomBytes(10).toString('hex')

describe("Verify user can send message to patient", () => {
    let msg

    before(function () {

        cy.apilogin(Cypress.env('email'), Cypress.env('password'), Cypress.env('backendUrl') + 'auth')
        cy.visit('chat')
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})  
        //data from fixture
        cy.fixture('gui/unifiedcommunications/textPatients').then((data) => {
            msg = data
        })
        Cypress.on('uncaught:exception', (err, runnable) => {

            return false
        }) 

    })

    it('Search Patient and send text message', () => {

        cy.wait(10000)
        //Search Patient by name
        cy.get(textPatient.patientSearchbox, { timeout: 10000 }).type(msg.patientName)

        //Select Patient from suggested list
        cy.get(textPatient.patientlist, { timeout: 10000 }).click()

        //validate selected patient 
        cy.get(textPatient.patientName).should('have.text', msg.patientName)

        //Type the message and click Add button
        cy.get(textPatient.messageBox).type(textToPatient)
        cy.get(textPatient.sendButton).click()

        //Validate Message is sent successfully
        cy.get(textPatient.sendconfirmation).invoke('text').then((msgtext) => {
            expect(msgtext).to.include(msg.sent)
        })
        //validate text of sent message
        cy.get(textPatient.textValidator).should('include.text', textToPatient)
    })

})

