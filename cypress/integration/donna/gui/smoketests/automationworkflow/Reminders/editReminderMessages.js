/* AUTO-204 Sanity of Virtual Waiting Room screen 
user: autouser@mailinator.com, practice: 01 Lee Practice 01 */

import virtualWaitingRoomSelectors from "../../../../../../support/selectors/automationworkflow/Reminders/virtualWaitingRoomSelectors"
import commonSelectors from '../../../../../../support/selectors/common/commonSelectors';
import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors';
import waitingRoomCommands from '../../../../../../support/commands/gui/automationworkflow/Reminders/waitingRoomCommands';


describe('Sanity of Reimder screen messages',function()
{

it('validate the list of reminders on Reminders screen',function(){
    cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit('/settings/workflow/reminders')
    cy.url().should('include', '/reminders')
    cy.on('uncaught:exception', (err, runnable) => {
    return false})
    cy.wait(10000)

    cy.validateReminderText(remindersScreenSelectors.reminderScreenText, 'Reminders')
    cy.log("Click on Advance Settings icon")
    cy.get(remindersScreenSelectors.settings).click()
    cy.log("Click on Revert to default button")    
    cy.get(remindersScreenSelectors.defaultButton).click()
    cy.log("Confirm the Revert workflow")    
    cy.get(remindersScreenSelectors.confirmDefaultSetting).click()
    cy.wait(2000)
    cy.log('Close the default settings')
    cy.get(remindersScreenSelectors.closeIconInRemindersSettings).click()    
    cy.log('Validate 21 Calendar Days reminder')
    cy.validateReminderScreenContent(remindersScreenSelectors.reminder21Days, '21 Calendar Days')
    cy.validateReminderScreenContent(remindersScreenSelectors.reminder21Days, 'Friendly Reminder')
    cy.log('Validate 7 Calendar Days confirmable reminder')
    cy.validateReminderScreenContent(remindersScreenSelectors.confirmableReminder7Days, '7 Calendar Days')
    cy.validateReminderScreenContent(remindersScreenSelectors.confirmableReminder7Days, 'Confirmable Reminder')
    cy.log('Validate 7 Calendar Days friendly reminder')
    cy.validateReminderScreenContent(remindersScreenSelectors.friendlyReminder7Days, '7 Calendar Days')
    cy.validateReminderScreenContent(remindersScreenSelectors.friendlyReminder7Days, 'Friendly Reminder')
    cy.log('Validate 3 Business Days Reminder')
    cy.validateReminderScreenContent(remindersScreenSelectors.reminder3Days, '3 Business Days')
    cy.validateReminderScreenContent(remindersScreenSelectors.reminder3Days, 'Confirmable Reminder')
    cy.log('Validate 2 Business Days confirmable Reminder')
    cy.validateReminderScreenContent(remindersScreenSelectors.confirmableReminder2Days, '2 Business Days')
    cy.validateReminderScreenContent(remindersScreenSelectors.confirmableReminder2Days, 'Confirmable Reminder')
    cy.log('Validate 2 Business Days friendly reminder')    
    cy.validateReminderScreenContent(remindersScreenSelectors.friendlyReminder2Days, '2 Business Days')
    cy.validateReminderScreenContent(remindersScreenSelectors.friendlyReminder2Days, 'Friendly Reminder')
    cy.log('validate Appointment box')
    cy.validateReminderScreenContent(remindersScreenSelectors.appointmentBox, 'Appointment')
    
    cy.log('Open 2 Business Days friendly reminder and validate the message')
    cy.get(remindersScreenSelectors.friendlyReminder2Days).click()
    cy.wait(2000)
    cy.get(remindersScreenSelectors.editMessageBox).scrollIntoView()
    cy.log('Edit the message')
    cy.get(remindersScreenSelectors.editMessage,{force: true})
    .type('2 business days friendly reminder message. ')
    cy.get(remindersScreenSelectors.messageText).click()
    cy.log('Save the changes')
    cy.get(remindersScreenSelectors.savetheReminder).click()
    cy.wait(1000)
    cy.log('Validate edited message for 2 Business Days friendly reminder')
    cy.get(remindersScreenSelectors.friendlyReminder2Days).click()
    cy.wait(2000)
    cy.get(remindersScreenSelectors.editMessageBox).scrollIntoView()
    cy.validateReminderScreenContent(remindersScreenSelectors.editMessage,'2 business days friendly reminder message.')
    cy.get(remindersScreenSelectors.closeMessage).click()

    })
})