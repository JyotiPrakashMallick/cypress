/// <reference types="Cypress"/>
import { beforeEach, afterAll } from "mocha"
import uiHelper from "../../common/UIHelper"
import dateUtil from "../../common/DateUtil"
describe("Verify Revenue Card", function () {
    before(function () {
        cy.clearSessionStorage()
        cy.dashboardLoginByAPI(Cypress.env('email'), Cypress.env('password'), (Cypress.env('backendUrl') + "auth"))
        cy.visit('/')
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false})
        //cy.login(Cypress.env('email'),Cypress.env('password'))
    })
    it("Verify, Revenue details should be visible as per selected date", function () {
        cy.getRevenueDetailsFromAPIs(Cypress.env('token'), uiHelper.getSelectDate(Cypress.env("loginDate")))
            .then((response) => {
                cy.log("API Response:", JSON.stringify(response.body.data))

                if (response == null || response == '') {
                    expect(true, "API respone null").to.be.false
                    return false
                }
                //const timezone = "America/Vancouver"
                // Dynamic select timezone by account ID
                cy.getTimeZoneBySelectedAccount(Cypress.env('token'))
                let timezone = Cypress.env("timezone")
                const currentDay = dateUtil.getTodaysDate(timezone)
                const startOfCurrentDay = currentDay.startOf('day').toISOString();
                const endOfCurrentDay = currentDay.endOf('day').toISOString();

                cy.log("Current Day", currentDay)
                cy.log("startOfCurrentDay Day", startOfCurrentDay)
                cy.log("endOfCurrentDay Day", endOfCurrentDay)
                const dataKeys = Object.keys(response.body.data);
                const revenue = response.body.data;
                cy.log("data keys", dataKeys)

                const sortedDates = dataKeys.filter(dateUtil.filterStartOfDay(startOfCurrentDay)).sort(dateUtil.sortAsc);
                cy.log("Sorted Dated", sortedDates.toString())

                const billedData = uiHelper.generateDataPointsBeforeToday(
                    revenue,
                    dataKeys,
                    startOfCurrentDay,
                    endOfCurrentDay,
                );

                cy.log("billedData: ", billedData.toString())
                const estimatedData = uiHelper.generateDataPointsAfterToday(revenue, dataKeys, endOfCurrentDay);
                cy.log("estimatedData: ", estimatedData.toString())
                const lastDate = sortedDates[sortedDates.length - 1];
                cy.log("lastDate",lastDate )
                const currentDate = dateUtil.getTodaysDate(timezone)
                    .endOf('day')
                    .toISOString();
                const isCurrentDay = lastDate === currentDate;
                const todaysData = !estimatedData.length || isCurrentDay ? billedData[billedData.length - 1] : 0;
                let yestData = billedData[billedData.length - 2];
                let todayText = "Today's";
                let showYestText = true;
                cy.log("todaysData", todaysData)
                cy.log("yestData", yestData)
                const avg = Math.floor(revenue.average);
                cy.log("Avg", avg)
                if (!isCurrentDay && avg) {
                    const isSameWeek = dateUtil.getTodaysDate(timezone).isSame(lastDate, 'week');
                    todayText = isSameWeek
                        ? `${dateUtil.getFormattedDate(lastDate, 'ddd', timezone)}.`
                        : `${dateUtil.getFormattedDate(lastDate, 'MMM Do', timezone)}`;
                }
                cy.log("todayText ",todayText)
                let apiTodayBilledText = todayText +" "+"Billed Production"
                cy.log("apiTodayBilledText",apiTodayBilledText)
                // // eslint-disable-next-line no-mixed-operators
                let percentage = todaysData && avg ? Math.floor((todaysData / avg) * 100 - 100) : 0;
                cy.log("Percentage ",percentage)
                if (estimatedData.length && avg) {
                    // eslint-disable-next-line no-mixed-operators
                    percentage = Math.floor((estimatedData[estimatedData.length - 1] / avg) * 100 - 100);
                    showYestText = false;
                    yestData = isCurrentDay ? estimatedData[0] : estimatedData[estimatedData.length - 1];
                  }
                let apiYesterdaysData = yestData; 
                let apiTodaysData = todaysData;  
                let apiPercentage = percentage; 
                let apiAvgValue = Math.floor(revenue.average);
                
                //   const percentageBoxStyle = classnames(styles.percentageBox, {
                //     [styles.negative]: percentage < 0,
                //     [styles.zero]: percentage === 0,
                //   });
                
                  const icon = percentage < 0 ? 'caret-down' : 'caret-up';
                  cy.log("Caret Up or down", icon)
                  let showYestText1 = showYestText ? "Yesterday's" : `${todayText} Estimated`
                  let apiYesterdaysText = showYestText1+" "+"Production"
                  cy.log("yestText",apiYesterdaysText)

                cy.log("Assert that, Production bill title should be displayed")
                cy.isProductionBillTitleDisplayed(apiTodayBilledText)
                cy.log("Assert that, Production bill amount should be displayed")
                cy.verifyProductionBillAmount(apiTodaysData)
                cy.log("Assert that, Average title should be displayed")
                cy.verifyAverageTitle("Average")
                cy.log("Assert that, Average amount should be displayed")
                cy.verifyAverageAmount(apiAvgValue)
                cy.log("Assert that, Persentage amount should be displayed")
                cy.verifyPercentageAmount(apiPercentage)
                cy.log("Assert that, Yesterday production title should be displayed")
                cy.isYesterdaysProductionBillTitleDisplayed(apiYesterdaysText)
                cy.log("Assert that, Yesterday production amount should be displayed")
                cy.verifyYesterdaysProductionBillAmount(apiYesterdaysData)
                
            })
    })
    it("Verify, User able to see revenue chart on dashboard for date 'YYYY-MM-DD'", () => {
        cy.log("Assert that, User able to see revenue chart")
        cy.isRevenueChartDisplayed(uiHelper.getSelectDate(Cypress.env("loginDate")))
    })

})