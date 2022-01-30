/// <reference types="Cypress"/>

/*
AUTO-321 Verify the Next button is disabled on last page
AUTO-319 Verify the pagination on waitlist
AUTO-322 Verify the Default Count of records per page
AUTO-320 Verify the Previous button is disabled on first page
AUTO-331 Verify the total count of entries in the waitlist
*/

import schedulePageSelectors from '../../../../../../support/selectors/scheduling/schedulePageSelector';
import waitlistpageSelectors from '../../../../../../support/selectors/scheduling/scheduleWaitlistSelectors';
var totalPtCount = 0;
var qtnt = 0;
var pageCount = 0;
var pageNum = 0;

describe('validate waitlist functionaliy', () => {
    before(function () {
        cy.apilogin(Cypress.env('waitlistUser'), Cypress.env('waitlist_password'), Cypress.env('backendUrl') + "auth")
        cy.visit('/schedule')
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})
    })

    it('verify if the waitlist page is loaded', () => {
       // cy.get(schedulePageSelectors.scheduletab).click()
        cy.get('button[data-test-id="button_headerWaitlist"]').should('have.text', 'Waitlist').click()
        // cy.wait(5000)
        cy.get(waitlistpageSelectors.waitlistHeader).should('contain.text', 'in Waitlist').click()
    })

    it('verify if the pagination is displayed on Waitlist page', () => {
        cy.get('div.-pagination').should('have.descendants', waitlistpageSelectors.PageSection)
        cy.get('div.-pagination').should('have.descendants', waitlistpageSelectors.prevPageNavigateBtn)
        cy.get('div.-pagination').should('have.descendants', waitlistpageSelectors.nextPageNavigateBtn)
    })

    it('verify if the Previous Button is disabled on first page', () => {
        cy.get(waitlistpageSelectors.currentPageNum).invoke('attr', 'value')
            .then(val => {
                pageNum = val;
                if (pageNum == 1) {
                    cy.log('Current Page Number is 1, hence validating if the previous button is disabled')
                    cy.get(waitlistpageSelectors.prevPageNavigateBtn).parent('button').should('be.disabled')
                } else {
                    cy.log('********The expected default page value should be 1, but actual displayed value is' + pageNum)
                }
            });
    })
    it('verify if the Next Button is disabled on the last page', () => {
        cy.log('checking for total number of pages available')
        cy.get('span.-pageInfo > span.-totalPages').invoke('text')
            .then(totalpageCount => {
                pageCount = parseInt(totalpageCount);
                cy.log('total pages are ' + pageCount)
                cy.log('Navigating to the last page, which is : ' + pageCount)
                cy.get('.-pageJump > input').type(pageCount).type('{Enter}')
                // cy.wait(2000)
                cy.log('validating if the next button is disabled on the last page')
                cy.get(waitlistpageSelectors.nextPageNavigateBtn).parent('button').should('be.disabled')
            });
    })



    it('Verify the total count of wailtlist is correct in waitlist header', () => {
        // cy.log('checking for total number of pages available')
        cy.get(waitlistpageSelectors.waitlistCountOnHeader).invoke('text')
            .then(totalPatients => {
                totalPtCount = parseInt(totalPatients);
                cy.log('Total patients\'count displayed on waitlist header is: ' + totalPtCount)

                //Assumption: Maximum count on a page can be of 15 patients
                qtnt = Math.floor(totalPtCount / 15);
                var rem = totalPtCount % 15;
                if (rem != 0) {
                    cy.log('When remainder is not 0, then expected page count should be equals to quotient+1')
                    // cy.wait(1000)
                    expect(pageCount).to.equal(qtnt + 1)
                } else {
                    cy.log('When remainder is 0, then expected page count should be equals to quotient')
                    // cy.wait(1000)
                    expect(pageCount).to.equal(qtnt)
                }
                cy.log('Total pages should be (quotient*15+Remainder)')
                // cy.wait(1000)
                expect(qtnt * 15 + rem).to.equal(totalPtCount)
            })
    })


    it('Verify if the maximum default count on each waitlist page is 15 ', () => {
        cy.log('page count is ' + pageCount)
        if (pageCount > 2) {
            cy.log('Navigating to the first page')
            cy.get('.-pageJump > input').clear().type('1').type('{Enter}')
            cy.get(waitlistpageSelectors.recordsOnOnePage).each(($lis) => { }).then(($lis) => {
                expect($lis).to.have.length('15')
            })
            cy.log('Navigating to the 2nd last page')
            cy.get('.-pageJump > input').clear().type(pageCount - 1).type('{Enter}')
            cy.get(waitlistpageSelectors.recordsOnOnePage).each(($lis) => { }).then(($lis) => {
                expect($lis).to.have.length('15')
            })
        } else if (pageCount == 2) {
            cy.log('Navigating to the first page')
            cy.get('.-pageJump > input').clear().type('1').type('{Enter}')
            cy.get(waitlistpageSelectors.recordsOnOnePage).each(($lis) => { }).then(($lis) => {
                expect($lis).to.have.length('15')
            })
        } else{
            cy.log('Navigating to the first page')
            cy.get('.-pageJump > input').clear().type('1').type('{Enter}')
            cy.get(waitlistpageSelectors.recordsOnOnePage).each(($lis) => { }).then(($lis) => {
                expect($lis).to.have.length(totalPtCount)
            })
        }
    })
})
