/// <reference types="Cypress"/>


Cypress.Commands.add('createEnterpriseAPI', (autToken,apiUrl, name, plan, organization) => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        name,
        plan,
        organization,
      },
      headers: {
        authorization: 'Bearer ' + autToken, 
      },
    }).as('createEnterpriseAPI')
  })

  Cypress.Commands.add('getAccounts', (autToken, apiUrl)=>{
    cy.request({
      method: 'GET',
      url: apiUrl,
      headers: {
        authorization: 'Bearer ' + autToken, 
      },
    }).as('getAccounts')
  })

  Cypress.Commands.add('createPracticeAPI', (autToken,apiUrl, name, website,timezone,
    destinationPhoneNumber,street, country, state, city, zipCode) => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        name,
        website,
        timezone,
        destinationPhoneNumber,
        street,
        country,
        state ,
        city ,
        zipCode, 
      },
      headers: {
        authorization: 'Bearer ' + autToken, 
      },
    }).as('createPracticeAPI')
  })

  Cypress.Commands.add('getPracticeAPI', (autToken,apiUrl) => {
    cy.request({
      method: 'GET',
      url: apiUrl,
      body: {
      },
      headers: {
        authorization: 'Bearer ' + autToken, 
      },
    }).as('getPracticeAPI')
  })

  Cypress.Commands.add('delete',(authToken,apiUrl) =>{
    cy.request({
      method: 'DELETE',
      url: apiUrl,
      body: {
      },
      headers: {
        authorization: 'Bearer ' + authToken, 
      },
    }).as('delete')
  })