/// <reference types="Cypress"/>

/*
AUTO-318 Waitlist Enhancements: Performance - UI Pagination
Task-
AUTO-330 Verify the filters on Waitlist
AUTO-328 Verify the column headers on different page
*/

var testData = require('../../../../../../fixtures/gui/scheduling/waitlist/waitlisttestdata')
const headerVal = ["date added, First Name, Last Name, Reason, Practitioner, Units, Days, Times, Next Appt, Notes, Manage"]
import waitlist from "../../../../../../support/selectors/scheduling/waitlist/waitlistPage"

describe('Verify the headers and filters on Waitlist', () => {
    before(function () {
        cy.apilogin(Cypress.env('waitlistUser'),Cypress.env('waitlist_password'), Cypress.env('backendUrl') + 'auth')
        cy.visit('/schedule')
        cy.get(waitlist.waitList).click()
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        }) 

    })

    it('Verify the column headers on different pages', () => {
        cy.get(waitlist.header).should('have.length', '13')

        expect(headerVal).includes(testData.header)

        cy.get(waitlist.checkbox).should('be.visible') //Validate Checkbox

        cy.get(waitlist.questionMark).click() //Question mark icon
        cy.get(waitlist.tooltip).should('have.text', testData.toolTip) //Validate tooltip

        //Switch to another page and check Headers
        cy.log("Switch to another Page and check Headers")
        cy.get(waitlist.recordCount).invoke('text').then((totalCount) => {
            cy.log(totalCount)
            if (totalCount > 15) {
                cy.get(waitlist.pageNum).type("3")
                cy.get(waitlist.header).should('have.length', '13')
                expect(headerVal).includes(testData.header)
            }
        })
    })

    it('Verify the filters on Waitlist', () => {
        cy.get(waitlist.recordCount).invoke('text').then((totalCount) => {
            cy.log(totalCount)

            ///Filter by name
            cy.get(waitlist.filterbyName).type('John')
            cy.get(waitlist.recordCount).should('not.have.text', totalCount) //Validate the count after filter applied
            cy.get(waitlist.filterbyName).clear()

            //Filter on Reason
            cy.get(waitlist.filerList).contains('Reason').click()
            cy.get(waitlist.filterbyReason).contains('Recall').click()
            cy.get(waitlist.recordCount).should('not.have.text', totalCount)

            //Filter on Practitioner
            cy.get(waitlist.filerList).contains('Practitioners').click()
            cy.get(waitlist.filterbyPractitioner).click()
            cy.get(waitlist.recordCount).should('not.have.text', totalCount)


            ////Filter on Units
            cy.get(waitlist.filerList).contains('Units').click()
            cy.contains('Minimum').type('10')
            cy.contains('Maximum').type('13')
            cy.get(waitlist.recordCount).should('not.have.text', totalCount)
            cy.contains('Clear All').click()

            ////Filter on Days
            cy.get(waitlist.filerList).contains('Days').click()
            cy.contains('Weekends').click()
            cy.get(waitlist.recordCount).should('not.have.text', totalCount)

            ////Filter on Times
            cy.get(waitlist.filerList).contains('Times').click()
            cy.contains('Afternoons').click()
            cy.get(waitlist.recordCount).should('not.have.text', totalCount)
        })

    })

})