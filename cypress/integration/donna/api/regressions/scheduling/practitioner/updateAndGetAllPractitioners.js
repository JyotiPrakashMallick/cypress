/// <reference types="Cypress"/>

/*
AUTO-727 Practitioner
Sub-tasK
AUTO-731 - Update Practitioner
AUTO-728 - Get All Practitioners
*/
import uihelper from '../../../../gui/smoketests/common/UIHelper'
describe('Practitioner API', () => {
  let practitionerID
  before(() => {
    cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
  })
  it('Verify get All practitioner API', () => {
    // get All Practitioner
    cy.getAllPractitioner().then(res => {
      var key = Object.keys(res)[0]
      practitionerID = key
      cy.log(res[key].firstName + ' ' + res[key].lastName)
      cy.log('PractionerID :' + practitionerID)

    })
  })

  it('Verify update practitioner API', () => {
    // update practitioner 
    cy.updatePractitioner(uihelper.getRandomString(), uihelper.getRandomString(), practitionerID).then(res => {
      var key = Object.keys(res)[0]
      cy.log(' Updated Practitioner Name ::' + res[key].firstName + ' ' + res[key].lastName)
      cy.log('PractionerID :' + key)
    })

  })
})

