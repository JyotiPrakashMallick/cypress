// AUTO-693: Get Appointments
import moment from 'moment';

describe('Get appointments with different combinations', function(){

    beforeEach(function()
    {
       cy.apilogin(Cypress.env('nondentrix_user'),Cypress.env('nondentrix_pwd'),(Cypress.env('backendUrl')+"auth"))
    })

    it ('Verify Get Appointments with isMissed, isPending , isCancelled and isDeleted as false',function() {
       
       cy.log("Create an appointment using API")
       cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
       let startDate1 = moment().add(2 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss") ;
       let endDate = moment().add(12 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss");
       let startDate2 = moment().format("YYYY-MM-DD[T]HH:mm:ss") ;

       cy.log("Read data from the fixture file")
       let patientData
       cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
       patientData = ptData
       cy.log('Patient id is '+patientData.nonDentrixPatient.id)

        //Create first appointment with isMissed, isPending , isCancelled and isDeleted as false    
          cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}api/appointments/`,
            auth: {
              bearer: Cypress.env("token"),
            },
            body: {
              startDate: startDate1,
              endDate: endDate,
              practitionerId: patientData.nonDentrixPatient.practitionerId,
              patientId: patientData.nonDentrixPatient.id,
              chairId: patientData.nonDentrixPatient.chairId,
              isSyncedWithPms: false,
              isReminderSent: false,
              isDeleted: false,
              isMissed: false,
              isPending: false,
              isCancelled: false             
            },
          }).then((response) => {
            //Assert the status is 200
            expect(response.status).to.eq(201);
            //Assert time taken is less than 500ms
            expect(response.duration).to.not.be.greaterThan(500)   
            //Store the first appointment id
            var id1 = response.body.result
            cy.log("Appointment Id1 is ------> "+id1)

          cy.request({
            method: "GET",
            url: `${Cypress.env("backendUrl")}api/appointments/?startDate=${startDate2}&endDate=${endDate}&filters[]=%7B%22isMissed%22:false,%22isPending%22:false,%22isCancelled%22:false,%22isDeleted%22:false%7D`,
            auth: {
              bearer: Cypress.env("token"),
            },
          }).then((response) => {
            //Assert the status is 200
            expect(response.status).to.eq(200);
            //Assert time taken is less than 500ms
            expect(response.duration).to.not.be.greaterThan(500);   
            //Assert the id of the appointment    
            var noOfAppt = response.body.result.length
            var i=0;
            cy.log("Appointment Id1 in while loop is ------> "+id1)
            cy.log(JSON.stringify(response))
            while(i<noOfAppt)
            {
              if(response.body.result[i]==id1){
                cy.log("That appointment is at number "+i+" in the list")
                break;
              }
              else{
                cy.log("That appointment is not at number "+i+" in the list")
                i++;
              }
            }
          });   
        }); 
      })  
    })      
          
    it ('Verify Get Appointments with isMissed, isPending , isCancelled and isDeleted as true',function() {
      
       cy.log("Create an appointment using API")
       cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
       let startDate1 = moment().add(2 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss") ;
       let endDate = moment().add(12 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss");
       let startDate2 = moment().format("YYYY-MM-DD[T]HH:mm:ss") ;

       cy.log("Read data from the fixture file")
       let patientData
       cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
       patientData = ptData
       cy.log('Patient id is '+patientData.nonDentrixPatient.id)

      //Create second appointment with isMissed, isPending, isCancelled and isDeleted as true    
      cy.request({
        method: "POST",
        url: `${Cypress.env("backendUrl")}api/appointments/`,
        auth: {
          bearer: Cypress.env("token"),
        },
        body: {
          startDate: startDate1,
          endDate: endDate,
          practitionerId: patientData.nonDentrixPatient.practitionerId,
          patientId: patientData.nonDentrixPatient.id,
          chairId: patientData.nonDentrixPatient.chairId,
          isSyncedWithPms: false,
          isReminderSent: false,
          isDeleted: true,
          isMissed: true,
          isPending: true,
          isCancelled: true             
        },
      }).then((response) => {
        //Assert the status is 200
        expect(response.status).to.eq(201);
        //Assert time taken is less than 500ms
        expect(response.duration).to.not.be.greaterThan(500)   
        //Store the first appointment id
        var id2 = response.body.result
        cy.log("Appointment Id2 is ------> "+id2)

      cy.request({
        method: "GET",
        url: `${Cypress.env("backendUrl")}api/appointments/?startDate=${startDate2}&endDate=${endDate}&filters[]=%7B%22isMissed%22:true,%22isPending%22:true,%22isCancelled%22:true,%22isDeleted%22:true%7D`,
        auth: {
          bearer: Cypress.env("token"),
        },
      }).then((response) => {
        //Assert the status is 200
        expect(response.status).to.eq(200);
        //Assert time taken is less than 500ms
        expect(response.duration).to.not.be.greaterThan(500);   
        //Assert the id of the appointment    
        var noOfAppt = response.body.result.length
        var i=0;
        cy.log("Appointment Id2 in while loop is ------> "+id2)
        cy.log(JSON.stringify(response))
        while(i<noOfAppt)
        {
          if(response.body.result[i]==id2){
            cy.log("That appointment is at number "+i+" in the list")
            break;
          }
          else{
            cy.log("That appointment is not at number "+i+" in the list")
            i++;
          }
        }
      });   
    }); 
  })  
  })

    it ('Verify Get Appointments with isMissed, isPending as true and isCancelled, isDeleted as false',function() {
        
      cy.log("Create an appointment using API")
      cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
      let startDate1 = moment().add(2 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss") ;
      let endDate = moment().add(12 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss");
      let startDate2 = moment().format("YYYY-MM-DD[T]HH:mm:ss") ;

      cy.log("Read data from the fixture file")
      let patientData
      cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
      patientData = ptData
      cy.log('Patient id is '+patientData.nonDentrixPatient.id)

      //Create third appointment with isMissed, isPending , isCancelled and isDeleted as false    
        cy.request({
          method: "POST",
          url: `${Cypress.env("backendUrl")}api/appointments/`,
          auth: {
            bearer: Cypress.env("token"),
          },
          body: {
            startDate: startDate1,
            endDate: endDate,
            practitionerId: patientData.nonDentrixPatient.practitionerId,
            patientId: patientData.nonDentrixPatient.id,
            chairId: patientData.nonDentrixPatient.chairId,
            isSyncedWithPms: false,
            isReminderSent: false,
            isDeleted: false,
            isMissed: true,
            isPending: true,
            isCancelled: false             
          },
        }).then((response) => {
          //Assert the status is 200
          expect(response.status).to.eq(201);
          //Assert time taken is less than 500ms
          expect(response.duration).to.not.be.greaterThan(500)   
          //Store the first appointment id
          var id3 = response.body.result
          cy.log("Appointment Id3 is ------> "+id3)

        cy.request({
          method: "GET",
          url: `${Cypress.env("backendUrl")}api/appointments/?startDate=${startDate2}&endDate=${endDate}&filters[]=%7B%22isMissed%22:true,%22isPending%22:true,%22isCancelled%22:false,%22isDeleted%22:false%7D`,
          auth: {
            bearer: Cypress.env("token"),
          },
        }).then((response) => {
          //Assert the status is 200
          expect(response.status).to.eq(200);
          //Assert time taken is less than 500ms
          expect(response.duration).to.not.be.greaterThan(500);   
          //Assert the id of the appointment    
          var noOfAppt = response.body.result.length
          var i=0;
          cy.log("Appointment Id3 in while loop is ------> "+id3)
          cy.log(JSON.stringify(response))
          while(i<noOfAppt)
          {
            if(response.body.result[i]==id3){
              cy.log("That appointment is at number "+i+" in the list")
              break;
            }
            else{
              cy.log("That appointment is not at number "+i+" in the list")
              i++;
            }
          }
        });   
      }); 
    })  
  }) 

    it ('Verify Get Appointments with isMissed, isPending as false and isCancelled, isDeleted as true',function() {
          
      cy.log("Create an appointment using API")
      cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
      let startDate1 = moment().add(2 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss") ;
      let endDate = moment().add(12 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss");
      let startDate2 = moment().format("YYYY-MM-DD[T]HH:mm:ss") ;

      cy.log("Read data from the fixture file")
      let patientData
      cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
      patientData = ptData
      cy.log('Patient id is '+patientData.nonDentrixPatient.id)

      //Create forth appointment with isMissed, isPending , isCancelled and isDeleted as false    
        cy.request({
          method: "POST",
          url: `${Cypress.env("backendUrl")}api/appointments/`,
          auth: {
            bearer: Cypress.env("token"),
          },
          body: {
            startDate: startDate1,
            endDate: endDate,
            practitionerId: patientData.nonDentrixPatient.practitionerId,
            patientId: patientData.nonDentrixPatient.id,
            chairId: patientData.nonDentrixPatient.chairId,
            isSyncedWithPms: false,
            isReminderSent: false,
            isDeleted: true,
            isMissed: false,
            isPending: false,
            isCancelled: true             
          },
        }).then((response) => {
          //Assert the status is 200
          expect(response.status).to.eq(201);
          //Assert time taken is less than 500ms
          expect(response.duration).to.not.be.greaterThan(500)   
          //Store the first appointment id
          var id4 = response.body.result
          cy.log("Appointment Id4 is ------> "+id4)

        cy.request({
          method: "GET",
          url: `${Cypress.env("backendUrl")}api/appointments/?startDate=${startDate2}&endDate=${endDate}&filters[]=%7B%22isMissed%22:false,%22isPending%22:false,%22isCancelled%22:true,%22isDeleted%22:true%7D`,
          auth: {
            bearer: Cypress.env("token"),
          },
        }).then((response) => {
          //Assert the status is 200
          expect(response.status).to.eq(200);
          //Assert time taken is less than 500ms
          expect(response.duration).to.not.be.greaterThan(500);   
          //Assert the id of the appointment    
          var noOfAppt = response.body.result.length
          var i=0;
          cy.log("Appointment Id4 in while loop is ------> "+id4)
          cy.log(JSON.stringify(response))
          while(i<noOfAppt)
          {
            if(response.body.result[i]==id4){
              cy.log("That appointment is at number "+i+" in the list")
              break;
            }
            else{
              cy.log("That appointment is not at number "+i+" in the list")
              i++;
            }
          }
        });   
      }); 
    })  
  })

    it ('Verify Get Appointments with isMissed, isPending, isCancelled as false and isDeleted as true',function() {
            
      cy.log("Create an appointment using API")
      cy.log('current time and date' + moment().format("YYYY-MM-DD[T]HH:mm:ss"))
      let startDate1 = moment().add(2 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss") ;
      let endDate = moment().add(12 , 'minutes').format("YYYY-MM-DD[T]HH:mm:ss");
      let startDate2 = moment().format("YYYY-MM-DD[T]HH:mm:ss") ;

      cy.log("Read data from the fixture file")
      let patientData
      cy.fixture('api/patientmanagement/updateNonDentrixPatientData').then((ptData)=>{
      patientData = ptData
      cy.log('Patient id is '+patientData.nonDentrixPatient.id)

      //Create fifth appointment with isMissed, isPending , isCancelled and isDeleted as false    
        cy.request({
          method: "POST",
          url: `${Cypress.env("backendUrl")}api/appointments/`,
          auth: {
            bearer: Cypress.env("token"),
          },
          body: {
            startDate: startDate1,
            endDate: endDate,
            practitionerId: patientData.nonDentrixPatient.practitionerId,
            patientId: patientData.nonDentrixPatient.id,
            chairId: patientData.nonDentrixPatient.chairId,
            isSyncedWithPms: false,
            isReminderSent: false,
            isDeleted: true,
            isMissed: false,
            isPending: false,
            isCancelled: false             
          },
        }).then((response) => {
          //Assert the status is 200
          expect(response.status).to.eq(201);
          //Assert time taken is less than 500ms
          expect(response.duration).to.not.be.greaterThan(500)   
          //Store the first appointment id
          var id5 = response.body.result
          cy.log("Appointment Id5 is ------> "+id5)

        cy.request({
          method: "GET",
          url: `${Cypress.env("backendUrl")}api/appointments/?startDate=${startDate2}&endDate=${endDate}&filters[]=%7B%22isMissed%22:false,%22isPending%22:false,%22isCancelled%22:false,%22isDeleted%22:true%7D`,
          auth: {
            bearer: Cypress.env("token"),
          },
        }).then((response) => {
          //Assert the status is 200
          expect(response.status).to.eq(200);
          //Assert time taken is less than 500ms
          expect(response.duration).to.not.be.greaterThan(500);   
          //Assert the id of the appointment    
          var noOfAppt = response.body.result.length
          var i=0;
          cy.log("Appointment Id5 in while loop is ------> "+id5)
          cy.log(JSON.stringify(response))
          while(i<noOfAppt)
          {
            if(response.body.result[i]==id5){
              cy.log("That appointment is at number "+i+" in the list")
              break;
            }
            else{
              cy.log("That appointment is not at number "+i+" in the list")
              i++;
            }
          }
        });   
      }); 
    })  
  })
})