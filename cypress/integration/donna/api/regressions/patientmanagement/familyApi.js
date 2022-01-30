/// <reference types="Cypress"/>
/*
AUTO-713 Families
Sub-tasks
AUTO-714 Get Families
AUTO-715 Create Family
AUTO-716 Batch Create Family
AUTO-786 Delete Family
*/
const pmsId = Math.floor(Math.random()*1000000).toString()
const pmsId_2 = Math.floor(Math.random()*10000000).toString()
const pmsId_3 = Math.floor(Math.random()*10000000).toString()

describe('Family Api', ()=>{
    let familyData
    let accountId=null
    beforeEach(()=>
      {
        cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    
        // load data from fixtures
        cy.fixture('api/patientmanagement/family').then((fdata)=>{
            familyData=fdata
        }) 
    }) 

    it ('Verify Create, Get and Delete family api',()=> {  
      //Gets the logged accountId
      cy.request({
        method: "GET",
        url: `${Cypress.env("backendUrl")}api/users/me`,
        headers: {
          'Authorization': "Bearer " + Cypress.env('token')
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Adds the accountId to accountId variable')
      accountId=response.body.accountId
      cy.log("AccountId: "+ accountId)}).then(()=>{

      // create family
      cy.createFamily(accountId, pmsId, familyData.headId).then((response)=>{

      // fetch family id
      var id = response.body.result
      cy.log("family id is-->" + id)

      // assert response
      var res  = (JSON.stringify(response.body))
      expect(res).to.include(accountId)
      expect(res).to.include(pmsId)
      expect(res).to.include(familyData.headId)

      // get family
      cy.getFamily(id)

      // assert response
      var res  = (JSON.stringify(response.body))
      expect(res).to.include(accountId)
      expect(res).to.include(pmsId)
      expect(res).to.include(familyData.headId)

      // delete family
      cy.deleteFamily(id)
      })
      })
    })

    it ('Verify Get All families api',()=> {  
        cy.getAllFamilies().then((response)=>{
        var res  = (JSON.stringify(response.body))
        cy.log(res)

        // assert keys
        expect(response.body.entities.families[Object.keys(response.body.entities.families)[0]])
        .to.have.all.keys('id', 'accountId', 'pmsId', 'headId', 'createdAt', 'updatedAt', 'deletedAt', 'pmsCreatedAt')
      })
    })

    it ('Verify batch Create family and Delete family api',()=> {  
      //Gets the logged accountId
      cy.request({
        method: "GET",
        url: `${Cypress.env("backendUrl")}api/users/me`,
        headers: {
          'Authorization': "Bearer " + Cypress.env('token')
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Adds the accountId to accountId variable')
      accountId=response.body.accountId
      cy.log("AccountId: "+ accountId)}).then(()=>{

      // batch create family  
      cy.batchCreateFamily(accountId, pmsId_2, familyData.headId_2, pmsId_3, familyData.headId_3).then((response)=>{

      // assert response
      var res  = (JSON.stringify(response.body))
      expect(res).to.include(accountId)
      expect(res).to.include(pmsId_2)
      expect(res).to.include(familyData.headId_2)
      expect(res).to.include(pmsId_3)
      expect(res).to.include(familyData.headId_3)

       // fetch family id
       var id_1 = response.body.result[0]
       var id_2 = response.body.result[1]
      
       cy.log("family Ids are-->" + id_1 + " and " + id_2)

       // delete family
       cy.deleteFamily(id_1)
       cy.deleteFamily(id_2)
      })
    })
  })
})
