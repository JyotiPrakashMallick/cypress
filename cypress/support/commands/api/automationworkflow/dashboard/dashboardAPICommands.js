import dateUtil from "../../../../../integration/donna/gui/smoketests/common/DateUtil"
Cypress.Commands.add("getRevenueDetailsFromAPI", (authToken, revenueDate) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/revenue/totalRevenueDays`,
    qs: {
      date: revenueDate,
      pastDaysLimit: 30,
      maxDates: 12
    },
    auth: {
      bearer: authToken,
    },
  })
});

Cypress.Commands.add("getRevenueDetailsFromAPIs", (authToken, revenueDate) => {
  let selectDate = revenueDate + "T19:00:00.000Z"
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/revenue/totalRevenueDays?pastDaysLimit=30&maxDates=12&date=${selectDate}`,
    // qs: {
    //   date: selectDate,
    //   pastDaysLimit: 30,
    //   maxDates: 12
    // },
    auth: {
      bearer: authToken,
    },
  }).then((response) => {
    return cy.wrap(response)
  })
})
Cypress.Commands.add("getPatientInsightFromAPIs", (authToken, selectDate, selectEndDate) => {

  let startD = selectDate + "T08:00:00.000Z"
  let endD = selectEndDate + "T07:59:59.999Z"
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/appointments/insights?limit=100&startDate=${startD}&endDate=${endD}`,
    // qs: {
    //   startDate: startD,
    //   endDate: endD,
    //   limit: 100,
    // },
    auth: {
      bearer: authToken,
    },
  }).then((response) => {
    return cy.wrap(response)
  })
})

Cypress.Commands.add("getAppointmentsFromAPIs", (authToken, selectDate, selectEndDate) => {

  let startD = selectDate + "T08:00:00.000Z"
  let endD = selectEndDate + "T07:59:59.999Z"
  let filter = "filters[]={\"isMissed\":false,\"isPending\":false,\"isCancelled\":false,\"isDeleted\":false}"
  cy.log(startD)
  cy.log(endD)
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/appointments?limit=100&startDate=${startD}&endDate=${endD}&join=patient&${filter}`,
    // qs: {
    //   startDate: startD,
    //   endDate: endD,
    //   limit: 100,
    // },
    auth: {
      bearer: authToken,
    },
  }).then((response) => {

    cy.log(JSON.stringify(response.body.entities.appointments))
    return cy.wrap(response)
  })
})

Cypress.Commands.add("getOnlineRequestsFromAPIs", (authToken, filterType) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/requests?join=${filterType}`,
    // qs: {
    //   join: filterType,
    // },
    auth: {
      bearer: authToken,
    },
  }).then((response) => {

    //cy.log(JSON.stringify(response.body.entities.appointments))
    return cy.wrap(response)
  })
})

Cypress.Commands.add("getWaitingRoomReqFromAPIs", (authToken) => {

  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/users/me`,
    auth: {
      bearer: authToken,
    },
  })
    .then((response) => {
      let selectedAccountId = response.body.accountId
      cy.request({
        method: "GET",
        url: `${Cypress.env("backendUrl")}api/waitingRoom?accountId=${selectedAccountId}`,
        // qs: {
        //   accountId: selectedAccountId,
        // },
        auth: {
          bearer: authToken,
        },
      })
      // .then((response) => {

      //   //cy.log(JSON.stringify(response.body.entities.appointments))
      //   return cy.wrap(response)
      // })
    })
})

Cypress.Commands.add("getAccountId", (authToken) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/users/me`,
    auth: {
      bearer: authToken,
    },
  })
    .then((response) => {

      //response.body.accountId
      cy.log("Selected account Id", response.body.accountId)
      Cypress.env("accountId", response.body.accountId)
      //return cy.wrap(response.body.accountId)
    })
})

Cypress.Commands.add("getDonnaTodoList", (authToken, selectDate, selectEndDate, todoListType) => {
  // let startD = selectDate + "T07:00:00.000Z"
  // let endD = selectEndDate + "T06:59:59.999Z"

  let startD
  let endD

  if (todoListType == 'reminders') {

    startD = selectDate + "T08:00:00.000Z"
    endD = selectEndDate + "T07:59:59.999Z"

  } else if (todoListType == 'recalls') {

    startD = selectDate + "T08:00:00.000Z"
    endD = selectEndDate + "T08:00:00.000Z"

  } else if (todoListType == 'reviews') {
    startD = dateUtil.getCurrentISODate()
    endD = selectEndDate + "T07:59:59.999Z"
  }
  cy.log("start Date", startD)
  cy.log("end Date", endD)
  // Get Account ID
  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/users/me`,
    auth: {
      bearer: authToken,
    },
  }).then((response) => {
    // Get todo list
    cy.request({
      method: "GET",
      url: `${Cypress.env("backendUrl")}api/accounts/${response.body.accountId}/${todoListType}/outbox?startDate=${startD}&endDate=${endD}`,
      // qs: {
      //   startDate: startD,
      //   endDate: endD,
      // },
      auth: {
        bearer: authToken,
      },
    })
      .then((response) => {
        return cy.wrap(response)
      })
  })
})

Cypress.Commands.add("getTimeZoneBySelectedAccount", (authToken) => {

  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/users/me`,
    auth: {
      bearer: authToken,
    },
  })
    .then((response) => {
      //let timeZone=response.body.timezone
      Cypress.env("timezone", response.body.timezone)
    })
})