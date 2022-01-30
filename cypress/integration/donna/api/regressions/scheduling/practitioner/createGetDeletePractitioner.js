/// <reference types="Cypress"/>

/*
AUTO-727 Practitioner
Sub-tasK
AUTO-730- create Practitioner
AUTO-729- get Practitioner
AUTO-787- delete Practitioner
*/
import uihelper from '../../../../gui/smoketests/common/UIHelper'
describe('Practitioner API', () => {
  let practitionerID
  before(() => {
    cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
  })
  it('Verify create practitioner API', () => {
    // create Practitioner
    cy.createPractitioner(uihelper.getRandomString(), uihelper.getRandomString()).then(res => {
      var key = Object.keys(res)
      practitionerID = key[0]
      cy.log('Created Practitioner ::' + res[key[0]].firstName + ' ' + res[key[0]].lastName)
      cy.log('Practitoner ID::' + practitionerID)
    })
  })

  it('Verify get practitioner API', () => {
    // get Practitioner
    cy.getPractitioner(practitionerID).then(res => {
      cy.log('Practitioner name::' + res[Object.keys(res)[0]].firstName + ' ' + res[Object.keys(res)[0]].lastName)
    })
  })

  it('Verify delete practitioner API', () => {
    // delete Practitioner
    cy.deletePractitioner(practitionerID).then(res => {
      cy.log('Status Code::' + res[Object.keys(res)[2]])

    })
  })
})

