/// <reference types="Cypress"/>

//AUTO-777 : Batch Create Appointments
//AUTO-778 : Batch Update Appointments


const testData = require("../../../../../../fixtures/api/scheduling/appointments/createBatchApptData.json")
const updateApptData = require("../../../../../../fixtures/api/scheduling/appointments/updateBatchApptData.json")
import uihelper from "../../../../gui/smoketests/common/UIHelper"
import moment from 'moment';


describe('Create & Update batch appointments', () => {
    before(function () {
        cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
    }
    )

    it('Verify batch appointments are created & updated successfully, post which those are deleted individually', () => {
        let startPoint = moment().add(2, 'minutes').format("M/DD/YYYY[, ]h:mm:ss A");
        let endPoint = moment().add(20, 'minutes').format("M/DD/YYYY[, ]h:mm:ss A")
        cy.log(startPoint)
        cy.log(endPoint)
        cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}api/appointments/connector/batch`,
            headers: {
                'Authorization': "Bearer " + Cypress.env('token'),
                'Accept': 'application/vnd.api+json'
            },
            body:
                [
                    {
                        startDate: startPoint,
                        endDate: endPoint,
                        practitionerId: testData[0].practitionerId,
                        isSyncedWithPMS: testData[0].isSyncedWithPMS,
                        isReminderSent: testData[0].isReminderSent,
                        isDeleted: testData[0].isDeleted,
                        patientId: testData[0].patientId,
                        chairId: testData[0].chairId
                    },
                    {
                        startDate: startPoint,
                        endDate: endPoint,
                        practitionerId: testData[1].practitionerId,
                        isSyncedWithPMS: testData[1].isSyncedWithPMS,
                        isReminderSent: testData[1].isReminderSent,
                        isDeleted: testData[1].isDeleted,
                        patientId: testData[1].patientId,
                        chairId: testData[1].chairId
                    },
                    {
                        startDate: startPoint,
                        endDate: endPoint,
                        practitionerId: testData[2].practitionerId,
                        isSyncedWithPMS: testData[2].isSyncedWithPMS,
                        isReminderSent: testData[2].isReminderSent,
                        isDeleted: testData[2].isDeleted,
                        patientId: testData[2].patientId,
                        chairId: testData[2].chairId
                    }
                ],
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.duration).to.not.be.greaterThan(636)

            cy.log('Below are the appointment Ids, corresponding to each appointment generated through batch creation process')
            let apptId_1 = response.body.data[0].id
            let apptId_2 = response.body.data[1].id
            let apptId_3 = response.body.data[2].id

            cy.log(JSON.stringify(response.body.data[0].id))
            cy.log(JSON.stringify(response.body.data[1].id))
            cy.log(JSON.stringify(response.body.data[2].id))

            //Validation of created appointments\' attributes-values in response
            cy.log('Validation of created appointments\' attributes-values in response')

            cy.wrap([apptId_1, apptId_2, apptId_3]).each((num, i) => {
                cy.log('Validation of created Appointment #' + (i + 1) + ', with appointment id: ' + num)
                expect(response.body.data[i]).to.have.all.keys('type', 'id', 'attributes')
                expect(response.body.data[i].type).to.eq('appointment')
                expect(response.body.data[i].id).not.null
                expect(response.body.data[i].attributes.practitionerId).to.be.oneOf([testData[0].practitionerId, testData[1].practitionerId, testData[2].practitionerId])
                expect(response.body.data[i].attributes.patientId).to.be.oneOf([testData[0].patientId, testData[1].patientId, testData[2].patientId])
                expect(response.body.data[i].attributes.chairId).to.be.oneOf([testData[0].chairId, testData[1].chairId, testData[2].chairId])
                var convertedstartTimefromResponse = uihelper.convertUTCDateTimeToPST(response.body.data[i].attributes.startDate)
                var convertedendTimefromResponse = uihelper.convertUTCDateTimeToPST(response.body.data[i].attributes.endDate)
                expect(convertedstartTimefromResponse).equals(startPoint)
                expect(convertedendTimefromResponse).equals(endPoint)
            })


            // BATCH UPDATE APPOINTMENTS
            cy.log('Below steps are to update all the created appointments through batch update process')

            let startPointModified = moment().add(2, 'hours').format("M/DD/YYYY[, ]h:mm:ss A");
            cy.log(startPointModified)
            let endPointModified = moment(startPointModified).add(20, 'minutes').format("M/DD/YYYY[, ]h:mm:ss A")
            cy.log(endPointModified)
            cy.request({
                method: "PUT",
                url: `${Cypress.env("backendUrl")}api/appointments/connector/batch`,
                headers: {
                    'Authorization': "Bearer " + Cypress.env('token'),
                    'Accept': 'application/vnd.api+json'
                },
                body: [
                    {
                        type: updateApptData[0].type,
                        id: apptId_1,
                        accountId: updateApptData[0].accountId,
                        practitionerId: updateApptData[0].practitionerId,
                        isDeleted: false,
                        isBookable: true,
                        startDate: startPointModified,
                        endDate: endPointModified,
                        isReminderSent: true,
                        isPatientConfirmed: false,
                        isSyncedWithPms: true,
                        isCancelled: false,
                        mark: true
                    },
                    {
                        type: updateApptData[1].type,
                        id: apptId_2,
                        accountId: updateApptData[1].accountId,
                        practitionerId: updateApptData[1].practitionerId,
                        isDeleted: false,
                        isBookable: true,
                        startDate: startPointModified,
                        endDate: endPointModified,
                        isReminderSent: true,
                        isPatientConfirmed: false,
                        isSyncedWithPms: true,
                        isCancelled: false,
                        mark: true
                    },
                    {
                        type: updateApptData[2].type,
                        id: apptId_3,
                        accountId: updateApptData[2].accountId,
                        practitionerId: updateApptData[2].practitionerId,
                        isDeleted: false,
                        isBookable: true,
                        startDate: startPointModified,
                        endDate: endPointModified,
                        isReminderSent: true,
                        isPatientConfirmed: false,
                        isSyncedWithPms: true,
                        isCancelled: false,
                        mark: true
                    }
                ]
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.duration).to.not.be.greaterThan(500)

                cy.wrap([apptId_1, apptId_2, apptId_3]).each((num, i) => {
                    cy.log('Validation of updated Appointment #' + (i + 1) + ', with appointment id: ' + num)
                    expect(response.body.data[i].attributes.practitionerId).to.be.oneOf([updateApptData[0].practitionerId, updateApptData[1].practitionerId, updateApptData[2].practitionerId])
                    var convertedModstartTimefromResponse = uihelper.convertUTCDateTimeToPST(response.body.data[i].attributes.startDate)
                    var convertedModEndTimefromResponse = uihelper.convertUTCDateTimeToPST(response.body.data[i].attributes.endDate)
                    expect(convertedModstartTimefromResponse).equals(startPointModified)
                    expect(convertedModEndTimefromResponse).equals(endPointModified)
                })
            });


            // DELETE ALL CREATED APPOINTMENTS

            cy.wrap([apptId_1, apptId_2, apptId_3]).each((num, i) => {
                cy.log('delete Appointment #' + (i + 1) + ', which was created as part of this case')
                cy.request({
                    method: "DELETE",
                    url: `${Cypress.env("backendUrl")}api/appointments/${num}`,
                    body: {
                    },
                    headers: {
                        'Authorization': "Bearer " + Cypress.env('token'),
                    }
                }).then((response) => {
                    expect(response.status).to.eq(204)
                    expect(response.duration).to.not.be.greaterThan(500)

                })
            })
        });
    })

})

