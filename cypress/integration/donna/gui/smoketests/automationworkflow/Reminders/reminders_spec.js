/* AUTO-164 Verify that the new ui appears for the reminders workflow. */ 
/*AUTO-141 Verify that when user click the gear icon it will display the advance settings and displays the Reminders Advanced Settings*/
/*AUTO-145 Verify that user can enable the toggle button on for the inactive patient sending of reminder*/

/// <reference types="Cypress"/>
import commonSelectors from '../../../../../../support/selectors/common/commonSelectors';
import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors';
import reminderCommands from '../../../../../../support/commands/gui/automationworkflow/Reminders/reminderCommands';


describe ('This test the functionality for Reminders workflow and Virtual waiting room',function()
{
  before(function(){
     
      cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
      cy.visit('/settings')
      cy.url().should('include', '/settings')
      cy.on('uncaught:exception', (err, runnable) => {
      return false})
      cy.log('Click on Donna Tab')
      cy.get(commonSelectors.donnaTab,{timeout: 20000}).click()
      cy.wait(3000) 
      cy.log('Clicking on Reminders tab')
      cy.get(remindersScreenSelectors.reminderScreen,{timeout:10000}).click()
           
  })

    it('Validate Reminders Settings UI',function () { 
      cy.log('Clicking on Settings Icon')
      cy.get(remindersScreenSelectors.settingsIcon, {timeout: 3000}).click()
      cy.log('Validating Reminders Settings Header')
      cy.validateReminderText(remindersScreenSelectors.reminderSettingsHeader, 'Reminders Settings')
      cy.log('Validating Toggle Message')
      cy.validateReminderText(remindersScreenSelectors.toggleMessage, 'Send Appointment Reminders to Inactive Patients?')
      cy.log('Validating Help tool tip Icon')
      cy.validateReminderIcons(remindersScreenSelectors.helpToolTipIcon)
      cy.log('Validating Revert Workflow label')
      cy.validateReminderText(remindersScreenSelectors.revertWorkFlowLabel, 'Revert Workflow')
      cy.log('Validating Revert to Default button')
      cy.validateReminderIcons(remindersScreenSelectors.revertToDefaultButton)
      cy.log('Validating Revert Workflow message')
      cy.validateReminderText(remindersScreenSelectors.revertWorkFlowMessage, ' Reverting to default refers to resetting all touchpoints, touchpoint        settings and templates to the initial CareCru defaults. We will not be retaining all variations to the default.')
      cy.log('Clicking on Close Icon')
      cy.get(remindersScreenSelectors.closeIconInRemindersSettings, {timeout: 3000}).click()
    })

    it('Enable Send Appointment Reminders to Inactive Patients', function () {
        cy.log('Clicking on Settings Icon')
        cy.get(remindersScreenSelectors.settingsIcon, {timeout: 3000}).click()
        cy.log('Enable the toggle')
        if(cy.get(remindersScreenSelectors.toggleSlider, {timeout: 3000}).should('not.be.checked')){
          cy.get(remindersScreenSelectors.toggleSlider).click()
          cy.log('Clicking on Save button in Reminders Settings screen')
          cy.get(remindersScreenSelectors.saveButton, {timeout: 5000}).click()
        }
        else{
          cy.log('Clicking on Close Icon')
          cy.get(remindersScreenSelectors.closeIconInRemindersSettings, {timeout: 3000}).click()
        }
    }) 

    it('Validate Reminders workflow UI',function () { 
      cy.log('Asserts that Reminders header is visible')
      cy.validateReminderText(remindersScreenSelectors.reminderScreenText, 'Reminders')
      cy.log('Clicking on Settings Icon')
      cy.get(remindersScreenSelectors.settingsIcon, {timeout: 3000}).click()
      cy.log('Clicking on Revert to Default button')
      cy.get(remindersScreenSelectors.revertToDefaultButton, {timeout: 10000}).click()
      cy.log('Clicking on Revert Workflow button')
      cy.get(remindersScreenSelectors.revertWorkflowButton, {timeout: 10000}).click()
      cy.log('Clicking on Close icon in Reminders Settings sidebar')
      cy.get(remindersScreenSelectors.closeIconInRemindersSettings, {timeout: 10000}).click()
      cy.log('Asserts that Reminders Titles, Contact methods and Subtitles are visible')

        // 21 Calendar Days, Friendly Reminder
        cy.validateReminderText(remindersScreenSelectors.touchPoint1Title, '21 Calendar Days')
        cy.validateReminderText(remindersScreenSelectors.tounchPoint1SubTitle, 'Friendly Reminder')
        cy.validateReminderIcons(remindersScreenSelectors.touchPoint1ContactMethod)
        
        //7 Calendar Days, Confirmable Reminder
        cy.validateReminderText(remindersScreenSelectors.touchPoint2Title, '7 Calendar Days')
        cy.validateReminderIcons(remindersScreenSelectors.touchPoint2ContactMethod1)
        cy.validateReminderIcons(remindersScreenSelectors.touchPoint2ContactMethod2)
        cy.validateReminderText(remindersScreenSelectors.touchPoint2SubTitle, 'Confirmable Reminder')
      

        //7 Calendar Days, Friendly Reminder
        cy.validateReminderText(remindersScreenSelectors.touchPoint3Title, '7 Calendar Days')
        cy.validateReminderIcons(remindersScreenSelectors.touchPoint3ContactMethod1)
        cy.validateReminderIcons(remindersScreenSelectors.touchPoint3ContactMethod2)
        cy.validateReminderText(remindersScreenSelectors.touchPoint3SubTitle, 'Friendly Reminder')
        

        //3 Business Days, Confirmable Reminder
        cy.validateReminderText(remindersScreenSelectors.touchPoint4Title, '3 Business Days')
        cy.validateReminderIcons(remindersScreenSelectors.touchPoint4ContactMethod)
        cy.validateReminderText(remindersScreenSelectors.touchPoint4SubTitle, 'Confirmable Reminder')
      

        //2 Business Days, Confirmable Reminder
        cy.validateReminderText(remindersScreenSelectors.touchPoint5Title, '2 Business Days')
        cy.validateReminderIcons(remindersScreenSelectors.touchPoint5ContactMethod)
        cy.validateReminderText(remindersScreenSelectors.touchPoint5SubTitle, 'Confirmable Reminder')
        

        //2 Business Days, Friendly Reminder
        cy.validateReminderText(remindersScreenSelectors.touchPoint6Title, '2 Business Days')
        cy.validateReminderIcons(remindersScreenSelectors.touchPoint6ContactMethod)
        cy.validateReminderText(remindersScreenSelectors.touchPoint6SubTitle, 'Friendly Reminder')
        
      })
    })