/// <reference types="Cypress"/>
const RecallTestData = require('../../../../../fixtures/api/patientmanagement/patientRecallData.json')
/**
 * GraphQL for Logging Recall
 * AUTO-613 API Script - Manually log a recall for a patient
 * Ally
 * Cypress part
 */
 RecallTestData.forEach((RecallTestData)=>{
describe('Verify that user can logged recall to a patient using graphql for '+ RecallTestData.pms, ()=> {
 let authorization;
 let accountID=null;
 let userId=null;
 let sentRecallOutcomeId=null;

  before(()=>{
    cy.log("BeforeTestAccountID: "+ accountID)
    cy.apilogin(RecallTestData.username,RecallTestData.password,(Cypress.env('backendUrl')+"auth"))
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false})

     
  })

  it('Verify that user can logged recall to a patient using graphql',()=>{

    authorization="bearer "+ Cypress.env('token');    
    var uuid = require("uuid")
    var id = uuid.v4()
    

    cy.request({
        method: "GET",
        url: `${Cypress.env("backendUrl")}api/users/me`,
        headers: {
            authorization
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log('Adds the accountId to accountId variable')
        accountID=response.body.accountId
        cy.log("AccountId: "+ accountID)
        cy.log('Adds the userId to userId variable')
        userId=response.body.userId
        cy.log("UserId: "+ userId)
      }).then(()=>{
     
      cy.log('Fetch a random sentRecallOutComeId')
      cy.fetchSentRecallOutcomes_NEST().then(response=>{
           var datalength=response.body.data.sentRecallOutcomes.length
           let random_number = Math.floor((Math.random() * datalength) + 0);
           let value=response.body.data.sentRecallOutcomes[random_number]
           sentRecallOutcomeId=value.value
           cy.log("sentRecallOutcomeIdS: "+ sentRecallOutcomeId)  
          }
         
      ).then(()=>{    cy.log('Logged a recall via graphql end point')
      cy.loggedRecallviaGraphQL(accountID,RecallTestData.patientId,userId,id,sentRecallOutcomeId).then(resp=>{
        cy.log(JSON.stringify(resp))
      })})}) 
})
})
})