import uiHelper from "../../../../../integration/donna/gui/smoketests/common/UIHelper"

Cypress.Commands.add("getPatientListFromAPIForSelectedOptionByStatus", (authToken, selectedOption, seletedStatus) => {

  let queryFilterBySelectOption = uiHelper.getPatientFilterQueryBySelectedOption(selectedOption) 

  cy.request({
    method: "GET",
    url: `${Cypress.env("backendUrl")}api/users/me`,
    auth: {
      bearer: authToken,
    },
  })
    .then((response) => {
      let selectedUserId = response.body.userId
      cy.request({
        method: "GET",
        //url: `${Cypress.env("backendUrl")}api/table/search`,
        url: `${Cypress.env("backendUrl")}api/table/search?limit=15&page=0&authUserId=${selectedUserId}&${queryFilterBySelectOption}&status=${seletedStatus}`,
        auth: {
          bearer: authToken,
        },
      })
        .then((response) => {
          cy.url()
          //cy.log(JSON.stringify(response))
          return cy.wrap(response)
        })
    })
})