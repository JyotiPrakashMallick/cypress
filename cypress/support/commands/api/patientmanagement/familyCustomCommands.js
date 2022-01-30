Cypress.Commands.add("createFamily",
  (
    acctId,
    pmsId,
    headId
  ) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("backendUrl")}api/families/`,
      headers: {
        'Authorization': "Bearer " + Cypress.env('token')
      },
      body: {
        accountId: acctId,
        pmsId: pmsId,
        headId: headId
      }
    }).then((response) => {
      // assert status code  
      expect(response.status).to.eq(201)
      // assert duration
      expect(response.duration).to.not.be.greaterThan(500)
      return cy.wrap(response)
    })
  })

Cypress.Commands.add("getFamily",
  (
    familyId
  ) => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("backendUrl")}api/families/${familyId}`,
      headers: {
        'Authorization': "Bearer " + Cypress.env('token')
        }
    }).then((response) => {
        // assert status code  
      expect(response.status).to.eq(200)
        // assert duration
      expect(response.duration).to.not.be.greaterThan(500)
    })
})

Cypress.Commands.add("getAllFamilies",() => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("backendUrl")}api/families/`,
      headers: {
        'Authorization': "Bearer " + Cypress.env('token')
        }
    }).then((response) => {
        // assert status code  
      expect(response.status).to.eq(200)
        // assert duration
      // expect(response.duration).to.not.be.greaterThan(4000)
    })
})

Cypress.Commands.add("batchCreateFamily",
  (
    acctId,
    pmsId_2,
    headId_2,
    pmsId_3,
    headId_3
  ) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("backendUrl")}api/families/connector/batch`,
      headers: {
        'Authorization': "Bearer " + Cypress.env('token')
      },
      body: [{
        accountId: acctId,
        pmsId: pmsId_2,
        headId: headId_2
      },
      {
        accountId: acctId,
        pmsId: pmsId_3,
        headId: headId_3
      }]
    }).then((response) => {
      // assert status code  
      expect(response.status).to.eq(200)
      // assert duration
      expect(response.duration).to.not.be.greaterThan(500)
      return cy.wrap(response)
    })
  })

Cypress.Commands.add("deleteFamily",
  (
    familyId
  ) => {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("backendUrl")}api/families/${familyId}`,
      headers: {
        'Authorization': "Bearer " + Cypress.env('token')
        }
    }).then((response) => {
        // assert status code  
      expect(response.status).to.eq(204)
        // assert duration
      expect(response.duration).to.not.be.greaterThan(500)
    })
})
