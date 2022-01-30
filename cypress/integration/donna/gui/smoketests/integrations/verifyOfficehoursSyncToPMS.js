/// <reference types="Cypress"/>

/** 
 * AUTO-170 Setting Practice Page Sanity: Verify the chairs are correctly synced from pms with correct status
 */
// import { keys, values } from 'cypress/types/lodash'
// import officehours from  '../../../../../fixtures/gui/integrations/abledent_officeHours.json'
import settingSelectors from '../../../../../support/selectors/integrations/practiceSelectors'

describe('This case validates if the office hours are in sync with the PMS', () => {
    // let isChairDataEmpty
    // let chairResponse
    before(function () {
        cy.log('navigate to dashboard page on successful log in')
        cy.apilogin(Cypress.env('email'), Cypress.env('password'), Cypress.env('backendUrl') + 'auth')
        cy.visit('/settings/practice/hours')
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.log('TOKEn' + Cypress.env('token'))
        cy.wait(4000)

    })

    it('Validate if the page has been navigated to the Practice\'s office-hours', () => {
        cy.log('*************** asserts that user is able to navigate to practice office hours tab')
        cy.validatePracticeOfficeHoursDisplayed()
    })

    it('Validate if the practice\'s office-hours, dispayed in CareCru portal, are in exact match with the PMS', () => {
        cy.getPracticeOfficeHours(Cypress.env('token'))
            .then((res) => {
                cy.log(JSON.stringify(res))
                cy.validatePracticeOfficeHours(res)
            })
    })
})