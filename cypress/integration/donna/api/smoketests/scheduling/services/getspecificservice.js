
/// <reference types="Cypress"/>
describe('Verify that we can get a specific services for a certain account', ()=>{ 

    it ('Verify that user has an authorized status to an account',()=>{
    
    cy.apilogin(Cypress.env('scheduleapi'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))

    })   
    it ('Verify that specific services are available and shows status of 200 OK',()=> {
      let serviceId,serviceType,serviceName,serviceDescription,serviceAccountId,serviceDuration,
      serviceBufferTime,serviceunitCost,servicePmsId,serviceIsHidden,serviceIsDefault,serviceCreatedAt,serviceUpdatedAt,serviceDeletedAt
        cy.getAllServices(Cypress.env('token')).then(servicesNames=>{
         
           let arr= Object.entries(servicesNames) 
           var arrlength=arr.length
          for (var i = 0; i <arrlength; i++) {
            serviceId=arr[i][1].id
          cy.getSpecificService(Cypress.env('token'),serviceId).then(servicesSpecific=>{
            let arr2= Object.entries(servicesSpecific)
            var arr2length= arr2.length
            for (var i = 0; i <arr2length; i++) {
            serviceId=arr2[i][1].id
            serviceType=arr2[i][1].type
            serviceName=arr2[i][1].name
            serviceDescription=arr2[i][1].description
            serviceAccountId=arr2[i][1].accountId
            serviceDuration=arr2[i][1].duration
            serviceBufferTime=arr2[i][1].bufferTime
            serviceunitCost=arr2[i][1].unitCost
            servicePmsId=arr2[i][1].pmsId
            serviceIsHidden=arr2[i][1].isHidden
            serviceIsDefault=arr2[i][1].isDefault
            serviceCreatedAt=arr2[i][1].createdAt
            serviceDeletedAt=arr2[i][1].deletedAt
            serviceUpdatedAt=arr2[i][1].updatedAt
            cy.log('id: '+ serviceId)
            cy.log('type: '+ serviceType)
            cy.log('name: '+ serviceName)
            cy.log('description: '+ serviceDescription)
            cy.log('accountId:'+ serviceAccountId)
            cy.log('duration: '+serviceDuration)
            cy.log('bufferTime: '+ serviceBufferTime)
            cy.log('unitCost: '+ serviceunitCost)
            cy.log('pmsId: '+ servicePmsId)
            cy.log('isHidden: '+ serviceIsHidden)
            cy.log('isDefault: '+ serviceIsDefault)
            cy.log('createdAt: '+ serviceCreatedAt)
            cy.log('deletedAt: '+ serviceDeletedAt)
            cy.log('updatedAt: '+ serviceUpdatedAt)
            }
          })
        }
      })
    })
  })