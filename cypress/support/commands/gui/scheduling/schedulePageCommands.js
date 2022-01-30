// ***********************************************
// This example schedulePageCommands.js shows you how to
// create various custom commands for schedule page
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import schedulePageSelector from '../../../selectors/scheduling/schedulePageSelector'

Cypress.Commands.add('assertsscheduletabisavailable', () => {
  cy.get(schedulePageSelector.scheduletab)
    .should('be.visible')
})
Cypress.Commands.add('assertswaitlistbuttonisvisible', () => {
  cy.get(schedulePageSelector.waitlist)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.text', 'Waitlist')
})
Cypress.Commands.add('assertscurrentdatelabel', (date) => {
  cy.get(schedulePageSelector.datelabel)
    .should('be.visible')
    .should('have.text', date)
})
Cypress.Commands.add('assertscurrentmonthlabel', (month) => {
  cy.get(schedulePageSelector.monthlabel)
    .should('be.visible')
    .should('have.text', month)
})
Cypress.Commands.add('assertscurrentdayofweek', (dayofweek) => {
  cy.get(schedulePageSelector.dayofweeklabel)
    .should('be.visible')
    .should('have.text', dayofweek)
})
Cypress.Commands.add('assertstodaybuttonisavailable', () => {
  cy.get(schedulePageSelector.todaybutton)
    .should('be.visible')
    .should('not.be.disabled')
    .should('have.text', 'Today')
})
Cypress.Commands.add('assertsquickaddbutton', () => {
  cy.get(schedulePageSelector.scheduleheadercontainer).then(buttonheader => {
    if (buttonheader.find(schedulePageSelector.quickAddbutton).length > 0) {
      cy.get(schedulePageSelector.quickAddbutton, { timeout: 6000 })
        .should('be.visible')
        .click()
    }
    else {
      cy.log('Quick Add button is not visible due to user logged on is associated to a non write capable PMS')
      cy.get(schedulePageSelector.quickAddbutton, { timeout: 6000 })
        .should('be.visible')
    }
  })
})
Cypress.Commands.add('addpatientandselectfromlist', (patient) => {
  cy.get(schedulePageSelector.patientTextbox)
    .should('be.visible')
    .type(patient)
  cy.intercept('https://test-backend.carecru.com/api/patients/search?patients*').as('searchPatient')
  cy.log('Asserts the patient exists in the practice management system')
  cy.wait('@searchPatient').its('response.statusCode').should('eq', 200)
  //   cy.get(schedulePageSelector.patientDropdownList,{ timeout: 6000 }).should('be.visible')


  // cy.get(schedulePageSelector.patientDropdownList).should('be.visible')
  cy.selectfromthelist(schedulePageSelector.patientDropdownList, patient)
})
Cypress.Commands.add('selectrandomstartime', (todayDate) => {
  cy.get(schedulePageSelector.apptDateSelector)
    .should('be.visible')
    .should('have.value', todayDate)
  cy.log('Select Random start time')
  cy.get(schedulePageSelector.startTimeSelector)
    .should('be.visible')
    .click()
  cy.randomlyselectfromdropdown(schedulePageSelector.startTimeDropdown)
})
Cypress.Commands.add('selectrandomchair', () => {
  cy.get(schedulePageSelector.chairSelector)
    .should('be.visible')
    .click()
  cy.randomlyselectfromdropdown(schedulePageSelector.chairListDropdown)
})
Cypress.Commands.add('selectrandompractitioner', () => {
  cy.get(schedulePageSelector.practitionerSelector)
    .should('be.visible')
    .click()
  cy.randomlyselectfromdropdown(schedulePageSelector.practitionerListDropdown)
})
Cypress.Commands.add('asserttoastmessagesuccess', (firstname, toastmessage) => {
  cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 1000 })
    .should('be.visible')
    .should('have.text', toastmessage + firstname)
})
Cypress.Commands.add('clicktodaybutton', () => {
  cy.get(schedulePageSelector.todaybutton)
    .should('be.visible')
    .should('not.be.disabled')
    .click()
})

Cypress.Commands.add("enterDropDownValue", (selector, value) => {
  cy.get(selector, { timeout: 5000 }).type(value)
})

Cypress.Commands.add("linkApptForPartialMatch", () => {
  cy.get(schedulePageSelector.modalWindowTitle).should('have.text', 'Could this be the same appointment?')
  cy.get(schedulePageSelector.modalWindowMsg).should('have.text', 'We found one or more appointments that are similar. Please select the appointment you would like to link.')
  cy.get(schedulePageSelector.allExsitingAppts).then(($lis) => {
    if ($lis.length > 1) {
      cy.log('no of apptments are: ' + $lis.length)
      cy.log('Check if the Link Appointment button is disabled or not')
      cy.get(schedulePageSelector.popUpButtons).eq(1).should('have.class', 'vbutton__color-grey___18FyV')
      cy.log('Select the first option from existing appts & check if the Link Appt is enabled now')
      cy.get(schedulePageSelector.allExsitingAppts).eq(0).click()
      cy.log('Now Link Appointment button should be enabled & the click on it')
      cy.get(schedulePageSelector.popUpButtons).eq(1)
        .should('have.class', 'vbutton__color-blue___2dO3r')
        .should('have.text', 'Link Appointment').click()
      cy.get(schedulePageSelector.confirmationMsg).should('have.text', 'Send Confirmation Email?')
      cy.get(schedulePageSelector.confirmationButtons).eq(0).should('have.text', 'No').click()
      cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 3000 })
        .should('be.visible')
        .should('contain.text', 'SuccessRequest updated for ')
    } else {
      cy.log('Check if the Link Appointment button is enabled or not')
      cy.get(schedulePageSelector.popUpButtons).eq(1)
        .should('have.class', 'vbutton__color-blue___2dO3r')
        .should('have.text', 'Link Appointment').click()
      cy.get(schedulePageSelector.confirmationMsg).should('have.text', 'Send Confirmation Email?')
      cy.get(schedulePageSelector.confirmationButtons).eq(0).should('have.text', 'No').click()
      cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 3000 })
        .should('be.visible')
        .should('contain.text', 'SuccessRequest updated for ')
    }
  })
})