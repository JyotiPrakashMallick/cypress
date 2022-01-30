/// <reference types="Cypress"/>
/*
AUTO-708 Events
Sub-tasks
AUTO-710 Create Events
AUTO-709 Get All Events
AUTO-711 Update Events
AUTO-712 Delete Events
*/

import moment from 'moment'
const pmsId = Math.floor(Math.random()*1000).toString()
const randomNote = require("crypto").randomBytes(6).toString('hex')

describe('Events Api', ()=>{
    let eventsData
    let accountId=null
    beforeEach(()=>
      {
        cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    
        // load data from fixtures
        cy.fixture('api/scheduling/events').then((edata)=>{
          eventsData=edata
      }) 
    }) 

    it ('Verify create, get, update, delete events api',()=> {     
      //set start date and end date of event
      let startDate = moment().add(1, 'minutes').format("YYYY-MM-DD[T]hh:mm:ss[.000Z]")
      let endDate = moment().add(2, 'hours').format("YYYY-MM-DD[T]hh:mm:ss[.000Z]")

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
      // create event
      cy.createEvent(accountId, pmsId, randomNote, eventsData.description, eventsData.practitionerId, eventsData.chairId, startDate, endDate).then((response)=>{
        
      // fetch event id
      var id = response.body.result
      cy.log("event id is-->" + id)

      // assert data in response
      var res  = (JSON.stringify(response.body))
      expect(res).to.include(accountId)
      expect(res).to.include(pmsId)
      expect(res).to.include(randomNote)
      expect(res).to.include(eventsData.description)
      expect(res).to.include(eventsData.practitionerId)
      expect(res).to.include(eventsData.chairId)
      expect(res).to.include(startDate)
      expect(res).to.include(endDate)
      
      // get all events betweeen the given date range
      cy.getAllEvents(accountId, startDate, endDate).then((resp)=>{
       
      // assert newlycreated event is present
      var resp  = (JSON.stringify(response.body))
      expect(resp).to.include(accountId)
      expect(resp).to.include(pmsId)
      expect(resp).to.include(randomNote)
      expect(resp).to.include(eventsData.description)
      expect(res).to.include(eventsData.practitionerId)
      expect(res).to.include(eventsData.chairId)
      expect(resp).to.include(startDate)
      expect(resp).to.include(endDate)
      })
    
      // assert keys in response
      expect(response.body.entities.events[Object.keys(response.body.entities.events)[0]])
            .to.have.all.keys('id', 'pmsId', 'isSyncedWithPms', 'description', 'accountId', 'practitionerId', 'chairId', 'note', 'startDate', 'endDate', 'pmsCreatedAt', 'createdAt', 'updatedAt', 'deletedAt')

      // set new start date and end date      
      let newStartDate = moment().add(2, 'minutes').format("YYYY-MM-DD[T]hh:mm:ss[.000Z]")
      let newEndDate = moment().add(3, 'hours').format("YYYY-MM-DD[T]hh:mm:ss[.000Z]")

       // update event
       cy.updateEvent(`${id}`, pmsId + '123', randomNote + 'Updated', eventsData.descriptionUpdated, newStartDate, newEndDate).then((respo)=>{
      
       // assert data in response
       var resp  = (JSON.stringify(respo.body))
       expect(resp).to.include(accountId)
       expect(resp).to.include(pmsId + '123')
       expect(resp).to.include(randomNote + 'Updated')
       expect(resp).to.include(eventsData.descriptionUpdated)
       expect(res).to.include(eventsData.practitionerId)
       expect(res).to.include(eventsData.chairId)
       expect(resp).to.include(newStartDate)
       expect(resp).to.include(newEndDate)  

       // delete event
       cy.deleteEvent(`${id}`)
       })
      })
    })
  })
})
