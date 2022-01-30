/* AUTO-201, AUTO-202 We will validate the chair/practitioner view on Schedule screen */ 
//user: autouser01@mailinator.com, practice: 01 Lee Practice 01 

import commonSelectors from '../../../../../../support/selectors/common/commonSelectors';
import schedulePageSelector from  '../../../../../../support/selectors/scheduling/schedulePageSelector';

describe ('Move to schedule screen and validate the chair and practitioner view',function()
{    
    beforeEach(function (){
 
        cy.log("Log into application using API")    
        cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.visit('/schedule')
    })

it('verify that default view is chair view on schedule screen', function(){
   cy.log('Validate that we are on schedule screen')
   cy.url().should('include', '/schedule')
   cy.log('Validate that current view is chair view')
   cy.get(schedulePageSelector.practitionerOrChairViewButton)
   .should('contain', 'Practitioner View')
})

it('change the chair view to practitioner view on schedule screen', function(){
    cy.log('Validate that we are on schedule screen')
    cy.url().should('include', '/schedule')
    cy.log('Validate that current view is chair view')
// We will get Practitioner View button if current view is of Chair so that we can switch    
    cy.get(schedulePageSelector.practitionerOrChairViewButton)
     .should('contain', 'Practitioner View')
    cy.log('Swicth to Practitioner view')
    cy.get(schedulePageSelector.practitionerOrChairViewButton).click()
    cy.log('Validate that view is changed to Practioner view')
// We will get Chair View button if current view is of Practioner so that we can switch   
    cy.get(schedulePageSelector.practitionerOrChairViewButton)
     .should('contain', 'Chair View')  
})
})
