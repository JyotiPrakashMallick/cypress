/* AUTO-187 We will create a reminder and then for an appointment same will be verified on the 
dashboard. */ 
//user: autouser@mailinator.com, practice: 01 Lee Practice 01 

import virtualWaitingRoomSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/virtualWaitingRoomSelectors';
import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors';
import commonSelectors from '../../../../../../support/selectors/common/commonSelectors';
import schedulePageSelector from  '../../../../../../support/selectors/scheduling/schedulePageSelector';
import reminderCommands from '../../../../../../support/commands/gui/automationworkflow/Reminders/reminderCommands';
import generalPage from '../../../../../../support/selectors/enterprisemanagement/generalpage';
const testData = require("../../../../../../fixtures/gui/scheduling/quickAppointment/appointmenttestData")

describe ('Create a reminder and validate on dashboard for an appointment',function()
{    
    beforeEach(function (){
 
        cy.log("Log into application using API")    
        cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

it('disable waiting room reminder and create 2 hours reminder', function(){
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
    cy.log('Move to Reminders screen')
    cy.get(remindersScreenSelectors.reminderScreen).should('be.visible').click()
    cy.log('Confirm we are on Reminders screen')
    cy.validateReminderText(remindersScreenSelectors.reminderScreenText, 'Reminders')
    cy.log('Click on + icon to add a reminder')
    cy.get(remindersScreenSelectors.addReminderIcon).click()
    cy.log('Select the Message Type: Friendly reminder')
    cy.get(remindersScreenSelectors.messageType).find('#messageType')
    .type('{downarrow}',{force: true}).type('{enter}',{force: true})    
    cy.log('Select the Contact Method')
    cy.get(remindersScreenSelectors.contactMethod,{timeout: 20000}).should('be.visible').click()
    cy.log('Select when to send message number of hours')
    cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessage,'2{enter}')
    cy.log('Select when to send message unit')
    cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessageUnit, 'Hours{enter}')
    cy.log('Click on Advanced settings')
    cy.get(remindersScreenSelectors.advanceSetting).click()
    cy.log("Do not send reminder before")
    cy.enterDropDownValue(remindersScreenSelectors.noReminderBefore,'02:00 AM{enter}')
    cy.log('Save the calendar reminder')
    cy.get(remindersScreenSelectors.savetheReminder)
    .should('be.visible').click()  
})   

it('create the appointment',function(){
    cy.visit('/schedule')
    cy.get(schedulePageSelector.todayDate).should('be.visible').click()
    cy.log('Click on quick add')
    cy.get(schedulePageSelector.quickAddbutton).click()
    cy.log('Appointment form should be visible')
    cy.get(schedulePageSelector.appointmentForm).should('be.visible')
    cy.get(schedulePageSelector.headerText).should('have.text', 'Add Appointment')

    cy.log('select the patient')
    cy.addpatientandselectfromlist(testData.pmsSyncedPatient)
    cy.log('select the chair')
    cy.selectrandomchair()
    cy.log('select the practioner')
    cy.selectrandompractitioner()
    cy.log('Click on Add button to create appointment')
    //hardcoding this as when we use the pageselector method the button is not seen.  
    cy.get('.styles__footer___RJAZJ > .vbutton__color-blue___2dO3r')
      .should('be.visible')
      .should('have.text', 'Add')
      .click() 
    cy.log('Assert that the toast success message is displayed')
    //this part extracts the first name only of patient
    var index = testData.pmsSyncedPatient.indexOf(' ');
    var firstname = testData.pmsSyncedPatient.substring(0, index);
    cy.asserttoastmessagesuccess(firstname, testData.toastAptSuccess)
    cy.log('Validate appointment is created')
    cy.get(schedulePageSelector.createdAppointment).contains(testData.pmsSyncedPatient)
  })

it('Login and validate the appointment over dashboard and then change the reminders to default',function(){
    cy.visit('/')
    cy.on('uncaught:exception', (err, runnable) => {
    return false}) 
    cy.log("Move to Dashboard")
    cy.get(commonSelectors.dashboardScreen,{timeout: 20000}).click()
    cy.on('uncaught:exception', (err, runnable) => {
    return false}) 
    cy.scrollToReminder({timeout : 10000})
    
    cy.get(remindersScreenSelectors.dashboardReminder,{timeout:24000})
    cy.get(remindersScreenSelectors.dashboardReminder).contains('JESzzz WARzzz')
    cy.get(remindersScreenSelectors.dashboardReminder).contains('2 hours')
 
    cy.log('Click on Settings icon')
    cy.get(commonSelectors.settingsScreen,{timeout: 20000}).click()
    cy.log('Click on Donna Tab')
    cy.get(commonSelectors.donnaTab,{timeout: 20000}).click()
    cy.log('Move to Reminders screen')
    cy.get(remindersScreenSelectors.reminderScreen,{timeout: 20000}).should('be.visible').click()
    cy.log('Confirm we are on Reminders screen')
    cy.validateReminderText(remindersScreenSelectors.reminderScreenText, 'Reminders', {timeout : 10000})
    cy.log("Click on Advance Settings icon")
    cy.get(remindersScreenSelectors.settings).click()
    cy.log("Click on Revert to default button")    
    cy.get(remindersScreenSelectors.defaultButton).click()
    cy.log("Confirm the Revert workflow")    
    cy.get(remindersScreenSelectors.confirmDefaultSetting).click()
    cy.log("Close the settings")
    cy.get(remindersScreenSelectors.closeIconInRemindersSettings, {timeout : 10000}).click()
    cy.log("Move to virtual waiting room screen")
    cy.get(virtualWaitingRoomSelectors.waitingRoomScreen,{force: true}, {timeout : 10000}).click()
    cy.log("Click on Advance Settings icon")
    cy.get(remindersScreenSelectors.settings).click()
    cy.log("Click on Revert to default button")    
    cy.get(remindersScreenSelectors.defaultButton).click()
    cy.log("Confirm the Revert workflow")    
    cy.get(remindersScreenSelectors.confirmDefaultSetting).click()
    cy.log("Close the settings")  
    cy.get(remindersScreenSelectors.closeIconInRemindersSettings, {timeout : 5000}).click()

})
})