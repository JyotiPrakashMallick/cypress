/// <reference types="Cypress"/>

 
/** 
 * AUTO-182 Verify that chairs are linked to practitioner in their practitioner schedule for write capable pms
 */
 
 describe('This validates chairs are Linked to practioner in their practioner schedule', () => {
  let practitionerScheduleData
 before(function () {
   cy.fixture("gui/integrations/practitonerScheduleData").then(function(data){
   practitionerScheduleData=data

      })
    cy.log('navigate to Chairs section on successful log in')
    cy.uiLoginByAPI('labeldent@afro.com','#carecru2020',Cypress.env('backendUrl')+"auth")
    cy.visit('/settings/practitioners')
    cy.wait(4000)
    cy.on('uncaught:exception', (err, runnable) => {
        
      return false
    });
    }) 

    it('navigate to practitioner schedule tab', () => {
      cy.log('*************** asserts that user is able to navigate to practitioner schedule tab')
      // cy.navigateToPractitioner()
      cy.selectPractitonerAndNavigateToPractitionerSchedule()
    }) 

 it('Validate chair likned to practioner schedule tab', () => {
   cy.log('*************** asserts that user is able to validate chair is linked to practitioner schedule ')
   cy.verifyChairsLinkedToPractionerSchedule(practitionerScheduleData)
 }) 


}) 