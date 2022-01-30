
import addEditEnterprise from '../../../../support/selectors/enterprisemanagement/addEditEnterprise'

Cypress.Commands.add('validateOrganizationError', (plan,enterprise) => {

        // select Enterprise from plan dropdown
        cy.get(addEditEnterprise.planDropDown).click()
        cy.get(addEditEnterprise.planOptions).contains(plan).click()
    
        // enter enterprise name
        cy.get(addEditEnterprise.ename).type(enterprise)
    
        // save
        cy.get(addEditEnterprise.save).click()

})

Cypress.Commands.add('createEnterprise', (plan,enterprise,org,csm) => {

    // select Enterprise from plan dropdown
    cy.get(addEditEnterprise.planDropDown).click()
    cy.get(addEditEnterprise.planOptions).contains(plan).click()

    // enter enterprise name
    cy.get(addEditEnterprise.ename).type(enterprise)

    // enter organization name
    cy.get(addEditEnterprise.organization).type(org)

    // select csm owner
   cy.get(addEditEnterprise.csmAccountOwner).click()
   cy.get(addEditEnterprise.csmAccountOwner).type(csm + "{enter}")

   // save
   cy.get(addEditEnterprise.save).click()

})

Cypress.Commands.add('viewEnterpriseDetails', (enterprise) => {

    cy.intercept(Cypress.env('backendUrl')+"api/enterprises/search?keywords=*").as('waitForEnterprise')
    
    cy.get(addEditEnterprise.searchEnterprise).clear()
    cy.get(addEditEnterprise.searchEnterprise).type(enterprise)

    cy.wait('@waitForEnterprise').its('response.statusCode').should('eq', 200)

    //click on manage and edit group
    cy.get(addEditEnterprise.manage).eq(0).click()
    cy.contains('Edit Group').click()

})

Cypress.Commands.add('searchEnterprise', (enterprise) => {

    cy.intercept(Cypress.env('backendUrl')+"api/enterprises/search?keywords=*").as('waitForEnterprise')
    
    cy.get(addEditEnterprise.searchEnterprise).clear()
    cy.get(addEditEnterprise.searchEnterprise).type(enterprise)

    cy.wait('@waitForEnterprise').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('editOrganization', (org) => {

    // rename organization
    cy.get(addEditEnterprise.organization).clear()
    cy.get(addEditEnterprise.organization).type(org)

    //save
    cy.contains('Save').click()

})

Cypress.Commands.add('changeCsmOwner', (csm) => {

   // change csm owner 
   cy.get(addEditEnterprise.csmOwnerDialog).click()
   cy.get(addEditEnterprise.csmOwnerDialog).type(csm + "{enter}")

   //save
   cy.contains('Save').click()
})

Cypress.Commands.add('createEnterpriseWithoutCsm', (plan,enterprise,org) => {

    // select Enterprise from plan dropdown
    cy.get(addEditEnterprise.planDropDown).click()
    cy.get(addEditEnterprise.planOptions).contains(plan).click()

    // enter enterprise name
    cy.get(addEditEnterprise.ename).type(enterprise)

    // enter organization name
    cy.get(addEditEnterprise.organization).type(org)

   // save
   cy.get(addEditEnterprise.save).click()

})

Cypress.Commands.add('deleteEnterprise', (enterprise) => {

    cy.intercept(Cypress.env('backendUrl')+"api/enterprises/search?keywords=*").as('waitForEnterprise')
    
    cy.get(addEditEnterprise.searchEnterprise).clear()
    cy.get(addEditEnterprise.searchEnterprise).type(enterprise)

    cy.wait('@waitForEnterprise').its('response.statusCode').should('eq', 200)

    //click on manage and edit group
    cy.get(addEditEnterprise.manage).eq(0).click()
    cy.contains('Delete').click()

    // assert enterprise and delete
     cy.on('window:confirm',(txt)=>{
        expect(txt).contains(enterprise);
      }) 
})
