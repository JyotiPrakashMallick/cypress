import scheduleReason from  '../../../../support/selectors/scheduling/scheduleReasonSettings'
Cypress.Commands.add("editReasonDetails", (reasonNameEdit,reasonDescEdit,reasonDuration) =>{
  cy.get(scheduleReason.reasonNameInput)
    .should('be.visible')
    .type('{selectall}{backspace}')
    .type(reasonNameEdit)
  cy.get(scheduleReason.reasonDescInput,{timeout:6000})
    .should('be.visible')
    .type('{selectall}{backspace}')
    .type(reasonDescEdit)
  cy.get(scheduleReason.reasonDuration,{timeout:6000})
    .should('be.visible')
    .type('{selectall}{backspace}')
    .type(reasonDuration)

  })

  Cypress.Commands.add("randomlycheckboxfromdropdownlist",(selector)=>{
    cy.get(selector).as("options")
    cy.get("@options")
      .its('length')
      .then(len => Math.floor(Math.random() * Math.floor(len)))
      .then((index) => {
    cy.get("@options").eq(index).click()})
    })
    
    Cypress.Commands.add('asserttoastmessagesuccessreason',(toastMsg1,nameReason,toastMsg)=>{
      cy.get(scheduleReason.toastSuccessMessage)
        .should('be.visible')
        .should('have.text',toastMsg1+nameReason+" "+toastMsg)
    })
    Cypress.Commands.add('asserttoastmessagesuccessPractitioner',(toastMsg,reasonServiceName)=>{
      cy.get(scheduleReason.toastSuccessMessage)
        .should('be.visible')
        .should('have.text',toastMsg+reasonServiceName+'.')
    })