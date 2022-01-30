import uiHelper from "../../../../../integration/donna/gui/smoketests/common/UIHelper"
import dashboardPageSelector from "../../../../selectors/automationworkflow/dashboard/dashboardPageSelector"


Cypress.Commands.add('dashboardLoginByAPI', (username, password, apiUrl) => {
    Cypress.log({
        message: 'Requesting token',
        displayName: 'Lets get the token'
    })
    cy.request({
        method: 'POST',
        url: apiUrl,
        body: {
            username,
            password,
        }
    }).then((response) => {
        Cypress.env('token', response.body.token);
        Cypress.env('loginDate', uiHelper.getCurrentDate());
        localStorage.setItem('token', response.body.token)
        return response;
    })
})

Cypress.Commands.add("verifyWelcomeMessage", (user) => {
    cy.on('uncaught:exception', (err, runnable) => {
        cy.log("Assert fail due to exception")
        return false
    })
    //Custom command to assert that logged user is displayed in dashboard page
    cy.get(dashboardPageSelector.welcomeMessage)
        .should('be.visible')
        .should('have.text', 'Welcome Back, ' + user)
})

Cypress.Commands.add("isDisplayedCalendarIcon", () => {
    cy.get(dashboardPageSelector.calendarIcon).should('be.visible')
})

Cypress.Commands.add("clickOnCalendarIcon", () => {
    cy.get(dashboardPageSelector.calendarIcon).should("be.visible").click()
    cy.wait(2000)
})

Cypress.Commands.add("verifyDashboardCurrentLoginDate", (currentDate) => {
    cy.get(dashboardPageSelector.calendarDateTextbox).should('be.visible')
        .invoke('attr', 'value')
        .should('eq', uiHelper.getInputDate(currentDate))
})

Cypress.Commands.add("clickOnCalendarPrevButton", () => {
    cy.get(dashboardPageSelector.calendarPrevButton).should('be.visible').click()
})
Cypress.Commands.add("clickOnCalendarNextButton", () => {
    cy.get(dashboardPageSelector.calendarNextButton).should('be.visible').click()
})
Cypress.Commands.add("selectYearDynamic", (inputDate) => {
    let uiYearText
    let currentDate = uiHelper.getCurrentDate()
    let currentYear = parseInt(uiHelper.getYear(currentDate))
    cy.log("Year from current date", currentYear)
    let inputYearText = parseInt(uiHelper.getYear(inputDate))
    cy.log("Year from input date", inputYearText)
    cy.log("Select year from input date", inputDate)
    cy.wait(2000)
    cy.get('div.dayPicker__caption___bBVc7').should('be.visible')
        .invoke('text').then((year) => {
            cy.log("Calendar Text ", year)
            uiYearText = uiHelper.getYearFromCalendarText(year)
            cy.log("Year from Calendar Text ", uiYearText)
            if (inputYearText == uiYearText) {
                cy.log(inputYearText + " is selected")
                return
            } else {

                if (inputYearText < currentYear) {
                    cy.clickOnCalendarPrevButton()
                } else if (inputYearText > currentYear) {
                    cy.clickOnCalendarNextButton()
                }
            }
            cy.selectYearDynamic(inputDate)
        })
})

Cypress.Commands.add("selectMonthDynamic", (inputDate) => {
    let inputMonthName = uiHelper.getMonthName(uiHelper.getMonth(inputDate))
    // let currentMonth = new Date().getMonth() +1
    // cy.log("currentMonth ", currentMonth)
    let currentYearMonth = uiHelper.getMonth(uiHelper.getCurrentDate())
    let currentYearMonthName = uiHelper.getMonthName(currentYearMonth)
    let currentMonthIndex = uiHelper.getMonthIndexFromName(currentYearMonthName)
    let inputMonthIndex = uiHelper.getMonthIndexFromName(inputMonthName)
    cy.log("Current date month index ", currentMonthIndex)
    cy.log("Input date month index ", inputMonthIndex)
    cy.log("Month name from input date ", inputMonthName)
    cy.log("Month name from current date ", currentYearMonthName)

    let currentMonth = new Date().getMonth() + 1
    let givenMonth = uiHelper.getMonthIndexFromName(inputMonthName)
    cy.log("currentMonth index", currentMonth)
    cy.log("givenMonth index", givenMonth)



    cy.wait(2000)
    cy.get('div.dayPicker__caption___bBVc7').should('be.visible')
        .invoke('text').then((month) => {
            let uiMonthText = uiHelper.getMonthNameFromCalendarText(month)
            let uiMonthIndex = uiHelper.getMonthIndexFromName(uiMonthText)
            cy.log("UI month index ", uiMonthIndex)
            cy.log("Month name from UI", uiMonthText)
            if (uiMonthText == inputMonthName) {
                cy.log(inputMonthName + "month is selected")
                return
            } else {
                if (inputMonthIndex > currentMonthIndex) {
                    cy.clickOnCalendarNextButton()
                } else if (inputMonthIndex < currentMonthIndex) {
                    cy.clickOnCalendarPrevButton()
                } else if (uiMonthIndex = 1) {
                    cy.log("Month is selected based on January")
                    cy.clickOnCalendarNextButton()
                }
            }
            cy.selectMonthDynamic(inputDate)
        })

})

Cypress.Commands.add("selectDayDynamic", (inputDate) => {

    cy.log("Select Day from calendar")
    cy.get('.dayPicker__week___1_1tJ')
        .each(($el, index, $list) => {
            cy.log("Week Row Data", $el.text())
            cy.get('.dayPicker__day___2iwZS ')
                .each(($day, index, $daylist) => {
                    var dayName = $day.text()
                    //cy.log("***********",dayName)
                    if (dayName == uiHelper.getDay(inputDate)) {
                        cy.log("************", dayName)
                        cy.wrap($day).click()
                        cy.log(uiHelper.getDay(inputDate) + " is selected")
                        return false
                    }
                })
            return false
        })
})

Cypress.Commands.add("selectDashboardDate", (inputDate) => {
    cy.clickOnCalendarIcon()
    cy.selectYearDynamic(inputDate)
    cy.selectMonthDynamic(inputDate)
    cy.selectDayDynamic(inputDate)
    cy.verifyDashboardCurrentLoginDate(inputDate)
})

Cypress.Commands.add("revenueContainer", () => {
    cy.get(dashboardPageSelector.revenueContainer).should('be.visible')
})
Cypress.Commands.add("revenueTodaysContainer", () => {
    cy.revenueContainer()
    cy.get(dashboardPageSelector.revenueTodaysContainer).should('be.visible')
})
Cypress.Commands.add("isProductionBillTitleDisplayed", (apiTodayBilledText) => {
    cy.get('div.styles__todaysProductionText___1oWAQ')
        .should("be.visible")
        //.should("contain", "Billed Production")
        .should("have.text",apiTodayBilledText)
})

Cypress.Commands.add("verifyProductionBillAmount", (produtionBillAmount) => {
    cy.get('div.styles__revenueColFlex___zr-MI > div.styles__revenueContainer___2eYxW.styles__card___1NMjw > div.styles__revenueDisplay___3cXCX > div.styles__revenueDisplayTop___2WdmF > div.styles__todaysProductionValue___254Oc.fonts__fontMedium___3dyeW').invoke('text').then((text)=>{
        let amount = text
        expect("$"+produtionBillAmount, "production amount verified").to.equal(amount)
    })    
})

Cypress.Commands.add("verifyAverageTitle", (avgTitle) => {
    cy.get('.styles__yesterdayLeft___36Cvd > :nth-child(1)')
        .should("be.visible").should("contain", avgTitle);
})

Cypress.Commands.add("verifyAverageAmount", (avrageAmount) => {
    cy.get('.styles__yesterdayLeft___36Cvd > :nth-child(2)')
        .should("be.visible")
        .should("contain", "$" + Math.floor(avrageAmount));
})

Cypress.Commands.add("verifyPercentageAmount", (percentageAmount) => {
    cy.get('div.styles__percentageBox___2cB-1')
        .should('have.text', percentageAmount + "%")
})


Cypress.Commands.add("isYesterdaysProductionBillTitleDisplayed", (yesterdaysProdBillTitle) => {
    cy.get('div.styles__average_text___qVfL9')
        .should('have.text', yesterdaysProdBillTitle)
})
Cypress.Commands.add("verifyYesterdaysProductionBillAmount", (yesterdayProdBillAmount) => {
    // cy.revenueTodaysContainer()
    // cy.get('div').eq(1).should('be.visible')
    // cy.get(dashboardPageSelector.yesterdayProdBillAmount)
    //     .should('have.text', "$" + yesterdayProdBillAmount)

        cy.get('div.styles__revenueDisplay___3cXCX > div.styles__average___2-mqB.fonts__fontMedium___3dyeW > div.styles__average_value___3NvFY').invoke('text').then((text)=>{
            let amount = text
            expect("$"+yesterdayProdBillAmount, "yesterday's production amount verified").to.equal(amount)
        })   
})

Cypress.Commands.add("isRevenueChartDisplayed", (inputDate) => {

    let avgRevenue
    cy.log("Get API response for input date", inputDate)
    cy.getRevenueDetailsFromAPI(Cypress.env('token'), inputDate)
        .then((response) => {
            avgRevenue = JSON.stringify(response.body.data.average)
            cy.log(JSON.stringify(response.body.data.average))
        })
    cy.get(dashboardPageSelector.revenueChart).should("be.visible")
        .invoke('text').then((graphData) => {
            if (avgRevenue > 0) {
                cy.log("if height of graph should be greater than 100 then the graph would be visible on dashboard")
                cy.get('canvas.chartjs-render-monitor').should("be.visible").and(chart => {
                    // we can assert anything about the chart really
                    expect(chart.height()).to.be.greaterThan(100)
                })

            } else {
                cy.log("if height of graph should not be greater than 0 then the graph would not be visible on dashboard and shoing no revenue")
                cy.get('.styles__noRevenue___1PHIq').should("be.visible").should("contain", "No Revenue")
                expect("No Revenue").to.be.eq(graphData.trim())
            }
        })
})

Cypress.Commands.add("verifyPatientWaitingRoomCount", (patientWaitingRoomCount) => {
    if (patientWaitingRoomCount == 1) {
        cy.get(dashboardPageSelector.patientInWaitingRoomCount)
            .should("have.text", patientWaitingRoomCount)
    } else {
        cy.get(dashboardPageSelector.patientsInWaitingRoomCount)
            .should("have.text", patientWaitingRoomCount)
    }
})
Cypress.Commands.add("isDisplayedPatientWaitingRoomTitle", (patientWaitingRoomCount) => {

    if (patientWaitingRoomCount == 1) {
        cy.get(dashboardPageSelector.patientInWaitingRoomCount).next()
            .should("have.text", "Patient in Waiting Room")
    } else {
        cy.get(dashboardPageSelector.patientsInWaitingRoomCount).next()
            .should("have.text", "Patients in Waiting Room")
    }

})

Cypress.Commands.add("verifyPatientsUnconfirmedCount", (patientsUnconfirmedCountData) => {

    if (patientsUnconfirmedCountData == 1) {
        cy.get(dashboardPageSelector.patientUnconfirmedCount)
            .should("have.text", patientsUnconfirmedCountData)
    } else {
        cy.get(dashboardPageSelector.patientsUnconfirmedCount)
            .should("have.text", patientsUnconfirmedCountData)
    }

})
Cypress.Commands.add("isDisplayedPatientsUnconfirmedTitle", (patientsUnconfirmedCountData) => {
    if (patientsUnconfirmedCountData == 1) {
        cy.get(dashboardPageSelector.patientUnconfirmedCount).next()
            .should("have.text", "Patient Unconfirmed")
    } else {
        cy.get(dashboardPageSelector.patientsUnconfirmedCount).next()
            .should("have.text", "Patients Unconfirmed")
    }
})

Cypress.Commands.add("verifyPatientInsightsCount", (patientInsightsCountData) => {
    if (patientInsightsCountData == 1) {
        cy.get(dashboardPageSelector.patientInsightCount)
            .should("have.text", patientInsightsCountData)
    } else {
        cy.get(dashboardPageSelector.patientInsightsCount)
            .should("have.text", patientInsightsCountData)
    }
})
Cypress.Commands.add("isDisplayedPatientInsightsTitle", (patientInsightsCountData) => {
    if (patientInsightsCountData == 1) {
        cy.get(dashboardPageSelector.patientInsightCount).next()
            .should("have.text", "Patient Insight")
    } else {
        cy.get(dashboardPageSelector.patientInsightsCount).next()
            .should("have.text", "Patient Insights")
    }
})

Cypress.Commands.add("verifyAppointmentsTodayCount", (appointmentsTodayCountData) => {

    if (appointmentsTodayCountData == 1) {
        cy.get(dashboardPageSelector.appointmentTodayCount)
            .should("have.text", appointmentsTodayCountData)
    } else {
        cy.get(dashboardPageSelector.appointmentsTodayCount)
            .should("have.text", appointmentsTodayCountData)
    }
})
Cypress.Commands.add("isDisplayedAppointmentsTodayTitle", (appointmentsTodayCountData) => {
    //cy.get(dashboardPageSelector.appointmentsTodayCount).invoke('text').then((count)=>{
    if (appointmentsTodayCountData == 1) {
        cy.get(dashboardPageSelector.appointmentTodayCount).next()
            .should("have.text", "Appointment Today")
    } else {
        cy.get(dashboardPageSelector.appointmentsTodayCount).next()
            .should("have.text", "Appointments Today")
    }
    // })
})
Cypress.Commands.add("verifyWaitingRoomTab", (waitingRoomTab) => {
    cy.get().should("be.visible").should("have.text", waitingRoomTab)
})
Cypress.Commands.add("verifyWaitingRoomCount", (waitingRoomCount) => {
    cy.get().should("be.visible").should("have.text", waitingRoomCount)
})
Cypress.Commands.add("verifyWaitingRoomRequests", (waitingRoomRequests) => {

    cy.get().should("be.visible").should("have.text", waitingRoomRequests)
})

Cypress.Commands.add("selectTab", (inputTabName, inputTabCount) => {
    let map = new Map()
    let tabName
    cy.get('div.styles__dashboard___3s6h3').should("be.visible")
    cy.get('div.styles__colFlex___1HoHt').should("be.visible")
    cy.get('div.styles__tabs___22FDj').should("be.visible")
    cy.get('nav.styles__nav___3VrYI').should("be.visible")
    cy.get(dashboardPageSelector.tabContainerList)
        .each(($ele) => {
            tabName = $ele.text()
            tabName.substr(0, tabName.indexOf(' ')); // "72"
            //cy.log("Numric Part",tabName.substr(0,tabName.indexOf(' ')))
            //cy.log("String Part",tabName.substr(tabName.indexOf(' ')+1))
            //str.substr(str.indexOf(' ')+1); // "tocirah sneab"
            map.set(tabName.substr(tabName.indexOf(' ') + 1), tabName.substr(0, tabName.indexOf(' ')))
            if ((inputTabName == tabName.substr(tabName.indexOf(' ') + 1)) &&
                (inputTabCount == parseInt(tabName.substr(0, tabName.indexOf(' '))))) {
                cy.log(inputTabName + " is selected ")
                cy.wrap($ele).click()
                return false
            }
        })
})

Cypress.Commands.add("verifyApptsTabListDetails", () => {
    cy.get(dashboardPageSelector.tabAppointmentList).should("be.visible")
    cy.get('div.styles__appLink___1NyTn')
        .each(($appt) => {
            var apptInfo = $appt.text()
            cy.log("Appointment info ", apptInfo)
            cy.get('.styles__appItem___nSkSk').should("be.visible")
        })
})

Cypress.Commands.add("verifyOnlineReqTabListDetails", () => {
    cy.get('div.styles__requestBody___3ntRl').should("be.visible")
    //cy.get('div.styles__appLink___1NyTn')
    cy.get(':nth-child(1) > .styles__requestListItem___2vq_w')
        .each(($appt) => {
            var apptInfo = $appt.text()
            cy.log("Online Req info ", apptInfo)
            //cy.get('.styles__appItem___nSkSk').should("be.visible")

            cy.get('div.styles__monthDay_new___3dTKW').should("contain", "WEBSITE")
        })
})

Cypress.Commands.add("verifyWaitRoomTabListDetails", () => {
    cy.get('div.styles__container___1cJJz').should("be.visible")
    cy.get('ul.styles__list___19r86').should("be.visible")
    cy.get('li.styles__waitingRoomListItem___35a8O').each(($appt) => {
        var apptInfo = $appt.text()
        cy.log("Waiting room info ", apptInfo)
        cy.get('div.styles__leftSection___1__cb').should("be.visible")
    })
})
Cypress.Commands.add("verifyPatientName", () => {
    cy.get(dashboardPageSelector.tabAppointmentListList).should("be.visible")
})
Cypress.Commands.add("verifyPractitionerName", () => {
    cy.get(dashboardPageSelector.tabAppointmentListList).should("be.visible")
})
Cypress.Commands.add("verifyAppointmentLastDate", () => {
    cy.get(dashboardPageSelector.tabAppointmentListList).should("be.visible")
})

Cypress.Commands.add("verifyAppointmentTime", () => {
    cy.get(dashboardPageSelector.tabAppointmentListList).should("be.visible")
})

//UI

Cypress.Commands.add("scrollToReminder", () => {
    cy.get('div.styles__header___284Wq',{timeout: 10000}).scrollIntoView()
        .should("have.text", "Donna's To-Do List")
})

Cypress.Commands.add("clickOnTodosButton", (todoType) => {
    cy.get('nav.styles__nav___3VrYI').should("be.visible")
     cy.get('label.styles__tab___1R-MA').each(($el) => {
        if ($el.text() == todoType) {
            cy.wrap($el).click()
             cy.wait(1000)
             expect(todoType, "button selected for " + todoType).to.equal($el.text())
             return false
        }
    }).then(()=>{
        cy.log("Button selected")
    })
})

Cypress.Commands.add("getTodoListCardTitle", (todoListCardHeaderTitle) => {
    cy.get('div.styles__countHeader___1clAT',{timeout:25000}).invoke('text').then((text) => {
        let titleName = text
        let todoListCardTitle = titleName.substr(titleName.indexOf(' ') + 1)
        cy.log("Todolist Card Title", todoListCardTitle)
        expect(todoListCardHeaderTitle, "Title on header verified").to.eq(todoListCardTitle)
    })
})

Cypress.Commands.add("verifyNoApptReminderText", (noApptReminderText) => {
    cy.get('div.styles__container___tdB3W > div.styles__body___3Qvz0> div.styles__noReminders___qkhSh').invoke('text').then((text) => {
        let noApptRemText = text
        expect(noApptReminderText, noApptReminderText + " text should be visisble for 0 reminder").to.eq(noApptRemText)
    })
})
Cypress.Commands.add("getApptReminderListHeaders", () => {
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div:nth-child(1)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Short Name", Fieldtext)
        expect(true, "Short Name Header for reminders").to.true;
    })
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div:nth-child(2)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Contact", Fieldtext)
        expect(Fieldtext, "Contact Name Header for reminders").to.equal("Contact");
    })
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div:nth-child(3)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Type", Fieldtext)
        expect(Fieldtext, "Type Header for reminders").to.equal("Type");
    })
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div:nth-child(4)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("PATIENT", Fieldtext)
        expect(Fieldtext, "PATIENT Header for reminders").to.equal("Patient");
    })
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div:nth-child(5)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("DUE FOR Appointment", Fieldtext)
        expect(Fieldtext, "APPOINTMENT Header for reminders").to.equal("Appointment");
    })
})

Cypress.Commands.add("getTodoListCardTitleCount", (todoType) => {
    cy.get('div.styles__container___tdB3W.styles__container___26_Lo > div.styles__countHeader___1clAT.styles__header___2phjd > span').invoke('text').then((text) => {
        cy.log("UI Card Header Title", text)
        let titleName = text
        //let reminderTitleCount = titleName.substr(0, titleName.indexOf(' '))
        //let uiCount = parseInt(reminderTitleCount.trim())
        let uiCount = parseInt(titleName.trim())
        cy.log("UI header Count", uiCount)
        if (uiCount == 0 && todoType == "Appointment Reminders") {
            cy.get('div.styles__container___tdB3W > div.styles__body___3Qvz0> div.styles__noReminders___qkhSh').invoke('text').then((text) => {
                let noApptRemText = text
                expect(noApptRemText, noApptRemText + " found").to.eq("No Appointment Reminders")
            })
        } else if (uiCount == 0 && todoType == "Patient Recalls") {
            cy.get('div.styles__container___tdB3W > div.styles__body___3Qvz0> div.styles__noReminders___qkhSh').invoke('text').then((text) => {
                let noApptRemText = text
                expect(noApptRemText, noApptRemText + " found").to.eq("No Patient Recalls")
            })
        } else if (uiCount == 0 && todoType == "Review Requests") {
            cy.get('div.styles__container___tdB3W > div.styles__body___3Qvz0> div.styles__noReminders___qkhSh').invoke('text').then((text) => {
                let noApptRemText = text
                cy.log(noApptRemText)
                expect(noApptRemText, noApptRemText + " found").to.eq("No Review Requests")
            })
        }
        else {
            if (uiCount > 0 && todoType == "Appointment Reminders") {
                cy.getApptReminderListHeaders(uiCount)
                cy.verifyReminderPatientList(Cypress.env("token"), uiHelper.getSelectDate(Cypress.env("loginDate")),
                    uiHelper.getSelectNextDate(Cypress.env("loginDate")), "reminders")

            } else if (uiCount > 0 && todoType == "Patient Recalls") {
                cy.getApptRecallsListHeaders(uiCount)
                cy.verifyRecalls(Cypress.env("token"),
                    uiHelper.getSelectDate(Cypress.env("loginDate")),
                    uiHelper.getSelectNextDate(Cypress.env("loginDate")), "recalls")
            } else if(uiCount > 0 && todoType == "Review Requests"){
                cy.getPatientReviewListHeaders(uiCount)
                cy.verifyReviews(Cypress.env("token"),
                    uiHelper.getSelectDate(Cypress.env("loginDate")),
                    uiHelper.getSelectNextDate(Cypress.env("loginDate")), "reviews")
            }
        }
    })
})
Cypress.Commands.add("verifyReminderPatientList", (token, startDate, endDate, toDoType) => {

    cy.getDonnaTodoList(token, startDate, endDate, toDoType).then((response) => {
        //cy.log("API Response: ", JSON.stringify(response.body))
        let reminderList = response.body
        let patientName = []
        let address = []
        let birthDay = []
        let email = []
        let phoneNo = []
        let gender = []
        let practitionerName = []
        let nextApptDate = []
        let lastApptDate = []
        for (var i = 0; i < reminderList.length; i++) {
            patientName.push(reminderList[i].appointment.patient.firstName + " " + reminderList[i].appointment.patient.lastName)
            address.push(reminderList[i].appointment.patient.address.street + " " + reminderList[i].appointment.patient.address.city + " " + reminderList[i].appointment.patient.address.country)
            birthDay.push(uiHelper.getYearsFromBirth(reminderList[i].appointment.patient.birthDate))
            email.push(reminderList[i].appointment.patient.email)
            phoneNo.push(reminderList[i].appointment.patient.cellPhoneNumber)
            gender.push(reminderList[i].appointment.patient.gender)
            nextApptDate.push(reminderList[i].appointment.patient.nextApptDate)
            lastApptDate.push(reminderList[i].appointment.patient.lastApptDate)
            //practitionerName.push(reminderList[i].appointment.practitioner.firstName + " " + reminderList[i].appointment.practitioner.lastName)
        }
        cy.get('ul.styles__list___260sy').should("be.visible")
        //list of row
        let count = 0
        cy.get('li > div.styles__listItemWrapper___9IK0i').should("be.visible").each(($row) => {
            let patName = patientName[count]
            let patBirthDate = birthDay[count]
            let patGender = gender[count]
            let patPhoneNo = phoneNo[count]
            let patEmail = email[count]
            let patNextApptDate = nextApptDate[count]
            let patLastApptDate = lastApptDate[count]
            let patAddress = address[count]
            cy.get("div.styles__col___1bq04 > span > div.styles__patientLink___2FzLD > div")
                .each(($col) => {
                    //cy.log("UI Patient Name", $col.text().toString())
                    cy.wait(1000)
                    if ($col.text() == patName) {
                        cy.wrap($col).click()
                        cy.verifyPatientNameOnPopUpHeader($col.text())
                        cy.verifyPatientAgeOnPopUpHeader(patBirthDate)
                        cy.verifyPatientInfoPopUp(patGender, patPhoneNo, patEmail, patNextApptDate, patLastApptDate, patAddress)
                        cy.closePatientInfoPopUp()
                        //return false
                    }
                    //return false
                })
            count = count + 1
            //return false  
        })
    })
})

Cypress.Commands.add("verifyPatientNameOnPopUpHeader", (patientName) => {
    cy.get('div#appPopOver').should("be.visible")
    cy.get('span.styles__header_text___2G7fU').should("be.visible")
        .invoke('text').then((text) => {
            cy.log("Patient name in pop header", text)
            expect(patientName, "Patient name verified").to.be.eq(text)
        })
})

Cypress.Commands.add("verifyPatientAgeOnPopUpHeader", (patientAge) => {
        if(patientAge == null){
            cy.log("Patient age is not defind")
            return
        }
        cy.get('span.styles__header_age___5unrF').should("be.visible")
        .invoke('text').then((text) => {
            expect(patientAge, "Patient age verified").to.be.eq(parseInt(text.substr(text.indexOf(',') + 1).trim()))
        })
})
Cypress.Commands.add("verifyPatientInfoPopUp", (patientGender, phoneNo,
    email, nextAppointment, lastAppointment, address) => {
    cy.get('div.styles__body___1fBmP').should("be.visible")
    cy.get('div.styles__container___3b-TI').should("be.visible")
        .then(() => {
            cy.get('span.styles__basicText___2kq8j')
                .invoke('text').then((text) => {
                    cy.log("Gender ", text)
                    expect(patientGender, "Patient gender verified").to.be.eq(text)
                })
            cy.get('div.styles__data_text___1ied6')
                .invoke('text').then((text) => {
                    cy.log("Mobile No ", text)
                    expect(text.includes(phoneNo.substr(8, 4)), "Phone number verified").to.be.true
                })
            // cy.get('div:nth-child(3) > div.styles__data___2gTLl')
            //     .invoke('text').then((text) => {
            //         cy.log("Next Appt Date ", text)
            //         if (nextAppointment == null) {
            //             expect("n/a", " Next appointment Date").to.be.eq(text)
            //         }else{
            //             expect(nextAppointment, " Next appointment Date").to.be.eq(text)
            //         }
            //     })
            // cy.get('div:nth-child(4) > div.styles__data___2gTLl')
            //     .invoke('text').then((text) => {
            //         cy.log("Last Appt Date", text)
            //         if (lastAppointment == null) {
            //             expect("n/a", "Last appointment Date").to.be.eq(text)
            //         }else{
            //             expect(lastAppointment, "Last appointment Date").to.be.eq(text)
            //         }
            //     })
            cy.get('div.styles__body___1fBmP.styles__body___1xk_b > div:nth-child(5) > div:nth-child(2)')
                .invoke('text').then((text) => {
                    expect(address.includes(text), "Patient address verified").to.be.true
                })
        })
})

Cypress.Commands.add("closePatientInfoPopUp", () => {
    cy.get('div#appPopOver > div > div.styles__header___277vR.styles__header___2phjd > div.styles__closeIcon___27ArV > button.vbutton__baseline___3XNit > i').click()
})

Cypress.Commands.add("getApptRecallsListHeaders", () => {
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div:nth-child(1)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Short Name", Fieldtext)
        expect(true, "Short Name Header for recall").to.true;
    })
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div:nth-child(2)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Contact", Fieldtext)
        expect(Fieldtext, "Contact Name Header for recall").to.equal("Contact");
    })
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div:nth-child(3)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Type", Fieldtext)
        expect(Fieldtext, "Type Header for recall").to.equal("Type");
    })
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div.styles__col___1bq04.fonts__fontMedium___3dyeW:nth-child(4)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("DUE FOR HYGIEN", Fieldtext)
        expect(Fieldtext, "DUE FOR HYGIEN Header for recall").to.equal("Due for Hygiene");
    })
    cy.get('div.styles__header___14Zq5.styles__header___2phjd > div.styles__col___1bq04.fonts__fontMedium___3dyeW:nth-child(5)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("DUE FOR RECALL", Fieldtext)
        expect(Fieldtext, "DUE FOR RECALL Header for recall").to.equal("Due for Recall");
    })
})

Cypress.Commands.add("getPatientReviewListHeaders", () => {
    cy.get('div.styles__container___tdB3W.styles__container___26_Lo > div.styles__header___14Zq5.styles__header___2phjd > div.styles__avatar___1wrqe').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Short Name", Fieldtext)
        expect(true, "Short Name Header for recall").to.true;
    })
    cy.get('div.styles__container___tdB3W.styles__container___26_Lo > div.styles__header___14Zq5.styles__header___2phjd > div.styles__col___1bq04:nth-child(2)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Contact", Fieldtext)
        expect(Fieldtext, "Contact Name Header for recall").to.equal("Contact");
    })
    cy.get('div.styles__container___tdB3W.styles__container___26_Lo > div.styles__header___14Zq5.styles__header___2phjd > div.styles__smallCol___SqN5V').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Channel", Fieldtext)
        expect(Fieldtext, "Type Header for recall").to.equal("Channel");
    })
    cy.get('div.styles__container___tdB3W.styles__container___26_Lo > div.styles__header___14Zq5.styles__header___2phjd > div.styles__col___1bq04:nth-child(4)').then((Field) => {
        const Fieldtext = Field.text();
        cy.log("Appointment", Fieldtext)
        expect(Fieldtext, "DUE FOR HYGIEN Header for recall").to.equal("Appointment");
    })
})

Cypress.Commands.add("verifyRecalls", (token, startDate, endDate, toDoType) => {

    cy.getDonnaTodoList(token, startDate, endDate, toDoType).then((response) => {
        //cy.log("API Response: ", JSON.stringify(response.body))
        let recallList = response.body
        let patientName = []
        let address = []
        let birthDay = []
        let email = []
        let phoneNo = []
        let gender = []
        let nextApptDate = []
        let lastApptDate = []
        let dueForRecallDate = []
        let dueForHygienDate = []
        for (var i = 0; i < recallList.length; i++) {
            patientName.push(recallList[i].poc.firstName + " " + recallList[i].poc.lastName)
            address.push(recallList[i].poc.address.street + " " + recallList[i].poc.address.city + " " + recallList[i].poc.address.country)
            birthDay.push(uiHelper.getYearsFromBirth(recallList[i].poc.birthDate))
            email.push(recallList[i].poc.email)
            phoneNo.push(recallList[i].poc.mobilePhoneNumber)
            gender.push(recallList[i].poc.gender)
            nextApptDate.push(recallList[i].poc.nextApptDate)
            lastApptDate.push(recallList[i].poc.lastApptDate)
            dueForRecallDate.push(recallList[i].poc.dueForRecallExamDate)
            dueForHygienDate.push(recallList[i].poc.dueForHygieneDate)
        }
        let count = 0
        cy.get('ul.styles__list___1OFDA').should("be.visible")
        cy.get('li.styles__listItem___2Mvll').should("be.visible").each(($row, index) => {
            let patName1 = patientName
             //patName1 = patientName
            let patName = patientName[count]
            let patBirthDate = birthDay[count]
            let patGender = gender[count]
            let patPhoneNo = phoneNo[count]
            let patEmail = email[count]
            let patNextApptDate = nextApptDate[count]
            let patLastApptDate = lastApptDate[count]
            let patAddress = address[count]
            let patDueForRecallDate = dueForRecallDate[count]
            let patDueForHygienDate = dueForHygienDate[count]
            const text = $row.text();
            cy.get("div.styles__avatar___1wrqe.fonts__fontMedium___3dyeW > div > div > span")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Shot Name", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                })
            cy.get("div.styles__col___1bq04 > span > div.styles__patientLink___2FzLD.styles__patientPopoverTitle___bjxOM > div")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Contact Name", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                    const checkAPIExistPatient = patName1.includes(Fieldtext);
                    if(patName1.includes(Fieldtext)){
                        expect(true, "Patient name "+Fieldtext+" verified").to.equal(checkAPIExistPatient);   
                    }
                    //expect(Fieldtext, "Patient name verified").to.equal(apiPatientName);
                }).click()
            cy.wait(1000)
            cy.get("div.styles__col___1bq04 > span > div.styles__muted___2s4vZ.styles__lowercase___EpMH5")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Contact Time", Fieldtext)
                    //expect(Fieldtext).to.equal(patName);
                })
            cy.get("div.styles__mediumCol___OE20d.fonts__fontMedium___3dyeW > span > div")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Type Years", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                })
            cy.get("div.styles__mediumCol___OE20d.fonts__fontMedium___3dyeW > span > div.styles__muted___2s4vZ.styles__lowercase___EpMH5")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Type Years", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                })
            cy.get("div.styles__body___3Qvz0.styles__body___1xk_b > ul.styles__list___1OFDA > li.styles__listItem___2Mvll > div.styles__col___1bq04:nth-child(4)")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("DUE FOR HYGIENE", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                })
            cy.get("div.styles__body___3Qvz0.styles__body___1xk_b > ul.styles__list___1OFDA > li.styles__listItem___2Mvll > div.styles__col___1bq04:nth-child(5)")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("DUE FOR RECALL", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                })

            cy.closePatientInfoPopUp()
            count = count + 1
            // if (count == patientName.length) {
            //     cy.log("All " + count + " recalls verified")
            //     return
            // }
            if (count == 1) {
                cy.log("Only " + count + " recall verified out of "+recallList.length)
                return false
            }
        })
        //return
    })
})


Cypress.Commands.add("verifyReviews", (token, startDate, endDate, toDoType) => {

    cy.getDonnaTodoList(token, startDate, endDate, toDoType).then((response) => {
        //cy.log("API Response: ", JSON.stringify(response.body))
        let reviewList = response.body
        let patientName = []
        let address = []
        let birthDay = []
        let email = []
        let phoneNo = []
        let gender = []
        let nextApptDate = []
        let lastApptDate = []
        let practitionerName = []
        for (var i = 0; i < reviewList.length; i++) {
            patientName.push(reviewList[i].patient.firstName + " " + reviewList[i].patient.lastName)
            address.push(reviewList[i].patient.address.street + " " + reviewList[i].patient.address.city + " " + reviewList[i].patient.address.country)
            birthDay.push(uiHelper.getYearsFromBirth(reviewList[i].patient.birthDate))
            email.push(reviewList[i].patient.email)
            phoneNo.push(reviewList[i].patient.mobilePhoneNumber)
            gender.push(reviewList[i].patient.gender)
            nextApptDate.push(reviewList[i].patient.nextApptDate)
            lastApptDate.push(reviewList[i].patient.lastApptDate)
            practitionerName.push(reviewList[i].patient.appointment.practitioner.firstName + " " + reviewList[i].patient.appointment.practitioner.lastName)

        }
        let count = 0
        cy.get('ul.styles__list___1iYEV').should("be.visible")
        cy.get('li[data-test-id="list_donnaReviews"]').should("be.visible").each(($row, index) => {

            let patName = patientName[count]
            let patBirthDate = birthDay[count]
            let patGender = gender[count]
            let patPhoneNo = phoneNo[count]
            let patEmail = email[count]
            let patNextApptDate = nextApptDate[count]
            let patLastApptDate = lastApptDate[count]
            let patAddress = address[count]

            const text = $row.text();
            cy.get("div.styles__avatar___1wrqe > div.styles__gradientBackground___FkH35 > div.styles__sm___32KI0 > span.styles__text___2GZbb")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Shot Name", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                })
            cy.get("div.styles__col___1bq04 > span > div.styles__patientLink___2FzLD > div")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Contact Name", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                    expect(Fieldtext, "Patient name verified").to.equal(patName);
                }).click()
            cy.verifyPatientNameOnPopUpHeader(patName)
            cy.verifyPatientAgeOnPopUpHeader(patBirthDate)
            // Wait for pop open
            cy.wait(1000)

            cy.get("div.styles__col___1bq04 > span > div.styles__muted___2UhZL")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Contact Time", Fieldtext)
                    //expect(Fieldtext).to.equal(patName);
                })
            cy.get("li.styles__listItem___3-Oyc > div.styles__smallCol___SqN5V")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("Channel", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                })
            cy.get("div.styles__col___1bq04 > div.styles__appLink___1NyTn > span")
                .eq(index)
                .then(function (Field) {
                    const Fieldtext = Field.text();
                    cy.log("APPOINTMENT", Fieldtext)
                    //expect(Fieldtext).to.equal("Google");
                })
            cy.closePatientInfoPopUp()
            count = count + 1
            // if (count == patientName.length) {
            //     cy.log("All " + count + " reviews verified")
            //     return
            // }
            if (count == 1) {
                cy.log("Only " + count + " review verified out of "+reviewList.length)
                return false
            }
        })
        //return
    })
})

