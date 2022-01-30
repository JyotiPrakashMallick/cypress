// AUTO-687: Update Account Configuration
describe('Update account configuration', function(){

    before(function()
    {
       cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
      })

    it ('Verify that update account configuration is working fine',function() {
        cy.fixture('api/enterprisemanagement/accountsData').then((acctData)=>{
            let accountData = acctData
            var accountId = accountData.accountId
            var name = accountData.name
            var updatedValue = accountData.updated_value
            var defaultValue = accountData.default_value

        cy.request({
            method: "PUT",
            url: `${Cypress.env("backendUrl")}api/accounts/configurations?account_id=${accountId}`,
            auth: {
              bearer: Cypress.env("token"),
            },
            headers: {
                Accept : 'application/vnd.api+json'
            },
            body: {
              name: name,
              value: updatedValue             
            },
          }).then((response) => {
            //Assert the status is 200
            expect(response.status).to.eq(200);
            //Assert time taken is less than 2000ms
            expect(response.duration).to.not.be.greaterThan(500)   
            //Assert the updated value is ABELDENT_V15      
            expect(response.body.data.attributes).has.property('value', updatedValue)
          });

        cy.log("Revert to previous value")  
        cy.request({
            method: "PUT",
            url: `${Cypress.env("backendUrl")}api/accounts/configurations?account_id=${accountId}`,
            auth: {
              bearer: Cypress.env("token"),
            },
            headers: {
                Accept : 'application/vnd.api+json'
            },
            body: {
                name: name,
                value: defaultValue                
            },
          }).then((response) => {
            //Assert the status is 200
            expect(response.status).to.eq(200);
            //Assert time taken is less than 2000ms
            expect(response.duration).to.not.be.greaterThan(500)   
            //Assert the updated value is ABELDENT_V14     
            expect(response.body.data.attributes).has.property('value', defaultValue)
          });
        })

    })
})