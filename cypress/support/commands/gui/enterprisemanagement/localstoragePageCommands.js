const  LOCAL_STORAGE={};

Cypress.Commands.add('savelocalstorage',()=>{
    Object.keys(localStorage).forEach(key=>{
        LOCAL_STORAGE[key]=localStorage[key];
        cy.log(LOCAL_STORAGE[key])
    })
    
})
Cypress.Commands.add('restorelocalstorage',()=>{
    Object.keys(localStorage).forEach(key=>{
        localStorage.setItem(key,LOCAL_STORAGE[key]);
        cy.log(localStorage)
    })
})