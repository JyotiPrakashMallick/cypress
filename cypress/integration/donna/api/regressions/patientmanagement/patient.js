/* AUTO-764: Create Patient 
AUTO-765: Update Patient
AUTO-803: Get Specific Patient
AUTO-767: Delete Patient
*/
import moment from 'moment';

describe('Create, Get, Update, Delete Patient', function(){

    beforeEach(function()
    {
       cy.apilogin(Cypress.env('nondentrix_user'),Cypress.env('nondentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
    })

    it ('Validate the actions performed on Patient APIs',function() {
    
        var crypto = require("crypto");
        var fName = crypto.randomBytes(8).toString('hex');
        var lName = crypto.randomBytes(6).toString('hex');
        let birthDate = moment().subtract(25, 'years').format("MM/DD/YYYY")
        
       cy.log("Read data from the fixture file and create patient")
       let patientData
       cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
       patientData = ptData
       cy.log('Create the patient')
        cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}api/patients`,
            auth: {
              bearer: Cypress.env("token"),
            },
            headers: {
                Accept : 'application/vnd.api+json'
            },
            body: {
              accountId: patientData.nonDentrixPatient.accountId,
              birthDate: birthDate,
              firstName: fName,
              lastName: lName,
              cellPhoneNumber: "+1 676 767 6767",
              pmsId: "70000000"             
            },
          }).then((response) => {
            //Assert the status is 200
            expect(response.status).to.eq(201);
            //Assert time taken is less than 500ms
            expect(response.duration).to.not.be.greaterThan(500)   
            //Store the patient id
            var id = response.body.data.id
            cy.log("Patient Id is ------> "+id)

            //Validate the GET request for specific patient
            cy.log('Get the patient')
            cy.request({
              method: "GET",
              url: `${Cypress.env("backendUrl")}api/patients/${id}`,
              auth: {
                bearer: Cypress.env("token"),
              },
              headers: {
                  Accept : 'application/vnd.api+json'
              },
            }).then((response) => {
              //Assert the status is 200
              expect(response.status).to.eq(200);
              //Assert time taken is less than 500ms
              expect(response.duration).to.not.be.greaterThan(500)   
              //Assert the patient id
              expect(response.body.data).has.property('id', id)
            }) 
            
          //Validate the PUT request
          cy.log('Update the patient')
          cy.request({
            method: "PUT",
            url: `${Cypress.env("backendUrl")}api/patients/${id}`,
            auth: {
              bearer: Cypress.env("token"),
            },
            headers: {
                Accept : 'application/vnd.api+json'
            },
            body: {
              accountId: patientData.nonDentrixPatient.accountId,
              firstName: fName,
              lastName: "testLast",
              email: "testLast@testLast.com"              
            },
          }).then((response) => {
            //Assert the status is 200
            expect(response.status).to.eq(201);
            //Assert time taken is less than 500ms
            expect(response.duration).to.not.be.greaterThan(500)   
            //Assert the patient id
            expect(response.body.data).has.property('id', id)
            //Assert the last name
            expect(response.body.data.attributes).has.property('lastName', "testLast")
            //Assert the email
            expect(response.body.data.attributes).has.property('email', "testLast@testLast.com")
          }) 

          //Validate the DELETE request
          cy.log('Delete the patient')
          cy.request({
            method: "DELETE",
            url: `${Cypress.env("backendUrl")}api/patients/${id}`,
            auth: {
              bearer: Cypress.env("token"),
            },
            headers: {
                Accept : 'application/vnd.api+json'
            },
            body: {
              accountId: patientData.nonDentrixPatient.accountId             
            },
          }).then((response) => {
            //Assert the status is 200
            expect(response.status).to.eq(204);
            //Assert time taken is less than 500ms
            expect(response.duration).to.not.be.greaterThan(500)
          })        
          })
        })
    })   
})