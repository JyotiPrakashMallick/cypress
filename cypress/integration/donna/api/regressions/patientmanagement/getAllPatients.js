//AUTO-766: Get All Patients

describe('Get All Patients', function(){
    
    it ('Get all the Patients list',{retries:2},function() {
        cy.apilogin(Cypress.env('nondentrix_user'),Cypress.env('nondentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
        cy.log('Get the patients list')
            cy.request({
              method: "GET",
              url: `${Cypress.env("backendUrl")}api/patients/`,
              auth: {
                bearer: Cypress.env("token"),
              },
              headers: {
                  Accept : 'application/vnd.api+json'
              },
            }).then((response) => {
              //Assert the status is 200
              expect(response.status).to.eq(200);
              //Assert time taken is less than 500ms
             // expect(response.duration).to.not.be.greaterThan(2000)   
            }) 
    })
})    