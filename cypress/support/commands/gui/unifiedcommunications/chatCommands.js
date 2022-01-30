import chatSelectors from "../unifiedcommunications/../../../selectors/unifiedcommunications/chatSelectors"

Cypress.Commands.add('getCountOfChats', () => {
    cy.get(chatSelectors.chatItems, {timeout: 10000}).then(($lis) => {
        let chatCount = $lis.length
        return chatCount
    })
})

Cypress.Commands.add('searchPatientChat', (patient) => {
    cy.get(chatSelectors.search, {timeout: 10000}).clear().type(patient)            
      cy.get(chatSelectors.suggestions, {timeout: 10000}).within(()=>{
      cy.contains(patient).click() })
})

Cypress.Commands.add('getOpenCount', (authToken) => {
        cy.request({
          method: "GET",
          url: `${Cypress.env("backendUrl")}api/chats/count/categories`,
          auth: {
            bearer: authToken,
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          return response.body.open
    })
})

Cypress.Commands.add('getFlaggedCount', (authToken) => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("backendUrl")}api/chats/count/categories`,
      auth: {
        bearer: authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      return response.body.flagged
    })
})

Cypress.Commands.add('getUnreadCount', (authToken) => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("backendUrl")}api/chats/count/categories`,
      auth: {
        bearer: authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      return response.body.unread
    })
})

Cypress.Commands.add('unFlagSelectedChat', (patient) => {
   // search patient chat
   cy.get(chatSelectors.search, {timeout: 10000}).should('be.visible').type(patient)      
   cy.get(chatSelectors.suggestions).within(()=>{
   cy.contains(patient).click() })

   cy.get(chatSelectors.star).invoke('attr', 'class').then((cls)=>{

     if(cls.includes(chatSelectors.flag))
   {
     // unflag the chat
   cy.get(chatSelectors.flaggedSelectedItem).click()
   cy.log('Unflagged the chat') 
 } 
     else 
   { 
    cy.log('Chat is already unflagged') }
   }) 
})

Cypress.Commands.add('deleteChatId', (autToken,chatId)=>{
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env("backendUrl")}api/chats/`+chatId,
    headers: {
      authorization: 'Bearer ' + autToken, 
      
    },
  }).then((response) => {
    expect(response.status).to.eq(204);
})
})