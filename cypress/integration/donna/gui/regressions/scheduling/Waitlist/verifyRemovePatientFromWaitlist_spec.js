/// <reference types="Cypress"/>

/*
AUTO-318 Waitlist Enhancements: Performance - UI Pagination
Task-
AUTO-442 Verify that when we remove a patient from patient waitlist it gets removed and total count gets decreased
*/

import waitlistSelectors from '../../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'

describe('Verify Remove Patient from Waitlist Enhancements: Performance - UI Pagination', { scrollBehavior: false }, () => {
  let waitListData  
  beforeEach(() => {
        cy.apilogin(Cypress.env('waitlistUser'),Cypress.env('waitlist_password'),Cypress.env('backendUrl')+"auth")
        cy.visit('/schedule') 

        cy.on('uncaught:exception', () => {
        // returning false here prevents Cypress from failing the test
        return false})

        // load data from fixtures
        cy.fixture('gui/scheduling/waitlist/waitlisttestdata').then((waitList)=>{
        waitListData=waitList
        })

        // click on waitlist button
        cy.get(waitlistSelectors.waitlist).click() 
    })

    it('Verify patient can be added in waitlist', () =>{
      // click on add 
      cy.get(waitlistSelectors.addToWaitlist).click()

      // add patient
      cy.get(waitlistSelectors.addPatient).type(waitListData.waitlistPatient)
      cy.get(waitlistSelectors.selectPatient).click()

      // click on Add button
      cy.get(waitlistSelectors.addButton).click()
      cy.get(waitlistSelectors.closeList).click()

      cy.reload()
      // click on waitlist button
      cy.get(waitlistSelectors.waitlist, {timeout : 10000}).click() 

      // search the patient
      cy.get(waitlistSelectors.filterByName, {timeout : 8000}).type(waitListData.waitlistPatient)

      // assert patient is added to waitlist
      expect(cy.contains(waitListData.waitlistPatient))
    })

    it('Verify patient can be removed from waitlist and count is decreased', () =>{

      // get patient count in waitlist
      cy.getCountOfWaitlistPatients().then(c1 =>{
      cy.log("patient count after adding is " +c1)

      // search the patient
      cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

      cy.get(waitlistSelectors.firstCheckbox, {timeout : 10000}).should('be.visible').click({force:true})

      cy.contains("Remove from Waitlist").click()

      cy.on('window:confirm', () => true)

      cy.reload()
      // click on waitlist button
      cy.get(waitlistSelectors.waitlist, {timeout : 10000}).click() 

      // get patient count after removal of new patient in waitlist
      cy.getCountOfWaitlistPatients().then(c2 =>{
      
      // assert the count is decreased
      expect(parseInt(c2)).to.be.equal(c1 - 1)
      })
    })
    })
})
