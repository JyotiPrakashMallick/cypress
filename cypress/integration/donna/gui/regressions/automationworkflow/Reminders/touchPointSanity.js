/* AUTO-144 Sanity of Reminders screen touch points 
user: autouser@mailinator.com, practice: 01 Lee Practice 01 */

import virtualWaitingRoomSelectors from "../../../../../../support/selectors/automationworkflow/Reminders/virtualWaitingRoomSelectors"
import commonSelectors from '../../../../../../support/selectors/common/commonSelectors';
import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors';
import waitingRoomCommands from '../../../../../../support/commands/gui/automationworkflow/Reminders/waitingRoomCommands';

describe('Sanity of Reminder screen touch points',function()
{

  beforeEach(()=>{
    cy.apilogin(Cypress.env('email'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit('/settings/workflow/reminders')
    cy.url().should('include', '/reminders')
    cy.on('uncaught:exception', (err, runnable) => {
    return false})
        cy.intercept('POST',Cypress.env('graphQLWorkflow') + "/graphql",(req)=>{
            if (req.body.operationName.includes('updateTouchPoint')){
                req.alias = 'updateTouchPoint'
              }
        })
        cy.intercept('POST',Cypress.env('graphQLWorkflow') + "/graphql",(req)=>{
            if (req.body.operationName.includes('getTouchPointsWorkflow')){
                req.alias = 'getTouchPointsWorkflow'
              }
        })
        
      //  cy.wait('@getTouchPointsWorkflow')
        cy.log("Click on Advance Settings icon")
        cy.get(remindersScreenSelectors.settings).click()
        cy.log("Click on Revert to default button")    
        cy.get(remindersScreenSelectors.defaultButton).click()
        cy.log("Confirm the Revert workflow")    
        cy.get(remindersScreenSelectors.confirmDefaultSetting).click()
        cy.log('Close the default settings')
        cy.get(remindersScreenSelectors.closeIconInRemindersSettings, {timeout: 5000}).click()
        cy.log('Validate 7 Calendar Days friendly reminder')
        cy.validateReminderScreenContent(remindersScreenSelectors.friendlyReminder7Days, '7 Calendar Days')
        cy.validateReminderScreenContent(remindersScreenSelectors.friendlyReminder7Days, 'Friendly Reminder')
        cy.get(remindersScreenSelectors.friendlyReminder7Days).click()   
        cy.get(remindersScreenSelectors.editMessageBox).scrollIntoView()
    
      })
this.afterAll(()=>{
        cy.log("Click on Advance Settings icon")
        cy.get(remindersScreenSelectors.settings).click()
        cy.log("Click on Revert to default button")    
        cy.get(remindersScreenSelectors.defaultButton).click()
        cy.log("Confirm the Revert workflow")    
        cy.get(remindersScreenSelectors.confirmDefaultSetting).click()
        cy.log('Close the default settings')
        cy.get(remindersScreenSelectors.closeIconInRemindersSettings, {timeout: 5000}).click()
    })   
it('validate the SMS message edit for single',function(){
    cy.log('Edit the message')
    cy.get(remindersScreenSelectors.editMessage,{force: true}).click()
    cy.log('Insert the practitioner tag')
    cy.get(remindersScreenSelectors.insertTag).click()
    cy.get(remindersScreenSelectors.selectPractitionerFromInsertTag).click()
    cy.get(remindersScreenSelectors.messageText).click()
    cy.log('Save the changes')
    cy.get(remindersScreenSelectors.savetheReminder).click()
    cy.wait('@updateTouchPoint')
    cy.log('Open 7 days reminder')
    cy.get(remindersScreenSelectors.friendlyReminder7Days).click()   
    cy.get(remindersScreenSelectors.editMessageBox, {timeout: 5000}).scrollIntoView()
    cy.log('Validate the practitioner name in message box')
    cy.validateReminderScreenContent(remindersScreenSelectors.editMessage, 'Dr. John')
    cy.log('Close the reminder')
    cy.get(remindersScreenSelectors.closeMessage).click()
})

it('validate the SMS message edit for family',function(){
   
    cy.log('Select the Family from drop down')
    cy.get(remindersScreenSelectors.singleOrFamily)
     .find(remindersScreenSelectors.selectFamily) 
     .type("{downarrow}", { force: true })
     .type("{enter}", { force: true });
    cy.log('Edit the message')
     cy.get(remindersScreenSelectors.editMessage,{force: true}).click()
     cy.get(remindersScreenSelectors.insertTag)
       .click()
    cy.log('Select the appointment time')
    //cy.get(remindersScreenSelectors.insertTag).click()
    cy.get(remindersScreenSelectors.selectPractitionerFromInsertTag).should('be.visible').click()
   // .find(remindersScreenSelectors.selectPractitionerFromInsertTag)
    //.type("{downarrow}", { force: true })
    //.type("{enter}", { force: true });
   cy.get(remindersScreenSelectors.messageText).click()
    cy.log('Save the changes')
    cy.get(remindersScreenSelectors.savetheReminder).click()
    cy.wait('@updateTouchPoint')
    cy.log('Open the 7 days friendly reminder')
    cy.get(remindersScreenSelectors.friendlyReminder7Days).click()   
    cy.get(remindersScreenSelectors.singleOrFamily)
     .find(remindersScreenSelectors.selectFamily) 
     .type("{downarrow}", { force: true })
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.editMessageBox, {timeout: 5000}).scrollIntoView()
    cy.log('Validate the appointment time')
    cy.validateReminderScreenContent(remindersScreenSelectors.editMessage, 'Dr. John')
    cy.log('Close the reminder')
    cy.get(remindersScreenSelectors.closeMessage).click()
})

it('validate the Email message edit for single',function(){
    cy.log('Enable the Email view to update the message')
    cy.get(remindersScreenSelectors.enableEmailView).contains('Email').click()
    cy.log('Validate Email is enabled')
    cy.validateReminderText(remindersScreenSelectors.validateEmailEnabled,'Email')
    cy.log('Edit the subject of email')
    cy.get(remindersScreenSelectors.editEmailSubject)
    .invoke('show').type('Email subject edited. ')
    cy.get(remindersScreenSelectors.validateEmailEnabled).click()
    cy.get(remindersScreenSelectors.advanceSetting).scrollIntoView()
    cy.validateReminderScreenContent(remindersScreenSelectors.editEmailSubject,'Email subject edited.')
    cy.log('Edit email header and insert tag')
    cy.get(remindersScreenSelectors.emailHeader, {force: true}).click()
    cy.get(remindersScreenSelectors.insertTagEmailHeader)
    .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectApptTimeFromEmailHeaderInsertTag)
     .should('be.visible')
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.validateEmailEnabled).click()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailHeader,'10:00 AM') 

    cy.log('Edit email reminder text and insert tag')
    cy.get(remindersScreenSelectors.emailReminderText, {force: true}).click()
    cy.get(remindersScreenSelectors.emailHeader).scrollIntoView() 
    cy.get(remindersScreenSelectors.insertTagEmailReminderText)
     .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectApptTimeFromEmailReminderTextInsertTag)
     .should('be.visible')
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.get(remindersScreenSelectors.emailHeader).scrollIntoView()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailReminderText,'10:00 AM') 

    cy.log('Edit appointment details and insert tag')
    cy.get(remindersScreenSelectors.emailApptDetails, {force: true}).click()
    cy.get(remindersScreenSelectors.insertTagEmailApptDetails)
     .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectEmailApptDetailsFromInsertTag)
     .should('be.visible')
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailApptDetails,'10:00 AM') 

    cy.log('Edit email body and insert tag')
    cy.get(remindersScreenSelectors.emailBody, {force: true}).click()
    cy.get(remindersScreenSelectors.insertTagEmailBody)
     .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectFamilyDetailsFromEmailBodyInsertTag)
     .should('be.visible')
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailBody,'10:00 AM') 
    cy.log('Save the changes')
    cy.get(remindersScreenSelectors.savetheReminder).click()    
})

it('validate the Email message edit for family',function(){
    cy.log('Enable the Email view to update the message')
    cy.get(remindersScreenSelectors.enableEmailView).contains('Email').click()
    cy.log('Validate Email is enabled')
    cy.validateReminderText(remindersScreenSelectors.validateEmailEnabled,'Email')
    cy.log('Select the Family from drop down')
    cy.get(remindersScreenSelectors.singleOrFamily)
     .find(remindersScreenSelectors.selectFamily) 
     .type("{downarrow}", { force: true })
     .type("{enter}", { force: true });
    cy.log('Edit the subject of email')
    cy.get(remindersScreenSelectors.editEmailSubject)
    .invoke('show').type('Email subject edited. ')
    cy.get(remindersScreenSelectors.apptSign).click()
    cy.get(remindersScreenSelectors.advanceSetting).scrollIntoView()
    cy.validateReminderScreenContent(remindersScreenSelectors.editEmailSubject,'Email subject edited.')
    cy.log('Edit email header and insert tag')
    cy.get(remindersScreenSelectors.emailHeader, {force: true}).click()
    cy.get(remindersScreenSelectors.insertTagEmailHeader)
    .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectApptTimeFromEmailHeaderInsertTag)
     .should('be.visible')
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.apptSign).click()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailHeader,'10:00 AM') 

    cy.log('Edit email reminder text and insert tag')
    cy.get(remindersScreenSelectors.emailReminderText, {force: true}).click()
    cy.get(remindersScreenSelectors.emailHeader).scrollIntoView() 
    cy.get(remindersScreenSelectors.insertTagEmailReminderText)
     .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectApptTimeFromEmailReminderTextInsertTag)
     .should('be.visible')
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.get(remindersScreenSelectors.emailHeader).scrollIntoView()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailReminderText,'10:00 AM') 

    cy.log('Edit appointment details and insert tag')
    cy.get(remindersScreenSelectors.emailApptDetails, {force: true}).click()
    cy.get(remindersScreenSelectors.insertTagEmailApptDetails)
     .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectEmailApptDetailsFromInsertTag)
     .should('be.visible')
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailApptDetails,'10:00 AM') 

    cy.log('Edit email body and insert tag')
    cy.get(remindersScreenSelectors.emailBody, {force: true}).click()
    cy.get(remindersScreenSelectors.insertTagEmailBody)
     .should('be.visible').click()
    cy.get(remindersScreenSelectors.selectFamilyDetailsFromEmailBodyInsertTag)
     .should('be.visible')
     .type("{enter}", { force: true });
    cy.get(remindersScreenSelectors.emailApptDetailsText).click()
    cy.validateReminderScreenContent(remindersScreenSelectors.emailBody,'10:00 AM') 
    cy.log('Save the changes')
    cy.get(remindersScreenSelectors.savetheReminder).click()

  })
})