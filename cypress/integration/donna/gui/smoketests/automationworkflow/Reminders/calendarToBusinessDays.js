/* AUTO-189: Verify that user can modify the calendar days to business days in reminders on new UI
user: autouser@mailinator.com, practice: 01 Lee Practice 01 */

import virtualWaitingRoomSelectors from "../../../../../../support/selectors/automationworkflow/Reminders/virtualWaitingRoomSelectors";
import remindersScreenSelectors from "../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors";
import commonSelectors from "../../../../../../support/selectors/common/commonSelectors";
import reminderCommands from "../../../../../../support/commands/gui/automationworkflow/Reminders/reminderCommands";

describe("This will validate the reminders different features", function () {

  it("disable waiting room reminder and add business day reminder", function () {
    cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit('/settings/workflow/virtual-waiting-room')
    cy.url().should('include', '/virtual-waiting-room')
    cy.on('uncaught:exception', (err, runnable) => {
    return false})
    cy.intercept('https://test-workflow.carecru.com/graphql').as('waitingRoomScreenWait')
    cy.wait('@waitingRoomScreenWait')
    
    cy.validateReminderText(virtualWaitingRoomSelectors.waitingRoomScreenText, "Waiting Room");
    cy.log("Click on 2 hours waiting room reminder");
    cy.get(virtualWaitingRoomSelectors.waitingRoomReminder, {timeout: 5000})
      .should("be.visible")
      .click();
    cy.log('Validate 2 hours reminder is opened')  
    cy.get(virtualWaitingRoomSelectors.validate2HoursReminder, {timeout : 5000}).contains('2 Hours')
    .should('be.visible')
    cy.get(virtualWaitingRoomSelectors.disableReminder, {timeout: 5000}).should('be.visible').click();
    cy.log("Save the changes");
    cy.get(virtualWaitingRoomSelectors.saveChanges).click();
    cy.log("Move to Reminders screen");
    cy.visit('/settings/workflow/reminders')
    cy.url().should('include', '/reminders')
    cy.on('uncaught:exception', (err, runnable) => {
    return false})
    cy.log("Confirm we are on Reminders screen");
    cy.validateReminderText(remindersScreenSelectors.reminderScreenText, "Reminders");
    cy.log("Click on Advance Settings icon")
    cy.get(remindersScreenSelectors.settings).click()
    cy.log("Click on Revert to default button")    
    cy.get(remindersScreenSelectors.defaultButton).click()
    cy.log("Confirm the Revert workflow")    
    cy.get(remindersScreenSelectors.confirmDefaultSetting).click()
    cy.log('Close the default settings')
    cy.get(remindersScreenSelectors.closeIconInRemindersSettings, {timeout: 5000}).click()
    cy.log("Click on + icon to add a reminder");
    cy.get(remindersScreenSelectors.addReminderIcon).click();
    cy.log("Select the Message Type: Friendly reminder");
    cy.get(remindersScreenSelectors.messageType)
      .find("#messageType")
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true });
    cy.log("Select the Contact Method");
    cy.get(remindersScreenSelectors.contactMethod, {timeout: 5000})
      .should("be.visible")
      .click();
    cy.log("Select when to send message number of days");
    cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessage, "4{enter}");
    cy.log("Select when to send message unit");
    cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessageUnit, "Days{enter}");
    cy.log("Click on Advanced settings");
    cy.get(remindersScreenSelectors.advanceSetting).click();
    cy.log("Select the Day type");
    cy.get(remindersScreenSelectors.dayType)
      .find("#dayType")
      .type("{enter}", { force: true });
    cy.log("Save the calendar reminder");      
    cy.get(remindersScreenSelectors.savetheReminder)
      .should("be.enabled")
      .click();
    cy.log("Validate the new calendar day reminder");
    cy.validateReminderText(remindersScreenSelectors.asserttheNewReminder, "4 Calendar Days");
    cy.log("open the calendar days reminder");
    cy.get(remindersScreenSelectors.asserttheNewReminder).click();
    cy.log('Validate touch point is opened')
    cy.get(remindersScreenSelectors.touchPointTitle, {timeout : 3000})
    .should('contain', '4 Calendar Days')
    cy.log("click on Advanced Settings");
    cy.get(remindersScreenSelectors.advanceSetting, {timeout : 5000})
    .should('be.visible').click();
    cy.log("update the calendar days to business days");
    cy.get(remindersScreenSelectors.dayType)
      .find("#dayType")
      .type("{downarrow}", { force: true })
      .type("{enter}", { force: true });
    cy.log("Select the time to send reminder");
    cy.enterDropDownValue(remindersScreenSelectors.timetoSendReminder, "10:00 AM{enter}");
    cy.log("Save the business reminder");
    cy.get(remindersScreenSelectors.savetheReminder)
      .should("be.enabled")
      .click();
    cy.log("Validate the new business day reminder");
    cy.validateReminderText(remindersScreenSelectors.asserttheNewReminder, "4 Business Days");
  });

  it("delete the 4 business days reminder", function () {
    cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit('/settings/workflow/reminders')
    cy.url().should('include', '/reminders')
    cy.on('uncaught:exception', (err, runnable) => {
    return false})
    cy.intercept('https://test-workflow.carecru.com/graphql').as('remindersScreenWait')
    cy.wait('@remindersScreenWait')

    cy.log("Confirm we are on Reminders screen");
    cy.validateReminderText(remindersScreenSelectors.reminderScreenText, "Reminders");
    cy.log("Click on 4 business days reminder");
    cy.get(remindersScreenSelectors.asserttheNewReminder).click();
    cy.log("Delete the reminder");
    cy.get(remindersScreenSelectors.deleteReminderMessage, {timeout: 5000}).click();
    cy.log("Confirm the delete reminder message");
    cy.get(remindersScreenSelectors.confirmDeleteReminder, {timeout: 5000}).click();
  });

  it("enable the waiting room reminder", function () {
    cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit('/settings/workflow/virtual-waiting-room')
    cy.url().should('include', '/virtual-waiting-room')
    cy.on('uncaught:exception', (err, runnable) => {
    return false})
    cy.intercept('https://test-workflow.carecru.com/graphql').as('waitingRoomScreenWait')
    cy.wait('@waitingRoomScreenWait')
   
    cy.log("Click on 2 hours waiting room disabled reminder");
    cy.get(virtualWaitingRoomSelectors.waitingRoomReminder, {timeout: 5000})
      .should("be.visible")
      .click();
    cy.log('Validate 2 hours reminder is opened')  
    cy.get(virtualWaitingRoomSelectors.validate2HoursReminder, {timeout : 5000}).contains('2 Hours')
    .should('be.visible')
    cy.log("Enable the reminder");
    cy.get(virtualWaitingRoomSelectors.disableReminder, {timeout: 5000}).click();
    cy.log("Save the changes");
    cy.get(virtualWaitingRoomSelectors.saveChanges).click();
  });
});
