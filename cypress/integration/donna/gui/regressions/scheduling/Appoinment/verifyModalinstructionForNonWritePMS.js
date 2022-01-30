/// <reference types="Cypress"/>

/*
CRU-1239 PMS without Appointment Write Flow
Subtasks-
Auto-54- Verify that the new modal instruction appointment request for new patient workflow appeared to non write capable enterprise
Auto-58- Verify that the new modal for adding patient and appointment for non write capable pms displays the patient and appointment details

*/
import schedulePageSelector from "../../../../../../support/selectors/scheduling/schedulePageSelector"
const bookingData = require("../../../../../../fixtures/gui/scheduling/modalInstruction.json")
describe('Verify that the new modal for adding patient and appointment for non write capable pms',function()
{
before(function (){

     
    cy.apilogin(Cypress.env('dentrix_user'),Cypress.env('dentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
    cy.visit('/schedule')
    cy.log('Remove all the requests if present')
    cy.removeOnlineRequests()
})

it('Verify that the new modal instruction appointment request for new patient workflow appeared to non write capable enterprise',()=>
{
// do online booking via api

cy.doMyOnlineBooking(Cypress.env("token"),
bookingData.accountId,
bookingData.insuranceCarrier,
bookingData.patientUserId,
bookingData.practitionerId,
bookingData.requestingPatientUserId,
bookingData.serviceId,
bookingData.note)

//Accept online request
cy.get(schedulePageSelector.onlineRequests,{timeout:10000}).eq(0).click()
cy.get(schedulePageSelector.buttonSelector).contains('Accept')
.should('be.visible').click()

// Validate Note message on pop up
cy.get(schedulePageSelector.apptDetailWindow)
.should('include.text',bookingData.noteMsg1 + bookingData.noteMsg2)
 
//Validate displayed details on Modal Instrctions
cy.get(schedulePageSelector.popupInfo)
.contains('Appointment Summary')
.should('be.visible')

cy.get(schedulePageSelector.popupInfo)
.contains('Patient Summary')
.should('be.visible')

cy.get(schedulePageSelector.popupInfo)
.contains('Requester Info')
.should('be.visible')

//Validate data of appointment Summary on pop up
cy.log('Verify Appointment Summary details')
cy.get(schedulePageSelector.patientName).should('include.text',bookingData.patientName)
cy.get(schedulePageSelector.popUPData).contains('DATE')
.should('be.visible')

//Validate Appointment Date
const moment = require('moment')
        const d = new Date()
        const currentDate = moment(d).format('MMMM D, YYYY')
        const reqTime = moment(d).format('MMM D, hh:mm A')
        const aptBookingTime = moment(d).format('h:mm A')

        cy.log(currentDate)
        cy.log('date and time',reqTime)

//Valiadte Appointment Time and Type
cy.get(schedulePageSelector.popUPData).contains('TIME')
.should('be.visible')
cy.get(schedulePageSelector.bookingTime)
.should('include.text',aptBookingTime)

cy.get(schedulePageSelector.popUPData).contains('APPOINTMENT TYPE')
.should('be.visible')

//Appointment Date
cy.get(schedulePageSelector.dateDATA)
.should('have.text',currentDate)

//Validate Appointment Type
cy.get(schedulePageSelector.appointmentTypeData)
.should('have.text',bookingData.appointmentType)

cy.get(schedulePageSelector.practionerData)
.should('have.text',bookingData.practitionerName)

//Validate data of Patient Summary on pop up
cy.log('Verify Patient Summary details')

cy.get(schedulePageSelector.popUPData).contains('BIRTHDAY')
.should('be.visible')
cy.get(schedulePageSelector.patientDOB)
.should('have.text',bookingData.dateOfBirth)

//Validate Phone Number
cy.get(schedulePageSelector.popUPData).contains('PHONE')
.should('be.visible')
cy.get(schedulePageSelector.phoneData2)
.should('have.text',bookingData.patientNumber)

cy.get(schedulePageSelector.popUPData).contains('INSURANCE')
.should('be.visible')
cy.get(schedulePageSelector.patientInsurance)
.should('have.text',bookingData.insuranceCarrier)

//Validate Email
cy.get(schedulePageSelector.popUPData).contains('EMAIL')
.should('be.visible')
cy.get(schedulePageSelector.emailData2)
.should('have.text',bookingData.patientEmail)

//Validate NOtes
cy.get(schedulePageSelector.popUPData).contains('NOTES')
.should('be.visible')
cy.get(schedulePageSelector.notesData)
.should('have.text',bookingData.note)

//Validate data of Requester Info on pop up
cy.log('Verify Requester Info ')

//Validate REQUESTED BY details
cy.get(schedulePageSelector.popUPData).contains('REQUESTED BY')
.should('be.visible')
cy.get(schedulePageSelector.requestedBy)
.should('have.text',bookingData.patientName)

//Validate Requester Birth Date
cy.get(schedulePageSelector.popUPData).contains('REQUESTER BIRTH DATE')
.should('be.visible')
cy.get(schedulePageSelector.doBData)
.should('have.text',bookingData.dateOfBirth)

//Validate Phone data
cy.get(schedulePageSelector.popUPData).contains('PHONE')
.should('be.visible')
cy.get(schedulePageSelector.phoneData)
.should('have.text',bookingData.patientNumber)

//Validate Email data
cy.get(schedulePageSelector.popUPData).contains('EMAIL')
.should('be.visible')
cy.get(schedulePageSelector.emailData)
.should('have.text',bookingData.patientEmail)

//Validate Insurance data
cy.get(schedulePageSelector.popUPData).contains('INSURANCE')
.should('be.visible')
cy.get(schedulePageSelector.insuranceDate)
.should('have.text',bookingData.insuranceCarrier)

//Validate REQUESTED ON data
cy.get(schedulePageSelector.popUPData).contains('REQUESTED ON')
.should('be.visible')
cy.get(schedulePageSelector.requestedTime)
.should('include.text',reqTime)

})

})