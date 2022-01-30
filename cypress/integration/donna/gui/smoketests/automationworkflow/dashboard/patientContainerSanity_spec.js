/// <reference types="Cypress"/>
import { beforeEach, afterAll } from "mocha"
import uiHelper from "../../common/UIHelper"
describe("Patient Waiting room card", function () {
  before(function () {
    cy.clearSessionStorage()
    cy.dashboardLoginByAPI(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
    cy.visit('/')
    cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})
    //cy.login(Cypress.env('email'),Cypress.env('password'))
  })
  it("Verify, it displays the patient's in waiting room has 0 if no one is in waiting room", function () {
    cy.log("Assert that, it displays the patient's in waiting room has 0 if no one is in waiting room")

    let accountId
    cy.getAccountId(Cypress.env("token")).then((accountIdResponse) => {
      accountId = accountIdResponse;
      cy.getWaitingRoomReqFromAPIs(Cypress.env("token"), accountId).then((response) => {
        //cy.log("API Response ",JSON.stringify(response.body[0]))
        let apptCount
        if (response == null || response == '') {
          return
        } else {
          apptCount = uiHelper.getWaitingRoomReqCount(response)
        }
        cy.log("Waiting Room Count", apptCount)
        cy.verifyPatientWaitingRoomCount(apptCount)
        cy.isDisplayedPatientWaitingRoomTitle(apptCount)
      })
    })
  })
  it("Verify, it displays the patient's un confirmed card has 0 if no one confirmed based on date selected", function () {
    cy.log("Assert that, it displays the patient's un confirmed card has 0 if no one confirmed based on date selected")

    cy.getAppointmentsFromAPIs(Cypress.env("token"),
      uiHelper.getSelectDate(Cypress.env("loginDate")),
      uiHelper.getSelectNextDate(Cypress.env("loginDate"))).then((response) => {
        let apptCount
        if (response == null || response == '') {
          return
        } else {
          apptCount = uiHelper.getUnConfirmedPatientCount(response.body.entities.appointments)
        }
        cy.verifyPatientsUnconfirmedCount(apptCount)
        cy.isDisplayedPatientsUnconfirmedTitle(apptCount)
      })
  })
  it("Verify, it displays the patient's insight card has 0 if no one has patient's insight based on date selected", function () {
    cy.log("Assert that, it displays the patient's insight card has 0 if no one has patient's insight based on date selected")

    //cy.verifyPatientInsightsCount("1")
    cy.getPatientInsightFromAPIs(Cypress.env("token"),
      uiHelper.getSelectDate(Cypress.env("loginDate")),
      uiHelper.getSelectNextDate(Cypress.env("loginDate")))
      .then((response) => {
        let responseData = response.body.length
        cy.log("Input Insight Count", responseData)
        if (response == null || response == '') {
          return
        }
        // else{
        //   patientInsightCount = uiHelper.getPatientInsightCount(response)
        //   cy.log("Input Insight Count2", patientInsightCount)
        // }
        cy.verifyPatientInsightsCount(responseData)
        cy.isDisplayedPatientInsightsTitle(responseData)
      })

  })
  it("Verify, it displays the appointment today card has 0 if no appointment for date based on date selected", function () {
    cy.log("Assert that, it displays the appointment today card has 0 if no appointment for date based on date selected")
    cy.getAppointmentsFromAPIs(Cypress.env("token"),
      uiHelper.getSelectDate(Cypress.env("loginDate")),
      uiHelper.getSelectNextDate(Cypress.env("loginDate"))).then((response) => {
        let apptCount
        if (response == null || response == '') {
          return
        } else {
          apptCount = uiHelper.getAppointmentCount(response.body.entities.appointments)
        }
        cy.verifyAppointmentsTodayCount(apptCount)
        cy.isDisplayedAppointmentsTodayTitle(apptCount)
      })
  })
})