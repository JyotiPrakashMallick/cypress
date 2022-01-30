/// <reference types="Cypress"/>
/**
 * For online booking widget
 */
import onlineBookingwidgetSelector from '../../../../../support/selectors/scheduling/onlineBookingWidgetSelector'

describe ('Online Booking Sanity Tests', function()
 {
    before(function(){
        cy.visit(Cypress.env('bookingUrl'))
        cy.url().should('include', Cypress.env('bookingUrl'))
        cy.on('uncaught:exception', (err, runnable) => {
           // returning false here prevents Cypress from
           // failing the test
           return false})
    })

    beforeEach(()=>{
       cy.fixture('gui/scheduling/testdataonlinebookingwidget').then((data)=>{
         this.data=data
         })  
   
     })

    it ('verify booking page has been loaded properly', () => {
        cy.log('Asserts that Iframe can be loaded')
        cy.get('iframe')
    })

    it ('verify that booking button is visible and can be clicked', () => {
       
        cy.log('Asserts that Booking button can be clicked')
        cy.get(onlineBookingwidgetSelector.bookingButton)
           .should('be.visible')
           .click({ multiple: true, force: true })

    })

    it ('verify that a reason can be selected', () => {

       cy.log('Asserts that resaons are visible and can be chosen for the appointment')
       cy.getIframeBody()
           .find(onlineBookingwidgetSelector.reasonsCard)
           .find(onlineBookingwidgetSelector.reasonsCardButton)
           .should('be.visible')
           .click({ multiple: true, force:true})

    })

    it('verify that a practitioner can be selected', () => {

       cy.log('Asserts that practitioners are visible and can be chosen for the reason')
       cy.getIframeBody()
           .find(onlineBookingwidgetSelector.practitionerCard)
           .find(onlineBookingwidgetSelector.practitionerCardButton)
           .should('be.visible')
           .click({ multiple: true, force: true })

    })

    it('verify that todays button can be clicked' , () => {

       cy.log('Asserts today button is clickable and today appointment can be chosen')

       cy.getcurrentcalendardate().then(todaydate=>{
            cy.log(todaydate)
            cy.getIframeBody()
              .find(onlineBookingwidgetSelector.todaybutton)
              //.contains(todaydate)
              .should('be.visible')
              .should('not.be.disabled')
              .click()
        })
       
    })

    it('verify that slot can be selected' , () => {

       cy.log('Asserts some slot can be selected')

       cy.wait(4000)

       cy.getIframeBody().then((iFrameBody) => {

           if(iFrameBody.find(onlineBookingwidgetSelector.nextAvailButton).length>0){
               

                cy.getIframeBody().find(onlineBookingwidgetSelector.nextAvailButton)
                    .should('be.visible')
                    .should('not.be.disabled')
                    .click({ multiple: true, force: true })

                cy.getIframeBody().find(onlineBookingwidgetSelector.slotTime)
                   .should('be.visible')
                   .should('not.be.disabled')
                   .click({ multiple: true, force: true })
                
           }

           else{

                cy.getIframeBody().find(onlineBookingwidgetSelector.slotTime)
                     .should('be.visible')
                     .should('not.be.disabled')
                     .click({ multiple: true, force: true })

                cy.log('Else condition parsed')

           }
       })
        
    })

    it('verify that user redirects to login page' , () => {

       cy.wait(4000)

       cy.log('Asserts that after selecting slot it can redirect to pateint login page after cancellin joining waitlist')
       cy.getIframeBody()
           .find(onlineBookingwidgetSelector.nextButton)
           .should('be.visible')
           .should('not.be.disabled')
           .click({ multiple: true, force: true })

           cy.getIframeBody().then((iFrameBody) => {
            if (iFrameBody.find(onlineBookingwidgetSelector.waitlistDialog,{ timeout: 10000 }).length>0){

                cy.getIframeBody()
                    .find(onlineBookingwidgetSelector.waitlistCancel)
                    .should('have.text','No, thanks!')
                    .click({force:true})        
                
                cy.log('No waitlist selected')
            }
            else{
                cy.log('No waitlist available')
            }
        
        })
    })
7
    it('verify that patient can sign in to his/her account and book an appointment with signed in user' , () => {

       cy.log('Asserts that patient can sign in')
       cy.getIframeBody()
           .find(onlineBookingwidgetSelector.emailInput,{timeout: 4000})
           .type(this.data.LoginEmail)

       cy.getIframeBody()
           .find(onlineBookingwidgetSelector.passInput)
           .should('be.visible')
           .should('not.be.disabled')
           .type(this.data.Password)

       cy.getIframeBody()
           .find(onlineBookingwidgetSelector.submitForm)
           .should('be.visible')
           .should('not.be.disabled')
           .click()

        cy.log('Asserts that patient can fill its info')
        cy.getIframeBody()
           .find(onlineBookingwidgetSelector.nextButton)
           .should('be.visible')
           .should('not.be.disabled')
           .click()


        cy.log('Asserts that additional notes are written')
        cy.getIframeBody()
           .find(onlineBookingwidgetSelector.notesArea)
           .should('be.visible')
           .should('not.be.disabled')
           .type(this.data.Notes)
    
        cy.getIframeBody()
           .find(onlineBookingwidgetSelector.nextButton)
           .should('be.visible')
           .should('not.be.disabled')
           .click()

        cy.getIframeBody()
           .find(onlineBookingwidgetSelector.patientInfoPanel)
           .find('p')
           .should('contain',this.data.FirstName)
  
        cy.getIframeBody()
           .find(onlineBookingwidgetSelector.patientInfoPanel)
           .find('p')
           .should('contain',this.data.LastName)
  
        cy.getIframeBody()
           .find(onlineBookingwidgetSelector.patientInfoPanel)
           .find('p')
           .should('contain',this.data.Notes)

        cy.getIframeBody()
            .find(onlineBookingwidgetSelector.nextButton)
            .should('be.visible')
            .should('not.be.disabled')
            .click()
    
       
    })

 })