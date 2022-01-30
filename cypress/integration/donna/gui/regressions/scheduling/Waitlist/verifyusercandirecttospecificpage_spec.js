/// <reference types="Cypress"/>

import waitlistSelectors from '../../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'

let totalPages

describe('Regression tests for waitlist Enhancements :Performance -UI Pagination', function() {

    before(function(){

        cy.apilogin(Cypress.env('waitlistUser'),Cypress.env('waitlist_password'),(Cypress.env('backendUrl')+"auth"))
       
        cy.visit('/schedule')
        cy.url().should('include', '/schedule')
        cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})
        cy.get(waitlistSelectors.waitlistTabButton)
          .should('be.visible')
          .click()

        cy.get(waitlistSelectors.totalPageNo)
          .invoke('text')
          .then((totalNum) =>{
            totalPages=totalNum
            cy.log(totalPages)
          })
          
    })

    it('verify that user is able to see the page number that he is in', function(){

        cy.get(waitlistSelectors.currentPageNo)
          .should('be.visible')
          .should('contain.value','1')

        cy.get(waitlistSelectors.totalPageNo)
          .should('be.visible')
          .should('contain.text',totalPages)

    })

    it('verify that user can direct to specific page', function(){

        cy.log(totalPages)

        if(totalPages>1){
          //Added and modified this script for having min value for computation
            let min=Math.ceil(1)
            let max=Math.floor(totalPages)
            let page = Math.floor(Math.random() * (max-min+1) + min)
            cy.log(page)
            
            cy.getSpecificWaitlistPage(page)

            cy.get(waitlistSelectors.currentPageNo)
              .should('be.visible')
              .should('contain.value', page)
        }       
    })

    it('verify that previous button is directing to previous page', function(){

        cy.log(totalPages)
        if(totalPages>1){
            cy.getSpecificWaitlistPage(2)
            cy.get(waitlistSelectors.currentPageNo)
              .should('be.visible')
              .should('contain.value','2')

            cy.get(waitlistSelectors.prevButton)
              .should('be.visible')
              .click()

            cy.get(waitlistSelectors.currentPageNo)
              .should('be.visible')
              .should('contain.value','1')
        }
        
        
    })

    it('verify that the next button is directing to next page', function(){
       
        cy.log(totalPages)
        if(totalPages>1){
            cy.getSpecificWaitlistPage(1)

            cy.get(waitlistSelectors.currentPageNo)
              .should('be.visible')
              .should('contain.value','1')

            cy.get(waitlistSelectors.nextButton)
              .should('be.visible')
              .click()

            cy.get(waitlistSelectors.currentPageNo)
              .should('be.visible')
              .should('contain.value','2')
        }
        
    })
})

