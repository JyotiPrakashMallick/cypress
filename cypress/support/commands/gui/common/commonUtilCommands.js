Cypress.Commands.add("typeKeys", (locator,text) => {
    cy.get(locator).type(text)
    cy.log('Typed text is ' + text)
})
Cypress.Commands.add("verifyText", (elementLocator,text) => {
    cy.get(elementLocator).should('have.text',text)
    cy.log('Given text ' +text+ ' succesfully verified')
})
Cypress.Commands.add("clearSessionStorage",()=>{
    cy.window().then((win) => {
        win.sessionStorage.clear()
    });
})

Cypress.Commands.add("isDisplayed",(selector)=>{
    cy.get(selector,{timeout:5000}).should("be.visible")
})
Cypress.Commands.add("clickOn",(selector)=>{
    cy.get(selector,{timeout:5000}).click({force:true})
})
Cypress.Commands.add("getTextFromLocator",(selector)=>{
    let text
    cy.get(selector).then(function(ele){
    text=ele.text()
    })
    return cy.wrap(text)
})

Cypress.Commands.add("selectDropdownByListOfValues",(selector, listOfValues)=>{
    // https://on.cypress.io/select
  // select multiple values by passing an array
  cy.get(selector).select(listOfValues)
  // confirm the selected value - note that the values are sorted
  // and because it is an array we need to use deep equality
  // against the yielded list from ".invoke('val')"
  cy.get(selector).invoke('val').should('deep.equal', listOfValues)
  // remove the focus from <select> element
  cy.get(selector).blur()
})
Cypress.Commands.add("selectDropdownByValue",(selector, optionValue)=>{
    // https://on.cypress.io/select
    // set using text
    // <option value="MA">Massachusetts</option>
    cy.get(selector).select(optionValue)
    // confirm the selected value
    cy.get(selector).should('have.value', optionValue)
    // remove the focus from <select> element
    cy.get(selector).blur()
})
Cypress.Commands.add("selectDropdownBySearchValueWithSelect2",(selector, searchValue)=>{
    //Select2 gives you a customizable select box with support for searching, tagging,
    // remote data sets, infinite scrolling, and many other highly used
    
    // https://on.cypress.io/select
    // set using text
    // <option value="MA">Massachusetts</option>
    cy.get(selector).select(searchValue,{ force: true })
    // confirm the selected value
    cy.get(selector).should('have.value', searchValue)
    // remove the focus from <select> element
    cy.get(selector).blur()
})
Cypress.Commands.add("readJsonDataFromFile", (fixturepath) => {     

})