import formsSelector from '../../../../selectors/automationworkflow/settings/formpage'

Cypress.Commands.add('signatureForms', () => {
    cy.get(formsSelector.formsSigCanvas)  
      .invoke('show')
      .should('be.visible')
      .trigger('mousedown')
      .trigger('pointerdown', { which: 100 })
      .trigger('pointerup', { which: 100 })
      .click()
})