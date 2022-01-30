/// <reference types="Cypress"/>

/**
 * GraphQL for Creating Follow Ups 
 * AUTO-724 Create Follow Ups
 * AUTO-725 Update Patient Follow Up
 * AUTO-726 Delete Patient Follow Up
 * AUTO-723 Retrieve Patient Follow Up
 * AUTO-799 Retrieve Follow Up Types
 */
 const FollowUpData = require("../../../../../fixtures/api/patientmanagement/patientFollowUpData.json")

describe('Verify that user can create,update, retrieve follow ups, retrieve follow ups types and delete  follow ups to a patient', ()=> {
  
    let authorization;
    let accountID=null;
    let userId=null;
    let patientFollowUpTypeId=null;
    let followUpDataId=null;
    let updatedNotes=null;
    let patientId=null


  before(()=>{
    cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false})

     
  })
  it('Verify that user  create,retrieve follow ups, retrieve follow ups types, update and delete follow ups for patient',()=>{

    authorization="bearer "+ Cypress.env('token');    
    var uuid = require("uuid")
    var id = uuid.v4()
    
   //Gets the logged userId and accountId
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
     
      //Fetch Random FollowUp Types  
      cy.log('Fetch a random followUp Types')
      cy.fetchFollowUpTypes_NEST().then(response=>{
           var datalength=response.body.data.patientFollowUpTypes.length
           let random_number = Math.floor((Math.random() * datalength) + 0);
           let value=response.body.data.patientFollowUpTypes[random_number]
           patientFollowUpTypeId=value.value
           cy.log("followUpTypeIds: "+ patientFollowUpTypeId)  
          }
         
      ).then(()=>{    
      cy.log('Logged a follow up  via graphql end point')
      cy.loggedFollowUpviaGraphQL(accountID,FollowUpData.patientId,userId,id,patientFollowUpTypeId).then(resp=>{
        followUpDataId = resp.body.data.createPatientFollowUp.id
        cy.log('This is the id of the followUpId: '+followUpDataId)
      }).then(()=>{
        cy.log('Fetch the updated and created follow up')
        cy.fetchMyFollowUps(accountID,userId).then(resp=>{

          let followId=resp.body.data.patientFollowUps[0].id 
          patientId=resp.body.data.patientFollowUps[0].patientId
          expect(followId).to.eq(followUpDataId)
          expect(patientId).to.eq(FollowUpData.patientId)
        })}).then(()=>{
        cy.log('Update a follow up  via graphql end point')
        cy.UpdateloggedFollowUpviaGraphQL(followUpDataId,userId,patientFollowUpTypeId).then(resp=>{
          updatedNotes=resp.body.data.updatePatientFollowUp.note
          expect(updatedNotes).to.include('UPDATE POSTMAN GRAPHQL')
        })
      }).then(()=>{
        cy.log('Delete a follow up  via graphql end point')
        cy.DeleteFollowUpviaGraphQL(followUpDataId)
      })
    }
      )}) 
     
})
})