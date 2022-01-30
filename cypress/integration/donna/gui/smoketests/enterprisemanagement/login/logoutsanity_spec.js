/// <reference types="Cypress"/>
describe ('This test the functionality for successful logged out of valid user',function()
{

    it ('allows valid user to logged out successfully',function () { 
      cy.visit(Cypress.env('baseUrl'))
      cy.login(Cypress.env('email'),Cypress.env('password'))   
        cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})
          cy.loggedout(Cypress.env('logoffUrl'))
      })
    })