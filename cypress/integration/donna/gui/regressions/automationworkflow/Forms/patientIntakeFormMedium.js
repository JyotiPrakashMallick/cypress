/// <reference types="Cypress"/>
import formsSelector from '../../../../../../support/selectors/automationworkflow/settings/formpage'

/*
AUTO-666 New Patient Intake Form Medium
*/
describe("Verify the Patient intake form medium can be submitted", () => {
  
    beforeEach(()=> {
      
      cy.visit(Cypress.env('patientIntakeFormMediumUrl'))
      cy.on('uncaught:exception', () => {
        return false
      })
    })

    it('Fillout the Medical History Form', () => {
        cy.get(formsSelector.pifirstName)
        .should('be.visible')
        .type('Automation')
       
      cy.get(formsSelector.pilastName)
        .should('be.visible')
        .type('User')

      cy.get(formsSelector.pipreferredName)
        .should('be.visible')
        .type('Auto')
    
      cy.get(formsSelector.piBdate)
        .should('be.visible')
        .type('06-27-1991')

      cy.get(formsSelector.piGender)
        .should('be.visible')
        .check()

      cy.get(formsSelector.piStreetAddress)
        .should('be.visible')
        .type('test street')

      cy.get(formsSelector.piStreetAddress2)
        .should('be.visible')
        .type('seaport')

      cy.get(formsSelector.piCity)
        .should('be.visible')
        .type('Vancouver')

      cy.get(formsSelector.piState)
        .should('be.visible')
        .type('test province')  
    
      cy.get(formsSelector.piPostal)
        .should('be.visible')
        .type('5353') 

      cy.get(formsSelector.piCountry)
        .should('be.visible')
        .select('Canada') 

      cy.get(formsSelector.piAreaCode)
        .should('be.visible')
        .type('5353')

      cy.get(formsSelector.piPhoneNum)
        .should('be.visible')
        .type('778 602 3877')
    
      cy.get(formsSelector.piPhnType)
        .should('be.visible')
        .check()

      cy.get(formsSelector.piAddAreaCode)
        .should('be.visible')
        .type('5354')

      cy.get(formsSelector.piAddPhnNumber)
        .should('be.visible')
        .type('778 602 3345')
    
      cy.get(formsSelector.piAddPhnType)
        .should('be.visible')
        .check()  

      cy.get(formsSelector.piEmail)
        .should('be.visible')
        .type('autouser@test.com')

      cy.get(formsSelector.piContactMethod)
        .should('be.visible')
        .select('Email') 

      cy.get(formsSelector.piOccupation)
        .should('be.visible')
        .type('accountant')

      cy.get(formsSelector.piShortNotice)
        .should('be.visible')
        .check()

      cy.get(formsSelector.piReferrence)
        .should('be.visible')
        .type('Matt')  

      cy.get(formsSelector.piCheckBox)
        .should('be.visible')
        .check()

      cy.get(formsSelector.piNextBtn)
        .should('be.visible')
        .click()

      cy.get(formsSelector.piEmergencyFirstName)
        .should('be.visible')
        .type('Paul')

      cy.get(formsSelector.piEmergencyLastName)
        .should('be.visible')
        .type('Carroll') 

      cy.get(formsSelector.piRelation)
        .should('be.visible')
        .type('Friend')

      cy.get(formsSelector.piEmergencyAreaCode)
        .should('be.visible')
        .type('5678')

      cy.get(formsSelector.piEmergencyPhnNum)
        .should('be.visible')
        .type('778 602 6754')

      cy.get(formsSelector.piSubscriberName)
        .should('be.visible')
        .type('Vince')
      
      cy.get(formsSelector.piRelationToPatient)
        .should('be.visible')
        .type('Friend')

      cy.get(formsSelector.piSubscriberBDate)
        .should('be.visible')
        .type('01-01-2000')

      cy.get(formsSelector.piInsuranceName)
        .should('be.visible')
        .type('test insurance')  

      cy.get(formsSelector.piPolicyDescription)
        .should('be.visible')
        .type('test policy')

      cy.get(formsSelector.piPolicyNumber)
        .should('be.visible')
        .type('6786789')

      cy.get(formsSelector.piSubcriberID)
        .should('be.visible')
        .type('845758')

      cy.get(formsSelector.piDivision)
        .should('be.visible')
        .type('84995')
        
      cy.get(formsSelector.piSecondSubscriber)
        .should('be.visible')
        .type('Iryna') 

      cy.get(formsSelector.piSecRelationToPatient)
        .should('be.visible')
        .type('Friend')  

      cy.get(formsSelector.piSecondSubscriberBDate)
        .should('be.visible')
        .type('01-01-2001')  

      cy.get(formsSelector.piSecondInsuranceName)
        .should('be.visible')
        .type('testing auto') 

      cy.get(formsSelector.piSecondPolicyDescription)
        .should('be.visible')
        .type('test policy') 

      cy.get(formsSelector.piSecondPolicyNumber)
        .should('be.visible')
        .type('27061987')

      cy.get(formsSelector.piSecondSubscriberID)
        .should('be.visible')
        .type('27056749')

      cy.get(formsSelector.piSecondDivision)
        .should('be.visible')
        .type('2008949')

      cy.get(formsSelector.piSecondNextBtn)
        .should('be.visible')
        .click()  

      for(let i = 0; i < 15; i++) {
      cy.get('[id="input_94_'+i+'_1"]')
        .should('be.visible')
        .check()
      }
      cy.get(formsSelector.piCurrentDentalProblem)
        .should('be.visible')
        .type('no problem')

      cy.get(formsSelector.piTreatmentNo)
        .should('be.visible')
        .check()

      cy.get(formsSelector.piHappyYes)
        .should('be.visible')
        .check()
      
      cy.get(formsSelector.piHygieneHabit)
        .should('be.visible')
        .type('all good habbits')

      cy.get(formsSelector.piDentistName)
        .should('be.visible')
        .type('Walter')
      
      cy.get(formsSelector.piFeelNervousNo)
        .should('be.visible')
        .check()

      cy.get(formsSelector.piLastDentalExam)
        .should('be.visible')
        .type('01-01-2021')
      
      cy.get(formsSelector.piLastDentalXRays)
        .should('be.visible')
        .type('01-01-2020')

      cy.get(formsSelector.piLastTeethCleaning)
        .should('be.visible')
        .type('01-01-2020') 
      
      cy.get(formsSelector.piInformation)
        .should('be.visible')
        .type('other')

      cy.get(formsSelector.piInfoForDentalCare)
        .should('be.visible')
        .type('All is well') 
      
      cy.get(formsSelector.piThirdNextBtn)
        .should('be.visible')
        .click()

      cy.get(formsSelector.piFamilyPhysician)
        .should('be.visible')
        .check()
    
      cy.get(formsSelector.piInjuryNo)
        .should('be.visible')
        .check()

      cy.get(formsSelector.piOperation)
        .should('be.visible')
        .check() 

      cy.get(formsSelector.piOperationExplain)
        .should('be.visible')
        .type('minor op')
      
      cy.get(formsSelector.piLastPhysicalExam)
        .should('be.visible')
        .type('01-01-2009')
      
      cy.get(formsSelector.piPregNo)
        .should('be.visible')
        .check()
      
      cy.get(formsSelector.piPillsNo)
        .should('be.visible')
        .check()
      
      for(let i = 0; i < 36; i++) {
          cy.get('[id="input_190_' + i +'_1"]')
            .should('be.visible')
            .check()
        }

      cy.get(formsSelector.piPrescription)
          .should('be.visible')
          .type('test med')
      
      for(let i = 0; i < 7; i++) {
          cy.get('[id="input_193_'+i+'_1"]')
            .should('be.visible')
            .check() 
        }
     
      for(let i = 0; i < 7; i++) {
          cy.get('[id="input_194_'+i+'_1"]')
            .should('be.visible')
            .check() 
        }
      
      cy.get(formsSelector.piAdvisedMedication)
        .type('nope')

      cy.get(formsSelector.piAllergicCondition)
        .type('no allergies')
      
      cy.get(formsSelector.piChildrenOnly)
        .type('no medical condition')

      cy.get(formsSelector.piFourthNextBtn)
        .should('be.visible')
        .click()
      
      cy.get(formsSelector.piCheckBox2)
        .should('be.visible')
        .check()
      
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
