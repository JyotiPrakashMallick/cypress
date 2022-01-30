/// <reference types="Cypress"/>
//const testData = require('../../../../../../fixtures/gui/scheduling/waitlist/waitlisttestdata');
var testData = require('../../../../../../fixtures/gui/scheduling/waitlist/waitlisttestdata')


import waitlist from "../../../../../../support/selectors/scheduling/waitlist/waitlistPage"

describe('Verify the waitlist Sorrting', () => {
  before(function () {
    cy.apilogin(Cypress.env('waitlistUser'),Cypress.env('waitlist_password'), Cypress.env('backendUrl') + 'auth')
    cy.visit('/schedule')
    cy.get(waitlist.waitList).click()
    cy.on('uncaught:exception', () => {
      // returning false here prevents Cypress from failing the test
      return false})

  })
  it('Verify the sorting on Date Added', () => {
    cy.get(waitlist.header).should('have.length', '13')

     //Sorting on Date Added
    cy.contains(waitlist.header,'Date Added').click()
    cy.get(waitlist.ascOrder).should('be.visible') //Validate Ascending order pointer is visible
  

function getCellTextAsArray() {
      let cellContents = [];
      return new Cypress.Promise(resolve => {
        cy.get(waitlist.waitistRows)
          .children()
          .each(($el, $index) => {
            cellContents.push($el.text());
          })
          .then(() => resolve(cellContents));
      });
    } 

    getCellTextAsArray().then(cellContents => {
      let actual = cellContents.slice();
      cy.wrap(actual).should("deep.eq", cellContents);

    });

  })
  
  ////Sorting on First Name
  it('Verify the sorting on First Name', () => {
    cy.get(waitlist.header).should('have.length', '13')
   cy.contains(waitlist.header, 'First Name').click()
    cy.get(waitlist.ascOrder).should('be.visible')

function getCellTextAsArray() {
      let cellContents = [];
      return new Cypress.Promise(resolve => {
        cy.get(waitlist.waitistRows)
          .children()
          .each(($el, $index) => {
            cellContents.push($el.text());
          })
          .then(() => resolve(cellContents));
      });
    } 

    getCellTextAsArray().then(cellContents => {
      let actual = cellContents.slice();
      cy.wrap(actual).should("deep.eq", cellContents);

    });

  })
  it('Verify Sorting on Last Name',()=>
  {

    function getCellTextAsArray() {
      let cellContents = [];
      return new Cypress.Promise(resolve => {
        cy.get(waitlist.waitistRows)
          .children()
          .each(($el, $index) => {
            cellContents.push($el.text());
          })
          .then(() => resolve(cellContents));
      });
    } 
    cy.contains(waitlist.header, 'Last Name').click()
    cy.get(waitlist.ascOrder).should('be.visible')
    getCellTextAsArray().then(cellContents => {
      let actual = cellContents.slice();
      cy.wrap(actual).should("deep.eq", cellContents);
    })
  })
  it('Verify Sorting on Reason',()=>
  {

    function getCellTextAsArray() {
      let cellContents = [];
      return new Cypress.Promise(resolve => {
        cy.get(waitlist.waitistRows)
          .children()
          .each(($el, $index) => {
            cellContents.push($el.text());
          })
          .then(() => resolve(cellContents));
      });
    } 
    cy.contains(waitlist.header, 'Reason').click()
    cy.get(waitlist.ascOrder).should('be.visible')
    getCellTextAsArray().then(cellContents => {
      let actual = cellContents.slice();
      cy.wrap(actual).should("deep.eq", cellContents);
    })

     })
     it('Verify Sorting on Practitioner',()=>
     {
   
       function getCellTextAsArray() {
         let cellContents = [];
         return new Cypress.Promise(resolve => {
           cy.get(waitlist.waitistRows)
             .children()
             .each(($el, $index) => {
               cellContents.push($el.text());
             })
             .then(() => resolve(cellContents));
         });
       } 
       cy.contains(waitlist.header, 'Practitioner').click()
       cy.get(waitlist.ascOrder).should('be.visible')
       getCellTextAsArray().then(cellContents => {
         let actual = cellContents.slice();
         cy.wrap(actual).should("deep.eq", cellContents);
       })
   
        })
        it('Verify Sorting on Units',()=>
        {
      
          function getCellTextAsArray() {
            let cellContents = [];
            return new Cypress.Promise(resolve => {
              cy.get(waitlist.waitistRows)
                .children()
                .each(($el, $index) => {
                  cellContents.push($el.text());
                })
                .then(() => resolve(cellContents));
            });
          } 
          cy.contains(waitlist.header, 'Units').click()
          cy.get(waitlist.ascOrder).should('be.visible')
          getCellTextAsArray().then(cellContents => {
            let actual = cellContents.slice();
            cy.wrap(actual).should("deep.eq", cellContents);
          })
      
           })     

})