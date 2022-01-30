/// <reference types="Cypress"/>
import formsSelector from '../../../../../../support/selectors/automationworkflow/settings/formpage'

/*
AUTO-664 Medical History Form
*/
describe("Verify the Medical History Form can be submitted", () => {
  
    beforeEach(()=> {
      
      cy.visit(Cypress.env('medicalFormUrl'))
      cy.on('uncaught:exception', () => {
        return false
      })
    })

    it('Fillout the Medical History Form', () => {
        cy.get(formsSelector.formsInputFirstName)
        .should('be.visible')
        .type('Auto')
       
      cy.get(formsSelector.formsInputLastName)
        .should('be.visible')
        .type('Test')

      cy.get(formsSelector.medicalFormBDate)
        .should('be.visible')
        .type('06-27-1987')

      cy.get(formsSelector.medicalFormAreaCode)
        .should('be.visible')
        .type('555')
    
      cy.get(formsSelector.medicalFormPhoneNum)
        .should('be.visible')
        .type('5555589')

      cy.get(formsSelector.medicalFormNumType)
        .should('be.visible')
        .check()

        cy.get(formsSelector.medicalFormAddAreaCode)
        .should('be.visible')
        .type('555')
    
      cy.get(formsSelector.medicalFormAddPhone)
        .should('be.visible')
        .type('5555456')

      cy.get(formsSelector.medicalFormAddPhnType)
        .should('be.visible')
        .check()

      cy.get(formsSelector.medicalFormEmail)
        .should('be.visible')
        .type('auto@test.com')
    
      cy.get(formsSelector.medicalFormNextBtn)
        .should('be.visible')
        .click()

      cy.get(formsSelector.medicalFormProblem)
        .should('be.visible')
        .check()

      cy.get(formsSelector.medicalFormAllergy)
        .should('be.visible')
        .click()
    
      cy.get(formsSelector.medicalFormMed)
        .should('be.visible')
        .click()

      cy.get(formsSelector.medicalFormNoPreg)
        .should('be.visible')
        .click()

      cy.get(formsSelector.medicalFormNoHormo)
        .should('be.visible')
        .click()
      
      cy.get(formsSelector.medicalFormNoSmoke)
        .should('be.visible')
        .click()
          
      cy.get(formsSelector.medicalFormTextArea)
        .should('be.visible')
        .type('All good')
      
      cy.signatureForms()

      cy.get(formsSelector.medicalFormSubmit)
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
