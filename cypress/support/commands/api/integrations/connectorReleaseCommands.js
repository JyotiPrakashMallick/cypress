Cypress.Commands.add("createRelease",(data,accountID)=> {
        cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}api/connector/`,
            headers: {
                accept: "application/vnd.api+json",
                'Authorization': "Bearer " + Cypress.env('token'),
            },
            body: {
                "tag": data.tag,
                "url": data.url,
                "key": data.key,
                "secret": data.secret,
                "filename": data.filename,
                "path": data.path,
                "bucket": data.bucket,
                "accountId":accountID
            }
        }).then((response) => {
            // assert status code  
            expect(response.status).to.eq(201)
            // assert duration
            expect(response.duration).to.not.be.greaterThan(500)
            return cy.wrap(response.body)
        })
    })

 

Cypress.Commands.add("getLatestRelease", () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env("backendUrl")}api/connector/release`,
        headers: {
            accept: "application/vnd.api+json",
            'Authorization': "Bearer " + Cypress.env('token'),
        },
    }).then((response) => {
        // assert status code
        expect(response.status).to.eq(200)
        // assert duration
        expect(response.duration).to.not.be.greaterThan(500)
        return cy.wrap(response.body)
    })
})

 
