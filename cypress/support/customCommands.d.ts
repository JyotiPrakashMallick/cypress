declare namespace Cypress {
    interface Chainable<Subject> {
        login(username: any, password: any, user: any): Chainable<any>
        apilogin(username: any, password: any, apiUrl: any): Chainable<any>
        loggedout(url: any): Chainable<any>
        uiLoginByAPI(username: any, password: any, apiUrl: any): Chainable<any>
        /*})*/
        getcurrentdayoftheweek(): Chainable<any>
        getcurrentcalendarmonth(): Chainable<any>
        getcurrentcalendardate(): Chainable<any>
        selectfromthelist(selector: any, lists: any): Chainable<any>
        randomlyselectfromdropdown(selector: any): Chainable<any>
        typeRandomNumber(selector: any, min: any, max: any): Chainable<any>
        typeRandomString(stringLength: any, inputField: any): Chainable<any>
        clearetext(selector: any): Chainable<any>
        /*Custom Command for the Calendar*/
        selectDateFromCalendar(mainSelector: any, daySelector: any, nextMonthSelect: any, prevMonthSelect: any, enablePrevious: any, dd: any, mm: any, yyyy: any): Chainable<any>
        /* Custom Command for the calender END HERE!*/
        assertToastMessageSuccess(data: any, selector: any): Chainable<any>
        getCurrentDatewithformatmmddyy(): Chainable<any>
        getMyFormattedDate(): Chainable<any>
        fetchAccountIdAndSet(authToken: any): Chainable<any>
        getShortFormattedDate(): Chainable<any>
        getMyWeekAndDate(): Chainable<any>
        createNewPatient(patientFirstName: any, patientLastName: any, patientEmail: any): Chainable<any>
        apiloginOnlineBooking(email: any, password: any, apiUrl: any): Chainable<any>
        getCurrentAccount(authToken: any): Chainable<any>
        getCurrentAccountID(authToken: any): Chainable<any>
        getCurrentAccountAdapterType(authToken: any): Chainable<any>
        getPractitioners(authToken: any): Chainable<any>
        getPractitionerIDs(authToken: any): Chainable<any>
        getChairs(authToken: any): Chainable<any>
        getChairIDs(authToken: any): Chainable<any>
        createPatient(authToken: any, firstName?: string, phoneNumber?: any, email?: any): Chainable<any>
        getPatients(authToken: any): Chainable<any>
        getPatientPMSId(authToken: any, patientId: any): Chainable<any>
        bookAppt(authToken: any, startpoint: any, endpoint: any, patientId: any, isPatientConfirmed: any, isRecall?: any, reason?: any): Chainable<any>
        bookApptByReminderTouchpoint(authToken: any, touchpoint: any, timePeriod: any, patientId: any): Chainable<any>
        getReminders(accountId: any, authToken: any): Chainable<any>
        createReminder(undefined: any): Chainable<any>
        setReviewRequestInterval(authToken: any, touchpoint: any, timePeriod: any): Chainable<any>
        setReviewRequestChannels(authToken: any, messageTypes?: any[]): Chainable<any>
        bookApptByReviewRequestTouchpoint(authToken: any, touchpoint: any, timePeriod: any, patientId: any): Chainable<any>
        bookApptByRecallTouchpoint(authToken: any, prevApptProcedureCode: any, prevApptReason: any, recallDueDateMonths: any, recallMessageTouchpoint: any, recallMessagePeriod: any, recallSentAfterDueDate: any): Chainable<any>
        getPractitionerWeeklySchedule(authToken: any): Chainable<any>
        apiEnterpriseCreation(name: any, plan: any, organization: any, authToken: any): Chainable<any>
        apiCreatePractice(name: any, website: any, timezone: any, destinationPhoneNumber: any, street: any, country: any, state: any, city: any, zipCode: any, authToken: any): Chainable<any>
        getPracticeOfficeHours(authToken: any): Chainable<any>
        getAutoEnabledStatus(authToken: any, accountID: any): Chainable<any>
        apiCreatePatient(firstName: any, lastName: any, gender: any, email: any, authToken: any): Chainable<any>
        apiGetPatientUsrIdForNonExistingPtnt(authToken: any, firstName: any, lastName: any, birthDate: any, phonenumber: any, email: any): Chainable<any>
        /*/ <reference types="Cypress"/>*/
        createEnterpriseAPI(autToken: any, apiUrl: any, name: any, plan: any, organization: any): Chainable<any>
        getAccounts(autToken: any, apiUrl: any): Chainable<any>
        createPracticeAPI(autToken: any, apiUrl: any, name: any, website: any, timezone: any, destinationPhoneNumber: any, street: any, country: any, state: any, city: any, zipCode: any): Chainable<any>
        getPracticeAPI(autToken: any, apiUrl: any): Chainable<any>
        delete(authToken: any, apiUrl: any): Chainable<any>
        createRelease(data: any, accountID: any): Chainable<any>
        getLatestRelease(): Chainable<any>
        createFamily(acctId: any, pmsId: any, headId: any): Chainable<any>
        getFamily(familyId: any): Chainable<any>
        getAllFamilies(): Chainable<any>
        batchCreateFamily(acctId: any, pmsId_2: any, headId_2: any, pmsId_3: any, headId_3: any): Chainable<any>
        deleteFamily(familyId: any): Chainable<any>
        loggedFollowUpviaGraphQL(accountId: any, patientId: any, userId: any, note: any, patientFollowUpTypeId: any): Chainable<any>
        fetchFollowUpTypes_NEST(): Chainable<any>
        UpdateloggedFollowUpviaGraphQL(followUpDataId: any, userId: any, patientFollowUpTypeId: any): Chainable<any>
        fetchMyFollowUps(accountId: any, userId: any): Chainable<any>
        loggedRecallviaGraphQL(accountId: any, patientId: any, userId: any, note: any, sentRecallOutcomeId: any): Chainable<any>
        fetchSentRecallOutcomes_NEST(): Chainable<any>
        updatePatient(authToken: any, patientId: any, firstName: any, lastName: any, email: any, birthDate: any, mobilePhoneNumber: any, homePhoneNumber: any, cellPhoneNumber: any): Chainable<any>
        createChair(chairName: any, chairDesc: any, isActiveStatus: any): Chainable<any>
        updateChair(chairNameUp: any, chairDescUp: any, isActiveStatus: any, chairId: any): Chainable<any>
        deleteChair(chairId: any): Chainable<any>
        getAllChairs(authToken: any): Chainable<any>
        getSingleChair(authToken: any, chairID: any): Chainable<any>
        createApptApi(authToken: any, startpoint: any, endpoint: any, patientId: any): Chainable<any>
        createOnlineBooking(authToken: any, accountId: any, insCarrier: any, patientUserId: any, practitionerId: any, requestingPatientUserId: any, servId: any, myNote: any): Chainable<any>
        createWaitspotForOnlineBookingAppt(authToken: any, accountID: any, patientUserId: any, practitionerId: any, reasonId: any): Chainable<any>
        createEvent(accountId: any, pmsId: any, randomNote: any, description: any, pracId: any, chairId: any, startDate: any, endDate: any): Chainable<any>
        getAllEvents(accountId: any, startDate: any, endDate: any): Chainable<any>
        updateEvent(eventId: any, pmsIdUp: any, randomNoteUp: any, descriptionUp: any, startDateUp: any, endDateUp: any): Chainable<any>
        deleteEvent(eventId: any): Chainable<any>
        doMyOnlineBooking(authToken: any, acntId: any, insCarrier: any, patientUserId: any, practitionerId: any, requestingPatientUserId: any, servId: any, myNote: any): Chainable<any>
        doMyOnlineBookingWithin6Months(authToken: any, acntId: any, insCarrier: any, patientUserId: any, practitionerId: any, requestingPatientUserId: any, servId: any, myNote: any): Chainable<any>
        onlineBookingForNonExistingPtnt(authToken: any, patientUserid: any, accountId: any, insuranceCarrier: any, practitionerId: any, requestingPatientUserId: any, serviceId: any, note: any, appointmentType: any): Chainable<any>
        createPractitioner(firstName: any, lastname: any): Chainable<any>
        getPractitioner(accountID: any): Chainable<any>
        getAllPractitioner(accountID: any): Chainable<any>
        deletePractitioner(practitionerID: any): Chainable<any>
        updatePractitioner(firstName: any, lastName: any, practitionerID: any): Chainable<any>
        getAllServices(authToken: any): Chainable<any>
        getSpecificService(authToken: any, serviceId: any): Chainable<any>
        updateSpecificService(authToken: any, serviceId: any, reasonName: any, reasonDescription: any, reasonDuration: any, practitioners: any, isDefault: any, isHidden: any): Chainable<any>
        createSpecificService(authToken: any, reasonName: any, reasonDescription: any, reasonDuration: any): Chainable<any>
        deleteSpecificService(authToken: any, serviceId: any, reasonName: any): Chainable<any>
        /*/ <reference types="Cypress"/>*/
        getFlaggedTabs(authToken: any): Chainable<any>
        getAllTabs(authToken: any): Chainable<any>
        /*/ <reference types="Cypress"/>*/
        getFormNames(selector: any, value: any, length: any): Chainable<any>
        validateCopyCommand(selector: any): Chainable<any>
        validateShortUrlActive(selector: any): Chainable<any>
        typeKeys(locator: any, text: any): Chainable<any>
        verifyText(elementLocator: any, text: any): Chainable<any>
        clearSessionStorage(): Chainable<any>
        isDisplayed(selector: any): Chainable<any>
        clickOn(selector: any): Chainable<any>
        getTextFromLocator(selector: any): Chainable<any>
        selectDropdownByListOfValues(selector: any, listOfValues: any): Chainable<any>
        selectDropdownByValue(selector: any, optionValue: any): Chainable<any>
        selectDropdownBySearchValueWithSelect2(selector: any, searchValue: any): Chainable<any>
        readJsonDataFromFile(fixturepath: any): Chainable<any>
        validateOrganizationError(plan: any, enterprise: any): Chainable<any>
        createEnterprise(plan: any, enterprise: any, org: any, csm: any): Chainable<any>
        viewEnterpriseDetails(enterprise: any): Chainable<any>
        searchEnterprise(enterprise: any): Chainable<any>
        editOrganization(org: any): Chainable<any>
        changeCsmOwner(csm: any): Chainable<any>
        createEnterpriseWithoutCsm(plan: any, enterprise: any, org: any): Chainable<any>
        deleteEnterprise(enterprise: any): Chainable<any>
        searchEnterpriseName(entName: any): Chainable<any>
        searchPracticeName(pracName: any): Chainable<any>
        searchEnterpriseNameWithNumerics(entNameNums: any): Chainable<any>
        searchEnterpriseNameWithSpChars(entNameSpChars: any): Chainable<any>
        searchPracticeNameWithSpChars(): Chainable<any>
        searchPracticeNameWithNumerics(pracNameNums: any): Chainable<any>
        savelocalstorage(): Chainable<any>
        restorelocalstorage(): Chainable<any>
        /*
        This Custom commands is used for creating a new practise
        
        */
        createPractice(data: any, isExternalID: any): Chainable<any>
        /*
        This Custom commands is used for select a group for new  practise
        
        */
        selectGroup(data: any): Chainable<any>
        /*
        This Custom commands is used for enter details  for new  practise
        
        */
        fillPracticeDetails(data: any, isExternalID: any): Chainable<any>
        /*
        This Custom commands is used for enter address details  for new  practise
        
        */
        fillAddressDetails(data: any): Chainable<any>
        /*
        This Custom commands is used for enter owner details  for new  practise
        
        */
        fillOwnerDetails(data: any): Chainable<any>
        verifyAccountOptionAndClick(data: any, isExternalID: any): Chainable<any>
        searchAndSelectEnterprise(data: any): Chainable<any>
        /* })*/
        addOrUpdateExternalIdToExistingPractise(data: any, isContainExternalID: any): Chainable<any>
        verifyEditPractisePopUPFields(data: any): Chainable<any>
        verifyOrganizationAndCSMOwnerField(): Chainable<any>
        selectPractiseAndUpdateExternalIDWithSpecialCharacter(data: any, isContainExternalID: any): Chainable<any>
        preRequsiteForExternalID(): Chainable<any>
        searchPracticeOrEnterprise(data: any): Chainable<any>
        navigateToChairsSection(): Chainable<any>
        navigateToPractionersSchduleSection(): Chainable<any>
        /*
             This custom commands is validating chairs are correctly displayed on UI
        */
        verifyChairsCorrectlyDisplayed(response: any): Chainable<any>
        getChairFromDB(): Chainable<any>
        /*
             This custom commands is creating a Json file from API response
        */
        createJsonFileFromResponse(response: any, filepath: any): Chainable<any>
        /*
             This custom commands is used for getting  chair details from Json Object
        */
        getAllChairData(jsonObject: any): Chainable<any>
        /*
             This custom commands is validating chair details on UI usinh HashMap
        */
        verifyChairDetailsWithMap(map: any): Chainable<any>
        getAccountConfigurationAndUpdateAutoEnabled(practiseName: any): Chainable<any>
        selectPatientDropdown(): Chainable<any>
        selectPatientDropdownCaretAreoIcon(): Chainable<any>
        clickOnPatientDropdownCaretAreoIcon(): Chainable<any>
        selectPatientOptions(inputOption: any): Chainable<any>
        verifyPatientListForSelectedOptionByStatus(token: any, uiOption: any, inputStatus: any): Chainable<any>
        clickOnFilterResetButton(): Chainable<any>
        clickOnFilterDemographicButton(): Chainable<any>
        selectPatientSearchFilterByStatus(inputStatus: any, uiOption: any): Chainable<any>
        validatePracticeOfficeHoursDisplayed(): Chainable<any>
        validatePracticeOfficeHours(jsonObject: any): Chainable<any>
        /*
             This custom commands is navigating us to Practioner tab.
        */
        navigateToPractitioner(): Chainable<any>
        /*
             This custom commands is validating Practioner Tab details.
        */
        verifyParctitionersCorrectlyDisplayed(response: any): Chainable<any>
        /*
             This custom commands is used for getting  Practioner details from Json Object
        */
        getAllPractitionerData(jsonObject: any): Chainable<any>
        /*
             This custom commands is validating practitioner details on UI using HashMap
        */
        verifyPractitionerDetails(practitionerMap: any): Chainable<any>
        /*
             This custom commands is getting Total number of Practitioners Account
        */
        getAllPractitionersCount(practitionerMap: any): Chainable<any>
        /*
             This custom commands is validating practitioner's name on UI with API response
        */
        ValidatePractitionerName(practitionerMap: any): Chainable<any>
        selectPractitonerAndNavigateToPractitionerSchedule(): Chainable<any>
        verifyChairsLinkedToPractionerSchedule(data: any): Chainable<any>
        /*
             This custom commands is validating practitioner's Weekly Time Slots With API response on UI
        */
        validatePractitionerSchedule(jsonObject: any): Chainable<any>
        /*
             This custom commands is navigating us to Patient Management tab.
        */
        navigateToPatientManagement(): Chainable<any>
        /*
             This custom commands is validating new Patient form .
        */
        addNewPatient(patientData: any): Chainable<any>
        /*
             This custom commands is filling all fields for adding new patient..
        */
        fillPatientForm(patientData: any): Chainable<any>
        assertPatientToastMessageSuccess(toastmessage: any): Chainable<any>
        getMatchedApptsCount(): Chainable<any>
        removeOnlineRequests(): Chainable<any>
        /* GetiFrame Command*/
        getIframeBody(): Chainable<any>
        assertsscheduletabisavailable(): Chainable<any>
        assertswaitlistbuttonisvisible(): Chainable<any>
        assertscurrentdatelabel(date: any): Chainable<any>
        assertscurrentmonthlabel(month: any): Chainable<any>
        assertscurrentdayofweek(dayofweek: any): Chainable<any>
        assertstodaybuttonisavailable(): Chainable<any>
        assertsquickaddbutton(): Chainable<any>
        addpatientandselectfromlist(patient: any): Chainable<any>
        selectrandomstartime(todayDate: any): Chainable<any>
        selectrandomchair(): Chainable<any>
        selectrandompractitioner(): Chainable<any>
        asserttoastmessagesuccess(firstname: any, toastmessage: any): Chainable<any>
        clicktodaybutton(): Chainable<any>
        linkApptForPartialMatch(): Chainable<any>
        editReasonDetails(reasonNameEdit: any, reasonDescEdit: any, reasonDuration: any): Chainable<any>
        randomlycheckboxfromdropdownlist(selector: any): Chainable<any>
        asserttoastmessagesuccessreason(toastMsg1: any, nameReason: any, toastMsg: any): Chainable<any>
        asserttoastmessagesuccessPractitioner(toastMsg: any, reasonServiceName: any): Chainable<any>
        getCountOfChats(): Chainable<any>
        searchPatientChat(patient: any): Chainable<any>
        getOpenCount(authToken: any): Chainable<any>
        getFlaggedCount(authToken: any): Chainable<any>
        getUnreadCount(authToken: any): Chainable<any>
        unFlagSelectedChat(patient: any): Chainable<any>
        deleteChatId(autToken: any, chatId: any): Chainable<any>
        getRevenueDetailsFromAPI(authToken: any, revenueDate: any): Chainable<any>
        getRevenueDetailsFromAPIs(authToken: any, revenueDate: any): Chainable<any>
        getPatientInsightFromAPIs(authToken: any, selectDate: any, selectEndDate: any): Chainable<any>
        getAppointmentsFromAPIs(authToken: any, selectDate: any, selectEndDate: any): Chainable<any>
        getOnlineRequestsFromAPIs(authToken: any, filterType: any): Chainable<any>
        getWaitingRoomReqFromAPIs(authToken: any): Chainable<any>
        getAccountId(authToken: any): Chainable<any>
        getDonnaTodoList(authToken: any, selectDate: any, selectEndDate: any, todoListType: any): Chainable<any>
        getTimeZoneBySelectedAccount(authToken: any): Chainable<any>
        getPatientListFromAPIForSelectedOptionByStatus(authToken: any, selectedOption: any, seletedStatus: any): Chainable<any>
        dashboardLoginByAPI(username: any, password: any, apiUrl: any): Chainable<any>
        verifyWelcomeMessage(user: any): Chainable<any>
        isDisplayedCalendarIcon(): Chainable<any>
        clickOnCalendarIcon(): Chainable<any>
        verifyDashboardCurrentLoginDate(currentDate: any): Chainable<any>
        clickOnCalendarPrevButton(): Chainable<any>
        clickOnCalendarNextButton(): Chainable<any>
        selectYearDynamic(inputDate: any): Chainable<any>
        selectMonthDynamic(inputDate: any): Chainable<any>
        selectDayDynamic(inputDate: any): Chainable<any>
        selectDashboardDate(inputDate: any): Chainable<any>
        revenueContainer(): Chainable<any>
        revenueTodaysContainer(): Chainable<any>
        isProductionBillTitleDisplayed(apiTodayBilledText: any): Chainable<any>
        verifyProductionBillAmount(produtionBillAmount: any): Chainable<any>
        verifyAverageTitle(avgTitle: any): Chainable<any>
        verifyAverageAmount(avrageAmount: any): Chainable<any>
        verifyPercentageAmount(percentageAmount: any): Chainable<any>
        isYesterdaysProductionBillTitleDisplayed(yesterdaysProdBillTitle: any): Chainable<any>
        verifyYesterdaysProductionBillAmount(yesterdayProdBillAmount: any): Chainable<any>
        isRevenueChartDisplayed(inputDate: any): Chainable<any>
        verifyPatientWaitingRoomCount(patientWaitingRoomCount: any): Chainable<any>
        isDisplayedPatientWaitingRoomTitle(patientWaitingRoomCount: any): Chainable<any>
        verifyPatientsUnconfirmedCount(patientsUnconfirmedCountData: any): Chainable<any>
        isDisplayedPatientsUnconfirmedTitle(patientsUnconfirmedCountData: any): Chainable<any>
        verifyPatientInsightsCount(patientInsightsCountData: any): Chainable<any>
        isDisplayedPatientInsightsTitle(patientInsightsCountData: any): Chainable<any>
        verifyAppointmentsTodayCount(appointmentsTodayCountData: any): Chainable<any>
        isDisplayedAppointmentsTodayTitle(appointmentsTodayCountData: any): Chainable<any>
        verifyWaitingRoomTab(waitingRoomTab: any): Chainable<any>
        verifyWaitingRoomCount(waitingRoomCount: any): Chainable<any>
        verifyWaitingRoomRequests(waitingRoomRequests: any): Chainable<any>
        selectTab(inputTabName: any, inputTabCount: any): Chainable<any>
        verifyApptsTabListDetails(): Chainable<any>
        verifyOnlineReqTabListDetails(): Chainable<any>
        verifyWaitRoomTabListDetails(): Chainable<any>
        verifyPatientName(): Chainable<any>
        verifyPractitionerName(): Chainable<any>
        verifyAppointmentLastDate(): Chainable<any>
        verifyAppointmentTime(): Chainable<any>
        /*UI*/
        scrollToReminder(): Chainable<any>
        clickOnTodosButton(todoType: any): Chainable<any>
        getTodoListCardTitle(todoListCardHeaderTitle: any): Chainable<any>
        verifyNoApptReminderText(noApptReminderText: any): Chainable<any>
        getApptReminderListHeaders(): Chainable<any>
        getTodoListCardTitleCount(todoType: any): Chainable<any>
        verifyReminderPatientList(token: any, startDate: any, endDate: any, toDoType: any): Chainable<any>
        verifyPatientNameOnPopUpHeader(patientName: any): Chainable<any>
        verifyPatientAgeOnPopUpHeader(patientAge: any): Chainable<any>
        verifyPatientInfoPopUp(patientGender: any, phoneNo: any, email: any, nextAppointment: any, lastAppointment: any, address: any): Chainable<any>
        closePatientInfoPopUp(): Chainable<any>
        getApptRecallsListHeaders(): Chainable<any>
        getPatientReviewListHeaders(): Chainable<any>
        verifyRecalls(token: any, startDate: any, endDate: any, toDoType: any): Chainable<any>
        verifyReviews(token: any, startDate: any, endDate: any, toDoType: any): Chainable<any>
        signatureForms(): Chainable<any>
        validateReminderText(selector: any, text: any): Chainable<any>
        validateReminderScreenContent(selector: any, text: any): Chainable<any>
        validateReminderIcons(selector: any, text: any): Chainable<any>
        SelectAndEditReminder(reminderData: any): Chainable<any>
        clickDrwawerXIcon(): Chainable<any>
        clickDontSaveOrGoBackButton(selector: any): Chainable<any>
        validateReminderDrawerValues(reminderData: any): Chainable<any>
        navigateToReminderPage(): Chainable<any>
        revertToDefaultReminderSettings(): Chainable<any>
        createMaxConfirmableReminders(selector: any): Chainable<any>
        createMaxFriendlyReminders(selector: any): Chainable<any>
        revertToDefaultSms(): Chainable<any>
        revertToDefaultEmail(): Chainable<any>
        /* Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })*/
        validateWaitingRoomScreenText(selector: any, text: any): Chainable<any>
        /* GetARandomPageonWaitlist*/
        getSpecificWaitlistPage(Num: any): Chainable<any>
        getRandomWaitlistPageInBetween(totalNum: any): Chainable<any>
        getCountOfWaitlistPatients(): Chainable<any>
  }
}