// ***********************************************
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

import waitlistSelectors from '../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'


  // GetARandomPageonWaitlist

  Cypress.Commands.add('getSpecificWaitlistPage', (Num) => {
 
    cy.log(Num)
    cy.get(waitlistSelectors.currentPageNo)
      .type('{selectall}')
      .type(Num)
      .type('{enter}')
  })

  Cypress.Commands.add('getRandomWaitlistPageInBetween', (totalNum) => {
 
    let page = Math.floor((Math.random() * (totalNum - 1)) + 1)
    cy.get(waitlistSelectors.currentPageNo,{timeout:10000})
      .type('{selectall}{')
      .type(page)
      .type('{enter}')
  })

  Cypress.Commands.add('getCountOfWaitlistPatients', () => {
    cy.get(waitlistSelectors.waitlistCount).then(($el)=>{
    let wCount = $el.text()
    return wCount
    })
  })
