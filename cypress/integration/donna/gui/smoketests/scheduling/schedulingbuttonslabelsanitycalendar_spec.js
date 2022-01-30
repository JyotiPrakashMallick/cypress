/// <reference types="Cypress"/>
//import { beforeEach,afterAll,beforeAll } from "mocha"
import schedulePageSelector from  '../../../../../support/selectors/scheduling/schedulePageSelector'
/**
 * This verifies the commonly used buttons in schedulling page, 
 * Asserts that current date/month/day label are displayed correctly
 * Asserts also the schedule page tab href is visible
 * This uses selector method and app action
 */
describe('Sanity Test for Schedule Page waitlist button, today button,current date label,current month label,calendar widget, and p', function () {
 let scheduletestdata;
  before(()=>{

    cy.apilogin(Cypress.env('userwritePMS'),Cypress.env('password'),(Cypress.env('backendUrl')+"auth"))
    cy.visit(Cypress.env('pageSchedule'))
    cy.url().should('include', Cypress.env('pageSchedule'))
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false})
  })
  beforeEach(()=>{
    cy.fixture('gui/scheduling/testdataschedulesanitypage').then((scheduledata)=>{
      scheduletestdata=scheduledata
     cy.log(scheduletestdata.calendarDate)
      })  

  })
  it ('allows user to navigate to future and previous date and select date in calendar widget', function () {
    cy.log('Calendate to pass:',scheduletestdata.calendarDate)
    const futuredate= parseInt(scheduletestdata.calendarDate) + 1 
    cy.log('Future Date:', futuredate)
    const previousdate= futuredate-1
    cy.log('Previous Date:',previousdate)

    cy.log('Asserts and verify that by default it should display current calendar date')
    cy.getcurrentcalendardate().then(datevalue=>{
      cy.log("datavalue:"+datevalue)
      cy.assertscurrentdatelabel(datevalue)    
    })
    
    cy.get(schedulePageSelector.calendarWidget)
      .should('be.visible') 
    cy.log('Pass the calendar date from fixture which is :'+ scheduletestdata.calendarDate)
    cy.selectfromthelist(schedulePageSelector.calendarDate,scheduletestdata.calendarDate)
    cy.log('Asserts that the date label is also updated when calendar date is selected')
    cy.get(schedulePageSelector.datelabel)
      .should('be.visible')
      .should('have.text',scheduletestdata.calendarDate)

    cy.log('Asserts that user can navigate to future date') 
    cy.get(schedulePageSelector.futureArrow)
      .should('be.visible')
      .click()
    cy.get(schedulePageSelector.datelabel)
      .should('be.visible')
      .should('have.text',futuredate)
    cy.log('Asserts that user can navigate to previous date')
    cy.get(schedulePageSelector.previousArrow)
      .should('be.visible')
      .click()
    cy.get(schedulePageSelector.datelabel)
      .should('be.visible')
      .should('have.text',previousdate)
     cy.log('asserts today button is clickable')
     cy.clicktodaybutton()
     cy.getcurrentcalendardate().then(datevalue=>{
           cy.log(datevalue)
           cy.assertscurrentdatelabel(datevalue)
         })

 })

  it('asserts commonly used buttons(waitlist/today) and labels for current date and month are visible', ()=> {
    cy.log('Asserts Today button is visible')
    cy.assertstodaybuttonisavailable()
    cy.log('Asserts Waitlist button is visible') 
    cy.assertswaitlistbuttonisvisible()
    cy.log('Asserts that the current date')
    cy.getcurrentcalendardate().then(datevalue=>{
      cy.log(datevalue)
      cy.assertscurrentdatelabel(datevalue)
    })
    cy.getcurrentdayoftheweek().then(dayweekvalue=>{
      cy.log(dayweekvalue)
      cy.assertscurrentdayofweek(dayweekvalue)
    })
    cy.getcurrentcalendarmonth().then(monthvalue=>{
      cy.log(monthvalue)
      cy.assertscurrentmonthlabel(monthvalue)
    })
  })  
})
