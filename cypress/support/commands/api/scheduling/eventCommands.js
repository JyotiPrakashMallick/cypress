Cypress.Commands.add("createEvent",
  (
    accountId,
    pmsId,
    randomNote,
    description,
    pracId,
    chairId,
    startDate,
    endDate
  ) => {
    cy.request({
       method: 'POST',
       url: Cypress.env('backendUrl') +"newapi/api/events/",
       headers: {
                authorization: 'Bearer ' + Cypress.env('token')
        },
       body:[{
            accountId: accountId,
            pmsId: pmsId,
            note: randomNote,
            description: description,
            practitionerId: pracId,
            chairId: chairId,
            startDate: startDate,
            endDate: endDate }]  
            }).then((response)=>{
                // assert status code
                expect(response.status).to.eq(200)

                // assert duration
                expect(response.duration).to.not.be.greaterThan(500) 
        })
    })

Cypress.Commands.add("getAllEvents",
  (
    accountId,
    startDate,
    endDate
  ) => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('backendUrl')}newapi/api/events/?accountId=${accountId}&startDate[between][0]=${startDate}&startDate[between][1]=${endDate}`,
        headers: {
                    authorization: 'Bearer ' + Cypress.env('token')
                    },
                }).then((response)=>{
                    // assert status code
                    expect(response.status).to.eq(200)
    
                    // assert duration
                    expect(response.duration).to.not.be.greaterThan(500) 
                })
    })

Cypress.Commands.add("updateEvent",
  (   
    eventId,
    pmsIdUp,
    randomNoteUp,
    descriptionUp,
    startDateUp,
    endDateUp
) => {
    cy.request({
        method: 'PUT',
        url: Cypress.env('backendUrl') +"newapi/api/events/",
        headers: {
                authorization: 'Bearer ' + Cypress.env('token')
                },
        body:[{
            id: eventId,
            pmsId: pmsIdUp,
            note: randomNoteUp,
            description: descriptionUp,
            startDate: startDateUp,
            endDate: endDateUp   
            }]
            }).then((response)=>{
                // assert status code
                expect(response.status).to.eq(200)

                // assert duration
                expect(response.duration).to.not.be.greaterThan(500) 
            })
    })

Cypress.Commands.add("deleteEvent",
  (   
    eventId
  ) => {
    cy.request({
       method: 'DELETE',
       url: Cypress.env('backendUrl') +"newapi/api/events/",
       headers: {
            authorization: 'Bearer ' + Cypress.env('token')
            },
        body:[{
                id: eventId
            }]
        }).then((response)=>{
            // assert status code
            expect(response.status).to.eq(200)

            // assert duration
            expect(response.duration).to.not.be.greaterThan(500) 
        })
})
