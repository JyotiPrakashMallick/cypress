/// <reference types="Cypress"/>
import formsSelector from '../../../../../../support/selectors/automationworkflow/settings/formpage'

/*
 * Acknowledgement of Receipt of Notice of Privacy Practices
 */
describe("Verify the Acknowledgement of Receipt of Notice of Privacy Practices form can be submitted", () => {
  
  beforeEach(()=> {
    
    cy.visit(Cypress.env('ackNoticePrivyFormUrl'))
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
     
  })
  it('Fillout the Acknowledgement of Receipt of Notice of Privacy Practices', () => {
  

  
    cy.get(formsSelector.formsInputFirstName)
       .should('be.visible')
       .type('Auto')
      
     cy.get(formsSelector.formsInputLastName)
       .should('be.visible')
       .type('Test')
     
    cy.get(formsSelector.hippaFormBdate)
      .should('be.visible')
      .type('02-26-1986')

    cy.get(formsSelector.hippaAreaCode)
      .should('be.visible')
      .type('555')
      
    cy.get(formsSelector.hippaPhoneNum)
      .should('be.visible')
      .type('5555555')
      
    cy.get(formsSelector.hippaDate)
        .should('be.visible')
        .type('02-01-1999')

      cy.signatureForms()
      cy.get(formsSelector.formsSubmitButton,{timeout:10000})
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
  