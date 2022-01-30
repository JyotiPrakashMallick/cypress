//// <reference types="Cypress"/>

import { beforeEach,afterAll } from "mocha"
import emailTemplateSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/emailTemplateSelectors'
import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors'

/**
 * For this test please use an enterprise that is write capable
 */

describe('Verify the revert to default is invisible if no changes were made on the email/sms template.',function(){
    beforeEach(()=>{
        cy.apilogin(Cypress.env('email'), Cypress.env('password'), Cypress.env('backendUrl') + "auth")
        cy.visit('settings/workflow/reminders')
        cy.url().should('include','/reminders')
        cy.on('uncaught:exception', (err, runnable) => {
          return false})
        cy.intercept('POST',Cypress.env('graphQLWorkflow') + "/graphql",(req)=>{
                if (req.body.operationName.includes('getTouchPointsWorkflow')){
                req.alias = 'getTouchPointsWorkflow'
            }
        })
    })    
    it('Verify the revert to default is invisible if no changes were made on the email/sms template for Single ',()=>{
      // By Default Single is already selected
        cy.wait('@getTouchPointsWorkflow')
        cy.get(emailTemplateSelectors.randomReminderSelect)
          .should('be.visible')
          .click();
        cy.log('Select the Family from drop down')
        cy.get(remindersScreenSelectors.singleOrFamily)
           .find(remindersScreenSelectors.selectFamily) 
           .type("{downarrow}", { force: true })
           .type("{enter}", { force: true });  
         
        cy.log('Asserts the confirm button is visible and can be clicked');
        cy.get(emailTemplateSelectors.verifyButton)
          .should('be.visible');
        cy.get(emailTemplateSelectors.verifyButton)
           .click();
        cy.log('Verify the revert button should be disabled');
        cy.contains('Revert to Default');
        cy.get(emailTemplateSelectors.revertButton)
          .should('be.visible')
          .should('have.attr','aria-disabled','true');
    })
    it('Verify the revert to default is invisible if no changes were made on the email/sms template for Family ',()=>{
      // Family is selected
        cy.wait('@getTouchPointsWorkflow')
        cy.get(emailTemplateSelectors.randomReminderSelect)
          .should('be.visible')
          .click();
          cy.log('Select the Family from drop down')
          cy.get(remindersScreenSelectors.singleOrFamily)
           .find(remindersScreenSelectors.selectFamily) 
           .type("{downarrow}", { force: true })
           .type("{enter}", { force: true });  
        cy.log('Asserts the confirm button is visible and can be clicked');
        cy.get(emailTemplateSelectors.verifyButton)
          .should('be.visible');
        cy.get(emailTemplateSelectors.verifyButton)
           .click();
        cy.log('Verify the revert button should be disabled');
        cy.contains('Revert to Default');
        cy.get(emailTemplateSelectors.revertButton)
          .should('be.visible')
          .should('have.attr','aria-disabled','true');
    })

})