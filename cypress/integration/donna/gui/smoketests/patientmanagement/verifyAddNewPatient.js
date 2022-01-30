/// <reference types="Cypress"/>

/** 
 * AUTO-313 Verify that user can add new patient for a pms capable write
 */
 
 describe('This validates user can add new patient for a pms capable write', () => {
    let patientData
    before(function () {

      cy.fixture("gui/patientmanagement/patienttestdata").then(function(data){
        patientData=data
      })

      cy.log('navigate to dashboard page on successful log in')
      cy.uiLoginByAPI(Cypress.env('username'),Cypress.env('password'),Cypress.env('backendUrl')+"auth")
      cy.log('***************'+'***navigate to Patient Management page after successful log in')
      cy.visit('patients/list')
      cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})
        cy.wait(3000)

    }) 
  
    it('Add New Patient', () => {
      cy.log('***************'+'***asserts that user is able to add new Patient***')
      cy.addNewPatient(patientData)
      cy.on('uncaught:exception', (err, runnable) => {
        return false})
    })  
  })
  
  
  