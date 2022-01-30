/* AUTO-144 Sanity of Reminders screen touch points 
user: autouser@mailinator.com, practice: 01 Lee Practice 01 */

import virtualWaitingRoomSelectors from "../../../../../../support/selectors/automationworkflow/Reminders/virtualWaitingRoomSelectors"
import commonSelectors from '../../../../../../support/selectors/common/commonSelectors';
import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors';
import waitingRoomCommands from '../../../../../../support/commands/gui/automationworkflow/Reminders/waitingRoomCommands';

describe('Regression of Reminder screen touch points negative scenarios-> Family', function () {
  before(function () {

    cy.apilogin(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
    cy.visit('/settings/workflow/reminders')
    cy.url().should('include', '/reminders')
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.intercept('POST', Cypress.env('graphQLWorkflow') + "/graphql", (req) => {
      if (req.body.operationName.includes('updateTouchPoint')) {
        req.alias = 'updateTouchPoint'
      }
    })
    cy.intercept('POST', Cypress.env('graphQLWorkflow') + "/graphql", (req) => {
      if (req.body.operationName.includes('getTouchPointsWorkflow')) {
        req.alias = 'getTouchPointsWorkflow'
      }
    })
    cy.wait('@getTouchPointsWorkflow')
    
  })
  beforeEach(() => {

    cy.log("Click on Advance Settings icon")
    cy.get(remindersScreenSelectors.settings).click()
    cy.log("Click on Revert to default button")
    cy.get(remindersScreenSelectors.defaultButton).click()
    cy.log("Confirm the Revert workflow")
    cy.get(remindersScreenSelectors.confirmDefaultSetting).click()
    cy.log('Close the default settings')
    cy.get(remindersScreenSelectors.closeIconInRemindersSettings, { timeout: 5000 }).click()
    cy.log('Validate 7 Calendar Days friendly reminder')
    cy.validateReminderScreenContent(remindersScreenSelectors.friendlyReminder7Days, '7 Calendar Days')
    cy.validateReminderScreenContent(remindersScreenSelectors.friendlyReminder7Days, 'Friendly Reminder')
    cy.get(remindersScreenSelectors.friendlyReminder7Days).click()
    cy.get(remindersScreenSelectors.editMessageBox).scrollIntoView()
  })

  it('validate the Email message edit for special and alphanumeric characters-> For Family', function () {

    cy.log('Enable the Email view to update the message')
    cy.get(remindersScreenSelectors.enableEmailView).contains('Email').click()
    cy.log('Validate Email is enabled')
    cy.validateReminderText(remindersScreenSelectors.validateEmailEnabled, 'Email')
    cy.log('Select the Family from drop down')
    cy.get(remindersScreenSelectors.singleOrFamily)
      .find(remindersScreenSelectors.selectFamily)
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true });

    cy.log('Edit the subject of email with special characters and alphanumeric text')
    cy.get(remindersScreenSelectors.editEmailSubject)
      .invoke('show').type('Ed!ted the 7 d@ys me$$@ge for email subject. ')
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.get(remindersScreenSelectors.advanceSetting).scrollIntoView()

    cy.log('Edit email header with special characters and alphanumeric text')
    cy.get(remindersScreenSelectors.emailHeader, { force: true })
      .invoke('show').type('Ed!ted the 7 d@ys me$$@ge for email header. ')
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()

    cy.log('Edit the email reminder text with special and alphanumeric characters')
    cy.get(remindersScreenSelectors.emailReminderText, { force: true }).click()
    cy.get(remindersScreenSelectors.emailHeader).scrollIntoView()
    cy.get(remindersScreenSelectors.insertTagEmailReminderText)
      .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectApptTimeFromEmailReminderTextInsertTag)
      .should('be.visible')
      .type("{enter}", { force: true })
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.get(remindersScreenSelectors.emailReminderText, { force: true })
      .invoke('show').type(' Ed!ted the 7 d@ys me$$@ge for email reminder text. ')
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()

    cy.log('Edit the email appointment details text with special and alphanumeric characters')
    cy.get(remindersScreenSelectors.emailApptDetails, { force: true }).click()
    cy.get(remindersScreenSelectors.boldTextApptDetailsFamily).click()
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.get(remindersScreenSelectors.emailApptDetails, { force: true })
      .invoke('show').type('Ed!ted the 7 d@ys me$$@ge for email appointment detail. ')

    cy.log('Edit the email body text with special and alphanumeric characters')
    cy.get(remindersScreenSelectors.emailBody, { force: true })
      .invoke('show').type('Ed!ted the 7 d@ys me$$@ge for email body text. ')
    cy.log('Save the changes')
    cy.get(remindersScreenSelectors.savetheReminder).click()
    // cy.intercept(Cypress.env('graphQLWorkflow')+"graphql").as('remindersWait')
    //cy.wait('@remindersWait')
    cy.wait('@updateTouchPoint')
    cy.get(remindersScreenSelectors.friendlyReminder7Days).click()

    cy.get(remindersScreenSelectors.editMessageBox, { timeout: 5000 }).scrollIntoView()
    cy.get(remindersScreenSelectors.enableEmailView).contains('Email').click()
    cy.log('Validate Email is enabled')
    cy.validateReminderText(remindersScreenSelectors.validateEmailEnabled, 'Email')
    cy.log('Select the Family from drop down')
    cy.get(remindersScreenSelectors.singleOrFamily)
      .find(remindersScreenSelectors.selectFamily)
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true });

    //Validate the edited text
    cy.log('Validate the edited text of email subject')
    cy.validateReminderScreenContent(remindersScreenSelectors.editEmailSubject, 'Ed!ted the 7 d@ys me$$@ge for email subject.')
    cy.log('Validate the edited text of email header')
    cy.get(remindersScreenSelectors.emailHeader).scrollIntoView()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailHeader, 'Ed!ted the 7 d@ys me$$@ge for email header.')
    cy.log('Validate the edited text of email reminder text')
    cy.validateReminderScreenContent(remindersScreenSelectors.emailReminderText, 'Ed!ted the 7 d@ys me$$@ge for email reminder text.')
    cy.log('Validate the edited text of appointment detail')
    cy.get(remindersScreenSelectors.emailApptDetails).scrollIntoView()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailApptDetails, 'Ed!ted the 7 d@ys me$$@ge for email appointment detail.')
    cy.log('Validate the edited text of email body')
    cy.validateReminderScreenContent(remindersScreenSelectors.emailBody, 'Ed!ted the 7 d@ys me$$@ge for email body text.')
    cy.log('Close the reminder')
    cy.get(remindersScreenSelectors.closeMessage).click()
  })

  it('validate the Email message edit for maximum number of characters-> For Family', function () {
    cy.log('Enable the Email view to update the message')
    cy.get(remindersScreenSelectors.enableEmailView).contains('Email').click()
    cy.log('Validate Email is enabled')
    cy.validateReminderText(remindersScreenSelectors.validateEmailEnabled, 'Email')
    cy.log('Select the Family from drop down')
    cy.get(remindersScreenSelectors.singleOrFamily)
      .find(remindersScreenSelectors.selectFamily)
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true });

    cy.log('Edit the subject of email exceeding maxmimum number of characters')
    cy.get(remindersScreenSelectors.editEmailSubject)
      .invoke('show').type('123456789012345678901234567890123456789012345678901234')
    cy.get(remindersScreenSelectors.validateEmailEnabled).click()
    cy.get(remindersScreenSelectors.validateEmailEnabled).scrollIntoView()
    cy.log('Edit email header exceeding maxmimum number of characters')
    cy.get(remindersScreenSelectors.emailHeader, { force: true })
      .invoke('show').type('1234567890123456789012345678901234567890123456789012345678901')
    cy.get(remindersScreenSelectors.validateEmailEnabled).click()
    cy.log('Check Save button is disabled')
    cy.get(remindersScreenSelectors.savetheReminder).should('be.disabled')
    cy.log('Close the reminder')
    cy.get(remindersScreenSelectors.closeMessage).click()
    cy.log('Do not save the reminder')
    cy.get(remindersScreenSelectors.donotSave).click()
    cy.log("Click on Advance Settings icon")
    cy.get(remindersScreenSelectors.settings).click()
    cy.log("Click on Revert to default button")
    cy.get(remindersScreenSelectors.defaultButton).click()
    cy.log("Confirm the Revert workflow")
    cy.get(remindersScreenSelectors.confirmDefaultSetting).click()
    cy.log('Close the default settings')
    cy.get(remindersScreenSelectors.closeIconInRemindersSettings, { timeout: 5000 }).click()
  })
})