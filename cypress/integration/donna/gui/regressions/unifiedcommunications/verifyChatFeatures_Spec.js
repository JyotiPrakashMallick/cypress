/// <reference types="Cypress"/>

/* 
AUTO-557 Chat Prod Bugs
Sub-Tasks
AUTO-558 Verify chat history should be displayed as soon as user sends a message to patients
AUTO-570 Verify warning message for a patient that has no phone number
AUTO-571 Verify the button on warning message directs to patient profile
AUTO-569 Verify chat conversation page is loading when there is no phone number for a patient
AUTO-565 Verify when user clicks on personal tab, patient details should be displayed
AUTO-566 Verify when user clicks on appointments tab, appointment details should be displayed
AUTO-568 Verify when switching between different filters, no blank page should be displayed
*/

import chatSelectors from "../../../../../support/selectors/unifiedcommunications/chatSelectors"
const randomMsg = require("crypto").randomBytes(6).toString('hex')

describe('Chat Features', {retries: 1}, () => {
    let cfData
    //setup the test
    beforeEach(() => {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl')+"auth")
        
        cy.fixture('gui/unifiedcommunications/chattestdata').then((cf)=>{
            cfData=cf
        })
        
        cy.visit('/chat/') 

        cy.on('uncaught:exception', () => {
          return false })
    })

  it ('Verify warning message for a patient having no phone number', ()=>{
    cy.get(chatSelectors.search, {timeout: 10000}).should('be.visible').type(cfData.testPatient)
    cy.contains(cfData.testPatient, {timeout: 10000}).click()

    expect(cy.contains('Looks like ' + cfData.firstName + ' does not have a cellphone number. Add a valid cellphone number or try another contact method.'), {timeout:10000})
  })

  it ('Verify the button on warning message directs to patient\'s profile', ()=>{
    cy.get(chatSelectors.search, {timeout: 10000}).should('be.visible').type(cfData.testPatient)
    cy.contains(cfData.testPatient, {timeout: 10000}).click()

    // assert conversation chat box is visible
    cy.get(chatSelectors.chatBox, {timeout: 10000}).should('be.visible')

    // assert button and click on it
    cy.get(chatSelectors.profileButton, {timeout: 10000}).should('have.text', 'Go to ' + cfData.firstName + '\'s' + ' Profile').click()

    // assert patient profile page is opened
    cy.url().should('include', '/patients/')
    expect(cy.contains(cfData.testPatient), {timeout: 10000})
  })

  it ('Verify chat conversation page loads properly for a patient without phone number', ()=>{
    cy.get(chatSelectors.search, {timeout: 10000}).should('be.visible').type(cfData.testPatient)
    cy.contains(cfData.testPatient2, {timeout: 10000}).click()

    // assert conversation chat box is visible
    cy.get(chatSelectors.chatBox, {timeout: 10000}).should('be.visible')

    // assert existing message appears
    expect(cy.contains('hello this is a test message for cypress automation.'))
  })

  it ('Verify the details when user clicks on personal tab', ()=>{
    cy.get(chatSelectors.search, {timeout: 10000}).should('be.visible').type(cfData.testPatient3)
    cy.contains(cfData.testPatient3, {timeout: 10000}).click()

    // assert details in personal tab
    cy.get(chatSelectors.title, {timeout: 10000}).should('have.text', cfData.testPatient3)
    expect(cy.contains('Age'))
    expect(cy.contains(cfData.patient3Age))

    expect(cy.contains('Birthday'))
    expect(cy.contains(cfData.patient3bday))

    expect(cy.contains('Gender'))
    expect(cy.contains(cfData.patient3Gender))

    expect(cy.contains('City'))
    expect(cy.contains(cfData.patient3City))

    expect(cy.contains('Cellphone Number'))
    expect(cy.contains(cfData.patient3Number))

    expect(cy.contains('Email'))
    expect(cy.contains(cfData.patient3Email))
  })

  it ('Verify the details when user clicks on appointments tab', ()=>{
    cy.get(chatSelectors.search, {timeout: 10000}).should('be.visible').type(cfData.testPatient3)
    cy.contains(cfData.testPatient3, {timeout: 10000}).click()

    cy.get(chatSelectors.apptTab).click()

    // assert details in appointments tab
    cy.get(chatSelectors.title).should('have.text', cfData.testPatient3)

    expect(cy.contains('Last Appt'))
    cy.get(chatSelectors.appData).eq(0).should('be.visible')

    expect(cy.contains('Last Hygiene'))
    cy.get(chatSelectors.appData).eq(1).should('be.visible')

    expect(cy.contains('Last Recall'))
    cy.get(chatSelectors.appData).eq(2).should('be.visible')

    expect(cy.contains('Next Appt'))
    cy.get(chatSelectors.appData).eq(3).should('be.visible')

    expect(cy.contains('Last Restorative'))
    cy.get(chatSelectors.appData).eq(4).should('be.visible')
  })

  it('Verify when switching between different filters, no blank page should be displayed', ()=>{
    cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click()

    // select Closed status from drop down list 
    cy.get(chatSelectors.statusDdl).eq(1).click()

    cy.get(chatSelectors.search).should('be.visible')
    cy.get(chatSelectors.typeNameFilter).should('be.visible')

    cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click({force: true})
    // select Unread status from drop down list 
    cy.get(chatSelectors.statusDdl).eq(2).click()

    cy.get(chatSelectors.search).should('be.visible')
    cy.get(chatSelectors.typeNameFilter).should('be.visible')

    cy.get(chatSelectors.chatFilterButton, {timeout:10000}).should('be.visible').click()
    // select Flagged status from drop down list 
    cy.get(chatSelectors.statusDdl).eq(3).click()

    cy.get(chatSelectors.search).should('be.visible')
    cy.get(chatSelectors.typeNameFilter).should('be.visible')

    cy.get(chatSelectors.chatFilterButton).should('be.visible').click()
    // select All from drop down list 
    cy.get(chatSelectors.statusDdl, {timeout: 10000}).eq(4).click()

    cy.get(chatSelectors.search).should('be.visible')
    cy.get(chatSelectors.typeNameFilter).should('be.visible')

    cy.get(chatSelectors.chatFilterButton).should('be.visible').click()
    // select Open status from drop down list 
    cy.get(chatSelectors.statusDdl, {timeout: 10000}).eq(0).click()

    cy.get(chatSelectors.search).should('be.visible')
    cy.get(chatSelectors.typeNameFilter).should('be.visible')
  })

   it ('Verify chat history is displayed when user sends a message to the patient', ()=>{
    cy.get(chatSelectors.search, {timeout: 10000}).should('be.visible').type(cfData.testPatient3)
    cy.contains(cfData.testPatient3, {timeout: 10000}).click()

    cy.get(chatSelectors.textArea, {timeout: 10000}).type('Auto test message '+ randomMsg)

    cy.get(chatSelectors.sendButton).click()

    expect(cy.contains('Auto test message '+ randomMsg), {timeout: 10000})
  })
})
