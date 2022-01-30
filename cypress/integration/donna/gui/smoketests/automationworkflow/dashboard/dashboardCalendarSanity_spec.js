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
  it('Verify, User able to see valid username on dashboard page after successful login', function(){
    cy.log("Assert that, User able to see Welcome message with Username")
    cy.verifyWelcomeMessage(Cypress.env('user'))
 })

it("Verify, User able to see calendar icon", ()=>{
    cy.log("Assert that, User able to see calendar icon on dashboard page")
    cy.isDisplayedCalendarIcon()
 })
it("Verify, User see current login date in dashboard", ()=>{
    cy.log("Assert that, User able to see calendar current date")
    cy.verifyDashboardCurrentLoginDate(uiHelper.getCurrentUILoginDate())
})
it("Verify, User to navigate to past input date MM/DD/YYYY", function (){
  cy.log("Assert that, user able to select previous month date")
  cy.selectDashboardDate("08/02/2022")
})
// it("Verify, User to navigate to any input current month date MM/DD/YYYY", function (){
//   cy.log("Assert that, user able to select current month date")
//   cy.selectDashboardDate(Cypress.env("loginDate"))
// })
// it("Verify, User to navigate to future month date MM/DD/YYYY", function (){
//   cy.log("Assert that, user able to select comming month date")
//   cy.selectDashboardDate("10/05/2021")
// })
})
