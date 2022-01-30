/// <reference types="Cypress"/>

/*
AUTO-337 Waitlist Enhancements: Patient Search
Task-
AUTO-338 Verify the search field on the waitlist page
AUTO-339 Verify the auto suggestion when user keys in the first name,last name or both
AUTO-340 Verify the message when there is no result found
AUTO-341 Verify the count of results in the waitlist as user is typing in the search field
AUTO-342 Verify the search field on all the pages in the waitlist
AUTO-343 Verify the search field is in conjunction with all the filters
AUTO-344 Verify the user able to delete the keywords entered
AUTO-345 Verify the mass text checkbox with the filtered results
AUTO-346 Verify the search functionality when user copy and pastes the patient names
*/

import waitlistSelectors from '../../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'
import waitlist from "../../../../../../support/selectors/scheduling/waitlist/waitlistPage"

const randomNote = require("crypto").randomBytes(5).toString('hex')

describe('Waitlist Enhancements: Patient Search', { scrollBehavior: false }, () => {
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
        cy.get(waitlistSelectors.waitlist, {timeout : 18000}).should('be.visible')

        // click on waitlist button
        cy.get(waitlistSelectors.waitlist).click()
    })

    it('Verify patient can be added to waitlist', ()=>{
      // click on add 
      cy.get(waitlistSelectors.addToWaitlist).click()

      // select patient
      cy.get(waitlistSelectors.addPatient).type(waitListData.waitlistPatient)
      cy.get(waitlistSelectors.selectPatient).click()

     // select preferred days
     cy.get(waitlistSelectors.preferredDays).click()
     cy.get(waitlistSelectors.weekDay).click()

     // select preferred times
     cy.get(waitlistSelectors.preferredTimes).click()
     cy.get(waitlistSelectors.morning).click()

     // select reason
     cy.get(waitlistSelectors.reason).click()
     cy.get(waitlistSelectors.dropDownList).contains(waitListData.reason1).click()

      // change unit
     cy.get(waitlistSelectors.unit).clear()
     cy.get(waitlistSelectors.unit).type(waitListData.unit1)

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

    it('Verify search field is present on waitlist page', ()=>{
      cy.get(waitlistSelectors.filterByName).should('be.visible')

    })

    it('Verify message appears when no result is found', ()=>{
        cy.get(waitlistSelectors.filterByName).type(randomNote)

        // assert message
        expect(cy.contains(waitListData.noRowsFoundMsg))
    })

    it('Verify result when patient firstname, lastname and full name is typed', ()=>{
      // type first name
      cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

      // assert result
      expect(cy.contains(waitListData.waitlistPatient))

      // clear
      cy.get(waitlistSelectors.filterByName).clear()

      // type last name
      cy.get(waitlistSelectors.filterByName).type(waitListData.patientLastname)

      // assert result
      expect(cy.contains(waitListData.waitlistPatient))

      // clear
      cy.get(waitlistSelectors.filterByName).clear()
      
      // type full name
      cy.get(waitlistSelectors.filterByName).type(waitListData.patientFullName)

      // assert result
      expect(cy.contains(waitListData.waitlistPatient))
    })

    it('Verify default screen appears after clearing the search filter', ()=>{
      cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

      // assert data
      expect(cy.contains(waitListData.waitlistPatient))

      // clear the search filter
      cy.get(waitlistSelectors.filterByName).clear()

      // assert default values
      cy.get(waitlistSelectors.avatar).should('be.visible')
  })

  it('Verify mass text can be sent to patients', ()=>{
    // click on select all checkbox
    cy.get(waitlistSelectors.checkbox).eq(0).click()

    // click on send text button
    cy.get(waitlistSelectors.footerButton).click()

    // assert patient link and message
    cy.get(waitlistSelectors.patientLink).should('not.be.disabled')
    expect(cy.contains("will receive this message."))

    // send 
    cy.get(waitlistSelectors.sendMsg).click()

    // assert success message
   expect(cy.contains("Message successfully sent"))
  })
  
  it('Verify the search field is in conjuction with all the filters', ()=>{
    cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

    // assert data
    expect(cy.contains(waitListData.waitlistPatient))

    // filter by Reasons
    cy.get(waitlist.filerList).contains('Reason').click()
    cy.get(waitlist.filterbyReason).contains(waitListData.reason1).click()

    // assert data
    expect(cy.contains(waitListData.waitlistPatient))

    // filter by Practitioner
    cy.get(waitlist.filerList).contains('Practitioners').click()
    cy.get(waitlist.filerbyAllOption).click()

    // assert data
    expect(cy.contains(waitListData.waitlistPatient))

    // filter by units
    cy.get(waitlist.filerList).contains('Units').click()
    cy.get(waitlist.minUnit).first().click()
    cy.get(waitlist.minUnit).first().type(waitListData.unit1)

    // assert data 
    expect(cy.contains(waitListData.waitlistPatient))

    //Filter by days
    cy.get(waitlist.filerList).contains('Days').click()
    cy.contains('Weekdays').click()

    // assert data 
    expect(cy.contains(waitListData.waitlistPatient))

    //Filter by times
    cy.get(waitlist.filerList).contains('Times').click()
    cy.contains('Mornings').click()

    // assert data 
    expect(cy.contains(waitListData.waitlistPatient))
  })

  it('Verify the count of results in the waitlist as user is typing in the search field', ()=>{
    cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

    // assert data
    expect(cy.contains(waitListData.waitlistPatient))

    // get patient count in waitlist
    cy.getCountOfWaitlistPatients().then(c1 =>{
    cy.log("patient count after searching is " +c1)

    // assert number of rows matches count displayed above search
    cy.get(waitlistSelectors.avatar).should('have.length', c1)
    })
  })

  it('Verify the search field on all the pages in the waitlist', ()=>{
    cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)

    // assert data
    expect(cy.contains(waitListData.waitlistPatient))

    // clear search
    cy.get(waitlistSelectors.filterByName).clear()

    // Go to second page
    cy.getSpecificWaitlistPage(2)

    //assert filter
    cy.get(waitlistSelectors.filterByName).should('be.visible')

    // assert data
    cy.get(waitlistSelectors.filterByName).type(waitListData.waitlistPatient)
    expect(cy.contains(waitListData.waitlistPatient))
  })

  it('Verify record is found when user pastes the patient name in search', ()=>{
    // paste the patient name in search filter
     cy.get(waitlistSelectors.filterByName).invoke('val', waitListData.waitlistPatient).trigger('blur')
     cy.get(waitlistSelectors.filterByName).click()
     cy.get(waitlistSelectors.filterByName).type(' ')

     // assert data
     expect(cy.contains(waitListData.waitlistPatient))

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

    // click on waitlist button
    cy.get(waitlistSelectors.waitlist, {timeout : 18000}).click() 

    // get patient count after removal of new patient in waitlist
    cy.getCountOfWaitlistPatients().then(c2 =>{
      
    // assert the count is decreased
    expect(parseInt(c2)).to.be.equal(c1 - 1) })
    
    })
  })
})
