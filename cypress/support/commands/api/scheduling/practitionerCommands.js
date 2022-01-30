Cypress.Commands.add("createPractitioner",
    (
        firstName,
        lastname,
    ) => {
        cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}api/practitioners/`,
            headers: {
                'Authorization': "Bearer " + Cypress.env('token'),
            },
            body: {
                firstName: firstName,
                lastName: lastname,
            }
        }).then((response) => {
            // assert status code  
            expect(response.status).to.eq(201)
            // assert duration
            expect(response.duration).to.not.be.greaterThan(500)
            return cy.wrap(response.body.entities.practitioners)
        })
    })

Cypress.Commands.add("getPractitioner", (accountID) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env("backendUrl")}api/practitioners/${accountID}`,
        headers: {
            'Authorization': "Bearer " + Cypress.env('token'),
        },
    }).then((response) => {
        // assert status code
        expect(response.status).to.eq(200)
        // assert duration
        expect(response.duration).to.not.be.greaterThan(500)
        return cy.wrap(response.body.entities.practitioners)
    })
})

Cypress.Commands.add("getAllPractitioner", (accountID) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env("backendUrl")}api/practitioners/`,
        headers: {
            'Authorization': "Bearer " + Cypress.env('token'),
        },
    }).then((response) => {
        // assert status code
        expect(response.status).to.eq(200)
        // assert duration
        expect(response.duration).to.not.be.greaterThan(500)
        return cy.wrap(response.body.entities.practitioners)
    })
})

Cypress.Commands.add("deletePractitioner", (practitionerID) => {
    cy.request({
        method: "DELETE",
        url: `${Cypress.env("backendUrl")}api/practitioners/${practitionerID}`,
        headers: {
            'Authorization': "Bearer " + Cypress.env('token'),
        }
    }).then((response) => {
        // assert status code  
        expect(response.status).to.eq(204)
        // assert duration
        expect(response.duration).to.not.be.greaterThan(500)
        return cy.wrap(response)
    })
})

Cypress.Commands.add("updatePractitioner",
    (
        firstName,
        lastName,
        practitionerID
    ) => {
        cy.request({
            method: "PUT",
            url: `${Cypress.env("backendUrl")}api/practitioners/${practitionerID}`,
            headers: {
                'Authorization': "Bearer " + Cypress.env('token'),
            },
            body: {
                firstName: firstName,
                lastName: lastName
            }
        }).then((response) => {
            // assert status code
            expect(response.status).to.eq(200)
            // assert duration
            expect(response.duration).to.not.be.greaterThan(500)
            return cy.wrap(response.body.entities.practitioners)
        })
    })
