/// <reference types="Cypress"/>

import scheduleAddReason from '../../../../../support/selectors/scheduling/scheduleAddReasonSelctors'

let NewServicesName,NewServiceId,NewServiceDescription,NewServiceDuration,NewServiceIsHidden,NewServiceIsDefault,NewPractitioner,
      selectedPractitioner


describe('Sanity test for verifying a new reason can be added for the practice', function() {

    before(function(){

        cy.apilogin(Cypress.env('scheduleapi'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
        cy.fixture('gui/scheduling/addreasondata.json').then(data=>{
          this.addReasonData=data
      })
       
        cy.visit('/settings/reasons')
        cy.url().should('include', '/settings/reasons')
        cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})

    })

    //Delete API to delete the test data created after test
    after(function(){
      cy.getAllServices(Cypress.env('token')).then(serviceReturnName=>{
        let returnServiceId
        console.log(serviceReturnName)
         let datareturn= Object.entries(serviceReturnName) 
         console.log(datareturn)
         var datalength=datareturn.length
        for (var i = 0; i <datalength; i++) {
          if(datareturn[i][1].name==this.addReasonData.reasonName){
              returnServiceId=datareturn[i][1].id    
              cy.deleteSpecificService(Cypress.env('token'),returnServiceId,'test service')
          }
        }   
    })   
  })


    it('verify a new reason can be added', function(){

        cy.get(scheduleAddReason.addReasonButton)
          .click()

        cy.get(scheduleAddReason.reasonName)
          .type(this.addReasonData.reasonName)


        cy.get(scheduleAddReason.reasonDuration)
          .type(this.addReasonData.reasonDuration)

        cy.get(scheduleAddReason.saveButton)
          .click()

        //cy.get(scheduleAddReason.toastSuccessMessage)
          //.should('have.text',this.addReasonData.toastMsgFirst+this.addReasonData.reasonName+" "+"service created")


        cy.wait(2000)

        cy.get(scheduleAddReason.serviceCard)
          .click({multiple:true})

        //write description
        cy.get(scheduleAddReason.reasonDescription)
          .type(this.addReasonData.reasonDescription)
        
        cy.get(scheduleAddReason.formSubmitButton)
          .should('be.visible')
          .click()

        cy.get(scheduleAddReason.toastSuccessMessage)
          .should('have.text',this.addReasonData.toastMsgFirst+this.addReasonData.reasonName+" "+"service was updated")
        cy.wait(2000)

        //select practitioner

        cy.get(scheduleAddReason.practitionerDropdown)
          .should('be.visible')
          .click()
        
        cy.get(scheduleAddReason.practitionerDropDownList)
          .its('length')
          .then(len => Math.floor(Math.random() * Math.floor(len)))
          .then((index) => {
              cy.get(scheduleAddReason.practitionerDropDownList).eq(index).click()})

        cy.get(scheduleAddReason.practitionerSaveButton)
          .should('be.visible')
          .click()
        
        //cy.get(scheduleAddReason.toastSuccessMessage)
          //.should('have.text',this.addReasonData.toastMsgFirst+"Practitioners updated for "+this.addReasonData.reasonName)

        cy.wait(2000)

        cy.get(scheduleAddReason.practictionerSelected)
          .invoke('text')
          .then((pract) =>{
            selectedPractitioner=pract
          })      

        cy.get(scheduleAddReason.clickToggle)
          .click({multiple:true, force:true})

        cy.get(scheduleAddReason.clickToggleSave)
          .should('be.visible')
          .click()
        
        cy.wait(2000)
            
        cy.getAllServices(Cypress.env('token')).then(servicesNames=>{
          console.log(servicesNames)
           let arr= Object.entries(servicesNames) 
           console.log(arr) 
           var arrlength=arr.length
          for (var i = 0; i <arrlength; i++) {
            if(arr[i][1].name==this.addReasonData.reasonName){
              //NewServiceId=arr[i][1].id 
              NewServiceDuration=arr[i][1].duration
              NewServicesName=arr[i][1].name
              NewServiceDescription=arr[i][1].description
              NewServiceIsHidden=arr[i][1].isHidden
              NewServiceIsDefault=arr[i][1].isDefault
              NewPractitioner=arr[i][1].practitioners
              cy.log(NewPractitioner)
              cy.log(selectedPractitioner)

              expect(NewServicesName).to.eql(this.addReasonData.reasonName)   
              expect(NewServiceDuration).to.eql(parseInt(this.addReasonData.reasonDuration))
              expect(NewServiceDescription).to.eql(this.addReasonData.reasonDescription) 
              expect(NewServiceIsHidden).to.be.true
              expect(NewServiceIsDefault).to.be.true
              break
            }
        }
    })
      
    })
})