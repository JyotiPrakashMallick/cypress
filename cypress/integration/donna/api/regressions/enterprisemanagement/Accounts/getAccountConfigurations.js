/// <reference types="Cypress"/>
const testData = require("../../../../../../fixtures/api/enterprisemanagement/accounts/accountData.json")

//AUTO-686 - Get Account Configurations

describe('Get Account Configurations', () => {
  before(function () {
    cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), (Cypress.env('backendUrl') + "auth"))
  }
  )

  it('Verify Get Account Configurations', () => {
    let accountid = "36d9a919-89d4-4988-a808-9a27229143a6"
       cy.request({
      method: "GET",
     url: `${Cypress.env("backendUrl")}api/accounts/${accountid}/configurations/`,
      headers: {

        'Authorization': "Bearer " + Cypress.env('token'),
        'Accept': 'application/vnd.api+json'
      }
    }).then((response) => {
       expect(response.status).to.eq(200);
      expect(response.duration).to.not.be.greaterThan(200)
      

       //Validate key values
      expect(response.body.data[0]).to.have.all.keys('type', 'id', 'attributes')
      expect(response.body.data[0].type).to.eq('configuration')
      
      //Validate data[0] Adapter Type
      expect(response.body.data[0].attributes.name).to.eq(testData.name)
      expect(response.body.data[0].attributes.value).to.eq(testData.value)
      expect(response.body.data[0].attributes.description).to.eq(testData.description)
      expect(response.body.data[0].attributes.dataType).to.eq(testData.dataTypeString)

      //Validate data[1] Hygiene Type
      expect(response.body.data[1].attributes.name).to.eq(testData.name1)
      expect(response.body.data[1].attributes.value).to.eq(testData.value1)
      expect(response.body.data[1].attributes.description).to.eq(testData.description1)
      expect(response.body.data[1].attributes.dataType).to.eq(testData.dataTypeJson)

      //Validate data[2] Recall Type
      expect(response.body.data[2].attributes.name).to.eq(testData.name2)
      expect(response.body.data[2].attributes.value).to.eq(testData.value2)
      expect(response.body.data[2].attributes.description).to.eq(testData.description2)
      expect(response.body.data[2].attributes.dataType).to.eq(testData.dataTypeJson)


      //Validate data[3] RECALL_PROCEDURE_CODES
      expect(response.body.data[3].attributes.name).to.eq(testData.name3)
      expect(response.body.data[3].attributes.value).to.eq(testData.value3)
      expect(response.body.data[3].attributes.description).to.eq(testData.description3)
      expect(response.body.data[3].attributes.dataType).to.eq(testData.dataTypeJson)

      //Validate data[3] HYGIENE_PROCEDURE_CODES
      expect(response.body.data[4].attributes.name).to.eq(testData.name4)
      expect(response.body.data[4].attributes.value).to.eq(testData.value4)
      expect(response.body.data[4].attributes.description).to.eq(testData.description4)
      expect(response.body.data[4].attributes.dataType).to.eq(testData.dataTypeJson)

    });
  })
})