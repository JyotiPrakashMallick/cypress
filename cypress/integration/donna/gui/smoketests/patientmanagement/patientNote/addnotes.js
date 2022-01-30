/// <reference types="Cypress"/>
/*
AUTO-316 Notes Sanity: Add and Edit Notes for patient
*/

import patientmanagement from  '../../../../../../support/selectors/patientmanagement/patientmanagement'

describe('Add and Edit Notes', {retries: 1}, () => {
 
 before(function () {
   var uuid = require("uuid")
   var patientRanStr = uuid.v4()
   Cypress.env('patientRanStr',patientRanStr)

 }) 

 beforeEach(function () {
   cy.apilogin(Cypress.env('email'),Cypress.env('password'),Cypress.env('backendUrl')+'auth')
   //navigate to patient list 
   cy.visit('/patients/list')

   //Updated to add this when uncaught:exception appears
   cy.on('uncaught:exception', () => {
     // returning false here prevents Cypress from failing the test
     return false})

     cy.intercept(Cypress.env('backendUrl')+"api/table/search?*").as('waitForResult')
     cy.intercept(Cypress.env('backendUrl')+"api/accounts/*/recalls").as('waitForIt')
    
 })
    it('add notes for patient', function(){
     cy.wait('@waitForResult').its('response.statusCode').should('eq', 200)
     
     cy.get(patientmanagement.filtermenubutton).children().find('i').click()
     
     cy.get(patientmanagement.filterOptions).children().should('contain','All Patients')
     cy.get(patientmanagement.filterOptions).children().contains('All Patients').click()
     
     cy.get('button').contains('Demographics',{ timeout: 8000 }).click()
     
     cy.get(patientmanagement.firstname).type("Shobhit011")
     cy.get(patientmanagement.lastname).type("Minocha011")
     cy.get('div').contains('Shobhit011',{timeout: 10000}).parentsUntil('.styles__displayFlex___f2dLa').click()
     
     cy.get(patientmanagement.actionButton, {timeout: 10000}).children().should('have.text','Actions')
     cy.get(patientmanagement.actionButton).children().contains('Actions').click()

     cy.get(patientmanagement.variousActions).should('contain','Add Note')
     cy.get(patientmanagement.variousActions).contains('Add Note').click()

     cy.get(patientmanagement.addnoteform).should('be.visible')
     cy.get('button').contains("Add").should('be.disabled')

     cy.log('demo of env variable', Cypress.env('patientRanStr'))
     cy.get(patientmanagement.notetextarea).type('my final note of the day ' + Cypress.env('patientRanStr'))
     cy.get('button').contains("Add").should('not.be.disabled')
     cy.get('button').contains("Add").click()
     
     cy.reload()
    
     cy.wait('@waitForIt').its('response.statusCode').should('eq', 200)
     cy.get(patientmanagement.latestnote, {timeout: 20000}).eq(0).should('be.visible').and('have.text','my final note of the day ' + Cypress.env('patientRanStr'))
 })
 
 it('edit notes for patient', function(){
   cy.wait('@waitForResult').its('response.statusCode').should('eq', 200)

   cy.get(patientmanagement.filtermenubutton).children().find('i').click()
   
   cy.get(patientmanagement.filterOptions).children().should('contain','All Patients')
   cy.get(patientmanagement.filterOptions).children().contains('All Patients').click()
   
   cy.get('button').contains('Demographics').click()
   
   cy.get(patientmanagement.firstname).type("Shobhit011")
   cy.get(patientmanagement.lastname).type("Minocha011")
   cy.get('div').contains('Shobhit011').parentsUntil('.styles__displayFlex___f2dLa').click()
   
   cy.get(patientmanagement.latestnote, {timeout: 10000}).eq(0).should('have.text','my final note of the day ' + Cypress.env('patientRanStr'))
   cy.get(patientmanagement.latestnote, {timeout: 10000}).eq(0).click()

   cy.get(patientmanagement.notetextarea).should('have.text','my final note of the day ' + Cypress.env('patientRanStr')).clear()
   cy.get(patientmanagement.notetextarea).type('this is the updated note of ' + Cypress.env('patientRanStr'))
   
   cy.get('button').contains("Update").should('not.be.disabled')   
   cy.get('button', {timeout :8000}).contains("Update").click()

   cy.reload()
    
   cy.wait('@waitForIt').its('response.statusCode').should('eq', 200)
   cy.get(patientmanagement.latestnote, {timeout: 25000}).eq(0).should('be.visible').and('have.text','this is the updated note of ' + Cypress.env('patientRanStr'))
 })
})
