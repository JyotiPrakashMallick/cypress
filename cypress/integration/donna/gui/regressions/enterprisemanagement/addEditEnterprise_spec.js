/// <reference types="Cypress"/>

/* 
Task AUTO-288 Add & Edit metadata about an Enterprise
Sub-Tasks
AUTO-289 Verify superadmin user can add the values for organization and CSM account owner
AUTO-290 Verify superadmin can edit the values for Organization
AUTO-291 Verify superadmin can change the CSM Account owner
AUTO-292 Verify "cancel" & "close" button on Edit Group dialouge box
AUTO-293 Verify creating a Enterprise with empty organization name
*/

import addEditEnterprise from '../../../../../support/selectors/enterprisemanagement/addEditEnterprise'

describe('Add and Edit metadata about an Enterprise', ()=>{
    let EnterpriseData

    beforeEach(()=>{
      cy.apilogin(Cypress.env('superadmin_email'),Cypress.env('superadmin_password'),Cypress.env('backendUrl')+"auth")

       cy.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false})

       // load data from fixtures
      cy.fixture('gui/enterprisemanagement/addEditEnterprise').then((edata)=>{
      EnterpriseData=edata
      })
    })

  it('Verify error message appears while creating an Enterprise with empty organization name', ()=>{
    cy.visit('/admin/enterprises/create')

    cy.validateOrganizationError(EnterpriseData.plan, EnterpriseData.enterpriseName)

    // Assert error message
    expect(cy.contains(EnterpriseData.organizationErrorMsgP1))
    expect(cy.contains(EnterpriseData.organizationErrorMsgP2))
    })

  it ('Verify superadmin can add the values for organization, CSM account owner and creates enterprise successfully', ()=>{
    cy.visit('/admin/enterprises/create')

    cy.createEnterprise(EnterpriseData.plan, EnterpriseData.enterpriseName,EnterpriseData.organizationName,EnterpriseData.csmAccountOwner)

    // Assert enterprise is created
    expect(cy.contains(EnterpriseData.enterpriseName))
    })

  it ('Verify superadmin can edit the values for the organization', ()=>{
    cy.visit('/admin/enterprises/list')
     
    // view enterprise details
    cy.viewEnterpriseDetails(EnterpriseData.enterpriseName)

    // edit
    cy.editOrganization(EnterpriseData.organizationNameUpdated)

    // assert toast message
    expect(cy.contains(EnterpriseData.updateToastMessage))

    // view enterprise details
    cy.viewEnterpriseDetails(EnterpriseData.enterpriseName)

    // Assert organization is renamed
    cy.get(addEditEnterprise.organization).should('have.value',(EnterpriseData.organizationNameUpdated))
    })

  it ('Verify superadmin can change the csm owner', ()=>{
    cy.visit('/admin/enterprises/list')
      
    // view enterprise details
    cy.viewEnterpriseDetails(EnterpriseData.enterpriseName)

    cy.changeCsmOwner(EnterpriseData.csmAccountOwnerUpdated)

    // assert toast message
    expect(cy.contains(EnterpriseData.updateToastMessage))

    // view enterprise details
    cy.viewEnterpriseDetails(EnterpriseData.enterpriseName)

    // Assert csm owner is changed
    expect(cy.contains(EnterpriseData.csmAccountOwnerUpdated))  
  })

  it ('Verify cancel functionality is working properly', ()=>{
    cy.visit('/admin/enterprises/list')
    
    // view enterprise details
    cy.viewEnterpriseDetails(EnterpriseData.enterpriseName)

    // rename organization
      cy.get(addEditEnterprise.organization).clear()
      cy.get(addEditEnterprise.organization).type(EnterpriseData.organizationNameUpdated3)
      
    // click on cancel button
    cy.contains('Cancel').click()
    
    //click on manage and edit group
    cy.get(addEditEnterprise.manage).eq(0).click()
    cy.contains('Edit Group').click()

    // Assert nothing is changed
    cy.get(addEditEnterprise.organization).should('have.value',(EnterpriseData.organizationNameUpdated))
  })

  it ('Verify close functionality is working properly', ()=>{
    cy.visit('/admin/enterprises/list')
    
    // view enterprise details
    cy.viewEnterpriseDetails(EnterpriseData.enterpriseName)

    // rename organization
      cy.get(addEditEnterprise.organization).clear()
      cy.get(addEditEnterprise.organization).type(EnterpriseData.organizationNameUpdated3)
      
    // click on cancel button
    cy.get(addEditEnterprise.closeIcon).click()
    
    //click on manage and edit group
    cy.get(addEditEnterprise.manage).eq(0).click()
    cy.contains('Edit Group').click()

    // Assert nothing is changed
    cy.get(addEditEnterprise.organization).should('have.value',(EnterpriseData.organizationNameUpdated))
  })

  it ('Verify superadmin can delete the enterprise', ()=>{
    cy.visit('/admin/enterprises/list')
        
    // view enterprise details
    cy.deleteEnterprise(EnterpriseData.enterpriseName)

    // assert toast message
    expect(cy.contains(EnterpriseData.deleteToastMessage))
  })
})
