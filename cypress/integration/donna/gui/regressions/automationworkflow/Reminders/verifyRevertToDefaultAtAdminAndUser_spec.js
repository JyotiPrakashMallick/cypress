/// <reference types="Cypress"/>
/*
AUTO-452 Revert to default for email and sms
Admin and User login scenario
*/

import reminderselector from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors'

describe('Revert to default for email and sms at Admin login- single and family', {retries: 3}, ()=>{
    
    beforeEach(()=>{
       cy.apilogin(Cypress.env('admin_email'),Cypress.env('admin_password'),Cypress.env('backendUrl')+"auth")
       cy.visit('/settings/workflow/reminders')
       cy.on('uncaught:exception', () => {
           return false})

       expect(cy.contains('Reminders', {timeout: 12000}))   

       // click on reminder touchpoint
       cy.get(reminderselector.reminder, {timeout: 10000})
         .should('be.visible')
         .eq(1)
         .click({force: true})    
    })
   it('Verify admin cannot edit the Sms for Single', ()=>{  

     // enter text  
     cy.get(reminderselector.editMessage, {timeout: 10000})
      .type('testing ')

     // assert text is not added
     cy.get(reminderselector.editMessage, {timeout: 10000})
       .should('not.contain', 'testing ')
   })
   it('Verify admin cannot edit the Sms for Family', ()=>{  

    // select family option from drop down
    cy.get(reminderselector.singleOrFamily)
      .find(reminderselector.selectFamily) 
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true })

    // edit text  
    cy.get(reminderselector.editMessage, {timeout: 10000})
     .type('testing ')

    // assert text is not added
    cy.get(reminderselector.editMessage, {timeout: 10000})
    .should('not.contain', 'testing ')
  })
  it('Verify admin cannot edit the Email for Single', ()=>{  
    // enable email view
    cy.get(reminderselector.enableEmailView)
      .contains('Email')
      .click()

    // edit email Subject
    cy.get(reminderselector.editEmailSubject).type('testing ')

    // assert text is not added
    cy.get(reminderselector.editEmailSubject, {timeout: 10000})
    .should('not.contain', 'testing ')
  })
  it('Verify admin cannot edit the Email for Family', ()=>{  
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
    cy.get(reminderselector.editEmailSubject).type('testing ')

    // assert text is not added
    cy.get(reminderselector.editEmailSubject, {timeout: 10000})
    .should('not.contain', 'testing ')
  })
})  

describe('Revert to default for email and sms at User login- single and family', {retries: 1}, ()=>{
    beforeEach(()=>{
        cy.apilogin(Cypress.env('user_email'),Cypress.env('user_password'),Cypress.env('backendUrl')+"auth")
        cy.visit('/settings/workflow/reminders')
        cy.on('uncaught:exception', () => {
            return false})
 
        expect(cy.contains('Reminders', {timeout: 12000}))   
 
        // click on reminder touchpoint
        cy.get(reminderselector.reminder, {timeout: 10000})
          .should('be.visible')
          .eq(1)
          .click({force: true})    
    })
     it('Verify admin cannot edit the Sms for Single', ()=>{  
       // edit text  
       cy.get(reminderselector.editMessage, {timeout: 10000})
         .type('testing ')
   
       // assert text is not added
       cy.get(reminderselector.editMessage, {timeout: 10000})
         .should('not.contain', 'testing ')
    })
      it('Verify admin cannot edit the Sms for Family', ()=>{  
   
       // select family option from drop down
       cy.get(reminderselector.singleOrFamily)
         .find(reminderselector.selectFamily) 
         .type("{downarrow}", { force: true })
         .type("{enter}", { force: true })
   
       // edit text  
       cy.get(reminderselector.editMessage, {timeout: 10000})
        .type('testing ')
   
       // assert text is not added
       cy.get(reminderselector.editMessage, {timeout: 10000})
         .should('not.contain', 'testing ')
    })
     it('Verify admin cannot edit the Email for Single', ()=>{  
       // enable email view
       cy.get(reminderselector.enableEmailView)
         .contains('Email')
         .click()
   
       // edit email Subject
       cy.get(reminderselector.editEmailSubject).type('testing ')
   
      // assert text is not added
       cy.get(reminderselector.editEmailSubject, {timeout: 10000})
         .should('not.contain', 'testing ')
    })
     it('Verify admin cannot edit the Email for Family', ()=>{  
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
       cy.get(reminderselector.editEmailSubject).type('testing ')
   
       // assert text is not added
     cy.get(reminderselector.editEmailSubject, {timeout: 10000})
     .should('not.contain', 'testing ')
    })
})
