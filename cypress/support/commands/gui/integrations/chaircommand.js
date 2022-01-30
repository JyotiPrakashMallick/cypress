import chairSelectors from "../../../selectors/integrations/chairSelectors"
import query from "../../../../integration/donna/db/dbQueries"
import uihelper from "../../../../integration/donna/gui/smoketests/common/UIHelper"
 
Cypress.Commands.add("navigateToChairsSection", () => {
   // cy.isDisplayed(chairSelectors.settingsIcon)
   cy.get(chairSelectors.settingsIcon)
     .should('be.visible')
     .click()
   // cy.clickOn(chairSelectors.settingsIcon)
    cy.wait(2000)
    cy.isDisplayed(chairSelectors.navigateToChair)
    cy.clickOn(chairSelectors.navigateToChair)
    
})

Cypress.Commands.add("navigateToPractionersSchduleSection", () => {
    cy.isDisplayed(chairSelectors.settingsIcon)
    cy.clickOn(chairSelectors.settingsIcon)
    cy.wait(2000)
    cy.isDisplayed(chairSelectors.practionersHeader)
    cy.clickOn(chairSelectors.practionersHeader)
    cy.contains('Practitioner Schedule').click()
   
    
 
})
/*
     This custom commands is validating chairs are correctly displayed on UI
*/
Cypress.Commands.add("verifyChairsCorrectlyDisplayed", (response) => {
   cy.window().then((win)=>{

    const identifiedElement = win.document.querySelector(chairSelectors.chairHeader)
        cy.log('Object value = ' + identifiedElement)
        if(identifiedElement==null){
            cy.log('Page is taking more time to load')
            cy.wait(3000)
        }

   })
  
    cy.isDisplayed(chairSelectors.chairHeader)
    cy.isDisplayed(chairSelectors.chairTitles)
    cy.getAllChairData(response)      
})

Cypress.Commands.add("getChairFromDB", () => {
    let count=0
    cy.task("dbQuery", {"query":query.getChairByNames}).then(queryResponse => {        
        queryResponse.forEach((element) => {
     
            let value=JSON.stringify(element)
            let aList=uihelper.getList(value)
            // expect(data.totalChairs).to.equal(aList.length)
          
           let str= uihelper.getSubString(aList[1],1,aList[1].length-2)
           cy.verifyChairDetails(str,count)
           count++           
          
            })
    })
})

/*
     This custom commands is creating a Json file from API response
*/  
Cypress.Commands.add("createJsonFileFromResponse", (response,filepath) => {       
        cy.log(response)          
let responseString=uihelper.convertObjectToString(response)
cy.log('after strigyfy'+responseString)
// cy.wait(5000)
if(responseString != null){

cy.writeFile(filepath,responseString)
}
else{
    cy.log('response is null')
}
})
 
/*
     This custom commands is used for getting  chair details from Json Object
*/
Cypress.Commands.add("getAllChairData", (jsonObject) => {     
 cy.log('****************fetching data from API Response')

    let map=new Map()
    let length=Object.keys(jsonObject).length
    console.log(length)
    map=  uihelper.getChairDetails(jsonObject)
    cy.log('********** Chairs linked with given account :' + length) 
    cy.verifyChairDetailsWithMap(map)
})

 
/*
     This custom commands is validating chair details on UI usinh HashMap
*/
Cypress.Commands.add("verifyChairDetailsWithMap", (map) => {          
cy.get(chairSelectors.chairId).each((ele,ind,list)=>{
    let chairIdUI=ele.text()
    let chairNameUI
    cy.get(chairSelectors.chairTitles).eq(ind).then(function(name){
           chairNameUI=name.text()
           let chairNameApI=map.get(chairIdUI)
           expect(chairNameUI).to.equals(chairNameApI)
       })
   
     })

 }) 

 