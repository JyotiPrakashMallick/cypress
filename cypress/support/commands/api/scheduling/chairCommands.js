Cypress.Commands.add("createChair",
  (
    chairName,
    chairDesc,
    isActiveStatus
  ) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("backendUrl")}api/chairs/`,
      headers: {
        'Authorization': "Bearer " + Cypress.env('token'),
      },
      body: {
        name: chairName,
        description: chairDesc,
        isActive: isActiveStatus
      }
    }).then((response) => {
      // assert status code  
      expect(response.status).to.eq(201)
      // assert duration
      expect(response.duration).to.not.be.greaterThan(500)
      return cy.wrap(response)
    })
  })

Cypress.Commands.add("updateChair",
  (
    chairNameUp,
    chairDescUp,
    isActiveStatus,
    chairId
  ) => {
    cy.request({
      method: "PUT",
      url: `${Cypress.env("backendUrl")}api/chairs/${chairId}`,
      headers: {
        'Authorization': "Bearer " + Cypress.env('token'),
      },
      body: {
        name: chairNameUp,
        description: chairDescUp,
        isActive: isActiveStatus
      }
    }).then((response) => {
      // assert status code
      expect(response.status).to.eq(200)
      // assert duration
      expect(response.duration).to.not.be.greaterThan(500)
      return cy.wrap(response)
    })
  })

Cypress.Commands.add("deleteChair",
  (chairId
  ) => {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("backendUrl")}api/chairs/${chairId}`,
      headers: {
        'Authorization': "Bearer " + Cypress.env('token'),
      }
    }).then((response) => {
      // assert status code  
      expect(response.status).to.eq(204)
      // assert duration
      expect(response.duration).to.not.be.greaterThan(500)
    })
  })

Cypress.Commands.add("getAllChairs", (authToken) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/chairs/`,
    auth: {
      bearer: authToken,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.duration).to.not.be.greaterThan(500)
    return cy.wrap(response.body.entities.chairs)
  });
});

Cypress.Commands.add("getSingleChair", (authToken,chairID) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/chairs/${chairID}`,
    auth: {
      bearer: authToken,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.duration).to.not.be.greaterThan(500)
    return cy.wrap(response.body.entities.chairs)
  });
});