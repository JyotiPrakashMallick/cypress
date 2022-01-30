import patientSelector from "../../../selectors/patientmanagement/patientManagementSelectors.js"
import uihelper from "../../../../integration/donna/gui/smoketests/common/UIHelper"

/*
     This custom commands is navigating us to Patient Management tab.
*/
Cypress.Commands.add("navigateToPatientManagement", () => {
    cy.isDisplayed(patientSelector.navigateToPatientManagement)
    cy.get(patientSelector.navigateToPatientManagement).click({ force: true })
})

/*
     This custom commands is validating new Patient form .
*/
Cypress.Commands.add("addNewPatient", (patientData) => {
    cy.get(patientSelector.createNewPatientButton, { timeout: 10000 })
    cy.isDisplayed(patientSelector.createNewPatientButton)
    cy.clickOn(patientSelector.createNewPatientButton)
    cy.log('***************' + '***add new patient button clicked succesfully***')
    cy.wait(1000)
    cy.get(patientSelector.newPatientForm).eq(0).should('be.visible').then(function (txt) {

        expect(txt.text()).to.include('This will create a new patient in your practice software and in CareCru')
    })
    cy.fillPatientForm(patientData)
})

/*
     This custom commands is filling all fields for adding new patient..
*/
Cypress.Commands.add("fillPatientForm", (patientData) => {
    cy.typeKeys(patientSelector.firstName, Math.random().toString(36).substring(2, 7))
    cy.typeKeys(patientSelector.lastName, Math.random().toString(36).substring(3, 7))
    cy.get(patientSelector.gender).click()
    cy.get(patientSelector.gender_Male).click()
    cy.typeKeys(patientSelector.mobileNumber, patientData.mobileNumber)
    cy.typeKeys(patientSelector.email, patientData.email)
    cy.typeKeys(patientSelector.birthDate, patientData.birthDate)
    cy.wait(1000)
    cy.window().then((win) => {
        const identifiedElement = win.document.querySelector('.formWarning__warningMessage___2XdPz')
        cy.log('Object value = ' + identifiedElement)

        if (identifiedElement == null) {
            cy.get(patientSelector.saveButton).should('be.enabled').click()
            // cy.get(patientSelector.cancelButton).click()
            cy.assertPatientToastMessageSuccess(patientData.toastMessage)
        }

        else {
            cy.log('***************' + '***' + patientData.duplicatePatientMsg + '***')
        }
    });
})

Cypress.Commands.add('assertPatientToastMessageSuccess', (toastmessage) => {

    cy.get(patientSelector.toastMessageHeader, { timeout: 1000 }).should('be.visible').then(function (txt) {
        var toast = txt.text()
        expect(toastmessage).to.equal(toast)
    })


})