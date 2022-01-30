import moment from 'moment';
Cypress.Commands.add("doMyOnlineBooking",(authToken,acntId,insCarrier,patientUserId,practitionerId,requestingPatientUserId,servId,myNote)=>{
    
    // var toDay = new Date();
    // var dd = String(toDay.getDate())
    // var mm = String(toDay.getMonth() + 1).padStart(2, '0')
    // var yyyy = toDay.getFullYear()
    // toDay = yyyy + '-' + mm + '-' + dd
    // let startDate = moment().format("YYYY-MM-DD[T]HH:mm:ss") ;
    // let endDate = moment().add(15 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
    let startDate = moment().format("YYYY-MM-DD[T]HH:mm:ss") ;
    let endDate = moment().add(15 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
    cy.request({
      method: "POST",
      url: `${Cypress.env("backendUrl")}my/requests`,
      auth: {
        bearer: authToken,
      },
      body:{
        accountId:`${acntId}`,
        // startDate:`${toDay}T21:00:00.000Z`,
        // endDate:`${toDay}T21:00:00.000Z`,
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

Cypress.Commands.add("doMyOnlineBookingWithin6Months",(authToken,acntId,insCarrier,patientUserId,practitionerId,requestingPatientUserId,servId,myNote)=>{
  let startDate = moment().add(5 ,'hours').format("YYYY-MM-DD[T]HH:mm:ss")
  let endDate = moment(startDate).add(15 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
  cy.request({
    method: "POST",
    url: `${Cypress.env("backendUrl")}my/requests`,
    auth: {
      bearer: authToken,
    },
    body:{
      accountId:`${acntId}`,
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


Cypress.Commands.add("onlineBookingForNonExistingPtnt",(authToken, patientUserid,accountId,insuranceCarrier,practitionerId,requestingPatientUserId,serviceId,note,appointmentType)=>{
  let startDate = moment().add(5 ,'hours').format("YYYY-MM-DD[T]HH:mm:ss")
  let endDate = moment(startDate).add(15 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss")
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
      insuranceCarrier: `${insuranceCarrier}`,
      patientUserId: `${patientUserid}`,
      practitionerId: `${practitionerId}`,
      requestingPatientUserId: `${requestingPatientUserId}`,
      serviceId: `${serviceId}`,
      note: `${note}`,
      appointmentType: `${appointmentType}` 
    }
  }).then((response) => {
    expect(response.status).to.eq(201);
  })
})