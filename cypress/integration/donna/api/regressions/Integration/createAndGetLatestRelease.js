/// <reference types="Cypress"/>

/*
AUTO-701 Connector Release
Sub-tasK
AUTO-704- get Latest Release
AUTO-705- create Release
*/

const testData = require('../../../../../fixtures/api/integrations/connectorRelease.json')
describe('Connector Release API',{retries:2}, () => {
  let accountID
  before(() => {
    cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth")).then(res => {

    })

 
  })
  it('Verify Create Release API', () => {
    cy.fetchAccountIdAndSet(Cypress.env('token')).then(res => {
      accountID=res.body.accountId
      cy.log('AccountID :' +res.body.accountId)
    })
    ///create Release
    cy.createRelease(testData,accountID).then(res => {
      var key = Object.keys(res)[0]
     
      cy.log(res[key].id)
      cy.log(res[key].attributes.filename)
      cy.log(res[key].attributes.key)
     // cy.log(JSON.stringify(res))

    })
  })

  it('Verify get latest release API', () => {
    cy.fetchAccountIdAndSet(Cypress.env('token')).then(res => {
      accountID=res.body.accountId
      cy.log('AccountID :' +res.body.accountId)
    })
    // get latest Release
    cy.getLatestRelease().then(res => {
      var key = Object.keys(res)[0]
      cy.log(res[key].id)
      cy.log(res[key].attributes.filename)
      cy.log(res[key].attributes.key)
      //cy.log(JSON.stringify(res))
    })
  })
})

