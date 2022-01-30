/// <reference types="Cypress"/>

const testData = require('../../../../../../fixtures/api/enterprisemanagement/entCreateTestData')
import { beforeEach } from "mocha"
import enterprisetest from "../../../../../../support/selectors/enterprisemanagement/renameEnterprise/enterpriseSearchSelectors"
import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector"

const enterpriseName = require("crypto").randomBytes(10).toString('hex')
const string256 = require("crypto").randomBytes(256).toString('hex')

describe('Ability to rename CCP enterprises', () => {
    before(function () {

        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('backendUrl') + 'auth')
        cy.visit('/admin/enterprises/list/')
        // cy.wait(4000)

    })
    //Handle Uncaught Exception
    Cypress.on('uncaught:exception', (err, runnable) => {

        return false
    })

    after(function () {
        cy.contains("Cancel").click()
        cy.get(enterprisetest.threeDots).click()

        cy.get(enterprisetest.delBtn).click()
        //cy.wait(4000)

        // cy.get(enterprisetest.delBtn).click()
        cy.on('window:confirm', (str) => {

            expect(str).to.include("Are you sure you want to delete " + testData.symbol + "?")
            //cy.wait(4000)
        })
    })

    it('Super admin can rename Enterprise', () => {
        //Create enterprise using API

        cy.apiEnterpriseCreation(enterpriseName, testData.plan, testData.organization, Cypress.env('token'))
        cy.intercept(Cypress.env('backendUrl') + "api/enterprises/search?keywords=*").as('waitForEnterprise')
        cy.get(enterprisetest.enterpriseSearch).type(enterpriseName) //Search enterprise name
        cy.wait('@waitForEnterprise').its('response.statusCode').should('eq', 200)
        cy.get(enterprisetest.threeDots).click()
        cy.get(enterprisetest.editGroup).click() //Click on Edit group
        cy.get(enterprisetest.header).should('include.text', 'Edit Group') //Validate Header of Edit Group
        cy.get(enterprisetest.groupName).clear().type(testData.newName) //Rename the Enterprise
        cy.contains("Save").click()

        //Validate success message
        cy.log("Validate the Success toast message")
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessGroup name update success')

        //cy.get('.styles__alert--success___QqcD1').should('be.visible')
        expect(cy.contains('Group name update success'))
        // cy.wait(4000)
        cy.get(enterprisetest.searchResult).should('have.text', testData.newName)

        //////Update Enterprise with Special Chars//////////////////////////////////////
        cy.log("Verify user can rename enterprise with special characters")

        //Added new line of code
        cy.get(enterprisetest.threeDots).click()
        // cy.get('.styles__manageCell___2pIkn > .dd-menu > .vbutton__baseline___3XNit').click()
        cy.get(enterprisetest.editGroup).click() //Click on Edit group


        cy.get(enterprisetest.groupName).clear().type(testData.specialChar)
        // cy.wait(4000)
        cy.contains("Save").click()
        //cy.wait(4000)
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessGroup name update success')
        expect(cy.contains('Group name update success'))
        cy.log("Verify Enterprise name is updated with special Characters")
        cy.get(enterprisetest.searchResult).should('have.text', testData.specialChar)
        //cy.wait(4000)

        ///// Rename enterprise with Single character (A)
        cy.get(enterprisetest.threeDots).click()
        cy.get(enterprisetest.editGroup).click() //Click on Edit group
        cy.get(enterprisetest.groupName).clear().type(testData.singleChar)
        // cy.wait(4000)
        cy.contains("Save").click()

        // cy.get('.styles__alert--success___QqcD1').should('be.visible')
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessGroup name update success')
        expect(cy.contains('Group name update success'))
        // cy.wait(4000)
        cy.log("Verify Enterprise name is updated with single Character")
        cy.get(enterprisetest.searchResult).should('have.text', testData.singleChar)

        //cy.wait(4000)

        ///// Rename enterprise with Single character ($)
        cy.get(enterprisetest.threeDots).click()
        cy.get(enterprisetest.editGroup).click() //Click on Edit group
        cy.get(enterprisetest.groupName).clear().type(testData.symbol)
        //  cy.wait(4000)
        cy.contains("Save").click()
        //cy.wait(4000)
        //cy.get('.styles__alert--success___QqcD1').should('be.visible')
        cy.get(schedulePageSelector.toastSuccessMessage)
            .should('be.visible')
            .should('have.text', 'SuccessGroup name update success')
        expect(cy.contains('Group name update success'))
        cy.log("Verify Enterprise name is updated with symbols")
        cy.get(enterprisetest.searchResult).should('have.text', testData.symbol)
        //cy.wait(4000)

    })


    it('Verify Cancel and Close button on edit group dialouge box', () => {

        //Validate Cancel button
        cy.get(enterprisetest.threeDots).click()
        cy.get(enterprisetest.editGroup).click() //Click on Edit group
        cy.get(enterprisetest.header).should('include.text', 'Edit Group')
        // cy.get(enterprisetest.groupName).clear().type(enterpriseName) //Rename the enterprise title
        cy.get(enterprisetest.groupName).clear().type(enterpriseName)
        cy.contains("Cancel").click()
        cy.log("Verify Enterprise name is not updated after Cancel")
        cy.get(enterprisetest.searchResult).should('have.text', testData.symbol) //Validate enterprise name is not updated after Cancel
        // cy.get(enterprisetest.searchResult).should('have.text',enterpriseName) 

        //Validate Close(X) button
        cy.get(enterprisetest.threeDots).click()
        cy.get(enterprisetest.editGroup).click()
        cy.get(enterprisetest.groupName).clear().type(enterpriseName) //Rename the enterprise title

        cy.get(enterprisetest.closebtn).click() //Click on Close icon
        cy.log("Verify Enterprise name is not updated after Close button")
        cy.get(enterprisetest.searchResult).should('have.text', testData.symbol)

    })
    it('Verify edit/rename enterprise with empty name', () => {
        cy.get(enterprisetest.threeDots).click()
        cy.get(enterprisetest.editGroup).click()

        //Clear the Group name and validate the error message
        cy.get(enterprisetest.groupName).clear()
        cy.get(enterprisetest.errorMsg).should('have.text', 'Group name is required')

    })

    it('Verify edit/rename enterprise with 256 characters will show alert message', () => {
        cy.contains("Cancel").click()
        cy.get(enterprisetest.threeDots).click()
        cy.get(enterprisetest.editGroup).click() //Click on Edit group
        cy.get(enterprisetest.groupName).clear().type(string256) //Rename enterprise with 256 chars

        cy.contains("Save").click()
        expect(cy.contains('Group name update failed'))
        cy.contains("Cancel").click()
    })

    it('Verify edit/rename enterprise with 100+ characters will show alert message', () => {
        cy.get(enterprisetest.threeDots).click()
        cy.get(enterprisetest.editGroup).click() //Click on Edit group

        cy.get(enterprisetest.groupName).clear().type(testData.string101) ////Rename enterprise with 101 chars
        cy.contains("Save").click()
        expect(cy.contains('Group name update failed'))
    })




})
