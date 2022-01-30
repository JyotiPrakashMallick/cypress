import moment from 'moment';

let today =  new Date()
let laterDate =  new Date()
laterDate.setDate(today.getDate() + 6)
//returns the tomorrow date
console.log("laterDate => ",laterDate)
let startDate = moment(laterDate).format("YYYY-MM-DD[T]HH:mm:ss") ;
let endDate = moment(laterDate).add(15 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
let avlbldate = new Date()
avlbldate.setDate(today.getDate() + 30)
let avlbltime =  moment(avlbldate).add(22 , 'hours').format("YYYY-MM-DD[T]HH:mm:ss") ;
let val=true

Cypress.Commands.add("createOnlineBooking",(authToken,accountId,insCarrier,patientUserId,practitionerId,requestingPatientUserId,servId,myNote)=>{
    
  cy.request({
    method: "POST",
    url: `${Cypress.env("backendUrl")}my/requests`,
    auth: {
      bearer: authToken,
    },
    body:{
      accountId:`${accountId}`,
      startDate : startDate,
      endDate : endDate,
      insuranceCarrier: `${insCarrier}`,
      patientUserId: `${patientUserId}`,
      practitionerId: `${practitionerId}`,
      requestingPatientUserId: `${requestingPatientUserId}`,
      serviceId: `${servId}`,
      note: `${myNote}`
    }
  }).then((response) => {
    expect(response.status).to.eq(201);
  })
})

Cypress.Commands.add("createWaitspotForOnlineBookingAppt",(authToken,accountID,patientUserId,practitionerId,reasonId)=>{

  cy.request({

    method: "POST",
      url: `${Cypress.env("backendUrl")}my/waitSpots`,
      auth: {
        bearer: authToken,
      },
      body:{
        accountId:`${accountID}`,
        endDate : endDate,
        patientUserId: `${patientUserId}`,
        practitionerId: `${practitionerId}`,
        reasonId: `${reasonId}`,
        availableTimes: [`${avlbltime}`],
        preferences: {
          afternoons: val,
          evenings: val,
          mornings: val
        },
        daysOfTheWeek: {
          friday: val,
          monday: val,
          saturday: val,
          sunday: val,
          thursday: val,
          tuesday: val,
          wednesday: val
        }
        
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
    })

  })