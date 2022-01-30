/// <reference types = "Cypress"/>

import globaladminsanityselector from "../../../../../../support/selectors/enterprisemanagement/globaladminsanityselector";

describe('This tests the functionality of adding Integration Config Settings (NASA)', () => {

    let emtestdata;
    before(() => { 
        cy.apilogin(Cypress.env('superadmin_email'),Cypress.env('superadmin_password'),(Cypress.env('backendUrl')+"auth"))
        cy.visit('admin/integrations')
        cy.url().should('include','admin/integrations')
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

    it('Login to Carecru test, navigate to Integrations tab and add NASA settings', () => {
        cy.log(emtestdata.adaptertype)
        cy.contains(emtestdata.accountID).scrollIntoView()
        cy.contains(emtestdata.accountID).click({force : true})
        
        //Adapter Type
        cy.contains("ADAPTER_TYPE").scrollIntoView()
        cy.contains("ADAPTER_TYPE").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + emtestdata.adaptertype)
        cy.contains("ADAPTER_TYPE").parent('div').find(globaladminsanityselector.saveButton).click({force : true})

        // //AUTO_UPDATE_ENABLED
        cy.contains("AUTO_UPDATE_ENABLED").scrollIntoView()
        cy.contains("AUTO_UPDATE_ENABLED").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + emtestdata.AUTO_UPDATE_ENABLED)
        cy.contains("AUTO_UPDATE_ENABLED").parent('div').find(globaladminsanityselector.saveButton).click({force : true})
        
        // //HYGIENE_PROCEDURE_CODES
        cy.contains("HYGIENE_PROCEDURE_CODES").scrollIntoView()
        cy.contains("HYGIENE_PROCEDURE_CODES").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + emtestdata.HYGIENE_PROCEDURE_CODES)
        cy.contains("HYGIENE_PROCEDURE_CODES").parent('div').find(globaladminsanityselector.saveButton).click({force : true})
        
        // //HYGIENE_TYPES
        cy.contains("HYGIENE_TYPES").scrollIntoView()
        cy.contains("HYGIENE_TYPES").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + emtestdata.HYGIENE_TYPES)
        cy.contains("HYGIENE_TYPES").parent('div').find(globaladminsanityselector.saveButton).click({force : true})
        
        // //RECALL_PROCEDURE_CODES
        cy.contains("RECALL_PROCEDURE_CODES").scrollIntoView()
        cy.contains("RECALL_PROCEDURE_CODES").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + emtestdata.RECALL_PROCEDURE_CODES)
        cy.contains("RECALL_PROCEDURE_CODES").parent('div').find(globaladminsanityselector.saveButton).click({force : true})
        
        // //RECALL_TYPES
        cy.contains("RECALL_TYPES").scrollIntoView()
        cy.contains("RECALL_TYPES").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + emtestdata.RECALL_TYPES) 
        cy.contains("RECALL_TYPES").parent('div').find(globaladminsanityselector.saveButton).click({force : true})

    })
    
    //Cleanup (Reverting to old values)
    /*
    ADAPTER TYPE = *empty*
    AUTO_UPDATE_ENABLED = 1
    HYGIENE_PROCEDURE_CODES = []
    HYGIENE_TYPES = []
    RECALL_PROCEDURE_CODES = []
    RECALL_TYPES = []
    */
    after('Reverting to default values', () => {
        //Note: there is a visual bug where it looks like the values have not been saved, when in 
        //reality the values are saved and reverted to their original values.

        //Adapter Type
        cy.contains("ADAPTER_TYPE").scrollIntoView()
        cy.contains("ADAPTER_TYPE", {timeout : 2000}).should('be.visible')
        cy.contains("ADAPTER_TYPE").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}')
        cy.contains("ADAPTER_TYPE").parent('div').find(globaladminsanityselector.saveButton).click({force : true})

        // //AUTO_UPDATE_ENABLED
        cy.contains("AUTO_UPDATE_ENABLED").scrollIntoView()
        cy.contains("AUTO_UPDATE_ENABLED").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + '1')
        cy.contains("AUTO_UPDATE_ENABLED").parent('div').find(globaladminsanityselector.saveButton).click({force : true})
        
        // //HYGIENE_PROCEDURE_CODES
        cy.contains("HYGIENE_PROCEDURE_CODES").scrollIntoView()
        cy.contains("HYGIENE_PROCEDURE_CODES").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + '[]') 
        cy.contains("HYGIENE_PROCEDURE_CODES").parent('div').find(globaladminsanityselector.saveButton).click({force : true})
        
        // //HYGIENE_TYPES
        cy.contains("HYGIENE_TYPES").scrollIntoView()
        cy.contains("HYGIENE_TYPES").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + '[]')
        cy.contains("HYGIENE_TYPES").parent('div').find(globaladminsanityselector.saveButton).click({force : true})
        
        // //RECALL_PROCEDURE_CODES
        cy.contains("RECALL_PROCEDURE_CODES").scrollIntoView()
        cy.contains("RECALL_PROCEDURE_CODES").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + '[]')
        cy.contains("RECALL_PROCEDURE_CODES").parent('div').find(globaladminsanityselector.saveButton).click({force : true})
        
        // //RECALL_TYPES
        cy.contains("RECALL_TYPES").scrollIntoView()
        cy.contains("RECALL_TYPES").parent('div').find(globaladminsanityselector.inputText).type('{selectall}{backspace}' + '[]') 
        cy.contains("RECALL_TYPES").parent('div').find(globaladminsanityselector.saveButton).click({force : true})

    })
})