/// <reference types="Cypress"/>

/*
AUTO-139 Verify that when user turned off the toggle for any touch point the reminder will be disabled
AUTO-140 Verify that when user turned on the toggle for any touch point that was disabled before will be re-enabled again
*/

import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors';

describe('Enable and disable reminders', ()=>{
    
 before(function(){
    cy.apilogin(Cypress.env('email'),Cypress.env('password'),Cypress.env('backendUrl')+"auth")
    cy.visit('/settings/workflow/reminders')
    cy.on('uncaught:exception', (err, runnable) => {
        return false})
 })
beforeEach(()=>{
    cy.intercept('POST',Cypress.env('graphQLWorkflow') + "/graphql",(req)=>{
        if (req.body.operationName.includes('updateTouchPoint')){
            req.alias = 'updateTouchPoint'
          }
    }) 
    cy.intercept('POST',Cypress.env('graphQLWorkflow') + "/graphql",(req)=>{
        if (req.body.operationName.includes('getTouchPointsWorkflow')){
            req.alias = 'getTouchPointsWorkflow'
          }
    })
    cy.intercept('OPTIONS',Cypress.env('graphQLWorkflow') + "/graphql").as('waitgraphQL')
  
})
it('Verify when the user turn off the toggle for a touchpoint the reminder & its settings are disabled', ()=>{
    
    //Added to wait for the touchpoint to load
    cy.wait('@getTouchPointsWorkflow')

    // click on 21 calendar days reminder
    cy.get(remindersScreenSelectors.reminder21Days)
      .should('be.visible')
      .contains('21 Calendar Days')
      .click()

    // turn on the toggle
    cy.get(remindersScreenSelectors.touchPointTitle).contains('21 Calendar Days',{timeout:5000})
    cy.get(remindersScreenSelectors.slider)
      .should('be.visible')
      .click()
  
    // save
    cy.get('button')
      .should('be.visible')
      .contains('Save')
      .click()

    cy.wait('@updateTouchPoint')
    cy.wait('@getTouchPointsWorkflow')

   // Assert reminder is disabled
   cy.get(remindersScreenSelectors.reminder21Days)
     .contains('21 Calendar Days')
     .should('have.class','disabled')

})

it('Verify when the user turn on the toggle for a touchpoint the reminder & its settings are enabled',()=>{
  
   // click on 21 calendar days reminder
    cy.get(remindersScreenSelectors.reminder21Days)
       .should('be.visible')
       .contains('21 Calendar Days')
       .click({force: true})

    // turn off the toggle
    cy.get(remindersScreenSelectors.touchPointTitle).contains('21 Calendar Days',{timeout:5000})
    cy.get(remindersScreenSelectors.slider)
      .click()

    //save
    cy.get('button')
      .contains('Save')
      .click()
    
    //waits
    cy.wait('@updateTouchPoint')
    cy.wait('@getTouchPointsWorkflow')

    // Assert reminder is enabled
    cy.get(remindersScreenSelectors.reminder21Days)
      .contains('21 Calendar Days')
      .should('not.have.class','disabled')

    // Assert the reminder setting content is also enabled
    cy.get(remindersScreenSelectors.reminder21Days)
      .contains('21 Calendar Days')
      .click()
    
    cy.get(remindersScreenSelectors.settingContent)
      .should('not.have.class','disabled')

    cy.contains('Reminders')
      .click()
}) 
})
