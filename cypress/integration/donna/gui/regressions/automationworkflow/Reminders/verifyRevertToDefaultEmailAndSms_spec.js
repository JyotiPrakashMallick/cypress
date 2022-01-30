/// <reference types="Cypress"/>
/*
AUTO-452 Revert to default for email and sms
Sub-tasks-
AUTO-454 Verify the revert to default is visible if changes were made on sms and email template.
AUTO-455 Verify after reverting to default the template for email/sms is reverted to default.
AUTO-456 Verify after saving the touch point that the reverted template is still reverted.  
*/

import reminderselector from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors'

describe('Revert to default for email and sms - single and family', {retries: 2}, ()=>{
    
    beforeEach(()=>{
       cy.apilogin(Cypress.env('owner_email'),Cypress.env('owner_password'),Cypress.env('backendUrl')+"auth")
       cy.visit('/settings/workflow/reminders')
       cy.on('uncaught:exception', () => {
           return false})

       expect(cy.contains('Reminders', {timeout: 15000}))   

       // click on reminder touchpoint
       cy.get(reminderselector.reminder, {timeout: 10000})
         .should('be.visible')
         .eq(1)
         .click({force: true})    
    })
   it('Verify the revert to default is visible if changes were made on Sms template for Single and after reverting, the template is reverted to default', ()=>{  

     // edit text  
     cy.get(reminderselector.editMessage, {timeout: 10000})
      .type('auto test ')
    
     cy.revertToDefaultSms()

     // assert template is reverted to default
     cy.get(reminderselector.editMessage)
       .should('not.have.text', 'auto test ')
    })
   it('Verify the revert to default is visible if changes were made on Email template for Single and after reverting, the template is reverted to default', ()=>{  
    
    // enable email view
    cy.get(reminderselector.enableEmailView)
      .contains('Email')
      .click()

    // edit email Subject
    cy.get(reminderselector.editEmailSubject).type('auto test ')

    cy.revertToDefaultEmail()

    // assert template is reverted to default
    cy.get(reminderselector.editEmailSubject)
      .should('not.have.text', 'auto test ')
   })
   it('Verify the revert to default is visible if changes were made on Sms template for Family and after reverting, the template is reverted to default', ()=>{  

    // select family option from drop down
    cy.get(reminderselector.singleOrFamily)
      .find(reminderselector.selectFamily) 
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true })

    // edit text  
    cy.get(reminderselector.editMessage, {timeout: 10000})
      .type('auto test ')
    
    cy.revertToDefaultSms()

    // assert template is reverted to default
    cy.get(reminderselector.editMessage)
      .should('not.have.text', 'auto test ')
   })
   it('Verify the revert to default is visible if changes were made on Email template for Family and after reverting, the template is reverted to default', ()=>{  

    // enable email view
    cy.get(reminderselector.enableEmailView)
      .contains('Email')
      .click()

    // select family option from drop down
    cy.get(reminderselector.singleOrFamily)
      .find(reminderselector.selectFamily) 
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true })

    // edit email Subject
    cy.get(reminderselector.editEmailSubject).type('auto test ')

    cy.revertToDefaultEmail()

    // assert template is reverted to default
    cy.get(reminderselector.editEmailSubject)
      .should('not.have.text', 'auto test ')
   })
   it('Verify after saving the touch point, the reverted template is still reverted for Sms - Single', ()=>{  

    // edit text  
    cy.get(reminderselector.editMessage, {timeout: 10000})
     .type('auto test ')

    cy.get(reminderselector.messageText).click()
   
    cy.get(reminderselector.saveButton).contains('Save').click()

    cy.reload()
    // click on reminder touchpoint
    cy.get(reminderselector.reminder, {timeout: 12000})
      .should('be.visible')
      .eq(1)
      .click({force: true})

    cy.revertToDefaultSms()

    // assert template is reverted to default
    cy.get(reminderselector.editMessage)
      .should('not.have.text', 'auto test ')

    cy.get(reminderselector.saveButton).contains('Save').click()
  })
  it('Verify after saving the touch point, the reverted template is still reverted for Email - Single', ()=>{  

    // enable email view
    cy.get(reminderselector.enableEmailView)
      .contains('Email')
      .click()

    // edit text  
    cy.get(reminderselector.editEmailSubject, {timeout: 10000})
      .type('auto test ')
   
    cy.get(reminderselector.validateEmailEnabled).click()  

    cy.get(reminderselector.saveButton).contains('Save').click()

    cy.reload()
    // click on reminder touchpoint
    cy.get(reminderselector.reminder, {timeout: 12000})
      .should('be.visible')
      .eq(1)
      .click({force: true})

    // enable email view
    cy.get(reminderselector.enableEmailView, {timeout: 10000})
      .contains('Email')
      .click()

   cy.revertToDefaultEmail()

   // assert template is reverted to default
   cy.get(reminderselector.editEmailSubject)
     .should('not.have.text', 'auto test ')

   cy.get(reminderselector.saveButton).contains('Save').click()
  })
  it('Verify after saving the touch point, the reverted template is still reverted for Sms - Family', ()=>{  
    
    // select family option from drop down
    cy.get(reminderselector.singleOrFamily)
      .find(reminderselector.selectFamily) 
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true })

   // edit text  
   cy.get(reminderselector.editMessage, {timeout: 10000})
     .type('auto test ')

  cy.get(reminderselector.messageText).click()
   
  cy.get(reminderselector.saveButton).contains('Save').click()

  cy.reload()
  // click on reminder touchpoint
  cy.get(reminderselector.reminder, {timeout: 12000})
  .should('be.visible')
  .eq(1)
  .click({force: true})

  // select family option from drop down
  cy.get(reminderselector.singleOrFamily)
  .find(reminderselector.selectFamily) 
  .type("{downarrow}", { force: true })
  .type("{enter}", { force: true })

  cy.revertToDefaultSms()

  // assert template is reverted to default
  cy.get(reminderselector.editMessage)
    .should('not.have.text', 'auto test ')

  cy.get(reminderselector.saveButton).contains('Save').click()
  })
  it('Verify after saving the touch point, the reverted template is still reverted for Email - Family', ()=>{  
    
    // enable email view
    cy.get(reminderselector.enableEmailView)
      .contains('Email')
      .click()

    // select family option from drop down
    cy.get(reminderselector.singleOrFamily)
      .find(reminderselector.selectFamily) 
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true })

   // edit text  
   cy.get(reminderselector.editEmailSubject, {timeout: 10000})
     .type('auto test ')
   
   cy.get(reminderselector.validateEmailEnabled).click()  

   cy.get(reminderselector.saveButton).contains('Save').click()

   cy.reload()
   // click on reminder touchpoint
   cy.get(reminderselector.reminder, {timeout: 12000})
     .should('be.visible')
     .eq(1)
     .click({force: true})

    // enable email view
    cy.get(reminderselector.enableEmailView, {timeout: 10000})
      .contains('Email')
      .click()

    // select family option from drop down
    cy.get(reminderselector.singleOrFamily)
      .find(reminderselector.selectFamily) 
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true })  

   cy.revertToDefaultEmail()

   // assert template is reverted to default
   cy.get(reminderselector.editEmailSubject)
     .should('not.have.text', 'auto test ')

   cy.get(reminderselector.saveButton).contains('Save').click()
  })
})   
