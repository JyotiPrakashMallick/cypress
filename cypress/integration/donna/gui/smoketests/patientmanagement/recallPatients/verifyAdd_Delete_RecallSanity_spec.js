/// <reference types="Cypress"/>

import recalltest from "../../../../../../support/selectors/patientmanagement/recallSelectors";
const testData = require("../../../../../../fixtures/gui/patientmanagement/recalltestData")

describe('Add and Delete Recall for Patient', {retries:1}, () => {

    before(function () {
        cy.apilogin(Cypress.env('email'), Cypress.env('password'), Cypress.env('backendUrl') + 'auth')
        cy.visit('/patients/list')
        cy.on('uncaught:exception', () => {
            
        return false})

        cy.intercept(Cypress.env('backendUrl')+"api/table/search?*").as('waitForResult')
    })
   
    it('Verify Add and Delete Recall for a Patient', () => {
        cy.wait('@waitForResult').its('response.statusCode').should('eq', 200)

        cy.get(recalltest.maindropdown,{timeout:10000}).click() //Click on dropdown

        cy.get(recalltest.listofoption).contains('All Patients').click() //Select All Pateints from list
        
        if(cy.contains('Status')){
            cy.contains('Reset').click()
        }
        cy.get(recalltest.patientlist,{timeout:3000}).eq(0).click() //Select first row from Patients list
      
        cy.get(recalltest.actionsButton, {timeout : 8000}).contains('Action').click()
        
        cy.get(recalltest.recallSelect).click() //Select Log Recall on Action popup

        cy.get(recalltest.recallHeader).contains('Log Recall') //validate recall Header
       
        cy.get(recalltest.contactMethod, {timeout : 8000}).eq(0)
           .should('contain.text', testData.contactMethod)
       
       cy.get(recalltest.recallCaretDown, {timeout : 8000}).should('be.visible')
       cy.get(recalltest.recallCaretDown).click()

       cy.randomlyselectfromdropdown(recalltest.recallOutComeDrp)
  
       cy.get(recalltest.addButton, {timeout : 8000}).contains('Add').click() //Click on Add
    
       cy.get(recalltest.recallSuccess, {timeout : 8000}).should('be.visible') //validate success message
       
        //validate date of new recall
        const moment = require('moment')
        const d = new Date()
        const t = moment(d).format('MMMM Do, YYYY')

        cy.log(t)
        cy.get(recalltest.loggedList).eq(0).invoke('text')
            .then((text) => {

              const count = text.lastIndexOf("on")
                if (count == 29) {
                    const splitText = text.slice(32, 54)
                    expect(splitText).to.include(t)
                }
                else {
                    const splitText = text.slice(34, 54)
                    expect(splitText).to.include(t)
                }               
              })

        //Delete Recall              
        cy.get(recalltest.deleteIcon).eq(0).invoke('show').click({ force: true }) //Click on Delete icon

        cy.on('window:confirm', (str) => {
            expect(str).to
                .equal(recalltest.recallDeleted)
        })
    })
})
