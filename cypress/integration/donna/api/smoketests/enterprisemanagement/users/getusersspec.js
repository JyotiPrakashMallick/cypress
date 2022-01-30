// <reference types="Cypress"/>
describe('This asserts that the status for getting user backend', function(){

    before(function()
    {
       cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
      }
       )     
    it ('Verify tha api for getting users and me  is working ',function() {
              const authorization ="bearer "+ Cypress.env('token');          
              console.log("authorization: "+ authorization)
                const options = {
                method: 'GET',
                url: Cypress.env('backendUrl') +"api/users/me",
                headers: {
                  authorization,
                }};
               
              cy.request(options)
                .its('status')
                .should('eq', 200)
              })
            })           