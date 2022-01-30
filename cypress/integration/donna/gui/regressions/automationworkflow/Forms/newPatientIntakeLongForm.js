/// <reference types="Cypress"/>
import formsSelector from '../../../../../../support/selectors/automationworkflow/settings/formpage'

/*
 * New Patient Intake form - Long
 */
describe("Verify the new patient intake form-long can be submitted", () => {
  
  beforeEach(()=> {
    
    cy.visit(Cypress.env('newPatientIntakeFormUrl'))
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
     
  })
  it('Fillout the new patient intake form - long', () => {
 
    cy.get(formsSelector.npifirstName)
       .should('be.visible')
       .type('Auto')
      
    cy.get(formsSelector.npilastName)
       .should('be.visible')
       .type('Test')
     
    cy.get(formsSelector.npidob)
      .should('be.visible')
      .type('02/26/1986')

    cy.get(formsSelector.npiSex)
      .click()  

    cy.get(formsSelector.npiStreetAddress)
      .should('be.visible')
      .type('Street1')
      
    cy.get(formsSelector.npiLine1)
      .should('be.visible')
      .type('Line1')
      
    cy.get(formsSelector.npiCity) 
      .should('be.visible')
      .type('CIty')

    cy.get(formsSelector.npiState)
      .should('be.visible')
      .type('State')

    cy.get(formsSelector.npiZipCode)
      .should('be.visible')
      .type('12111')

    cy.get(formsSelector.npiAreaCode)
      .should('be.visible')
      .type('22')

    cy.get(formsSelector.npiPhoneNumber)
      .should('be.visible')
      .type('12121212')

    cy.get(formsSelector.npiPhoneType)
      .should('be.visible')
      .click()  

    cy.get(formsSelector.npiContactEmail)
      .should('be.visible')
      .type('test@test.com')
      
    cy.get(formsSelector.npiVoiceMail)
      .should('be.visible')
      .click()
    
    cy.get(formsSelector.npiShortNotice)
      .should('be.visible')
      .click()
      
    cy.get(formsSelector.npiNextPageButton1)
      .should('be.visible')
      .click()  
    
    cy.get(formsSelector.npiEmergencyFName)
      .should('be.visible')
      .type('FName')  

    cy.get(formsSelector.npiEmergencyLName)
      .should('be.visible')
      .type('LName')
     
    cy.get(formsSelector.npiRelation)
        .should('be.visible')
        .type('Brother')
        
    cy.get(formsSelector.npiEmergencyAreaCode)
        .should('be.visible')
        .type('121')

    cy.get(formsSelector.npiEmergencyPhone)
        .should('be.visible')
        .type('6767676767')

    cy.get(formsSelector.npiPhysicianArea)
        .should('be.visible')
        .type('22')
        
    cy.get(formsSelector.npiPhysicianPhone)
        .should('be.visible')
        .type('8989898989')
        
    cy.get(formsSelector.npiMedicalSplFName) 
        .should('be.visible')
        .type('FName')

    cy.get(formsSelector.npiMedicalSplLName)
        .should('be.visible')
        .type('LName')

    cy.get(formsSelector.npiNextPageButton2)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiParentFName)
        .should('be.visible')
        .type('FName')

    cy.get(formsSelector.npiParentLName)
        .should('be.visible')
        .type('LName')

    cy.get(formsSelector.npiParentCity)
        .should('be.visible')
        .type('City')  

    cy.get(formsSelector.npiParentState)
        .should('be.visible')
        .type('State')
        
    cy.get(formsSelector.npiParentAreaCode)
        .should('be.visible')
        .type('22')
    
    cy.get(formsSelector.npiParentPhone)
        .should('be.visible')
        .type('22121212')
        
    cy.get(formsSelector.npiNextPageButton3)
        .should('be.visible')
        .click()  
    
    cy.get(formsSelector.npiHowHeardAboutUs)
        .should('be.visible')
        .click() 

    cy.get(formsSelector.npiAcknowledge)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiSubscriberName) 
        .should('be.visible')
        .type('Auto')

    cy.get(formsSelector.npiSubscriberRelation)
        .should('be.visible')
        .type('Unknown')

    cy.get(formsSelector.npiDivision)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiPolicyPlanNo)
        .should('be.visible')
        .type('34343311')

    cy.get(formsSelector.npiNextPageButton4)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiReasonForVisit)
        .should('be.visible')
        .type('Due to dental issue')  

    cy.get(formsSelector.npiDentalProblem)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiVisitingDentist)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiLastDentalVisit)
        .should('be.visible')
        .type('02/26/2021')
        
    cy.get(formsSelector.npiCleaningDate)
        .should('be.visible')
        .type('02/26/2021')  
    
    cy.get(formsSelector.npiBrushTeeth)
        .should('be.visible')
        .type('2')    
    
    cy.get(formsSelector.npiFloss)
        .should('be.visible')
        .type('2')
        
    cy.get(formsSelector.npiBleedGums) 
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiTeethSensitiveTo)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiFeelPain)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiJawInjury)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiDryMouth)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiSnore)
        .should('be.visible')
        .click()  

    cy.get(formsSelector.npiJawCrack)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiGrindTeeth)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiBiteLips)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiSoreSpot)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiLoosningTeeth)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiGumTreatment)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiBraces)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiSpecialistTreatment)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiProblemWithTreatment)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiSatisfiedWithAppearance)
        .should('be.visible')
        .click()  

    cy.get(formsSelector.npiNervous)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiNextPageButton5)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiHealthProblem)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiChangeInHealth)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiTreatedInLastYear)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiProblemIdentified)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiHospitalized)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiTakingMedication)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiHaveAllergies)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiReactionToDentalMaterial)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiReplacementOfValve)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiHaveAdvised)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiHaveProsthetic)
        .should('be.visible')
        .click()  

    cy.get(formsSelector.npiHaveConditions)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiDisorders)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiBleedingProblem)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiShortnessOfBreath)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiConditionsNotListed)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiDiseaseInFamily)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiSmoke)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiPregnant)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiBreatFeeding)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiDisable)
        .should('be.visible')
        .click()

    cy.get(formsSelector.npiTravelledToEndemicArea)
        .should('be.visible')
        .click()  

    cy.get(formsSelector.npiAnyNewSymtoms)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiInfectiousDisease)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiAntimicrobialTherapy)
        .should('be.visible')
        .click()
        
    cy.get(formsSelector.npiUsedBiphosphonates)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiRadiationToHead)
        .should('be.visible')
        .click()
    
    cy.get(formsSelector.npiImmunizationUpdated)
        .should('be.visible')
        .click()

    cy.signatureForms()      
    
    cy.get(formsSelector.npiSubmitButton)
        .should('be.visible')
        .click()     

    cy.get(formsSelector.formsTYBanner)
      .should('be.visible')
    cy.get(formsSelector.formsH1ThankYou)
      .should('be.visible')
      .should('have.text','Thank You!')
    cy.get(formsSelector.formsSubmissionMessage)
      .should('be.visible')
      .should('contain','Your submission has been received.')   
  })  

})        
  