/// <reference types="Cypress"/>


Cypress.Commands.add('getFormNames', (selector, value, length) => {

    cy.get(selector).then(($forms) => {
        var len
        len = $forms.length

        if (len == length) {
            cy.log($forms.text())
            expect($forms).to.contain(value)
        } else {
            cy.log("Fixture Data not Matched!")
        }
    })
})


Cypress.Commands.add('validateCopyCommand', (selector) => {

    cy.get(selector).each(($urls) => {
        const expectedText = $urls.text()

        cy.wrap($urls).trigger('click')

        cy.task('getClipboard').should('eq', expectedText)

    })
})

Cypress.Commands.add('validateShortUrlActive', (selector) => {


    cy.get(selector).should('have.length', 13).each(($urls, index, $lis) => {
        var url = $urls.text()
        cy.log(url)

        cy.request({
            url: url,
            followRedirect: false,
        }).then((resp) => {
            
            expect(resp.status).to.eq(302)
            expect(resp.redirectedToUrl).to.contains('https://forms.carecru.com/')
        })
    })

})
