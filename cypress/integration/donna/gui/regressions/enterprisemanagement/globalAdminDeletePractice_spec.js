// <reference types="Cypress"/>

import { beforeEach} from "mocha";
import practiceDelete from  '../../../../../../cypress/support/selectors/enterprisemanagement/practise/deletePracticeselector'
var automateTestData = require('../../../../../fixtures/gui/enterprisemanagement/golbalAdmin/enterpriseData.json');
import adminPage from "../../../../../support/selectors/enterprisemanagement/globalAdminpage";

/**
 * For this test please use an enterprise that is write capable
 */


describe ('Delete Practice Sanity Test', function() {
    //Prerequisits: Create Enterprise and Practice
    var enID = null;
    var authToken = "";
    var counti = "NaN";
    var practiceID = "";
    before(function () {
        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('apiurl'));
        cy.on('uncaught:exception', (err,runnable)=> {
            return false;
        });
        cy.get('@authResponse').then((response) => {
            authToken = response.body.token;
            if(authToken != ""){
                cy.createEnterpriseAPI(authToken,Cypress.env('backendurl') + "/enterprises", automateTestData.name, automateTestData.plan, automateTestData.organization);
                cy.get('@createEnterpriseAPI').then((response) => {
                    enID = response.body.result;
                    Cypress.env('enID', response.body.result)
                    var url = Cypress.env('backendurl') + "/enterprises/" + Cypress.env('enID') + "/accounts"
                    cy.createPracticeAPI(authToken, url, automateTestData.practice.name, automateTestData.practice.website, automateTestData.practice.timezone,
                   automateTestData.practice.destinationPhoneNumber, automateTestData.practice.street,
                   automateTestData.practice.country, automateTestData.practice.state, automateTestData.practice.city, automateTestData.practice.zipCode)
       
                })
               
            }
            else{
                cy.log('Auth token missing!!!');
            }
        })
   

    });
    beforeEach(function(){
        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('apiurl'));
        cy.intercept(Cypress.env('backendUrl')+"api/enterprises/search?keywords*").as('getSearch');
        cy.intercept(Cypress.env('backendurl') + "api/enterprises/*").as('getDel');
        cy.visit('admin')
        cy.url().should('include', 'admin/enterprises/list')
        cy.log('Search the Group Name');
        cy.get(practiceDelete.searchButton).type(automateTestData.practice.name);
        cy.wait('@getSearch')
          
        cy.on('uncaught:exception', (err, runnable) => {
            return false
          });
        
    });


    it('Verify Carecru Super admin will not be able to delete an  enterprise with practice',()=>{  
        cy.get(adminPage.menu).should('be.visible').click()
        cy.get(practiceDelete.deleteButton)
          .should('be.visible')
          .should('be.disabled')
    })
    it('Verify "cancel" button on prompt message',()=>{  
        cy.get(practiceDelete.searchedData)
          .should('be.visible')
          .should('have.text','autoTest-')
          .click()
        cy.log('Delete a Practice')  
        cy.get(practiceDelete.expandGroup)
          .should('be.visible')
          .click() 
        cy.get(practiceDelete.editPracticeButton)
          .should('be.visible')
          .contains('Edit Practice')
          .should('be.enabled')
        cy.get(practiceDelete.deleteButton)
          .should('be.visible')
          .contains('Delete')
          .should('be.enabled') 
          .click() 
        cy.on('window:confirm', (text) => {
            expect(text).to.contains('Are you sure you want to delete ' + automateTestData.practice.name + "?");
            return false;
        });
        cy.reload()
        Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})
        cy.log('Search the Group Name');
        cy.get(practiceDelete.searchButton).type(automateTestData.practice.name);
        cy.wait('@getSearch')
        cy.get(practiceDelete.searchedData)
          .should('be.visible')
          .should('have.text','autoTest-')
    })
      it('allows user to delete a practice and shows toast message and verifies that edit option is above the delete option',()=>{  
        cy.get(practiceDelete.searchedData)
          .should('be.visible')
          .should('have.text','autoTest-')
          .click()
        cy.log('Delete a Practice')  
        cy.get(practiceDelete.expandGroup)
          .should('be.visible')
          .click() 
        cy.get(practiceDelete.editPracticeButton)
          .should('be.visible')
          .contains('Edit Practice')
          .should('be.enabled')
        cy.get(practiceDelete.deleteButton)
          .should('be.visible')
          .contains('Delete')
          .should('be.enabled') 
          .click() 
        cy.get(adminPage.successAlert).eq(1).should('have.text', 'Practice delete success')  
            
    })
    after(()=>{
        cy.visit('admin')
        cy.url().should('include', 'admin/enterprises/list')
        cy.log('Search the Group Name');
        cy.get(practiceDelete.searchButton).type(automateTestData.name);
        cy.wait('@getSearch')
        cy.get(adminPage.menu).should('be.visible').click()
        cy.get(practiceDelete.deleteButton)
          .should('be.visible')
          .should('be.enabled')
          .click() 
        cy.get(adminPage.successAlert).eq(1).should('have.text', 'Group delete success')   
    })
    
})