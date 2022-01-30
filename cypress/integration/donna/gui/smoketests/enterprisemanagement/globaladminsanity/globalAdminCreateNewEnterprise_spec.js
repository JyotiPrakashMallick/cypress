/// <reference types="Cypress"/>

import globaladminsanityselector from "../../../../../../support/selectors/enterprisemanagement/globaladminsanityselector"

let randString = (stringLength) => {
    //Types in random string on given length into input field
    let result = ''
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(let i = 0; i < stringLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}
const randomEnterpriseName = randString(10)

describe ('This tests global admin\'s ability to create new enterprise',function()
{
    let emtestdata;
    before(() => { 
        cy.apilogin(Cypress.env('superadmin_email'),Cypress.env('superadmin_password'),(Cypress.env('backendUrl')+"auth"))
        cy.visit('admin/enterprises/list')
        cy.url().should('include','admin/enterprises/list')
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
    })
    beforeEach(()=>{
        cy.fixture('gui/enterprisemanagement/globaladmintestdata').then((emdata)=>{
            emtestdata=emdata
            cy.log(emtestdata.adaptertype)
        })    
    })

    it('Login to test.carecru.com and create a new enterprise', function(){ 
    
        //Add Group
        cy.contains('Add Group').click()
        
        //Select Enterprise
        cy.contains('Plan').should('be.visible')
        cy.contains('Plan').click({force : true})
        cy.get(globaladminsanityselector.enterpriseDropDown).click()
        
        //Type name
        cy.get(globaladminsanityselector.inputName).click({force : true})
        cy.get(globaladminsanityselector.inputName).type(emtestdata.enterpriseName + '_' + randomEnterpriseName)
        
        //Type Organization
        cy.get(globaladminsanityselector.inputOrganization).type(emtestdata.organizationName)
        
        //Select CSM Account owner
        cy.contains('Select a CSM Account Owner').click()
        cy.contains('auto_qa auto_qa').should('be.visible')
        cy.contains('auto_qa auto_qa').click({force : true})
        
        //Click save
        cy.get(globaladminsanityselector.saveButton).click()
        
        
    })

    after('Reverting to old values', () => {
        //Search for created enterprise

        cy.searchPracticeOrEnterprise(emtestdata.enterpriseName + '_' + randomEnterpriseName)
        //Confirm that enterprise exists
        cy.contains(emtestdata.enterpriseName + '_' + randomEnterpriseName).should('contain.text', emtestdata.enterpriseName+ '_' + randomEnterpriseName)
        expect(emtestdata.enterpriseName + '_' + randomEnterpriseName).to.equal(emtestdata.enterpriseName + '_' + randomEnterpriseName)

        //Delete enterprise

        cy.get(globaladminsanityselector.enterpriseOptions, {timeout:10000}).click()
        cy.get('button').contains('Delete').click({force : true})
        expect(cy.contains('No Groups Found'))

    })
})