/// <reference types="Cypress"/>

 
/** 
 * AUTO-359 Verify Practitioner Schedule is populated correctly
 */
 
 describe('This validates Practitioner Schedule is populated correctly', () => {
     let weeklyScheduleResponse
     let isWeeklyScheduleDataEmpty
    before(function () {
      cy.log('navigate to dashboard page on successful log in')
      cy.uiLoginByAPI('labeldent@afro.com','#carecru2020',Cypress.env('backendUrl')+"auth")
      cy.log('***************'+'***navigate to Practitioner page after successful log in')
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

    it('navigate to practitioner schedule tab', () => {
      cy.log('*************** asserts that user is able to navigate to practitioner schedule tab')
      cy.selectPractitonerAndNavigateToPractitionerSchedule()
    }) 

    it('get Practitioner weekly schedule', () => {
      cy.log('*************** Fetching practitioner weekly schedule through API ')
      cy.getPractitionerWeeklySchedule(Cypress.env('token')).then((res=>{
        let value=Object.keys(res)[0]
        cy.log(JSON.stringify(res))
        if(!value.includes('body')){
          weeklyScheduleResponse=res
        }
        else{
          cy.log('*****************Weekly Schedule Responseponse is null')
          isWeeklyScheduleDataEmpty=true

        }
      }))
    }) 
    it('Validate Practitioner Weekly schedule ', () => {
      cy.log('*************** asserts that Practitioner Schedule is populated correctly')
      if(!isWeeklyScheduleDataEmpty){
        cy.validatePractitionerSchedule(weeklyScheduleResponse)
      }
      else{
        cy.log('***Time slots are not avialble for this practitioner***')
      }
     
    }) 

}) 