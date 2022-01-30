/// <reference types="Cypress"/>
import scheduleReason from  '../../../../../support/selectors/scheduling/scheduleReasonSettings'
describe('Verify the user can edit a service reason', ()=>{
  let BeforeservicesName,BeforeserviceId,
         BeforeserviceDescription,BeforeserviceDuration,
         BeforeserviceisHidden,BeforeserviceisDefault,
         AfterServiceName,AfterServiceDescription,AfterServiceDuration,
         AfterserviceDescription,AfterserviceisHidden,AfterserviceisDefault,AfterServiceIsHidden,AfterServiceIsDefault,AfterPractitioner
before(function()
    {
       cy.apilogin(Cypress.env('scheduleapi'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))

       cy.fixture('gui/scheduling/reasonsettingsdata.json').then(data=>{
           this.reasonSettingsData=data
           cy.log(this.reasonSettingsData.reasonName)
       })
    })

  after(function(){
    cy.getAllServices(Cypress.env('token')).then(serviceReturnName=>{
      let returnServiceId
      console.log(serviceReturnName)
       let datareturn= Object.entries(serviceReturnName) 
       console.log(datareturn)
       var datalength=datareturn.length
      for (var i = 0; i <datalength; i++) {
        if(datareturn[i][1].name==this.reasonSettingsData.editedReasonName){
            returnServiceId=datareturn[i][1].id    
            cy.updateSpecificService(Cypress.env('token'),returnServiceId,'New Patient Exam & Cleaning','return description','90','[]','true','false').then(out=>{
              cy.getSpecificService(Cypress.env('token'),returnServiceId).then(service=>{
                let arr2= Object.entries(service) 
                console.log(arr2)
                var arr2length= arr2.length
                for (var i = 0; i <arr2length; i++) {
                    AfterServiceName= arr2[i][1].name
                    AfterServiceDuration=arr2[i][1].duration
                    AfterserviceDescription=arr2[i][1].description
                    AfterServiceIsHidden=arr2[i][1].isHidden
                    AfterServiceIsDefault=arr2[i][1].isDefault
                    AfterPractitioner=arr2[i][1].practitioners
                    cy.log(AfterPractitioner)
                    expect(AfterServiceName).to.eql('New Patient Exam & Cleaning')   
                    expect(AfterServiceDuration).to.eql(parseInt('90'))
                    expect(AfterserviceDescription).to.eql('return description')
                    expect(AfterServiceIsHidden).to.be.false
                    expect(AfterServiceIsDefault).to.be.true
                }
            })
          })
        }
      }

    
  })   

  cy.visit('/settings/reasons')
  cy.get(scheduleReason.reasonNameCard,{timeout:8000})
      .should('be.visible')
})
cy.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false})  
    it ('Verify that end user can edit an existing reason',function() {
        cy.getAllServices(Cypress.env('token')).then(servicesNames=>{
          console.log(servicesNames)
           let arr= Object.entries(servicesNames) 
           console.log(arr) 
           var arrlength=arr.length
          for (var i = 0; i <arrlength; i++) {
            if(arr[i][1].name==this.reasonSettingsData.reasonName){
                BeforeservicesName= arr[i][1].name
                BeforeserviceId=arr[i][1].id    
                BeforeserviceDuration=arr[i][1].duration
                BeforeserviceDescription=arr[i][1].description
                BeforeserviceisHidden=arr[i][1].isHidden
                BeforeserviceisDefault=arr[i][1].isDefault
                cy.log(BeforeservicesName)
                cy.log(BeforeserviceId)
                cy.log(BeforeserviceDuration)
                cy.log(BeforeserviceDescription)
                cy.log(BeforeserviceisDefault)
                cy.log(BeforeserviceisHidden)
            }
        }
    cy.visit('/settings/reasons')
    cy.url().should('include', '/settings/reasons')
    cy.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false})  
     //Selects the service and edit the name, description and duration
    cy.get(scheduleReason.reasonNameCard,{timeout:8000})
      .should('be.visible')
      .click()   
    cy.editReasonDetails(this.reasonSettingsData.editedReasonName,this.reasonSettingsData.editedNewDescription, this.reasonSettingsData.editedDuration)
    cy.get(scheduleReason.formButtonSubmit)
      .should('be.visible')
      .click()
    //Asserts that editing a service is success  
    cy.asserttoastmessagesuccessreason(this.reasonSettingsData.toastMessageFirst,this.reasonSettingsData.reasonName,this.reasonSettingsData.toastMessage2nd) 
   // cy.wait(2000)
    // This asserts that the data has been saved also to backend by asserting that the changes are reflecting when user get the specific serviceId
    cy.getSpecificService(Cypress.env('token'),BeforeserviceId).then(servicesSpecific=>{
        let arr2= Object.entries(servicesSpecific) 
        var arr2length= arr2.length
        for (var i = 0; i <arr2length; i++) {
            AfterServiceName= arr2[i][1].name
            AfterServiceDuration=arr2[i][1].duration
            AfterserviceDescription=arr2[i][1].description
            expect(AfterServiceName).to.eql(this.reasonSettingsData.editedReasonName)   
            expect(AfterServiceDuration).to.eql(parseInt(this.reasonSettingsData.editedDuration))
            expect(AfterserviceDescription).to.eql(this.reasonSettingsData.editedNewDescription)
        }
    })
    
    cy.get(scheduleReason.practitionerDrpdown)
      .should('be.visible')
      .click()
    cy.randomlycheckboxfromdropdownlist(scheduleReason.practitionerDrpDownList,this.reasonSettingsData.practitionerSelected)

     //sets the hidden as false and default as true
    cy.get(scheduleReason.sethiddendefaultToggle).click({multiple: true, force:true })
        
    cy.get(scheduleReason.practitionerSubmitButton)
      .should('be.visible')
      .click()
    cy.asserttoastmessagesuccessPractitioner(this.reasonSettingsData.toastMessagePractitioner,this.reasonSettingsData.editedReasonName)
    //cy.wait(2000) 
  
  })
    })
})