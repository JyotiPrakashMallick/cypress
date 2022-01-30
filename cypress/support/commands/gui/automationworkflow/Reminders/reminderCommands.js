// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import reminderselector from '../../../../selectors/automationworkflow/Reminders/remindersScreenSelectors'
import commonSelectors from '../../../../selectors/common/commonSelectors'
import remindersScreenSelectors from '../../../../selectors/automationworkflow/Reminders/remindersScreenSelectors'
Cypress.Commands.add("enterDropDownValue", (selector, value) => {
    cy.get(selector,{timeout: 10000}).type(value)
})

Cypress.Commands.add("validateReminderText", (selector, text) => {
    cy.get(selector,{timeout: 10000}).should('be.visible').should('have.text',text)     
})

Cypress.Commands.add("validateReminderScreenContent", (selector, text) => {
    cy.get(selector,{timeout: 10000}).should('be.visible').contains(text)  
})

Cypress.Commands.add("validateReminderIcons", (selector, text) => {
    cy.get(selector,{timeout: 10000}).should('be.visible')   
})
Cypress.Commands.add("SelectAndEditReminder", (reminderData) => {
    cy.log('******' + '***click on avaialable reminder***..')
    cy.get(reminderselector.reminder7Days,{timeout:10000}).should('be.visible').click()
    cy.log('******' + '***Select Message type***..')
    cy.get(reminderselector.messageType).click()
    cy.get(reminderselector.messageTypeOption).next().click()
    cy.get(reminderselector.messageType).then((ele) => {

        cy.log('***Selected Message Type', ele.text() + '***')
    })
    cy.log('******' + '***select when to send message in days***..')
    cy.get(reminderselector.selectDaysDropDown).click()
    cy.get(reminderselector.selectDaysValue).eq(4).click()
    cy.get(reminderselector.selectDaysDropDown).then((ele) => {

        cy.log('***Selected Days', ele.text() + '***')
    })
    cy.get(reminderselector.previewAndEditEmailButton).click()
    cy.log('***edit email subject***')
    cy.get(reminderselector.emailSubjectTextField, { force: true }).eq(0).type(reminderData[2].emailSubjectEdited)
    cy.log('***Updated Subject:' + reminderData[2].emailSubjectEdited + '***')
    cy.log('***edit email body***')
    cy.get(reminderselector.emailBodyTextField, { force: true }).type(reminderData[2].emailBodyEdited)
    cy.log('***Updated email body:' + reminderData[2].emailBodyEdited + '***')
})

Cypress.Commands.add("clickOnReminderTab", () => {
    cy.log('******' + '***Click on reminder tab ***..')
    cy.get(reminderselector.reminderScreen).click()
})

Cypress.Commands.add("validateWarningMessage", (reminderData) => {
    cy.log('******' + '***Validating warning pop up***..')
    cy.get(reminderselector.warningPopUpHeader).should('be.visible').then((ele) => {

        expect(ele.text()).to.equal(reminderData[2].warningHeaderMessage)
        expect(ele.next().text()).to.equal(reminderData[2].warningMessage)

    })
})

Cypress.Commands.add("clickDrwawerXIcon", () => {
    cy.log('******' + '***Click on drawer x icon tab ***..')
    cy.get(reminderselector.reminderDrawerXIcon).click()
})

Cypress.Commands.add("clickDontSaveOrGoBackButton", (selector) => {
    cy.log('******' + '***Clicking on dont save button ***..')
    cy.get(selector).click()
})

Cypress.Commands.add("validateReminderDrawerValues", (reminderData) => {
    cy.log('***go to reminder drawer again to validate***')
    cy.log('******' + '***click on available reminder***..')
    
    cy.get(reminderselector.reminder7Days,{timeout:8000}).should('be.visible').click({ force: true }) 
    cy.get(reminderselector.touchPoint2SubTitle).then((ele) => {
        cy.log('***Selected Message Type', ele.text() + '***')
        expect(ele.text()).to.equal(reminderData[2].originalMessageType)
    })
    cy.get(reminderselector.reminder7Days).then((ele) => {

        cy.log('***Selected Days', ele.text() + '***')
        expect(ele.text()).to.equal(reminderData[2].whenToSendMessageDays)
    })
   
    cy.get(reminderselector.reminder7Days,{timeout:8000}).should('be.visible').click({ force: true }) 
    cy.get(reminderselector.enableEmailView).contains('Email').click()

    cy.get(reminderselector.emailSubjectTextField, { force: true }).eq(0).then((ele) => {

        cy.log('***Original Subject:', ele.text() + '***')
        expect(ele.text()).to.equal(reminderData[2].emailSubject)
    })

    cy.get(reminderselector.emailBodyTextField, { force: true }).then((ele) => {

        cy.log('***Original email body:', ele.text() + '***')
        expect(ele.text()).to.equal(reminderData[2].emailBody)
    })
})

Cypress.Commands.add("clickOnReminderTab", (testdata) => {
    cy.log('******' + '***Click on reminder tab ***..')
    cy.get(reminderselector.reminderScreen).click()
})

Cypress.Commands.add("validateWarningMessage", (testdata) => {
    cy.log('******' + '***Validating warning pop up***..')
    cy.get(reminderselector.warningPopUpHeader).should('be.visible').then((ele) => {

        expect(ele.text()).to.equal(testdata[2].warningHeaderMessage)
        expect(ele.next().text()).to.equal(testdata[2].warningMessage)

    })
}) 

Cypress.Commands.add("navigateToReminderPage", () => {
    cy.log('Click on Donna Tab')
    cy.get(commonSelectors.settingsbtn, { timeout: 20000 }).click()
    cy.get(commonSelectors.donnaTab, { timeout: 20000 }).click()
    cy.get(remindersScreenSelectors.reminderScreen, { timeout: 20000 }).click()})

Cypress.Commands.add("revertToDefaultReminderSettings", () => {
    cy.get(remindersScreenSelectors.reminderSettingBtn).should('be.enabled').click()
    cy.get(remindersScreenSelectors.buttonIcon).contains('Revert to Default').click()
    cy.get(remindersScreenSelectors.workflowBtn).filter(':contains("Revert Workflow")').click()
    cy.get(remindersScreenSelectors.closeBtn, { timeout: 5000 }).click()
})

Cypress.Commands.add("createMaxConfirmableReminders", (selector) => {
    cy.get(selector).filter(':contains("Confirmable Reminder")')
        .then(($lis) => {
            let confReminderCount = $lis.length
            cy.log('Number of default confirmable reminders available on page are: ' + confReminderCount)
            cy.log('Number of confirmable reminders, to be created to achieve its max limit of 8, are: ' + (8 - confReminderCount))
            for (let i = 10; i < 14; i++) {
                cy.log('Click on + icon to add a reminder')
                cy.get(remindersScreenSelectors.addReminderIcon).click()
                cy.log('Select the Message Type: Confirmable reminder')
                cy.get(remindersScreenSelectors.messageType).find('#messageType')
                    .type('{Enter}', { force: true })
                cy.log('Select the Contact Method')
                cy.get(remindersScreenSelectors.contactMethod, { timeout: 20000 }).should('be.visible').click()
                cy.log('Select when to send message number of hours')
                cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessage, i + '{enter}')
                cy.log('Select when to send message unit')
                cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessageUnit, 'Days{enter}')
                cy.get('.touch-point-settings >> button[class*="save"]').should('be.enabled').click()
                cy.get('h4.touch-point__title').should('contain.text', i + ' Calendar Days')
                cy.log('Touch point for ' + i + " Calendar Days has been added successfully")
            }
        })
})

Cypress.Commands.add("createMaxFriendlyReminders", (selector) => {
    cy.get(selector).filter(':contains("Friendly Reminder")')
        .then(($lis) => {
            let frndlyreminderCount = $lis.length
            cy.log('Number of default friendly reminders available on page are: ' + frndlyreminderCount)
            cy.log('Number of friendly reminders, to be created to achieve its max limit of 6, are: ' + (6 - frndlyreminderCount))
            for (let i = 16; i < 19; i++) {
                cy.log('Click on + icon to add a reminder')
                cy.get(remindersScreenSelectors.addReminderIcon).click()
                cy.log('Select the Message Type: Friendly reminder')
                cy.get(remindersScreenSelectors.messageType).find('#messageType')
                .type('{downarrow}',{force: true}).type('{enter}',{force: true})
                cy.log('Select the Contact Method')
                cy.get(remindersScreenSelectors.contactMethod, { timeout: 20000 }).should('be.visible').click()
                cy.log('Select when to send message number of hours')
                cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessage, i + '{enter}')
                cy.log('Select when to send message unit')
                cy.enterDropDownValue(remindersScreenSelectors.whentoSendMessageUnit, 'Days{enter}')
                cy.get('.touch-point-settings >> button[class*="save"]').should('be.enabled').click()
                cy.get('h4.touch-point__title').should('contain.text', i + ' Calendar Days')
                cy.log('Touch point for ' + i + " Calendar Days has been added successfully")
            }

        })
})

Cypress.Commands.add("revertToDefaultSms", ()=> {
    // click on ellipses and assert revert to default is enabled
    cy.get(reminderselector.ellipses)
      .click()

    cy.get(reminderselector.revertToDefaultSms, {timeout: 10000})
      .should('not.have.attr', 'disabled')

    cy.get(reminderselector.revertToDefaultSms)
      .click()

    cy.contains('Revert Message').click()
})

Cypress.Commands.add("revertToDefaultEmail", ()=> {
    // click on ellipses and assert revert to default is enabled
    cy.get(reminderselector.ellipses)
      .click()

    cy.get(reminderselector.revertToDefaultEmail, {timeout: 10000})
      .should('not.have.attr', 'disabled')

    cy.get(reminderselector.revertToDefaultEmail)
      .click()

    cy.contains('Revert Message').click()
})
