/// <reference types="Cypress"/>
import formsSelector from '../../../../../../support/selectors/automationworkflow/settings/formpage'

/*
 * Forms  Extraction Consent
 */
describe("Verify the Extraction Consent form can be submitted", () => {
  
  beforeEach(()=> {
    
    cy.visit(Cypress.env('extractionConsentFormUrl'))
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
     
  })
  it('Fillout the Informed Consent for Extractiony', () => {
    cy.get(formsSelector.formsToothNumber)
      .should('be.visible')
      .type('1')
  
    cy.get(formsSelector.formsInputFirstName)
       .should('be.visible')
       .type('Auto')
      
     cy.get(formsSelector.formsInputLastName)
       .should('be.visible')
       .type('Test')
     
    cy.get(formsSelector.formsExtractionBdate)
      .should('be.visible')
      .type('02-26-1986')

    cy.get(formsSelector.formsExtractionAreaPhoneField)
      .should('be.visible')
      .type('555')
      
    cy.get(formsSelector.formsExtractionPhoneNumField)
      .should('be.visible')
      .type('5555555')
      
    cy.get(formsSelector.formsExtractionRelationship) 
      .should('be.visible')
      .type('Kin')

    cy.get(formsSelector.formsExtractionGuardianFirstName)  
      .should('be.visible')
      .type('TestLastNameGuardian')
    
    cy.get(formsSelector.formsExtractionGuardianLastName)  
      .should('be.visible')
      .type('TestLastNameGuardian')  

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
  