/// <reference types="Cypress"/>

/** 
 * AUTO-170 Setting Practice Page Sanity: Verify the chairs are correctly synced from pms with correct status
 */
const testData = require('../../../../../fixtures/gui/integrations/chairsdata.json')
testData.forEach((data)=>{
  describe('This validates chairs are correctly synced from PMS to care cru for ' +data.pms ,{retries:2}, () => {
    let isChairDataEmpty
    let chairResponse
    before(function () {
      cy.wait(2000)
      cy.log('navigate to Chairs section on successful log in')
      cy.uiLoginByAPI(data.username, data.pwd, Cypress.env('backendUrl') + "auth")
      cy.visit('/settings/practice/chairs')
      cy.wait(4000)
      cy.on('uncaught:exception', (err, runnable) => {
        
          return false
        });
    })

    it('get All chairs data from API for ' +data.pms, () => {
      cy.getChairs(Cypress.env('token')).then((res) => {
        let value = Object.keys(res)[0]
        if (!value.includes('body')) {
          chairResponse = res
        }
        else {
          cy.log('*****************Chair Response is null')
          isChairDataEmpty = true
        }

      })
    })
    it('verifyChairsSyncTo ' +data.pms, () => {
      cy.log('************** asserts that user is able to verify chairs correctly synced back to Care cru ')
      if (!isChairDataEmpty) {
        cy.verifyChairsCorrectlyDisplayed(chairResponse)
      }
      else {
        cy.log('********************No chair found with given account')
      }
    })
  })
})
