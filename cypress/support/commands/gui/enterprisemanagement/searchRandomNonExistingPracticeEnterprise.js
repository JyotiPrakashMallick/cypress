
import enterprisePracticeSelector from '../../../selectors/enterprisemanagement/practise/practise'

Cypress.Commands.add('searchPracticeOrEnterprise', (data) => {
    cy.get(enterprisePracticeSelector.enterpriseSearchBox).type(data)
    cy.intercept(Cypress.env('backendUrl')+"/api/enterprises/search?keywords*").as('waitForSearch')
    cy.wait('@waitForSearch').its('response.statusCode').should('eq', 200)
})