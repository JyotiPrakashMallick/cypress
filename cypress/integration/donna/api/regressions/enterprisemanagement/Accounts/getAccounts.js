/// <reference types="Cypress"/>
/*
AUTO-685 Get Accounts
*/

describe('Get Accounts Api', ()=>{

  before(()=>
    {
       cy.apilogin(Cypress.env('superadmin_email'),Cypress.env('superadmin_password'),(Cypress.env('backendUrl')+"auth"))
    })     

  it ('Verify that get accounts api is working fine',()=> {       
        cy.request({method: 'GET',
        url: Cypress.env('backendUrl') +"api/accounts/",
        headers: {
                authorization: 'Bearer ' + Cypress.env('token')
                },
            }).then((response)=>{
                // assert status code
                expect(response.status).to.eq(200)

                // assert duration
                expect(response.duration).to.not.be.greaterThan(1000) 

                // assert account id is returned in response
                var res  = (JSON.stringify(response.body))
                expect(res).to.include('625f6628-9cd9-487b-b6dd-ea023c83de3d')
                expect(res).to.include('01 Lee Abeldent V14')
            })
        })
    })
