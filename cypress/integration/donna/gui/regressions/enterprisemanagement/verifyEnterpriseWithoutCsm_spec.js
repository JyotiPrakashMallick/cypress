/// <reference types="Cypress"/>

/* 
Task AUTO-288 Add & Edit metadata about an Enterprise
Sub-Task
AUTO-294 Verify creating a Enterprise with empty CSM Account Owner
*/

import addEditEnterprise from '../../../../../support/selectors/enterprisemanagement/addEditEnterprise'

describe('Enterprise creation without CSM', ()=>{
    let EnterpriseData

    beforeEach(()=>{
      cy.apilogin(Cypress.env('superadmin_email'),Cypress.env('superadmin_password'),Cypress.env('backendUrl')+"auth")

       cy.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from failing the test
      if(err.message.includes('Cannot read properties of null')){
        return false
       }})

       // load data from fixtures
      cy.fixture('gui/enterprisemanagement/addEditEnterprise').then((edata)=>{
      EnterpriseData=edata
      })
      cy.on('uncaught:exception', (err, runnable) => {
        return false
    });
    })

  it('Verify superadmin is able to create enterprise without CSM account owner', ()=>{
    cy.visit('/admin/enterprises/create')

    cy.createEnterpriseWithoutCsm(EnterpriseData.plan, EnterpriseData.enterpriseName2,EnterpriseData.organizationName)

    // Assert enterprise is created
    expect(cy.contains(EnterpriseData.enterpriseName2))
  })

  it ('Verify superadmin can delete the enterprise', ()=>{
    cy.visit('/admin/enterprises/list')
        
    // view enterprise details
    cy.deleteEnterprise(EnterpriseData.enterpriseName2)

    // assert toast message
    expect(cy.contains(EnterpriseData.deleteToastMessage))
  })
})
