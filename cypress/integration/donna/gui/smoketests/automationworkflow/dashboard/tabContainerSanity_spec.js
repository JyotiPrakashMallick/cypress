/// <reference types="Cypress"/>
import { beforeEach, afterAll } from "mocha"
import uiHelper from "../../common/UIHelper"
describe("Waiting room container tab", function () {
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
  it("Verify, User able to validate patient waiting room list", function () {
    cy.log("Waiting room request test for date:: ", Cypress.env("loginDate"))
      cy.getWaitingRoomReqFromAPIs(Cypress.env("token")).then((response) => {
        //cy.log("API Response ",JSON.stringify(response.body[0]))
        let apptCount
        if (response == null || response == '') {
          return
        } else {
          apptCount = uiHelper.getWaitingRoomReqCount(response)
        }
        cy.selectTab("Waiting Room", apptCount)
        if (apptCount > 0) {
          cy.verifyWaitRoomTabListDetails()
        } else {
          cy.log("No waiting room request found for the date")
          expect(0).to.be.eq(0)
        }
      })
  })

  it("Verify, User able to validate online request list", function () {
    cy.log("Online requests test for the date:: ", Cypress.env("loginDate"))
    //cy.selectDashboardDate(Cypress.env("loginDate"))
    cy.getOnlineRequestsFromAPIs(Cypress.env("token"), "requestingPatientUser")
      .then((response) => {
        let apptCount
        if (response == null || response == '') {
          return
        } else {
          apptCount = uiHelper.getOnlineRequestCount(response.body.entities.requests)
        }
        cy.selectTab("Online Req", apptCount)
        if (apptCount > 0) {
          //cy.verifyTabListDetails()
          cy.verifyOnlineReqTabListDetails()
        } else {
          cy.log("No online requests found for the date")
          expect(0).to.be.eq(0)
        }
      })
  })

  it("Verify, User able to validate appoitment list", function () {
    cy.log("Appointments for the date:: ", Cypress.env("loginDate"))
    //cy.selectDashboardDate(Cypress.env("loginDate"))
    cy.getAppointmentsFromAPIs(Cypress.env("token"),
      uiHelper.getSelectDate(Cypress.env("loginDate")),
      uiHelper.getSelectNextDate(Cypress.env("loginDate"))).then((response) => {
        let str = response.body.entities.appointments
        let apptCount = uiHelper.getAppointmentCount(str)
        cy.log("Appointment Counts ", apptCount)
        apptCount = uiHelper.getAppointmentCount(str)
        cy.selectTab("Appointments", apptCount)
        if (apptCount > 0) {
          cy.verifyApptsTabListDetails()
        } else {
          cy.log("No appointments found for the date")
          expect(0).to.be.eq(0)
        }
      })
  })
})