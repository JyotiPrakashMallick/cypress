// <reference types="Cypress"/>
/** This e2e test is based on the requirements OLD CARECRU
 * CRU-2393 Login Page - Sign in (Email & Password)
 * C2219	Verify Un-registered user login to carecru then a alert message "Error processing the request" should display
 * C2220	Verify user login to carecru with invalid email and password format then alert message should display
 * C2221	Verify user login to carecru with valid email and incorrect password then a alert message "Error processing the request"
 * C2222	Verify user login with empty credentials then alert message should display
 * C2223	Verify user login to carecru with valid email and empty password or invalid format password then a alert message should display
 */

import loginSelector from '../../../../../../support/selectors/enterprisemanagement/loginSelector'

describe ('This validates the carecru Login Page and successful login of valid user',function()
{
    before(function(){
     
        cy.visit(Cypress.env('baseUrl')) 
        cy.on('uncaught:exception', (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false})   }
    )
    it ('has carecru logo',function () { 
       cy.get(loginSelector.carecruLogo,{ timeout: 6000 })
         .should('be.visible')
      })
       
  it('has email text box that is visible and empty by default', function(){
    cy.get(loginSelector.emailInputText)
      .should('be.visible')
      .should('have.value', '')

   })
   it ('has password text box that is visible and empty by default', function(){
    cy.get(loginSelector.passwordInputText)
      .should('be.visible')
      .should('have.value', '')
   })
   it ('has sign in button',function(){
     cy.get(loginSelector.submitButton)
       .should('be.visible')
       .should('have.text','Sign In')

   })
   it('has the forgot password link',function(){
     cy.get(loginSelector.forgotPasswordLink)
       .should('be.visible')
       .should('have.text','Forgot your password?')
       //should have been an href if we want to navigate to another url baseURL/forgot
       .should('have.attr','role','button')
   })
   it ('requires email', function(){
    cy.get(loginSelector.passwordInputText).type('carecru2020{enter}')
    cy.get(loginSelector.labelErrorText).should('have.text','Email')
    cy.get(loginSelector.labelErrorRequired).should('have.text','Required')
   })
   it ('requires password', function(){
    cy.get(loginSelector.passwordInputText).clear()
    cy.get(loginSelector.emailInputText).type('test@mailinator.com{enter}')
    cy.get(loginSelector.labelErrorText).should('have.text','Password')
    cy.get(loginSelector.labelErrorRequired).should('have.text','Required')
    cy.get(loginSelector.emailInputText).clear()
    cy.get(loginSelector.passwordInputText).clear()
   })
   it('requires valid credentials for username and password',function(){
   
    cy.get(loginSelector.emailInputText).type('test@mailinator.com')
    cy.get(loginSelector.passwordInputText).type('carecru2020')
    cy.get(loginSelector.submitButton).click()
    //Need to check with dev with best approach on displaying the email and password invalid on only one span
    cy.get(loginSelector.labelErrorEmail).should('have.text','EmailInvalid Credentials')
    cy.get(loginSelector.labelErrorPassword).should('have.text','PasswordInvalid Credentials')
 
    })
    it ('has a footer label of copyright',function(){
        cy.get(loginSelector.labelfooter).should('be.visible')
          .should('have.text', 'Copyright © 2022 CareCru Inc. All rights reserved.')
    }
    )
   it('navigate to dashboard page on successful log in', function(){
    cy.get(loginSelector.emailInputText).clear()
    cy.get(loginSelector.passwordInputText).clear()
    cy.login(Cypress.env('email'),Cypress.env('password'))
     cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false})
      cy.get(loginSelector.labelWelcomeBack)
        .should('be.visible')
        .should('have.text','Welcome Back, '+ Cypress.env('user'))
   })
  
  })