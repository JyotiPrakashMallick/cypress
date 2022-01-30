/// <reference types="Cypress"/>

/** 
 * AUTO-146 Verify that when user edits a reminder touch point and navigates to another page,
    warning message box will be displayed for unsaved changes
 */
const testData=require('../../../../../../fixtures/gui/automationworkflow/reminder/reminder.json')
describe('Validate Warning PopUp messages window for Unsaved Changes', () => {
  before(function () {
    cy.log('navigate to dashboard page on successful log in')
    cy.uiLoginByAPI(testData[2].username, testData[2].pwd, Cypress.env('backendUrl') + "auth")
    cy.log('***************' + '***navigate to Donna Reminder Section after successful log in')
    cy.visit('/settings/workflow/reminders')
    cy.intercept('POST',Cypress.env('graphQLWorkflow') + "/graphql",(req)=>{
      if (req.body.operationName.includes('getTouchPointsWorkflow')){
          req.alias = 'getTouchPointsWorkflow'
        }
  })
  cy.wait('@getTouchPointsWorkflow')
  cy.on('uncaught:exception', (err, runnable) => {
    return false})
  })

  it('Select Reminder & verify Warning message for unsaved changes', () => {
    cy.log('*****' + '***select existing reminder and update it***..')
    cy.SelectAndEditReminder(testData)
    cy.log('*****' + '***click On Reminder tab***..')
    cy.clickOnReminderTab()
    cy.log('******' + '***validating Warning message for unsaved changes***..')
    cy.validateWarningMessage(testData)

  })


})