/// <reference types="Cypress"/>

/*
AUTO-118 Reject an online booking request appointment
AUTO-203 Verify that online request when click on the request it displays the appointment request details
*/
import onlineRequestsSelectors from '../../../../../../support/selectors/scheduling/onlineRequestsSelectors'

describe('Appointment Request Details Verification and Rejection of Appointment Request', {retries: 1}, () => {
    let bookingData, reqCnt, reqCount, reqCnt2, reqCount2
    //setup the test
    beforeEach(() => {
        // load data from fixtures
        cy.fixture('gui/automationworkflow/accounts').then((accountData)=>{
            accountData=accountData
      
        cy.apilogin(accountData[2].username, accountData[2].pwd, Cypress.env('backendUrl')+"auth") })
        
        cy.fixture('api/scheduling/onlineBooking').then((obData)=>{
            bookingData=obData
        })

        cy.on('uncaught:exception', () => {
            return false })
        
        cy.intercept(Cypress.env('backendUrl')+"api/users").as('waitForResult')
    })
    it('Verify user is able to make an online booking request', ()=>{
      // do online booking via api
      cy.doMyOnlineBooking(Cypress.env("token"),
                          bookingData.accountId,
                          bookingData.insuranceCarrier,
                          bookingData.patientUserId,
                          bookingData.practitionerId,
                          bookingData.requestingPatientUserId,
                          bookingData.serviceId,
                          bookingData.note)
    })
    it('Verify the appointment request details', ()=>{
      cy.visit(Cypress.env('baseUrl')) 
      cy.wait('@waitForResult', {timeout: 9000}).its('response.statusCode').should('eq', 200)

      cy.get(onlineRequestsSelectors.onlineRequestTab, {timeout: 10000}).eq(0).should('be.visible').click()

      cy.contains(bookingData.patientName).eq(0).click()

      // assert request details
      cy.getMyWeekAndDate().then(datevalue =>{ 
        expect(cy.contains(datevalue))
      })

      // assert timing
      cy.get(onlineRequestsSelectors.timing).eq(1).should('be.visible')

      // assert appointment type
      expect(cy.contains(bookingData.appointmentType))

      // assert practitioner Name
      expect(cy.contains(bookingData.practitionerName))

      // assert patient's phone number
      expect(cy.contains(bookingData.patientNumber))

      // assert patient's email
      expect(cy.contains(bookingData.patientEmail))

      // assert insurance carrier
      expect(cy.contains(bookingData.insuranceCarrier))

      // assert note
      expect(cy.contains(bookingData.note))
     
      // assert appointment requested on date
      cy.getShortFormattedDate().then(datevalue =>{ 
        expect(cy.contains(" Requested on: " + datevalue )) })

      // assert Reject button
      cy.get(onlineRequestsSelectors.rejectButton).should('be.visible')

      // assert Accept button
      cy.get(onlineRequestsSelectors.acceptButton).should('be.visible')
    })
    it('Verify user is able to reject the online booked request', ()=>{
      cy.visit(Cypress.env('baseUrl')) 
      cy.wait('@waitForResult', {timeout: 9000}).its('response.statusCode').should('eq', 200)

      cy.get(onlineRequestsSelectors.onlineRequestTab, {timeout: 10000}).eq(0).should('be.visible').click()

      // get the number of requests
      cy.get(onlineRequestsSelectors.activeTab, {timeout: 10000})
      .should('be.visible')
      .invoke('text').then((text)=>{
        reqCnt=text

        reqCnt=reqCnt.replace(/\D/g,'')
        reqCount = parseInt(reqCnt)
        cy.log("Increased number of online requests are " + reqCount)
                          
      // reject online booking request
      cy.get(onlineRequestsSelectors.numberOfRequests).contains(bookingData.patientName).eq(0).click()  
      cy.get(onlineRequestsSelectors.rejectButton).should('be.visible').click() 
      
      cy.on('window:confirm', (str) => {
        expect(str).to
            .equal(bookingData.rejectmsg)
        })

      cy.reload()
      cy.wait('@waitForResult', {timeout: 9000}).its('response.statusCode').should('eq', 200)

      cy.get(onlineRequestsSelectors.onlineRequestTab, {timeout: 10000})
      .eq(0)
      .should('be.visible').click()

      // verify the number of requests
      cy.get(onlineRequestsSelectors.activeTab, {timeout: 10000})
      .should('be.visible').invoke('text').then((text)=>{
        reqCnt2=text

        reqCnt2=reqCnt2.replace(/\D/g,'')
        reqCount2 = parseInt(reqCnt2)
        cy.log("number of online requests after rejection are " + reqCount2)
        expect(reqCount2).to.be.eq(reqCount-1)
      }) 
    }) 
  })
})
