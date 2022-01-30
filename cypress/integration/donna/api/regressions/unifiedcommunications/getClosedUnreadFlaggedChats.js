// AUTO-824 Get Closed Chat
// AUTO-825 Get Unread Chat
// AUTO-826 Get Flagged Chat

describe('Get Closed, Unread and Flagged Chats', {retries:1}, ()=>{

  beforeEach(()=> {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + 'auth')})
    it('Verify Closed Chat Api',()=> {
       cy.request({
         method: 'GET',
         url: Cypress.env('backendUrl') + "api/chats/closed?isOpen=false&limit=15&skip=0&join=textMessages,patient",
         headers: {
           authorization: 'Bearer ' + Cypress.env('token'), 
         },
     }).then((resp)=>{
        cy.log(JSON.stringify(resp))
       expect(resp.status).to.eq(200)
       expect(resp.duration).to.not.be.greaterThan(500)
     })
  })
    it('Verify Unread Chat Api',()=> {
      cy.request({
        method: 'GET',
        url: Cypress.env('backendUrl') + "api/chats/unread?limit=15&skip=0&join=patient",
        headers: {
          authorization: 'Bearer ' + Cypress.env('token'), 
        },
    }).then((resp)=>{
    expect(resp.status).to.eq(200)
    expect(resp.duration).to.not.be.greaterThan(500)
  })
})
    it('Verify Flagged Chat Api',()=> {
      cy.request({
        method: 'GET',
        url: Cypress.env('backendUrl') + "api/chats/flagged?limit=15&skip=0&join=textMessages,patient",
        headers: {
          authorization: 'Bearer ' + Cypress.env('token'), 
        },
    }).then((resp)=>{
    expect(resp.status).to.eq(200)
    expect(resp.duration).to.not.be.greaterThan(500)
    })
  })
})
