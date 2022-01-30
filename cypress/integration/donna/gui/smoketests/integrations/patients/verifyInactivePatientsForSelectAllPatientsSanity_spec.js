/// <reference types="Cypress"/>
import { beforeEach, afterAll } from "mocha"
import uiHelper from "../../common/UIHelper"
describe("Patient Sanity to select 'All Patients': Verify that all Inactive patients are correctly synced from pms", function () {
    before(function () {
        cy.clearSessionStorage()
        cy.dashboardLoginByAPI(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
        cy.visit('/patients/list',{timeout: 20000})
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})
    })
    it("Verify that all Inactive patients are correctly synced from PMS to carecru for selecting 'All Patients' option", () => {
        cy.wait(2000)
        cy.verifyPatientListForSelectedOptionByStatus(Cypress.env("token"), "All Patients", "Inactive")
    })
})
