import schedulePageSelector from "../../../../support/selectors/scheduling/schedulePageSelector";

Cypress.Commands.add('getMatchedApptsCount',() => {
	cy.get(schedulePageSelector.modalWindowTitle).should('have.text', 'Could this be the same appointment?')
	cy.get(schedulePageSelector.modalWindowMsg).should('have.text', 'We found one or more appointments that are similar. Please select the appointment you would like to link.')
	cy.get(schedulePageSelector.allExsitingAppts).then(($lis) => {
	  if ($lis.length > 1) {
		cy.log('no of apptments are: ' + $lis.length)
		cy.log('Select the first option from existing appts & check if the Link Appt is enabled now')
		cy.get(schedulePageSelector.allExsitingAppts).eq(0).click()
		cy.log('Now Link Appointment button should be enabled & the click on it')
		cy.get(schedulePageSelector.popUpButtons).eq(1)
		  .should('have.class', 'vbutton__color-blue___2dO3r')
		  .should('have.text', 'Link Appointment').click()
		cy.get(schedulePageSelector.confirmationMsg).should('have.text', 'Send Confirmation Email?')
		cy.get(schedulePageSelector.confirmationButtons).eq(0).should('have.text', 'No').click()
		cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 3000 })
		  .should('be.visible')
		  .should('contain.text', 'SuccessRequest updated for ')
	  } else {
		cy.log('Check if the Link Appointment button is enabled or not')
		cy.get(schedulePageSelector.popUpButtons).eq(1)
		  .should('have.class', 'vbutton__color-blue___2dO3r')
		  .should('have.text', 'Link Appointment').click()
		cy.get(schedulePageSelector.confirmationMsg).should('have.text', 'Send Confirmation Email?')
		cy.get(schedulePageSelector.confirmationButtons).eq(0).should('have.text', 'No').click()
		cy.get(schedulePageSelector.toastSuccessMessage, { timeout: 3000 })
		  .should('be.visible')
		  .should('contain.text', 'SuccessRequest updated for ')
	  }
	})
})

Cypress.Commands.add('removeOnlineRequests',() => {
	cy.wait(5000)
	cy.get(schedulePageSelector.insideNoOfRequest).then(($a)=> {
        if($a.text().includes('0')){
        cy.log('There is no online request')
    }
    
    else {
    cy.get(schedulePageSelector.onlineRequests).then(($lis)=> {
    const totalRequests = $lis.length
    if(totalRequests > 0) {   
    for(let i=0; i < totalRequests; i++){    
        cy.get(schedulePageSelector.onlineRequests, {timeout : 5000})
         .should('contain', 'Requested on')
        cy.log('Open the first request')
        cy.get(schedulePageSelector.onlineRequests, {timeout : 5000}).eq(0).click()
        cy.log('Click on reject request')
        cy.get(schedulePageSelector.rejectButton, {timeout : 5000}).click()
        cy.wait(2000)
    }  } 
    else{
        cy.log('There is no online request')
    }
    })
}
})
})