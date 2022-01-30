import practiceSelector from "../../../selectors/integrations/practiceSelectors"
import uihelper from "../../../../integration/donna/gui/smoketests/common/UIHelper"

Cypress.Commands.add("validatePracticeOfficeHoursDisplayed", () => {
   cy.get(practiceSelector.officeHoursHeader).should('have.text', 'Office Hours')
})


Cypress.Commands.add("validatePracticeOfficeHours", (jsonObject) => {
   cy.log('***Validating Practice office hours between PMS and CareCru::***')
   let map=uihelper.fetchPracticeOfficeHours(jsonObject)
   cy.get(practiceSelector.practice_day).each((element, index, list) => {
      cy.log('***Comparing time-slots for ' + element.text() + ':=>***').then(() => {
         let timeSlotsUI = element.next().text()
         expect(timeSlotsUI).to.equal(map.get(element.text()))
      })

   })
})