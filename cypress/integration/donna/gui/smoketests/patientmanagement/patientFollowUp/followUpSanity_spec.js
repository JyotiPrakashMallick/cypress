/// <reference types="Cypress"/>

import patientList from  '../../../../../../support/selectors/patientmanagement/patientList'
const randomNote = require("crypto").randomBytes(8).toString('hex')

describe('FollowUp Sanity Test', () => {
  let followUpData

    //setup the test
  before(function () {
      cy.apilogin(Cypress.env('email'),Cypress.env('password'),Cypress.env('backendUrl')+"auth")
      cy.visit('/patients/list')   
      cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})

      // load data from fixtures
      cy.fixture('gui/patientmanagement/followUpTestData').then((followUp)=>{
        followUpData=followUp
      })

      cy.intercept(Cypress.env('backendUrl')+"api/table/search?*").as('waitForResult')
  })

  it('Verify followUp for a patient is added successfully', ()=> {
    cy.wait('@waitForResult').its('response.statusCode').should('eq', 200)

    // select all_patients option from dropdown
    cy.get(patientList.dropDownHeader, {timeout : 8000}).click()
    cy.get(patientList.options, {timeout : 8000}).contains('All Patients').click()

    // if patient doesn't appear and status filter is there, then click on reset link,the data appears
    if(cy.contains('Status')){
    cy.contains('Reset').click()}

    // select patient and click on Actions
    cy.get(patientList.firstPatient, {timeout : 2000}).eq(0).click({force: true})
    cy.contains('Actions',{timeout:10000}).click()

    // select follow up option from drop down
    cy.contains('Add Follow Up').click()

    // select Due Date
    cy.get(patientList.dueDate).click()
    cy.get(patientList.today).click()

    // type in random note
    cy.get(patientList.note).type(randomNote)

    // select Reason
    cy.get(patientList.reason, {timeout : 6000}).should('be.visible').click()
    cy.get(patientList.treatmentPlan).click()

    // click on Add button
    cy.get(patientList.addButton, {timeout : 6000}).click()

    // Assert toast message
    cy.get(patientList.toastMessage).contains(followUpData.message)

    // Assert data in timeline & Activities
    expect(cy.contains('Status: '))
    expect(cy.contains('Not Completed'))
    expect(cy.contains('Note: '))
    expect(cy.contains(randomNote))

    // Assert follow Up heading in timeline
    cy.getMyFormattedDate().then(datevalue =>{ 
    expect(cy.contains(followUpData.followUpPlan + datevalue ))
    })
})
})
