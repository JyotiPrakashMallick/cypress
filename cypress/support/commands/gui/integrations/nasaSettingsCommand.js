import nasaSelector from '../../../selectors/integrations/IntegrationNasaSettingsSelector'

Cypress.Commands.add("getAccountConfigurationAndUpdateAutoEnabled", (practiseName) => {
    let autoEnabledValue
    cy.getAutoEnabledStatus(Cypress.env('token'), Cypress.env('accountId')).then((res) => {
        let ID = "3c0d8f5a-75d3-4815-8c5d-fc6c3c6413e8"
        let length = Object.keys(res.body.data).length

        cy.log(length)
        for (let i = 0; i < length; i++) {
            if (res.body.data[i].id == ID) {
                cy.log(res.body.data[i].id)
                cy.log(res.body.data[i].attributes.value)
                autoEnabledValue = res.body.data[i].attributes.value
                cy.log('TYPEOF',typeof(autoEnabledValue))
            }

        }
    })
    cy.get(nasaSelector.practiseName).contains(practiseName).scrollIntoView().click()
    cy.get(nasaSelector.autoEnabledField).contains('AUTO_UPDATE_ENABLED').next().next().find('form').find('div').find('input').scrollIntoView().invoke('val').then((val)=>{

        if (val=='' || val==0) {
            cy.get(nasaSelector.autoEnabledField).contains('AUTO_UPDATE_ENABLED').next().next().find('form').find('div').find('input').clear().type('1')
            cy.get(nasaSelector.autoEnabledField).contains('AUTO_UPDATE_ENABLED').next().next().find('form').find('div').next().find(nasaSelector.saveButton).click()
        }
        else {
            cy.log('Auto Enabled Already set to value 1')
        }
    })
})
