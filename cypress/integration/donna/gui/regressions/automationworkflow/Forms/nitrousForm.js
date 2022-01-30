/// <reference types="Cypress"/>
import formsSelector from '../../../../../../support/selectors/automationworkflow/settings/formpage'

/*
 * Forms POC Nitrous
 */
describe("Verify the nitrous form can be submitted", () => {
  
  beforeEach(()=> {
    
    cy.visit(Cypress.env('nitrousFormUrl'))
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
     
  })
  it('Fillout the form Informed Consent for Nitrous Oxide/Oxygen Sedation', () => {
 
     cy.get(formsSelector.formsInputFirstName)
       .should('be.visible')
       .type('Auto')
      
     cy.get(formsSelector.formsInputLastName)
       .should('be.visible')
       .type('Test')
     
    cy.get(formsSelector.formsDateBdateField)
      .should('be.visible')
      .type('02-26-1986')

    cy.get(formsSelector.formsAreaPhoneField)
      .should('be.visible')
      .type('555')
      
    cy.get(formsSelector.formsPhoneNumField)
      .should('be.visible')
      .type('5555555')
      
      cy.get(formsSelector.formsEmergencyContact) 
        .should('be.visible')
        .type('Cypress Test')

      cy.get(formsSelector.formsDateInputConsent)
        .should('be.visible')
        .type('02-01-1999')

      cy.signatureForms()
      cy.get(formsSelector.formsSubmitButton)
        .should('be.visible')
        .click()
      cy.get(formsSelector.formsTYBanner)
        .should('be.visible')
      cy.get(formsSelector.formsH1ThankYou)
        .should('be.visible')
        .should('have.text','Thank You!')
      cy.get(formsSelector.formsSubmissionMessage)
        .should('be.visible')
        .should('have.text','Your submission has been received.') 
    })  

})        
  