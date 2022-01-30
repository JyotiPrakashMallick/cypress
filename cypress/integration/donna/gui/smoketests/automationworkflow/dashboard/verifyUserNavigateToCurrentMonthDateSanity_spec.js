/// <reference types="Cypress"/>
import { beforeEach,afterAll } from "mocha"
import uiHelper from "../../common/UIHelper"

/**
 * This verifies the commonly used features in dashboard page, 
 * 
 */
describe('Dashboard Page Sanity Tests for current date login in calendar', function () {
  before(function () {
    cy.clearSessionStorage()
    cy.dashboardLoginByAPI(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit('/')
    cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})
    //cy.login(Cypress.env('email'),Cypress.env('password'))
  })
it("Verify, User to navigate to any input current month date MM/DD/YYYY", function (){
  cy.log("Assert that, user able to select current month date")
  cy.selectDashboardDate(Cypress.env("loginDate"))
})
})
