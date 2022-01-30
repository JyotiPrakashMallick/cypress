/// <reference types="Cypress"/>

import quickaddselector from "../../../../../../support/selectors/appointmentscenarios/quickaddselector"
 
describe('This test checks the functionality of Quick Add for adding appointments', function() 
{

    before(() => {

        cy.apilogin(Cypress.env('userwritePMS'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
        cy.visit('schedule', {timeout: 10000})
        cy.url().should('include','schedule')
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
    })

    it('Use quick add to create appointment',() => {
        //API for creating patient         
        //(May be commented for testing reasons to prevent creating patients)
        let myPatientName = undefined
        //cy.createNewPatient(quickaddselector.firstName, quickaddselector.lastName, Cypress.env('superadmin_email'))
        cy.contains('Quick Add').should('be.visible')
        cy.contains('Quick Add').click()

        //Type patient name
        cy.get(quickaddselector.patientSelected).click({force : true})
        cy.get(quickaddselector.patientSelected).type(quickaddselector.fullPatientName)

        cy.get('div[role="combobox"]').then(data => {
            if(data.find(quickaddselector.patientListElement).length > 0) {
                cy.log('Patient already exists')
                cy.get('div').contains(quickaddselector.fullPatientName).click({force : true})

                //select chair and practitioner
                cy.randomlyselectfromdropdown(quickaddselector.chairID)
                cy.get(quickaddselector.dropdownOption0).click({force : true})
                cy.randomlyselectfromdropdown(quickaddselector.practitionerID)
                cy.get(quickaddselector.dropdownOption0).click({force : true})
                cy.get(quickaddselector.note).type('Test')
                cy.get(quickaddselector.addButton).click({force : true})
                
                //Asser success toast message
                cy.contains('Added a new Appointment for ' + quickaddselector.firstName).should('contain.text', 'Added a new Appointment for ' + quickaddselector.firstName)

            }
            else {
                cy.log('Patient does not exist')
                cy.createNewPatient(quickaddselector.firstName, quickaddselector.lastName, Cypress.env('superadmin_email'))
                
                cy.get('div').contains(quickaddselector.fullPatientName).click({force : true})

                //select chair and practitioner
                cy.randomlyselectfromdropdown(quickaddselector.chairID)
                cy.get(quickaddselector.dropdownOption0).click({force : true})
                cy.randomlyselectfromdropdown(quickaddselector.practitionerID)
                cy.get(quickaddselector.dropdownOption0).click({force : true})
                cy.get(quickaddselector.note).type('Test')
                cy.get(quickaddselector.addButton).click({force : true})


                //Asser success toast message
                cy.contains('Added a new Appointment for ' + quickaddselector.firstName).should('contain.text', 'Added a new Appointment for ' + quickaddselector.firstName)

            }
        })

    })
    after('Canceling appointment', () => {
        //Cancel appointment
        cy.get(quickaddselector.appointmentPatientName, {timeout:10000}).scrollIntoView()
        cy.get(quickaddselector.appointmentPatientName).should('be.visible')
        cy.get(quickaddselector.appointmentPatientName).click({force : true})
        cy.contains('Edit Appointment').click()
        cy.contains('Cancelled').click()
        cy.contains('Save').click()

        //Assert success toast message
        cy.contains('Updated ' + quickaddselector.firstName + '\'s Appointment').should('contain.text', 'Updated ' + quickaddselector.firstName + '\'s Appointment')
    })
})