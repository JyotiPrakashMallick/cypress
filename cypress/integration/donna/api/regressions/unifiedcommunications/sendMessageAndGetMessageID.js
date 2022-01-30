/// <reference types="Cypress"/>

/*
AUTO- 753 - Chats
Sub-task 
AUTO-754 -Send Message
AUTO-755 - Get Messages total per message ID
*/
const exp = require("constants")
const testData = require("../../../../../fixtures/api/unifiedcommunications/chattestdata.json")
const textToPatient = require("crypto").randomBytes(10).toString('hex')

describe('verify chat feature', () => {
    let accountID
    beforeEach(function () {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), (Cypress.env('backendUrl') + "auth"))
    })

    it('verify Send Message', () => {
        cy.request({
            method: "GET",
            url: `${Cypress.env("backendUrl")}api/users/me`,
            headers: {
                'Authorization': "Bearer " + Cypress.env('token'),
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log('Adds the accountId to accountId variable')
            accountID=response.body.accountId
            cy.log("AccountId: "+ accountID)
          }).then((response)=>{
        cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}api/chats/textMessages/`,
            headers: {
                'Authorization': "Bearer " + Cypress.env('token'),
            },
            body: {
                addedAt: 1629202306884,
                message: textToPatient,
                patient: {
                    accountId: accountID,
                    cellPhoneNumber: testData.cellPhoneNumber,
                    id: testData.patientId
                },
                userId: testData.userId,
                chatId: testData.chatId
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.not.be.greaterThan(1000)

            //Validate message is sent to Patient
            expect(response.body.id).not.to.be.null
            expect(response.body.userId).to.equals(testData.userId)
            // cy.log(JSON.stringify(response.body))
            expect(response.body.body).to.equals(textToPatient)
            expect(response.body.to).to.equals(testData.cellPhoneNumber)
            expect(response.body.chatId).not.to.be.null
            const chatidfromResponse = response.body.chatId

            // Get Messages total per message ID

            cy.request({
                method: "GET",
                url: `${Cypress.env("backendUrl")}api/chats/${chatidfromResponse}/textMessages/`,
                headers: {
                    'Authorization': "Bearer " + Cypress.env('token'),
                },
            }).then((response) => {
                expect(response.status).to.eq(200);

                //Validate total number of messages
                expect(response.body.total).not.to.null
                expect(response.body.total).to.be.greaterThan(0)
                const totalMessage = response.body.total
                cy.log("Total Message present for this chat id is: " + totalMessage)

            })

        })

    })
})
})