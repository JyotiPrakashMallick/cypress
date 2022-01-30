/// <reference types="Cypress"/>

/* Following Task of Appointments EPIC
AUTO-694 - Create Appointment
AUTO-757 - Update Appointments
AUTO-784: - Delete Appointments
*/

const testData = require("../../../../../../fixtures/api/scheduling/appointments/createAppointment.json")
import uihelper from "../../../../../donna/gui/smoketests/common/UIHelper"
import moment from 'moment';

describe('Create /Update / Delete Appointments', () => {
  before(function () {
    cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
  }
  )

  it('Verify Create, Update and Delete new Appointment', () => {

    //Set Start and End date of Appointment
   let startDate = moment().add(2, 'minutes').format("M/DD/YYYY[, ]h:mm:ss A");
    let endDate = moment().add(20, 'minutes').format("M/DD/YYYY[, ]h:mm:ss A")

      //Create new appointment
    cy.request({
      method: "POST",
      url: `${Cypress.env("backendUrl")}api/appointments/`,
      headers: {

        'Authorization': "Bearer " + Cypress.env('token'),
      },
      body: {
        startDate,
        endDate,
        practitionerId: testData.practitionerId,
        patientId: testData.patientId,
        chairId: testData.chairId,
        isSyncedWithPms: false,
        isReminderSent: false,
        isDeleted: false,
        reason: testData.reason,
        note: testData.note,
        accountId: testData.accountId

      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.duration).to.not.be.greaterThan(500)
      expect(response.body.entities).to.have.all.keys('appointments', 'patients')

      //Verify Appointments data in response
     //cy.log(JSON.stringify(response.body.entities.appointments[Object.keys(response.body.entities.appointments)[0]]))

      const aptResponse = response.body.entities.appointments[Object.keys(response.body.entities.appointments)[0]]
      
      var convertedstartTimefromResponse = uihelper.convertUTCDateTimeToPST(aptResponse.startDate)
      var convertedendTimefromResponse = uihelper.convertUTCDateTimeToPST(aptResponse.endDate)
            
      //Validate Patient /Practictioner / Chair id/ Note and Account Id
      expect(aptResponse.patientId).to.eq(testData.patientId)
      expect(aptResponse.practitionerId).to.eq(testData.practitionerId)
      expect(aptResponse.chairId).to.eq(testData.chairId)
      expect(aptResponse.note).to.eq(testData.note)
      expect(aptResponse.accountId).to.eq(testData.accountId)

      //Validate Start and End Time
    expect(convertedstartTimefromResponse).to.equals(startDate)
    //expect(aptResponse.startDate).to.contains(startDate)
    expect(convertedendTimefromResponse).to.equals(endDate)

      //Valiadte Appointment Id Present in Response
      expect(aptResponse.id).not.be.null

      //Validate Patient Phone Number
      const patientResponse = response.body.entities.patients[Object.keys(response.body.entities.patients)[0]]
      expect(patientResponse.isPhoneNumberAvailable).to.be.true

      //Update The appointment
      const apptID = aptResponse.id
      cy.log("Appointment id - " +apptID)

      //Set updated start and end time

      let updatedStartDate = moment().add(1, 'hour').format("M/DD/YYYY[, ]h:mm:ss A");
      let updatedEndDate = moment().add(2, 'hours').format("M/DD/YYYY[, ]h:mm:ss A")

        cy.request({
        method: "PUT",
        url: `${Cypress.env("backendUrl")}api/appointments/${apptID}`,
        headers: {
          'Authorization': "Bearer " + Cypress.env('token'),
                  },
        body: {
          startDate: updatedStartDate,
          endDate: updatedEndDate,
          practitionerId: testData.updatedpractitionerId,
          patientId: testData.patientId,
          chairId: testData.updatedChair,
          id: apptID,
          reason: null,
          note: testData.updatedNote,
          accountId: testData.accountId,
          isPatientConfirmed: true,
          isPending: false,
          isReminderSent: false,
          isSplit: null,
          isSyncedWithPms: false,
          mark: false,
          isSyncedWithPms: false,
          isReminderSent: false,
          isDeleted: false,
          isCancelled: false,
          isFetching: false,
          serviceId: null,
          customBufferTime: null
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.duration).to.not.be.greaterThan(500)
        expect(response.body.entities).to.have.all.keys('appointments', 'patients')

        //Check the response
        // cy.log(JSON.stringify(response.body.entities.appointments[Object.keys(response.body.entities.appointments)[0]]))

        //Validate Patient /Practictioner / Chair id/ Note and Account Id
        const updatedAptResponse = response.body.entities.appointments[Object.keys(response.body.entities.appointments)[0]]
        expect(updatedAptResponse.patientId).to.eq(testData.patientId)
        expect(updatedAptResponse.practitionerId).to.eq(testData.updatedpractitionerId)
        expect(updatedAptResponse.chairId).to.eq(testData.updatedChair)
        expect(updatedAptResponse.note).to.eq(testData.updatedNote)
        expect(updatedAptResponse.isPatientConfirmed).to.be.true


        //Updated response time and date
        
        var updatedStartTimefromResponse = uihelper.convertUTCDateTimeToPST(updatedAptResponse.startDate)
        var updatedEndTimefromResponse = uihelper.convertUTCDateTimeToPST(updatedAptResponse.endDate)
        
        //Validate updated Start and End Time
      expect(updatedStartTimefromResponse).to.equals(updatedStartDate)
      expect(updatedEndTimefromResponse).to.equals(updatedEndDate)

        // Delete Appointment

        cy.request({
          method: "DELETE",
          url: `${Cypress.env("backendUrl")}api/appointments/${apptID}`,
          headers: {

            'Authorization': "Bearer " + Cypress.env('token'),
          }
        }).then((response) => {
          expect(response.status).to.eq(204);
          expect(response.duration).to.not.be.greaterThan(500)
        })
      })
    })
  })
})