import patientSelector from "../../../selectors/integrations/patientSelector"

Cypress.Commands.add("selectPatientDropdown",()=>{
    cy.get(patientSelector.selectPatientDropdown).should("be.visible")
})
Cypress.Commands.add("selectPatientDropdownCaretAreoIcon",()=>{
    cy.get(patientSelector.selectPatientDropdownCaretAreoIcon).should("be.visible")
})
Cypress.Commands.add("clickOnPatientDropdownCaretAreoIcon",()=>{
    cy.get(patientSelector.clickOnPatientDropdownCaretAreoIcon,{timeout:10000}).should("be.visible").click({force:true})
})

Cypress.Commands.add("selectPatientOptions",(inputOption)=>{
    cy.clickOnPatientDropdownCaretAreoIcon()
    cy.wait(2000)
    cy.get(patientSelector.selectPatientOptions).should("be.visible")
    cy.get('li.styles__filterItem___1LoDl').each(($option)=>{
        let optionText = $option.text()
        cy.log("Option Textr",optionText)
        if(inputOption == $option.text()){
            cy.wait(2000)
            cy.wrap($option).click()
            return false
        }
    })
})

Cypress.Commands.add("verifyPatientListForSelectedOptionByStatus",(token, uiOption, inputStatus)=>{

    cy.selectPatientOptions(uiOption)
    cy.wait(2000)
    cy.getPatientListFromAPIForSelectedOptionByStatus(token,uiOption,inputStatus).then((response)=>{

        if(response == null && response == ''){
            expect(true, "API getting empty or null response for selected option "+apiOption).to.false
            return false
        }
        let str = response.body.entities.patients
        let patientId = []
        let firstName = []
        let lastName = []
        let hoh = []
        let lastApptDate = []
        let nextApptDate = []
        let dueForHygieneDate = []
        let dueForRecallDate = []
        let dueForFollowUp = []
        let status = []
        let apiCount = []

        
        for(let key in str){
            if( str[key].id == 'totalPatients'){
                apiCount.push(str[key].count)
            }else{
             patientId.push(str[key].id)
             firstName.push(str[key].firstName)
             lastName.push(str[key].lastName)
             hoh.push(str[key].isHoH)
             lastApptDate.push(str[key].lastApptDate)
             nextApptDate.push(str[key].nextApptDate)
             dueForHygieneDate.push(str[key].dueForHygieneDate)
             dueForRecallDate.push(str[key].dueForRecallExamDate)
             status.push(str[key].status)
            //  if(str[key].status == 'Active'){
            //     dueForFollowUp.push(str[key].patientFollowUps[0].dueAt)
            //  }else{
            //     dueForFollowUp.push(null)
            //  }
            }            
        }
// select status through UI filter
//added option for selection of the uiOption
    cy.selectPatientSearchFilterByStatus(inputStatus,uiOption)
    cy.wait(2000)
    cy.clickOnFilterDemographicButton()    
    //cy.wait(2000)    
    cy.log("Verify count for selected option")
    cy.log("API Count****",apiCount[0])
    cy.get('div[data-test-id="text_totalPatientsCount"]').then(function (Field) {
        const Fieldtext = Field.text();
        cy.log("uitext*****", Fieldtext)
        let uiCount = Fieldtext.match(/\d+/g);
        cy.log("uiCount****", uiCount)
        cy.log("UI Count ",uiCount[0])
        if(parseInt(uiCount[0]) == apiCount[0]){
            expect(apiCount[0],"Patient count verified from API response to UI text for selected option "+uiOption+" by status "+inputStatus).to.equal(parseInt(uiCount[0]))
            return false
        }else{
            expect(apiCount[0],"Patient count not verified from API response to UI text for selected option "+uiOption+" by status "+inputStatus).to.equal(parseInt(uiCount[0]))
            return false
        }
    })

    if(apiCount[0] == 0){
        cy.log("No patient found")
        return false
    }


    let apiPatientCount = 0
     cy.get(patientSelector.patientTableRows).each(($tr, index)=>{
        
        let patFirstName = firstName[apiPatientCount]
        let patLastName = lastName[apiPatientCount]

            cy.get(patientSelector.patientExpandButton).eq(index).then(function (Field) {
                //const Fieldtext = Field.text();
                cy.log("Expand Icon")
                //expect(Fieldtext).to.equal("Google");
            })
            cy.get(patientSelector.patientShortName)
            .eq(index).then(function (Field) {
                const Fieldtext = Field.text();
                cy.log("Shot Name", Fieldtext)
                //expect(Fieldtext).to.equal("Google");
            })
            cy.get(patientSelector.patientFirstName)
            .eq(index).then(function (Field) {
                const Fieldtext = Field.text();
                cy.log("First Name", Fieldtext)
                const found = firstName.find(element => element == Fieldtext);
                expect(Fieldtext, "Verify Firstname ").to.equal(found);
            })
            cy.get(patientSelector.patientLastName)
            .eq(index).then(function (Field) {
                const Fieldtext = Field.text();
                cy.log("Last Name", Fieldtext)
                const found = lastName.find(element => element == Fieldtext);
                expect(Fieldtext, "Verify Lastname").to.equal(found);
            })
            apiPatientCount = apiPatientCount + 1
            if (apiPatientCount == 1) {
                cy.log("Only " + apiPatientCount + " patient verified from out of "+apiCount[0] +" "+inputStatus+" patients")
                return false
            }
        })
    })  
})

Cypress.Commands.add("clickOnFilterResetButton",()=>{

    cy.get(patientSelector.clickOnFilterResetButton).should("be.visible").click()
})
Cypress.Commands.add("clickOnFilterDemographicButton",()=>{

    cy.get(patientSelector.clickOnFilterDemographicButton).should("be.visible").click()
})
Cypress.Commands.add("selectPatientSearchFilterByStatus",(inputStatus,uiOption)=>{
    cy.clickOnFilterResetButton()
    cy.wait(2000)
    cy.clickOnFilterDemographicButton()
    cy.get(patientSelector.statusFilterDropdown).click()
    cy.get(patientSelector.statusOption).each(($el)=>{
        if(inputStatus == $el.text()){
            cy.wrap($el).click()
            return false
        }
    })
    //added this scroll view 
    cy.get('.styles__header_title___1feCb').scrollIntoView()
      .should("have.text", uiOption)

})
