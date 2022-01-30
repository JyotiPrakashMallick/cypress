/// <reference types="Cypress"/>

/* EPIC: AUTO-446 Create and Delete a new touch point on donna's new UI */
    /*Create a touch point for Friendly reminder

    */
//user: autouser01@mailinator.com, Enterprise: 01 Lee Practice 01, Practice: 01 Lee Abeldent V14 

import remindersScreenSelectors from '../../../../../../support/selectors/automationworkflow/Reminders/remindersScreenSelectors';
import commonSelectors from '../../../../../../support/selectors/common/commonSelectors';
import reminderCommands from '../../../../../../support/commands/gui/automationworkflow/Reminders/reminderCommands';

describe('Validate if Friendly reminders can be created only upto its maximum limit of 6, and can be deleted also', () => {
    before(function () {
        cy.apilogin(Cypress.env('email'), Cypress.env('password'), Cypress.env('backendUrl') + "auth")
        cy.on('uncaught:exception', (err, runnable) => {
            return false})
        cy.visit(Cypress.env('baseUrl'))
    })
    it('Navigate to Reminders page under Donna', function () {
        cy.navigateToReminderPage()
    })

    it('Revert back to default from Reminder settings', function () {
        cy.revertToDefaultReminderSettings()
    })

    it('create the friendly reminders until its maximum limit', function () {
        cy.createMaxFriendlyReminders(remindersScreenSelectors.allTouchPointReminders)
    })

    it('try creating one more friendly reminder & validate if the application doesn\'t allow', function () {
        cy.log('Click on + icon to add a reminder')
        cy.get(remindersScreenSelectors.addReminderIcon).click()
        cy.log('Select the Message Type: friendly reminder')
        cy.get(remindersScreenSelectors.messageType).find('#messageType')
        .type('{downarrow}',{force: true}).type('{enter}',{force: true})
        cy.get('#messageType').siblings('div').should('have.text', 'Friendly Reminder')
        cy.get(remindersScreenSelectors.warningMsg).should('contain.text', 'There cannot be more than 6 Friendly Reminders.')
        cy.log('Select the Contact Method')
        cy.get(remindersScreenSelectors.contactMethod, { timeout: 20000 }).should('be.visible').click()
        cy.log('Select when to send message number of hours')
        cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessage, '20{enter}')
        cy.log('Select when to send message unit')
        cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessageUnit, 'Days{enter}')
        cy.get(remindersScreenSelectors.saveBtnOnTchPointSetting).should('not.be.enabled')
        cy.get(remindersScreenSelectors.sideBarCloseBtn, { timeout: 5000 }).click()
        cy.get('button').contains('Don\'t Save').click()
    })

   it('Validate if each friendly reminder-touchpoint can be deleted, which were created during this test', function () {
        for (let i = 16; i < 19; i++) {
            cy.get(remindersScreenSelectors.allTouchPointTitles).contains(i+ ' Calendar Days').click({force: true})
            cy.get(remindersScreenSelectors.reminderDeleteBtn).should('have.text','Delete Message').click()
            cy.get('button').contains('Confirm Delete').click()
            cy.get(remindersScreenSelectors.allTouchPointTitles).should('not.contain.text',i+' Friendly Reminder')
        }
    })
})