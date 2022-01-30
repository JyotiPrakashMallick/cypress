//AUTO-823 Get  Chat Categories Count

describe('Get  Chat Categories Count: Verify chat count categories', {retries:2}, function(){
   

   beforeEach(()=> {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + 'auth')})

    it ('Verify chat count categories',function() {
      cy.request({
        method: 'GET',
        url: Cypress.env('backendUrl') + "api/chats/count/categories",
        headers: {
          authorization: 'Bearer ' + Cypress.env('token'), 
        },
    }).then((resp)=>{
      expect(resp.status).to.eq(200)
      expect(resp.duration).to.not.be.greaterThan(500)
      expect(resp.body).property('flagged').to.not.be.oneOf([null, ""])
      expect(resp.body).property('open').to.not.be.oneOf([null, ""])
      expect(resp.body).property('unread').to.not.be.oneOf([null, ""])
    })
    })
  })      