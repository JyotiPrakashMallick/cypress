/// <reference types="Cypress"/>

/*
AUTO-318 Waitlist Enhancements: Performance - UI Pagination
Task-
AUTO-466 Add/Edit/Delete patients to waitlist
*/

import waitlistSelectors from '../../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'

describe('Add,Edit and Delete Waitlist Enhancements: Performance - UI Pagination', { scrollBehavior: false }, () => {
    let waitListData

    //setup the test
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

        // assert waitlist button is present
        cy.get(waitlistSelectors.waitlist, {timeout : 10000}).should('be.visible')

        // click on waitlist button
        cy.get(waitlistSelectors.waitlist).click()
    })

    it('Verify patient can be added to waitlist', ()=>{
      // click on add 
      cy.get(waitlistSelectors.addToWaitlist).click()

      // select patient
      cy.get(waitlistSelectors.addPatient).type(waitListData.waitlistPatient)
      cy.get(waitlistSelectors.selectPatient).click()

      //select date
//      cy.get(waitlistSelectors.removeFromWaitlist).click()
 //     cy.get(waitlistSelectors.today).click()

      // select preferred days
      cy.get(waitlistSelectors.preferredDays).click()
      cy.get(waitlistSelectors.weekDay).click()

      // select preferred times
      cy.get(waitlistSelectors.preferredTimes).click()
      cy.get(waitlistSelectors.morning).click()

      // select reason
      cy.get(waitlistSelectors.reason).click()
      cy.get(waitlistSelectors.dropDownList).contains(waitListData.reason1).click()

      // select preferred practitioner
      cy.get(waitlistSelectors.practitioner).click()
      cy.get(waitlistSelectors.optionOne).click()

      // change unit
      cy.get(waitlistSelectors.unit).clear()
      cy.get(waitlistSelectors.unit).type(waitListData.unit1)

      // add note
      cy.get(waitlistSelectors.notes).type(waitListData.newNote)

      // click on Add button
      cy.get(waitlistSelectors.addButton).click()
      cy.get(waitlistSelectors.closeList).click()

      cy.reload()

      // assert waitlist button is present
      cy.get(waitlistSelectors.waitlist, {timeout : 10000}).should('be.visible')

      // click on waitlist button
      cy.get(waitlistSelectors.waitlist).click() 

      // search the patient
      cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

      // assert patient is added to waitlist
      expect(cy.contains(waitListData.waitlistPatient))
      expect(cy.contains(waitListData.newNote))
      expect(cy.contains(waitListData.reason1))
      expect(cy.contains(waitListData.morningTime)) 
      expect(cy.contains(waitListData.unit1))    

    })

    it('Verify patient information can be edited in waitlist', ()=>{
    // search the patient
    cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

    // click on manage and edit
    cy.get(waitlistSelectors.manage).last().click()
    cy.contains("Edit").click()

    // update reason
    cy.get(waitlistSelectors.reason).click()
    cy.get(waitlistSelectors.dropDownList).contains(waitListData.reason2).click()

    // update unit
    cy.get(waitlistSelectors.unit).clear()
    cy.get(waitlistSelectors.unit).type(waitListData.unit2)

    // update note
    cy.get(waitlistSelectors.notes).clear()
    cy.get(waitlistSelectors.notes).type(waitListData.updatedNote)

    // click on Update button
    cy.get(waitlistSelectors.addButton).click()

    cy.reload()

    // assert waitlist button is present
    cy.get(waitlistSelectors.waitlist, {timeout : 10000}).should('be.visible')

    // click on waitlist button
    cy.get(waitlistSelectors.waitlist).click() 

    // search the patient
    cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

    // assert patient information is updated
    expect(cy.contains(waitListData.waitlistPatient))
    expect(cy.contains(waitListData.updatedNote))
    expect(cy.contains(waitListData.reason2))
    expect(cy.contains(waitListData.unit2))
    
    })

    it('Verify patient can be deleted from waitlist', ()=>{
      // get patient count in waitlist
      cy.getCountOfWaitlistPatients().then(c1 =>{
      cy.log("patient count after adding is " +c1)

      // search the patient
      cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)
    
      // click on manage and delete
      cy.get(waitlistSelectors.manage).last().click()
      expect(cy.contains("Delete"))
      cy.contains("Delete").click()

      // confirm
      cy.on('window:confirm', () => true)

      cy.reload()

      // assert waitlist button is present
      cy.get(waitlistSelectors.waitlist, {timeout : 10000}).should('be.visible')
      
      // click on waitlist button
      cy.get(waitlistSelectors.waitlist).click() 

      // get patient count after removal of new patient in waitlist
      cy.getCountOfWaitlistPatients().then(c2 =>{
      
      // assert the count is decreased
      expect(parseInt(c2)).to.be.equal(c1 - 1) })  
     })

    })
})
