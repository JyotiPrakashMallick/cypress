/// <reference types="Cypress"/>
Cypress.Commands.add('getFlaggedTabs', (authToken) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('backendUrl') + "api/chats/count/categories",
        headers: {
          authorization: 'Bearer ' + authToken, 
        },
    }).then((resp)=>{
      cy.log(JSON.stringify(resp))
      let flagged= resp.body.flagged
      expect(resp.status).to.eq(200)
      return cy.wrap(flagged)
    })
})

Cypress.Commands.add('getAllTabs',(authToken)=> {
    cy.request({
        method: 'GET',
        url: Cypress.env('backendUrl') + "api/chats?limit=16&skip=0&join=textMessages,patient",
        headers: {
          authorization: 'Bearer ' + authToken, 
        },
    }).then((resp)=>{
      cy.log(JSON.stringify(resp))
      expect(resp.status).to.eq(200)
     return cy.wrap(resp)
    })
})