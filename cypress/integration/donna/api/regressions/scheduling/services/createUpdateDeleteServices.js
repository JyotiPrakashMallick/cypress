/// <reference types="Cypress"/>

const exp = require("constants")
const testData = require("../../../../../../fixtures/api/scheduling/services/services.json")
const updatedName = require("crypto").randomBytes(10).toString('hex')
const updatedDescription = require("crypto").randomBytes(10).toString('hex')

describe('Verify Services API', () => {
    before(function () {
        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), (Cypress.env('backendUrl') + "auth"))
    })

    it('Verify Create, Update and Delete Service API', () => {
        cy.request(
            {
                method: 'POST',
                url: `${Cypress.env("backendUrl")}api/services/`,
                headers: {
                    'Authorization': "Bearer " + Cypress.env('token'),
                    'Accept': "application/vnd.api+json"

                },
                body:
                {
                    name: testData.name,
                    duration: testData.duration
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.data).to.have.all.keys('type', 'id', 'attributes')
                expect(response.body.data.type).to.eq('service')
                expect(response.body.data.id).not.to.null

                // cy.log(JSON.stringify(response.body))

                //Store the service id
                const srviceID = response.body.data.id

                //Validate Response Attributes 
                expect(response.body.data.attributes.name).to.eq(testData.name)
                expect(response.body.data.attributes.duration).to.eq(30)
                expect(response.body.data.attributes.accountId).not.to.null
                expect(response.body.data.attributes.pmsId).to.be.null
                expect(response.body.data.attributes.description).to.be.null
                expect(response.body.data.attributes.deletedAt).to.be.null
                expect(response.body.data.attributes.createdAt).to.eq(response.body.data.attributes.updatedAt)

                //Verify Update Service
                cy.request({
                    method: "PUT",
                    url: `${Cypress.env("backendUrl")}api/services/${srviceID}`,
                    headers: {
                        'Authorization': "Bearer " + Cypress.env('token'),
                    },
                    body:
                    {
                        name: updatedName,
                        duration: testData.updatedDuration,
                        description: updatedDescription
                    }

                }).then((response) => {

                    expect(response.status).to.eq(200)
                    const updatedResponse = response.body.entities.services[Object.keys(response.body.entities.services)[0]]

                    //Validate updated data 

                    expect(updatedResponse.description).to.eq(updatedDescription)
                    expect(updatedResponse.duration).to.eq(testData.updatedDuration)
                    expect(updatedResponse.name).to.eq(updatedName)
                    expect(updatedResponse.createdAt).not.eq(updatedResponse.updatedAt)
                    expect(updatedResponse.accountId).not.to.null

                    //Validate service id remais same after service update
                    expect(updatedResponse.id).to.eq(srviceID)

                    //Verify delete Service

                    cy.request({
                        method: "DELETE",
                        url: `${Cypress.env("backendUrl")}api/services/${srviceID}`,
                        headers: {
                            'Authorization': "Bearer " + Cypress.env('token'),
                        }
                    }).then((response)=>
                    {
                        expect(response.status).to.eq(204)

                    })

                })
            })
    })
})