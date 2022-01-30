/// <reference types="Cypress"/>

/** 
 * AUTO-172 Verify that active and inactive practitioner are populated correctly
 */
 
 describe('This validates Practitioner details  are correctly displayed from PMS to care cru', () => {
    let isPractitionerDataEmpty
    let practitionerResponse
    before(function () {
      cy.log('navigate to Practitioner  page on successful log in')
      cy.log('navigate to Chairs section on successful log in')
      cy.uiLoginByAPI(Cypress.env('email'),Cypress.env('password'),Cypress.env('backendUrl')+"auth")
      cy.visit('/settings/practitioners')
      cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
      cy.wait(4000)
      cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})
    }) 
   
  it('get All Practitioners data from API',()=>{
      cy.getPractitioners(Cypress.env('token')).then((res)=>{ 
       cy.log('Sample response' + JSON.stringify(res))
       let value= Object.keys(res)[0]  
        if(!value.includes('body')){
            practitionerResponse=res 
      }
      else{
        cy.log('*********'+'***Practitioner Response is null***')
        isPractitionerDataEmpty=true
      }
    
    }) 
  })  
    it('verifyPractitionerStatus', () => { 
      cy.log('*********'+'***asserts that user is able to verify All Practitioner data***')
      if(!isPractitionerDataEmpty){
        cy.verifyParctitionersCorrectlyDisplayed(practitionerResponse)
    }
    else{
    cy.log('*********'+'***No Practitioner found with given account***')
    }
    })
  })
  
  
  