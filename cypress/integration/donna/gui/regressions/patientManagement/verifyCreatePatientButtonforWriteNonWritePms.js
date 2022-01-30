/// <reference types="Cypress"/>
/*
AUTO-410-Verify that create new patient button is not present for non write capable pms
AUTO-411-Verify that create new patient button is  present for write capable pms
*/

import searchPageSelector from "../../../../../support/selectors/patientmanagement/searchPageSelector"

describe('Verify that create new patient button is not present for non write capable pms', () => {
    beforeEach(function () {

        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('backendUrl') + "auth")
     //  cy.intercept()
    // cy.intercept(Cypress.env('backendUrl') + "/patients/list").as('waitForPatientList')
        cy.visit('/patients/list',{timeout:6000})
      //  cy.wait('@waitForPatientList')
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
    })
    it('Verify that create new patient button is not present for non write capable pms', () => {
        cy.getCurrentAccountAdapterType(Cypress.env("token")).then((response) => {
            cy.log(JSON.stringify(response))
            if (response == 'DENTRIX_V61') {
                cy.get(searchPageSelector.createPatientBTN).should('not.contain', 'Create New Patient')
            }
            else
                cy.get(searchPageSelector.createPatientBTN).should('contain', 'Create New Patient')
        })
    })
})