import practitionerSelector from "../../../selectors/integrations/practionerSelector"
import uihelper from "../../../../integration/donna/gui/smoketests/common/UIHelper"
import practionerSelector from "../../../selectors/integrations/practionerSelector"

/*
     This custom commands is navigating us to Practioner tab.
*/
Cypress.Commands.add("navigateToPractitioner", () => {
    cy.isDisplayed(practitionerSelector.settingsIcon)
    cy.clickOn(practitionerSelector.settingsIcon)
    cy.wait(2000)
    cy.isDisplayed(practitionerSelector.navigateToPractioner)
    cy.clickOn(practitionerSelector.navigateToPractioner)
    
 
})
/*
     This custom commands is validating Practioner Tab details.
*/
Cypress.Commands.add("verifyParctitionersCorrectlyDisplayed", (response) => {
    cy.isDisplayed(practitionerSelector.addNewPractitionerButton)
    cy.clickOn(practitionerSelector.practitionerStatusDropDown)
    cy.clickOn(practitionerSelector.allPractitionerStatus)
    cy.log('*********'+'***Add New Practioner button is succesfully displayed***')
    cy.getAllPractitionerData(response)      
})


/*
     This custom commands is used for getting  Practioner details from Json Object
*/
Cypress.Commands.add("getAllPractitionerData", (jsonObject) => {     
 cy.log('*********'+'***fetching data from API Response***')

    let practitionerMap=new Map()
    let totalPractitionerCount
    let length=Object.keys(jsonObject).length
    cy.wait(1000)
    cy.get(practitionerSelector.totalPractitionerBadgeCount).then(function(ele){
      totalPractitionerCount=ele.text()
      cy.log('_********** Total Practitioner linked with given account :' + length+'_')
      expect(Number(totalPractitionerCount)).to.equal(length)
    })
    practitionerMap=  uihelper.getPractitionerDetails(jsonObject)     
        cy.verifyPractitionerDetails(practitionerMap)
          
})

/*
     This custom commands is validating practitioner details on UI using HashMap
*/
Cypress.Commands.add("verifyPractitionerDetails", (practitionerMap) => { 
     cy.ValidatePractitionerName(practitionerMap)
     cy.getAllPractitionersCount(practitionerMap)
     
        
}) 
/*
     This custom commands is getting Total number of Practitioners Account
*/
Cypress.Commands.add("getAllPractitionersCount", (practitionerMap) => {   
     let activeCount=0
     let totalAccount=0
     
     for(let key of practitionerMap.keys()){
          totalAccount++
          practitionerMap.get(key).forEach(function(respnseValues){
                    
                   if(respnseValues==true){// fetching only booleab values
                        activeCount++
                   } 
               })
          }
          cy.log('************'+'***Total Practitioners: '+ totalAccount+'***')
          cy.log('************'+'***Total Active Practitioners:***  '+ activeCount+'***')
          cy.log('************'+'***Total In Active Practitioners:*** '+ Number(totalAccount-activeCount)+'***')
          
      }) 
     
 /*
     This custom commands is validating practitioner's name on UI with API response
*/
Cypress.Commands.add("ValidatePractitionerName", (practitionerMap) =>{
     let arrayPractitionerNameAPI=new Array() 
     for(let value of practitionerMap.values()){
            value.forEach(function(mapValue){
                    if(typeof(mapValue)=='string'){
                         arrayPractitionerNameAPI.push(mapValue.toUpperCase().trim())
                 }
               })
          }
          arrayPractitionerNameAPI.sort()
          cy.get(practitionerSelector.practitonerFullName).each((element,index,list)=>{
                
                  expect(element.text().toUpperCase()).to.include(arrayPractitionerNameAPI[index])
                
          })          
})

Cypress.Commands.add("selectPractitonerAndNavigateToPractitionerSchedule", () => {
     cy.get(practitionerSelector.practitionerNameGrid).scrollIntoView().should('be.visible').click()
     cy.wait(1000)
     cy.isDisplayed(practitionerSelector.practitonerScheduleTab)
     cy.clickOn(practitionerSelector.practitonerScheduleTab)
 })
      
 Cypress.Commands.add("verifyChairsLinkedToPractionerSchedule", (data) =>{
    cy.isDisplayed(practionerSelector.defaultWeeklyScheduleSettingIcon,{timeout:2000})
    cy.get(practionerSelector.defaultWeeklyScheduleSettingIcon,{timeout:1000}).eq(1).click({force:true})
    cy.get(practionerSelector.defaultWeeklyScheduleWindowHeader).then(function(textValue){
          expect(textValue.text()).to.include(data.defaultWeeklyWindowHeader)
     })
    
     cy.get(practionerSelector.practitionerScheduleLinkedChair).then(function(textValue){
          expect(textValue.text().trim()).to.equal(data.linkedChair)
     })
})
/*
     This custom commands is validating practitioner's Weekly Time Slots With API response on UI
*/
Cypress.Commands.add("validatePractitionerSchedule",(jsonObject)=>{
     
     let map=uihelper.getWeeklyScheduleData(jsonObject)
     cy.log('***Validating Practitioners Weekly Time Slots::***')
     cy.get(practionerSelector.practitionerWeeklyDays).each((element,index,list)=>{
          cy.log('***Validating time slots for ' +element.text()+':=>***').then(()=>{
               let timeSlotsUI=element.next().text()
               expect(timeSlotsUI).to.equal(map.get(element.text()))
          })
         
     })
})

 