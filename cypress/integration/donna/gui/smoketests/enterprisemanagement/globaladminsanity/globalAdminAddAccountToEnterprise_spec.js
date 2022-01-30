/// <reference types = "Cypress"/>
import globaladminsanityselector from "../../../../../../support/selectors/enterprisemanagement/globaladminsanityselector"

describe("This tests the global admin's ability to add a new practice to an existing enterprise", () => {

    before(function(){
        cy.fixture('gui/enterprisemanagement/globaladmintestdata.json').then(function(testdata){
            this.testdata = testdata
        })
    })

    it('Login to test.carecru.com and add a new practice to an enterprise', function(){ 
        //Visit and login to test.carecru.com 
       // cy.visit('https://test.carecru.com')
        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('backendUrl')+'auth')
        cy.on('uncaught:exception', (err,runnable) => {
            return false
        })
        //Super admin tab
        cy.visit('admin/enterprises/list')
        //Add practice
        cy.contains('Add Practice').click()

        //Select an enterprise from the drop down menu or by typing
        cy.contains('Select a Group').should('be.visible')
        cy.contains('Select a Group').click()
        cy.contains('Select a Group').type('00testpractice1{enter}')
        
        //    Practice Details
        //Input Name
        cy.get(globaladminsanityselector.inputName).click({force : true})
        cy.get(globaladminsanityselector.inputName).type(this.testdata.practice_name)

        //Input website
        cy.get(globaladminsanityselector.inputWebsite).click({force : true})
        cy.get(globaladminsanityselector.inputWebsite).type(this.testdata.website)

        //Select Timezone
        cy.contains('Timezone').should('be.visible')
        cy.contains('Timezone').click({force : true})
        cy.get(globaladminsanityselector.timezone).click({force : true})

        //Input Destination Phone Number
        cy.get(globaladminsanityselector.inputDestinationPhoneNumber).click({force : true})
        cy.get(globaladminsanityselector.inputDestinationPhoneNumber).type(this.testdata.dest_phone_number)

        //Click next
        cy.get(globaladminsanityselector.nextButton).click()

        //    Address
        //Input Street Address
        cy.get(globaladminsanityselector.inputStreet).click({force : true})
        cy.get(globaladminsanityselector.inputStreet).type(this.testdata.street_address)

        //Select Country
        cy.contains('Country').should('be.visible')
        cy.contains('Country').click({force : true})
        cy.contains('Canada').click()

        //Input City
        cy.get(globaladminsanityselector.inputCity).click({force : true})
        cy.get(globaladminsanityselector.inputCity).type(this.testdata.city)

        //Select State
        cy.contains('State').should('be.visible')
        cy.contains('State').click({force : true})
        cy.get(globaladminsanityselector.select_state).click({force : true})
       
        //Input Postal Code
        cy.get(globaladminsanityselector.inputZipCode).click({force : true})
        cy.get(globaladminsanityselector.inputZipCode).type(this.testdata.postal_code)

        //Click next
        cy.get(globaladminsanityselector.nextButton).click()

        //    Add owner User
        //Input First Name
        cy.get(globaladminsanityselector.inputFirstName).click({force : true})
        cy.get(globaladminsanityselector.inputFirstName).type(this.testdata.first_name)

        //Input Last Name
        cy.get(globaladminsanityselector.inputLastName).click({force : true})
        cy.get(globaladminsanityselector.inputLastName).type(this.testdata.last_name)

        //Input Email
        //Types in [[randomstring]]@[[randomstring]].com
        cy.typeRandomString(13, globaladminsanityselector.inputEmail)
        cy.get(globaladminsanityselector.inputEmail).type('@')
        cy.typeRandomString(5, globaladminsanityselector.inputEmail)
        cy.get(globaladminsanityselector.inputEmail).type('.com')

        //Input Password
        cy.get(globaladminsanityselector.inputPassword).click({force : true})
        cy.get(globaladminsanityselector.inputPassword).type(Cypress.env('password'))

        //Input Password Confirmation
        cy.get(globaladminsanityselector.inputConfirmPassword).click({force : true})
        cy.get(globaladminsanityselector.inputConfirmPassword).type(Cypress.env('password'))

        //Click next
        cy.get(globaladminsanityselector.nextButton).click()

        //    Select Account Options
        //Reputation management
        cy.get(globaladminsanityselector.reputation_management).click({multiple : true, force : true})

        //Directory Listing
        cy.get(globaladminsanityselector.directory_listing).click({multiple : true, force : true})

        //Call tracking
        cy.get(globaladminsanityselector.call_tracking).click({multiple : true, force : true})

        //Reminders
        cy.get(globaladminsanityselector.reminders).click({multiple : true, force : true})

        //Recalls
        cy.get(globaladminsanityselector.recalls).click({multiple : true, force : true})

        //Reviews
        cy.get(globaladminsanityselector.reviews).click({multiple : true, force : true})

        //Click Add new practice
        //cy.wait(500)
        cy.get(globaladminsanityselector.nextButton, {timeout:6000}).should('be.visible')
        cy.get(globaladminsanityselector.nextButton).click({multiple : true, force : true})

        //Assert Account has been created
        cy.contains('Account has been created').should('contain.text', 'Account has been created')
        expect('Account has been created').to.equal('Account has been created')

    })
})