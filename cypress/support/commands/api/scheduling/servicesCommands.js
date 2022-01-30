Cypress.Commands.add("getAllServices", (authToken) => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("backendUrl")}api/services`,
      auth: {
        bearer: authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      return cy.wrap (response.body.entities.services)
    });
  });

Cypress.Commands.add("getSpecificService", (authToken,serviceId) => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("backendUrl")}api/services/${serviceId}`,
      auth: {
        bearer: authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      return cy.wrap (response.body.entities.services)
    });
  });

  Cypress.Commands.add("updateSpecificService", (authToken,serviceId,reasonName,reasonDescription,reasonDuration,practitioners,isDefault,isHidden) => {
    cy.request({
      method: "PUT",
      url: `${Cypress.env("backendUrl")}api/services/${serviceId}`,
      auth: {
        bearer: authToken,
      },
      body:{
        name:`${reasonName}`,
        description:`${reasonDescription}`,
        duration:`${reasonDuration}`,
        practitioners:`${[practitioners]}`,
        isDefault:`${[isDefault]}`,
        isHidden:`${[isHidden]}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      return cy.wrap (response.body.entities.services)
    });
  });

  Cypress.Commands.add("createSpecificService",(authToken,reasonName,reasonDescription,reasonDuration)=>{
    cy.request({
      method: "POST",
      url: `${Cypress.env("backendUrl")}api/services/`,
      auth: {
        bearer: authToken,
      },
      body:{
        name:`${reasonName}`,
        description:`${reasonDescription}`,
        duration:`${reasonDuration}`
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      return cy.wrap (response.body.entities.services)
    });
  })

  Cypress.Commands.add("deleteSpecificService",(authToken,serviceId,reasonName)=>{
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("backendUrl")}api/services/${serviceId}`,
      auth: {
        bearer : authToken,
      },
      body:{
        name:`${reasonName}`,
      }
    }).then((response) => {
      expect(response.status).to.eq(204);
    })
  })