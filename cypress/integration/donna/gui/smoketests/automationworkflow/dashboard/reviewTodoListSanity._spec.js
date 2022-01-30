/// <reference types="Cypress"/>
import { beforeEach, afterAll } from "mocha"
import uiHelper from "../../common/UIHelper"
describe("Donna's To-Do list for reviews", function () {
    before(function () {
        cy.clearSessionStorage()
        cy.dashboardLoginByAPI(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
        cy.visit('/')
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})
        //cy.login(Cypress.env('email'),Cypress.env('password'))
    })
     it("Verify reviews list for date "+Cypress.env("loginDate"), ()=>{
        //cy.selectDashboardDate("12/03/2021")
        cy.scrollToReminder()
        cy.clickOnTodosButton("Review Requests")
        //cy.wait(2000)
        cy.getTodoListCardTitle("Review Requests")
        cy.getTodoListCardTitleCount("Review Requests")
    })
})
