/// <reference types="Cypress"/>

import waitlist from "../../../../../support/selectors/scheduling/schedulePageSelector";
import waitlistSelectors from '../../../../../support/selectors/scheduling/waitlist/waitlistPageSelectors'

const waittlistData = require('../../../../../fixtures/gui/scheduling/waitlistpagedata.json')

describe('Patient Waitlist Test', () => {

    //Setup the test
    beforeEach(function () {
        cy.apilogin(Cypress.env('waitlistUser'), Cypress.env('waitlist_password'), Cypress.env('apiurl'))
        cy.visit('/schedule')
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})
        cy.url().should('include', '/schedule')
        
    })
    it('Verify Add to WaitList', () => {
        cy.get(waitlist.waitListButton, {timeout: 10000}).should('exist').click()
        cy.get(waitlist.addTowaitlist).should('exist').click()

        cy.get(waitlist.addButton).should('exist').should('not.be.enabled')
        cy.get(waitlist.cancelButton).should('exist')
        cy.get(waitlist.addPatient).should('exist').type(waittlistData.shortpatientName)
        
        cy.selectfromthelist(waitlist.patientList, waittlistData.fullpatientName)

        cy.get(waitlist.removeWaitlistDate).should('exist').click()
        cy.get(waitlist.datePickerHeader).should('exist')
        //cy.selectDateFromCalendar(waitlist.datePickerHeader, waitlist.odayPicker,waitlist.nextMonth,waitlist.previousMonth,false,waittlistData.day, waittlistData.month, waittlistData.year)
        cy.get(waitlist.today).click()

        cy.get(waitlist.preferredDays).should('exist').click()
        cy.selectfromthelist(waitlist.listDays, waittlistData.preferredDay)

        cy.get(waitlist.preferredTime).should('exist').click()
        cy.selectfromthelist(waitlist.listTime, waittlistData.preferredTime)

        cy.get(waitlist.commonDropDownResonPreferredPractitioner).contains('Reason').click({ force: true })
        cy.randomlyselectfromdropdown(waitlist.dropOptions)
        cy.get(waitlist.commonDropDownResonPreferredPractitioner).contains('Preferred Practitioner').click({ force: true })
        cy.randomlyselectfromdropdown(waitlist.dropOptions)

        cy.clearetext(waitlist.unit)
        cy.typeRandomNumber(waitlist.unit, 5, 10)
        
        cy.get(waitlist.notes).should('exist').type(waittlistData.notes)

        cy.get(waitlist.addButton).should('exist').should('be.enabled').click()

        cy.reload()
        cy.get(waitlist.waitListButton, {timeout: 15000}).should('exist').click()

        cy.get(waitlist.waitlistTable, {timeout: 10000}).should('exist').each(() => {
        }).then(($el) => {
            expect($el.text()).to.contain(waittlistData.notes)
            expect($el.text()).to.contain(waittlistData.shortpatientName)
            expect($el.text()).to.contain(waittlistData.preferredDay)
            expect($el.text()).to.contain(today())
        }) 
    })
    it('Remove from WaitList', () => {
        cy.get(waitlist.waitListButton, {timeout: 10000}).should('exist').click()

        // get patient count in waitlist
        cy.getCountOfWaitlistPatients().then(c1 =>{
        cy.log("patient count after adding is " +c1)
  
        // search the patient
        cy.get(waitlistSelectors.filterByName).type(waittlistData.fullpatientName)
  
        cy.get(waitlistSelectors.firstCheckbox, {timeout : 10000}).should('be.visible').click({force:true})
  
        cy.contains("Remove from Waitlist").click()
  
        cy.on('window:confirm', () => true)
  
        cy.reload()
        // click on waitlist button
        cy.get(waitlistSelectors.waitlist, {timeout : 10000}).click() 
  
        // get patient count after removal of new patient in waitlist
        cy.getCountOfWaitlistPatients().then(c2 =>{
        
        // assert the count is decreased
        expect(parseInt(c2)).to.be.equal(c1 - 1)
        })
      })
    })
}) 


function today(){

var MyDate = new Date();
var MyDateString;

MyDateString = MyDate.getFullYear()+'/'+('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
             + ('0' + MyDate.getDate()).slice(-2)

return MyDateString;
}