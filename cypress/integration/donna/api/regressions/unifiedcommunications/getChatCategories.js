//AUTO-823 Get  Chat Categories

describe('Get  Chat Categories: Verify that all open and closed tab messages appeared in ALL tabs', {retries:2}, function(){
    var trueCount=0, falseCount=0; 
    let OpenPatientChatID,closedPatientChatID

   beforeEach(()=> {
        cy.apilogin(Cypress.env('chatUser_email'), Cypress.env('chatUser_password'), Cypress.env('backendUrl') + 'auth')})

    it ('Verify that all open and closed tab messages appeared in ALL tabs',function() {
        

        cy.getAllTabs(Cypress.env('token')).then((resp)=>{
            expect(resp.duration).to.not.be.greaterThan(500)
            let allChatsTab=resp.body.entities.chats
            
            for (const [key, value] of Object.entries(allChatsTab)) {
              cy.log(value.isOpen);
              
              if (value.isOpen == true) {
                trueCount++;
                OpenPatientChatID=value.patientId 
              } else if (value.isOpen == false) {
                falseCount++;
                closedPatientChatID=value.patientId
              }
             
            }
            cy.log('countOpen: '+ trueCount)
            cy.log('countClosed: ' +falseCount)
            })
        })
    })      