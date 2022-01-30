/// <reference types="Cypress"/>
/*
 Test Epic: CRU-3315 Ability to delete CCP enterprise
 AUTO-282 Verify edit option which is above the delete option
 AUTO-279 Verify super admin cannot delete enterprise if it contains practices
 AUTO-280 Verify Carecru Super admin can delete a enterprise
 AUTO-281 Verify "cancel" button on prompt message

*/
import adminPage from "../../../../../support/selectors/enterprisemanagement/globalAdminpage";
var datas = require('../../../../../fixtures/gui/enterprisemanagement/golbalAdmin/enterpriseData.json')

describe('CRU-3315 Ability to delete CCP enterprise', () => {

    var enID = ""
    var mytoken = ""
    var counti = "NaN"
    var practiceID = ""

    before(function () {
        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('apiurl'))
        cy.on('uncaught:exception', (err,runnable) => {
            return false
        })
        cy.get('@authResponse').then((response) => {

            mytoken = response.body.token

            if (mytoken != "") {

                cy.createEnterpriseAPI(mytoken, Cypress.env('backendurl') + "/enterprises", datas.name, datas.plan, datas.organization)

                cy.get('@createEnterpriseAPI').then((response) => {

                    enID = response.body.result
                    Cypress.env('enId', response.body.result)
                })


            } else {
                cy.log("token is missing!")
            }
        })
        cy.visit('admin')
        cy.url().should('include', 'admin/enterprises/list')
    })

    beforeEach(function () {
        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), Cypress.env('apiurl'))
        cy.intercept(Cypress.env('backendUrl')+"api/enterprises/search?keywords*").as('getSearch')
        cy.intercept(Cypress.env('backendurl') + "api/enterprises/*").as('getDel')

    })

    it('Verify edit option which is above the delete option', () => {

        cy.get(adminPage.searchEnterprise).type(datas.name)
        cy.wait('@getSearch')
        cy.get(adminPage.menu).should('be.visible').click()
        cy.contains('Edit Group').should('be.enabled').click()
        cy.get(adminPage.editDialogWindow).contains('Edit Group').should('be.visible')

    })

    it('Verify super admin cannot delete enterprise if it contains practice', () => {

        if (mytoken != "") {

            var url = Cypress.env('backendurl') + "/enterprises/" + enID + "/accounts"

            cy.createPracticeAPI(mytoken, url, datas.practice.name, datas.practice.website, datas.practice.timezone,
                datas.practice.destinationPhoneNumber, datas.practice.street,
                datas.practice.country, datas.practice.state, datas.practice.city, datas.practice.zipCode)

            reloadScreen()

            cy.getPracticeAPI(mytoken, url).then((response) => {
                counti = response.body.result.length
                practiceID = response.body.result

                if (counti > 0) {
                    cy.get(adminPage.searchEnterprise).type(datas.name)
                    cy.wait('@getSearch')
                    cy.get(adminPage.menu).should('be.visible').click()
                    cy.contains('Delete').should('be.disabled')
                }

                var purl = Cypress.env('backendurl') + "/enterprises/" + enID + "/accounts/" + practiceID

                cy.delete(mytoken, purl)

                cy.get('@delete').then((response) => {
                    var statuCode = response.status
                    expect(statuCode).to.eq(204)
                })

            })

        } else {
            cy.log("Token is missing")
        }
    })

    it('Verify "cancel" button on prompt message', () => {

        reloadScreen()

        cy.get(adminPage.searchEnterprise).type(datas.name)
        cy.wait('@getSearch')
        cy.get(adminPage.menu).should('be.visible').click()
        cy.contains('Delete').should('be.enabled').click()

        cy.on('window:confirm', (text) => {
            expect(text).to.contains('Are you sure you want to delete ' + datas.name + "?");
            return false;
        });


        reloadScreen()
        cy.get(adminPage.searchEnterprise).type(datas.name)
        cy.wait('@getSearch')
        cy.get(adminPage.enterpriseName).should('be.visible').should('have.text', datas.name)

    })

    it('Verify Carecru Super admin can delete a enterprise', () => {

        reloadScreen()

        cy.get(adminPage.searchEnterprise).type(datas.name)
        cy.wait('@getSearch')
        cy.get(adminPage.menu).should('be.visible').click()
        cy.contains('Delete').should('be.enabled').click()

        //cy.wait('@getDel')

        cy.get(adminPage.successAlert).eq(1).should('have.text', 'Group delete success')

    })

})

function reloadScreen() {
    cy.reload()
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
}


