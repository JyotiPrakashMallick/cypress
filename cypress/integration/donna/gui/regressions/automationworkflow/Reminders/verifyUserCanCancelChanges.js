/// <reference types="Cypress"/>

/** 
 * AUTO-143 Verify that user will be able to cancel their changes on a drawer reminder touchpoint
 * AUTO-146 Verify that when user edits a reminder touch point and navigates to another page warning message box will be displayed for unsaved changes
 */
import reminderselector from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors'

const reminderData = require('../../../../../../fixtures/gui/automationworkflow/reminder/reminder.json')
describe('Validate Warning PopUp messages window for Unsaved Changes', () => {
  before(function () {

    cy.uiLoginByAPI(reminderData[2].username, reminderData[2].pwd, Cypress.env('backendUrl') + "auth")
    cy.log('***************' + '***navigate to Donna Reminder Section after successful log in')
    cy.visit('/settings/workflow/reminders',{timeout:20000})
  //   cy.intercept('POST',Cypress.env('graphQLWorkflow') + "/graphql",(req)=>{
  //     if (req.body.operationName.includes('getTouchPointsWorkflow')){
  //         req.alias = 'getTouchPointsWorkflow'
  //       } 
  // })
  // cy.wait('@getTouchPointsWorkflow')
  cy.on('uncaught:exception', (err, runnable) => {
    return false})
  })

  it('Select Reminder & verify Warning message for unsaved changes', () => {
    cy.log('*****' + '***select existing reminder and update it***..')
    cy.SelectAndEditReminder(reminderData)
    cy.log('*****' + '***click On Reminder tab***..')
    cy.clickOnReminderTab()
    cy.log('******' + '***validating Warning message for unsaved changes***..')
    cy.validateWarningMessage(reminderData)
    cy.log('******' + '***Click on dont save button***..')
    cy.clickDontSaveOrGoBackButton(reminderselector.warningPopUpDontSaveButton)
  })

  it('Select Reminder& verify that user is able to cancel their changes on a drawer reminder touchpoint', () => {
    cy.log('*****' + '***select existing reminder and update it***..')
    cy.SelectAndEditReminder(reminderData)
    cy.log('*****' + '***click On drawer x(close) icon***..')
    cy.clickDrwawerXIcon()
    cy.log('******' + '***validating Warning message for unsaved changes***..')
    cy.validateWarningMessage(reminderData)
    cy.log('******' + '***Click on dont save button***..')
    cy.clickDontSaveOrGoBackButton(reminderselector.warningPopUpDontSaveButton)
  })

  it('Validate that changes remains same after clicking on dont save button of popup message', () => {
    cy.validateReminderDrawerValues(reminderData)
  })
})