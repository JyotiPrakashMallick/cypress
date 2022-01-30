//AUTO-689: GET Sign Mode URL

describe('Get Sign mode URL', {retries:2}, function(){

    it ('Get sign mode URL',function() {
        cy.apilogin(Cypress.env('nondentrix_user'),Cypress.env('nondentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
        cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
            
        var accId = ptData.nonDentrixPatient.accountId            
        cy.request({
              method: "GET",
              url: `${Cypress.env("backendUrl")}api/analytics/signUrl?url=https://modeanalytics.com/carecru/reports/b066e775f66a/embed?access_key=602bd900471266804363a9a8%26max_age=1600%26param_account_name=${accId}%26param_end_date=2022-01-20%26param_start_date=2022-01-01`,
              auth: {
                bearer: Cypress.env("token"),
              },
            }).then((response) => {
              //Assert the status is 200
              expect(response.status).to.eq(200);
              //Assert time taken is less than 400ms
              expect(response.duration).to.not.be.greaterThan(400)   
            }) 
        })    
    })
})