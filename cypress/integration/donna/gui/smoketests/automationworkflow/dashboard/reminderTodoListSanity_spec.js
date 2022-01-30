/// <reference types="Cypress"/>
import { beforeEach, afterAll } from "mocha"
import uiHelper from "../../common/UIHelper"
describe("Donna's To-Do list for reminders", function () {
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
    it("Verify reminder list for date "+Cypress.env("loginDate"), ()=>{
        //cy.selectDashboardDate("09/14/2021")
        cy.scrollToReminder()
        cy.clickOnTodosButton("Appointment Reminders")
        //cy.wait(2000)
        cy.getTodoListCardTitle("Appointment Reminders")
        cy.getTodoListCardTitleCount("Appointment Reminders")
    })
})    