import practiseSelector from '../../../selectors/enterprisemanagement/practise/practise'
import uiHelper from '../../../../integration/donna/gui/smoketests/common/UIHelper'
/*
This Custom commands is used for creating a new practise

*/
Cypress.Commands.add('createPractice', (data, isExternalID) => {
    cy.get(practiseSelector.addPractiseButton).should('be.visible').click()
    cy.get(practiseSelector.newPractiseSetUpPopUpHeader).should('be.visible').then((ele) => {
        expect(ele.text()).to.equal('New Practice Setup')
    })
    cy.selectGroup(data)
    cy.fillPracticeDetails(data, isExternalID)
    cy.fillAddressDetails(data)
    cy.fillOwnerDetails(data)
    cy.verifyAccountOptionAndClick(data, isExternalID)
    cy.assertToastMessageSuccess(data.toastMsg, practiseSelector.toastMessageHeader)
})
/*
This Custom commands is used for select a group for new  practise

*/
Cypress.Commands.add('selectGroup', (data) => {

    cy.log('***select group***')
    cy.get(practiseSelector.selectGroupDropDown).type(data.groupName + '{enter}')
    cy.get(practiseSelector.selectedGroup).then((ele) => {
        expect(ele.text().trim()).to.contain(data.groupName)
    })

})
/*
This Custom commands is used for enter details  for new  practise

*/
Cypress.Commands.add('fillPracticeDetails', (data, isExternalID) => {
    cy.log('***Fill All Practice details fields***')
    cy.get(practiseSelector.practiseName_Address).type(data.practiseName)
    cy.get(practiseSelector.practiseWebsite).type(data.website)
    cy.get(practiseSelector.practiseTimezone).click()
    cy.get(practiseSelector.selectTimeZone).click()
    cy.get(practiseSelector.practisePhoneNumber_city).type(data.phoneNumber)
    if (isExternalID) {
        cy.get(practiseSelector.practiseExternalId_postalCode).type(data.externalID)
    }
    cy.get(practiseSelector.nextButton).click()
})

/*
This Custom commands is used for enter address details  for new  practise

*/
Cypress.Commands.add('fillAddressDetails', (data) => {
    cy.log('***Fill All Practice Address fields***')
    cy.get(practiseSelector.practiseName_Address).type(data.address)
    cy.get(practiseSelector.country).click()
    cy.get(practiseSelector.selectCountry_state).click()
    cy.get(practiseSelector.state).click()
    cy.get(practiseSelector.selectCountry_state).click()
    cy.get(practiseSelector.practisePhoneNumber_city).type(data.city)
    cy.get(practiseSelector.practiseExternalId_postalCode).type(data.postalCode)
    cy.get(practiseSelector.nextButton).click()
})

/*
This Custom commands is used for enter owner details  for new  practise

*/
Cypress.Commands.add('fillOwnerDetails', (data) => {
    cy.log('***Fill All Owner fields***')
    cy.intercept(Cypress.env('backendUrl')+"userCheck").as('userCheck')
    cy.get(practiseSelector.fName).type(data.firstName)
    cy.get(practiseSelector.lName).type(data.lastName)
    cy.get(practiseSelector.email).type(uiHelper.getRandomEmail())
    cy.get(practiseSelector.password).type(data.password)
    cy.get(practiseSelector.cnfPwd).type(data.cnfPassword)
    cy.get(practiseSelector.nextButton).click()
})

Cypress.Commands.add('verifyAccountOptionAndClick', (data, isExternalID) => {
    cy.log('***Verify Account Option and create practice***')
    cy.wait('@userCheck').its('response.statusCode').should('eq', 200)
  /*  cy.get(practiseSelector.selectAccountOptionHeader).should('be.visible').then((ele) => {

        expect(ele.text()).to.equal(data.accountOptionHeader)
    })*/
    cy.get(practiseSelector.accountOptionGrid).should('be.visible')
    cy.get(practiseSelector.nextButton).click()
    if (isExternalID) {
        cy.log('***New Practice Created with External ID:: ' + data.externalID + '***')
    }
    else {
        cy.log('***New Practice Created without External ID***')
    }
})

Cypress.Commands.add('searchAndSelectEnterprise', (data) => {

    cy.log('***Search Enterprise and select Practice***')
    cy.intercept(Cypress.env('backendUrl')+"api/enterprises/search?keywords=Anjum1").as('waitForSearch')
    cy.get(practiseSelector.enterpriseSearchBox).type(data.groupName)
    cy.wait('@waitForSearch').its('response.statusCode').should('eq', 200)
    cy.log('***User Typed:' + data.groupName + ' as Group Name***')
    cy.get(practiseSelector.selectEnterpriseArrowButton).click()


})
// Cypress.Commands.add('selectPractiseAndAddOrUpdateExternalID', (data, isContainExternalID) => {

//     cy.get(practiseSelector.manageButton).each((ele, index, list) => {
//         let bool
//         if (list.length < 1) {
//             cy.log('***No Practise Found with selected organization***')
//         }
//         else {
//             if (index != 0) {
//                 if (!isContainExternalID) {
//                     cy.wrap(ele).click()
//                     cy.log('***User Clicked on practise :' + index + '***')
//                     cy.get(practiseSelector.editPractise).click()
//                     cy.wait(1000)
//                     cy.get(practiseSelector.lName).invoke('val').then((externalID) => {
//                         if (externalID == '') {
//                             bool = false
//                             cy.get(practiseSelector.lName).type(uiHelper.getRandomString())
//                             cy.get(practiseSelector.editPractiseSaveButton).click()
//                             cy.assertToastMessageSuccess(data.toastMsg, practiseSelector.toastMessageHeader)
//                             cy.log('***External Id Added To given Practise***')
//                             cy.log(bool)
//                             cy.wrap(bool)

//                         }
//                         else {
//                             cy.log('***External Id is not null try with another practise***')
//                             cy.get(practiseSelector.editPractiseCancelButton).click()
//                         }

//                     })
//                     return false
//                 }
//                 else {
//                     cy.wrap(ele).click()
//                     cy.log('***User Clicked on practise :' + index + '***')
//                     cy.get(practiseSelector.editPractise).click()
//                     cy.wait(1000)
//                     cy.get(practiseSelector.lName).invoke('val').then((externalID) => {
//                         if (externalID != '') {
//                             cy.get(practiseSelector.lName).clear().type(uiHelper.getRandomString())
//                             cy.get(practiseSelector.editPractiseSaveButton).click()
//                             cy.assertToastMessageSuccess(data.toastMsg, practiseSelector.toastMessageHeader)
//                             cy.log('External Id updated for Given Practise***')
//                         }
//                         else {
//                             cy.log('External Id is null try with another practise which contains External ID')
//                             cy.get(practiseSelector.editPractiseCancelButton).click()
//                         }

//                     })
//                 }
//             }
//         }
//         // return (cy.wrap(bool));
//         /////////////
//         //how to return boolean value from here 
//         /////////////
//     })

// })

Cypress.Commands.add('addOrUpdateExternalIdToExistingPractise', (data, isContainExternalID) => {
    if (!isContainExternalID) {
        cy.get(practiseSelector.manageButton).eq(1).click()
        cy.get(practiseSelector.editPractise).click()
        cy.log('***asserts that user is able to Add External ID field***')
        cy.get(practiseSelector.lName).type(uiHelper.getRandomString())
        cy.get(practiseSelector.editPractiseSaveButton).click()
        cy.assertToastMessageSuccess(data.toastMsg, practiseSelector.toastMessageHeader)
        cy.log('***External Id field succesfully Added to given practice***')
    }
    else {
        cy.get(practiseSelector.manageButton).eq(1).click()
        cy.get(practiseSelector.editPractise).click()
        cy.get(practiseSelector.lName).invoke('val').then((val) => {
            cy.log('***Current External ID: ' + val + '***')
        })
        cy.log('***asserts that user is able to Edit/Update External ID field***')
        cy.get(practiseSelector.lName).type(uiHelper.getRandomString())
        cy.get(practiseSelector.lName).invoke('val').then((val) => {
            cy.log('***Updated External ID: ' + val + '***')
        })
        cy.get(practiseSelector.editPractiseSaveButton).click()
        cy.assertToastMessageSuccess(data.toastMsg, practiseSelector.toastMessageHeader)
        cy.log('***External Id field succesfully Updated for given practice***')
    }

})
Cypress.Commands.add('verifyEditPractisePopUPFields', (data) => {

    cy.get(practiseSelector.manageButton).eq(1).click()
    cy.get(practiseSelector.editPractise).click()
    // cy.wait(1000)
    cy.get(practiseSelector.fName).invoke('val').then((val) => {
        cy.log('***Practise Name before Editing::    ' + val + '***')
    })
    cy.log('***asserts that user is able to update practise name***')
    cy.get(practiseSelector.fName).clear().type(data.updatedPractiseName)
    cy.get(practiseSelector.fName).invoke('val').then((val) => {
        cy.log('***Updated Practise Name:: ' + val + '***')
    })
    cy.log('***verify that cancel and save button are visible***')
    cy.get(practiseSelector.editPractiseSaveButton).should('be.visible')
    cy.log('***clicking on cancel button after updating practise name***')
    cy.get(practiseSelector.editPractiseCancelButton).should('be.visible').click()
    cy.log('***Open same practise again***')
    cy.get(practiseSelector.manageButton).eq(1).click()
    cy.get(practiseSelector.editPractise).click()
    // cy.wait(1000)
    cy.log('***verify that changes are remains same if user dont save the changes***')
    cy.get(practiseSelector.fName).invoke('val').then((val) => {
        cy.log('***Practice Name After Editing ' + val + '***').then(() => {
            expect(val).not.to.equal(data.updatedPractiseName)
        })

    })


})

Cypress.Commands.add('verifyOrganizationAndCSMOwnerField', () => {
    cy.get(practiseSelector.manageButton).eq(1).click()
    cy.get(practiseSelector.editPractise).click()
    // cy.wait(1000)
    cy.get(practiseSelector.organization).invoke('attr', 'class').then((val) => {
        expect(val).to.contain('undefined')
    })
    cy.get(practiseSelector.csmOwner).invoke('attr', 'class').then((val) => {
        expect(val).to.contain('disabled')
    })
    cy.log('***asserts that Organization and CSM owner filed cant be editable***')
    cy.get(practiseSelector.organization).should('not.be.enabled')
    cy.get(practiseSelector.csmOwner).should('not.be.enabled')
})

Cypress.Commands.add('selectPractiseAndUpdateExternalIDWithSpecialCharacter', (data,isContainExternalID) => {
    if(!isContainExternalID){
        cy.get(practiseSelector.manageButton).eq(1).click()
        cy.get(practiseSelector.editPractise).click()
        cy.get(practiseSelector.lName).type(data.ExternalIDWithSpecialCharacter)
        cy.get(practiseSelector.lName).invoke('val').then((val) => {
    
            cy.log('***External ID is Updated with Special Characters:' + val + '***')
        })
        cy.get(practiseSelector.editPractiseSaveButton).click()
        cy.assertToastMessageSuccess(data.toastMsg, practiseSelector.toastMessageHeader)
    }

    else{
        cy.get(practiseSelector.manageButton).eq(1).click()
        cy.get(practiseSelector.editPractise).click()
        cy.get(practiseSelector.lName).clear()
        cy.log('***User Succesfully Removed External ID***')
        cy.get(practiseSelector.editPractiseSaveButton).click()
        cy.assertToastMessageSuccess(data.toastMsg, practiseSelector.toastMessageHeader)
    }
   
})

Cypress.Commands.add('preRequsiteForExternalID', () => {

    cy.get(practiseSelector.manageButton).eq(1).click()
    cy.get(practiseSelector.editPractise).click()
    cy.get(practiseSelector.lName).invoke('val').then((externaID) => {

        if (externaID == '') {
            cy.log('***Data is already available for testing***')
        }
        else {
            cy.get(practiseSelector.lName).clear()
            cy.get(practiseSelector.editPractiseSaveButton).click()
            cy.log('***Data is ready for testing***')
        }
    })

})