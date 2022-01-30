/// <reference types="Cypress"/>

/*
AUTO-695 Chairs
Sub-task 
AUTO-696 get All Chairs
AUTO-697 get Chair
*/

describe('Get single and multiple Chairs Api', () => {
  let chairID
  before(() => {
    cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
  })

  it('Get All chairs', () => {
    // Get All Chairs
    cy.getAllChairs(Cypress.env('token')).then((response) => {
      chairID=Object.keys(response)[1]
    })
  })

  it('Get Chair', () => {
    // Get single Chair
    cy.getSingleChair(Cypress.env('token'),chairID).then((response) => {
      cy.log("Chair Name:"+response[Object.keys(response)].name)
    })
  })

})