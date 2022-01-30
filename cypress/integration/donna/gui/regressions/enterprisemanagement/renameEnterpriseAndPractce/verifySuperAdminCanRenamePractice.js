/// <reference types="Cypress"/>

const testData = require('../../../../../../fixtures/api/enterprisemanagement/practicetestdata')
import { beforeEach } from "mocha"
import enterprisetest from "../../../../../../support/selectors/enterprisemanagement/renameEnterprise/enterpriseSearchSelectors"
import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector"

const practiceName = require("crypto").randomBytes(10).toString('hex')
const string256 = require("crypto").randomBytes(256).toString('hex')

describe('Ability to rename CCP Practices', () => {
    before(function () {

        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('backendUrl') + 'auth')
        cy.visit('/admin/enterprises/list')

    })
    //Handle Uncaught Exception
    Cypress.on('uncaught:exception', (err, runnable) => {

        return false
    })


    it('Super admin can rename Practices', () => {
        //Create Practice using API
        cy.apiCreatePractice(practiceName, testData.website, testData.timezone, testData.destinationPhoneNumber, testData.street, testData.country, testData.state, testData.city, testData.zipcode, Cypress.env('token'))
        cy.log(practiceName)
        cy.intercept(Cypress.env('backendUrl')+"api/enterprises/search?keywords=*").as('waitForEnterprise')
        cy.get(enterprisetest.enterpriseSearch).type(testData.enterpriseName) //Search Enterprise in Group Name
          cy.wait('@waitForEnterprise').its('response.statusCode').should('eq', 200)
        cy.get(enterprisetest.searchResult).click() //Click to view the practice
        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option
        cy.get(enterprisetest.header).should('include.text', 'Edit Practice') //Validate the header of pop up
       // cy.wait(4000)
        cy.get(enterprisetest.practiceName).clear().type(testData.newPractice)
        cy.contains('Save').click()

        //Validate sucess toast method
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessPractice name update success')
        expect(cy.contains('Practice name update success'))
        cy.log("Verify Practice name is updated with new name")

        //Verify the updated Practice name
        cy.get(enterprisetest.practiceupdated).should('have.text', testData.newPractice)
       // cy.wait(4000)

        //////Update Practice Name with Special Character ///////////////

        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option
        cy.get(enterprisetest.header).should('include.text', 'Edit Practice') //Validate the header of pop up
      //  cy.wait(4000)
        cy.get(enterprisetest.practiceName).clear().type(testData.specialChar)
        cy.contains('Save').click()

        //Validate sucess toast method
        
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessPractice name update success')
        expect(cy.contains('Practice name update success'))
        cy.log("Verify Practice name is updated with special Char")

        //Verify the updated Practice name
        cy.get(enterprisetest.practiceupdated).should('have.text', testData.specialChar)
        //  cy.wait(4000)

        //////Update Practice Name with Single Character (P)///////////////

        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option
        cy.get(enterprisetest.header).should('include.text', 'Edit Practice') //Validate the header of pop up
      //  cy.wait(4000)
        cy.get(enterprisetest.practiceName).clear().type(testData.singleChar)
        cy.contains('Save').click()

        //Validate sucess toast method
        
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessPractice name update success')
        expect(cy.contains('Practice name update success'))
        cy.log("Verify Practice name is updated with special Char")

        //Verify the updated Practice name
        cy.get(enterprisetest.practiceupdated).should('have.text', testData.singleChar)
        // cy.wait(4000)

        ////////////Update Practice Name with Symbol ($)///////////////

        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option
        cy.get(enterprisetest.header).should('include.text', 'Edit Practice') //Validate the header of pop up
       // cy.wait(4000)
        cy.get(enterprisetest.practiceName).clear().type(testData.symbol)
        cy.contains('Save').click()

        //Validate sucess toast method
        
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessPractice name update success')
        expect(cy.contains('Practice name update success'))
        cy.log("Verify Practice name is updated with special Char")

        //Verify the updated Practice name
        cy.get(enterprisetest.practiceupdated).should('have.text', testData.symbol)
        // cy.wait(4000)


        //////////////Update Practice Name with numric value///////////////

        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option
        cy.get(enterprisetest.header).should('include.text', 'Edit Practice') //Validate the header of pop up
       // cy.wait(4000)
        cy.get(enterprisetest.practiceName).clear().type(testData.numricValue)
        cy.contains('Save').click()

        //Validate sucess toast method
       
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessPractice name update success')
        expect(cy.contains('Practice name update success'))
        cy.log("Verify Practice name is updated with special Char")

        //Verify the updated Practice name
        cy.get(enterprisetest.practiceupdated).should('have.text', testData.numricValue)
        // cy.wait(4000)
    })

    it('Verify "cancel" & "close" button on edit practice dialouge box', () => {
        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option

       // cy.wait(4000)
        cy.get(enterprisetest.practiceName).clear().type(testData.newPractice)
        cy.contains('Cancel').click()

        //Validate practice Name is not updated after Cancel
        cy.log("Validate practice Name is not updated after Cancel")
        cy.get(enterprisetest.practiceupdated).should('have.text', testData.numricValue)
        //  cy.wait(4000)

        //Validate Close(X) button
        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option

        //cy.wait(4000)
        cy.get(enterprisetest.practiceName).clear().type(testData.newPractice)
        cy.get(enterprisetest.closebtn).click()

        //Validate practice Name is not updated after Close(X)
        cy.log("Validate practice Name is not updated after X")
        cy.get(enterprisetest.practiceupdated).should('have.text', testData.numricValue)
        // cy.wait(4000)
    })

    it('Verify edit/rename practice with empty name will show alert message', () => {
        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option

        //cy.wait(4000)
        cy.get(enterprisetest.practiceName).clear()
        cy.get(enterprisetest.errorMsg).should('have.text', 'Practice  name is required')

    })
    it('Verify edit/rename Practice with 256 characters will show alert message', () => {

        cy.contains('Cancel').click()
        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option
        cy.get(enterprisetest.practiceName).clear().type(string256)

        cy.contains("Save").click()


        expect(cy.contains('Practice name update failed'))
        cy.contains("Cancel").click()
        //Group name update failed
    })

    it('Verify edit/rename Practice with 100+ characters will show alert message', () => {
        cy.get(enterprisetest.managePractice).click() //Click on three dots
        cy.get(enterprisetest.editGroup).click()// Select Edit practice option
        cy.get(enterprisetest.practiceName).clear().type(testData.string101)

        cy.contains("Save").click()
        expect(cy.contains('Practice name update failed'))

    })

})