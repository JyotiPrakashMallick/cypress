// <reference types="Cypress"/>

/*
AUTO-695 Chairs
Sub-task 
AUTO-700 Create Chair
AUTO-698 Update Chair
AUTO-699 Delete Chair
*/

describe('Chairs Api', () => {
    let chairData
    before(()=> {
      cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
    
    // load data from fixtures
    cy.fixture('api/scheduling/chair').then((cdata)=>{
        chairData=cdata
      })
    })
    it('Verify create, update and delete chair api', () => {
      // create chair
      cy.createChair(chairData.chairName, chairData.chairDesc, chairData.isActive).then((response)=>{
      var res = (JSON.stringify(response.body))

      // assert data
      expect(res).to.include(chairData.chairName)
      expect(res).to.include(chairData.chairDesc)
      expect(res).to.include(chairData.isActive)

      // fetch chair id
      var id = response.body.result
        
      // update chair
      cy.updateChair(chairData.chairNameUpdated, chairData.chairDescUpdated, chairData.isActiveUpdated, id).then((respo)=>{
      var res2 = (JSON.stringify(respo.body))

      // assert data
      expect(res2).to.include(chairData.chairNameUpdated)
      expect(res2).to.include(chairData.chairDescUpdated)
      expect(res2).to.include(chairData.isActiveUpdated)

      // delete chair
      cy.deleteChair(id)
     })
    })
  })
})
