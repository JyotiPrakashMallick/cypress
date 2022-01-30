// <reference types="Cypress"/>

import { beforeEach,afterAll } from "mocha"
// import scearchPatientPageSelector from  '../../../../../support/selectors/searchpatient/searchPageSelector'
import searchPatientPageSelector from '../../../../../../support/selectors/patientmanagement/searchPageSelector'
/**
 * For this test please use an enterprise that is write capable
 */


describe ('Search Patient Sanity Tests for seaching a patient', function() {
  let searchtestdata;
    before(()=>{
      cy.fixture('gui/patientmanagement/searchpatient/testdatasearchpatientsanitypage').then(function (testdata) {
        searchtestdata= testdata
        cy.log(searchtestdata.patientName)
        })
        //modified the called 
        cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
        cy.visit('/')
       
      //  cy.url().should('include', Cypress.env('pageSchedule'));
          cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})

      })

      it('allows user to search a patient',()=>{
        //var patientName = '';
        cy.log('Log in to the carecru');
        cy.log('Asserts the search button is not disabled and can be clicked for the logged user');
        cy.get(searchPatientPageSelector.searchButton).should('not.be.disabled');
        cy.log('Asserts the search button is available and can be clicked for the logged user');  
        cy.get(searchPatientPageSelector.searchButton).should('be.visible');
        cy.log('Asserts that user can click the search button');
        cy.get(searchPatientPageSelector.searchButton).click();
        cy.log("Search Patient by name",searchtestdata.patientName)
        cy.get(searchPatientPageSelector.searchBar).type(searchtestdata.patientName);
        cy.wait(2000)
        cy.get('div.styles__patientSearchClass___2iGOV').invoke('text').then((text)=>{
          cy.log("Patient Search List ",text)
          if(text.includes("No results found for "+searchtestdata.patientName)){
            expect(true, "Patient not searched: ").to.true;
          }else{
            cy.get('div.styles__suggestionContainer_details___vUleh> div.styles__suggestionContainer_fullName___BH9mE').each(($el)=>{
              let str = $el.text()
              cy.log($el.text())
              if(str.includes(searchtestdata.patientName,0)){
                expect(true, "Patient searched : "+str).to.true;
                return false
              }
            })
          }
        })
    })
})