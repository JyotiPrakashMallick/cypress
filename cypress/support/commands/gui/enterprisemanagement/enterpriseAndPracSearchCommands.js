
import enterprisePracticeSelector from '../../../selectors/enterprisemanagement/globalAdminpage'
const testData = require('../../../../fixtures/gui/enterprisemanagement/entPracSearchDataWithNumAndSpChar.json')

Cypress.Commands.add('searchEnterpriseName', (entName) => {
    cy.get(enterprisePracticeSelector.enterpriseName)
        .each(($el, index, $list) => {
            var enterpriseName = $el.text()
            if ($list.length == 1) {
                cy.log('Since there is only 1 group displayed as search-results; hence validating the group name with the expected value')
                cy.log($list.length)
                enterpriseName = $el.text()
                if (enterpriseName === entName) {
                    expect(enterpriseName).to.equals(entName)
                    cy.log('The enterprise under search, "' + entName+ '" is available')
                }
            } else if($list.length > 1){
                cy.log('Since there are more than 1 group displayed in search-results, hence atleast one group-name should be with expected enterprise name')
                cy.log($list.length)
                enterpriseName = $el.text()
                if (enterpriseName === entName) {
                    expect(enterpriseName).to.equals(entName)
                    cy.log('The enterprise under search, "' + entName+ '" is available')
                }
            }
        })
})

Cypress.Commands.add('searchPracticeName', (pracName) => {
    cy.get(enterprisePracticeSelector.enterpriseName)
        .each(($el, index, $lis) => {
            var eName = $el.text()
            let pName
            if ($lis.length == 1) {
                cy.log('Since there is only 1 group displayed as search-results; hence validating if the practice is available inside this group')
                cy.log($lis.length)
                cy.get($el).click()
                cy.get(enterprisePracticeSelector.practiceNames)
                    .each(($ele, index, $lis) => {
                        pName = $ele.text()
                        if (pName === pracName) {
                            expect(pName).to.equals(pracName)
                            cy.log('The practice under search, "' + pracName + '" is available in this group: ' + eName)
                        }
                    })
            } else if ($lis.length > 1 && !eName.includes(pracName)) {
                cy.log('Since there are more than 1 group displayed as search-results and this group name doesn\'t contain the practice name under search; hence validating if the practice is available inside this group')
                cy.get($el).click()
                cy.get(enterprisePracticeSelector.practiceNames)
                    .each(($ele, index, $lis) => {
                        pName = $ele.text()
                        if (pName === pracName) {
                            expect(pName).to.equals(pracName)
                            cy.log('The practice under search, "' + pracName + '" is available in this group: ' + eName)
                        } else if (pName.includes(pracName)) {
                            cy.log('Another similar practice (' + pName + ') to the practice under search (' + pracName + ') is available in this group: ' + eName)
                        }
                    })
            } else if ($lis.length > 1 && eName.includes(pracName)) {
                cy.log('Since there are more than 1 group displayed as search-results and this group name also contains the practice name under search; but still checking if that practice is available inside this group')
                cy.get($el).click()
                cy.get(enterprisePracticeSelector.practiceNames)
                    .each(($ele, index, $lis) => {
                        pName = $ele.text()
                        if (pName === pracName) {
                            expect(pName).to.equals(pracName)
                            cy.log('The practice under search, "' + pracName + '" is available in this group : ' + eName + ' also.')
                        }
                    })
            }
        })
})

Cypress.Commands.add('searchEnterpriseNameWithNumerics', (entNameNums) => {
    cy.get(enterprisePracticeSelector.enterpriseName)
        .each(($el, index, $list) => {
            var enterpriseName = $el.text()
            expect($list.length).to.equals(1)
            if(entNameNums=='3304'){
                expect(enterpriseName).to.includes(entNameNums)
                expect(enterpriseName).to.equals(testData.enterpriseName)
            }
        })
})

Cypress.Commands.add('searchEnterpriseNameWithSpChars', (entNameSpChars) => {
    cy.get(enterprisePracticeSelector.enterpriseName)
        .each(($el, index, $list) => {
            var enterpriseName = $el.text()
            expect($list.length).to.equals(1)
            if(entNameSpChars=='$$'){
                expect(enterpriseName).to.includes(entNameSpChars)
                expect(enterpriseName).to.equals(testData.enterpriseName)
            }
        })
})


Cypress.Commands.add('searchPracticeNameWithSpChars', () => {
    cy.get(enterprisePracticeSelector.enterpriseName)
        .each(($el, index, $list) => {
            if(index==1){
                expect($list.length).to.equals(1)
                cy.get($el).click()
                cy.get(enterprisePracticeSelector.practiceNames).first().should('have.text',testData.practiceName)
            }
        })
})
Cypress.Commands.add('searchPracticeNameWithNumerics', (pracNameNums) => {
    cy.get(enterprisePracticeSelector.enterpriseName)
        .each(($el, index, $list) => {
            if(index==1 && pracNameNums=='3304'){
                expect($list.length).to.equals(1)
                cy.get($el).click()
                cy.get(enterprisePracticeSelector.practiceNames).first().should('have.text',testData.practiceName)
            }
        })
})