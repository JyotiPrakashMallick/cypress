import moment from 'moment'
import uihelper from "../../../../donna/gui/smoketests/common/UIHelper"
import dateUtil from "../common/DateUtil"
const dayjs = require("dayjs")
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
const { exec } = require("child_process");
export default {
    getDashboardCurrentDateParserByTimeZone: () => {
        const timezone = 'America/Vancouver';
        let currentLocaldate = new Date(); //actual time in miliseconds
        let currentTimezoneDate = dayjs(currentLocaldate).tz(timezone).format('MM/DD/YYYY');
        //Regex for replacing 0 if current month < 10
        let dashboardCurrentDateByTimeZone = currentTimezoneDate.replace(/(^|\/)0+/g, '$1');
        return dashboardCurrentDateByTimeZone;

    },
    selectDayFromCalendar: () => {
        const timezone = 'America/Vancouver';
        let currentLocaldate = new Date(); //actual time in miliseconds
        let currentTimezoneDate = dayjs(currentLocaldate).tz(timezone).format('MM/DD/YYYY');
        let day = dayjs(currentTimezoneDate).format('DD');
        return day;
    },
    //--------------------Date by TimeZone-------------------------------------------//
    getCurrentDateByTimeZone: (timezone) => {
        //const timezone = 'America/Vancouver';
        let currentLocaldate = new Date(); //actual time in miliseconds
        let currentTimezoneDate = dayjs(currentLocaldate).tz(timezone).format('MM/DD/YYYY');
        //Regex for replacing 0 if current month < 10
        let dashboardCurrentDateByTimeZone = currentTimezoneDate.replace(/(^|\/)0+/g, '$1');
        return dashboardCurrentDateByTimeZone;
    },

    getYearByTimeZone: (inputDate, timezone) => {
        //const timezone = 'America/Vancouver';
        let currentTimezoneDate = dayjs(inputDate).tz(timezone).format('MM/DD/YYYY');
        let year = dayjs(currentTimezoneDate).format('YYYY');
        return year;
    },
    getMonthTimeZone: (inputDate, timezone) => {
        //const timezone = 'America/Vancouver';
        let currentTimezoneDate = dayjs(inputDate).tz(timezone).format('MM/DD/YYYY');
        let month = dayjs(currentTimezoneDate).format('MM');
        return month;
    },
    getDayByTimeZone: (inputDate, timezone) => {
        //const timezone = 'America/Vancouver';
        //let currentLocaldate = new Date(); //actual time in miliseconds
        let currentTimezoneDate = dayjs(inputDate).tz(timezone).format('MM/DD/YYYY');
        let day = dayjs(currentTimezoneDate).format('DD');
        let days = day.replace(/(^|\/)0+/g, '$1');
        return days;
    },
    //--------------------Get Date by Local time-------------------------------------------//   
    getCurrentUILoginDate: () => {
        let currentLocaldate = new Date(); //actual time in miliseconds
        let currentDate = dayjs(currentLocaldate).format('MM/DD/YYYY');
        //Regex for replacing 0 if current month < 10
        let uiLoginDate = currentDate.replace(/(^|\/)0+/g, '$1');
        return uiLoginDate;
    },

    getInputDate: (inputDate) => {
        let currentDate = dayjs(inputDate).format('MM/DD/YYYY');
        //Regex for replacing 0 if current month < 10
        let uiLoginDate = currentDate.replace(/(^|\/)0+/g, '$1');
        return uiLoginDate;
    },
    getYear: (inputDate) => {
        let currentTimezoneDate = dayjs(inputDate).format('MM/DD/YYYY');
        let year = dayjs(currentTimezoneDate).format('YYYY');
        let years = year.replace(/(^|\/)0+/g, '$1');
        return years;
    },
    getMonth: (inputDate) => {
        let currentTimezoneDate = dayjs(inputDate).format('MM/DD/YYYY');
        let month = dayjs(currentTimezoneDate).format('MM');
        let months = month.replace(/(^|\/)0+/g, '$1');
        return months;
    },
    getDay: (inputDate) => {
        let currentTimezoneDate = dayjs(inputDate).format('MM/DD/YYYY');
        let day = dayjs(currentTimezoneDate).format('DD');
        let days = day.replace(/(^|\/)0+/g, '$1');
        return days;
    },
    getMonthName: (inputMonth) => {
        let map = new Map();
        map.set("1", 'January');
        map.set("2", 'February');
        map.set("3", 'March');
        map.set("4", 'April');
        map.set("5", 'May');
        map.set("6", 'June');
        map.set("7", 'July');
        map.set("8", 'August');
        map.set("9", 'September');
        map.set("10", 'October');
        map.set("11", 'November');
        map.set("12", 'December');
        return map.get(inputMonth);
    },

    getList: (dbresponse) => {

        let array = dbresponse.split(":");

        return array;


    },
    getSubString: (string, p1, p2) => {

        let str = string.substring(p1, p2);
        return str;

    },
    convertObjectToString: (response) => {

        let responseString = JSON.stringify(response);
        return responseString;

    },

    getChairDetails: (jsonObject) => {
        let map = new Map();
        let chairID
        let chairName
        let key
        let length = Object.keys(jsonObject).length
        for (let i = 0; i < length; i++) {
            key = Object.keys(jsonObject)[i];
            chairID = jsonObject[key].id
            chairName = jsonObject[key].name
            map.set(chairID, chairName)

        }
        return map;
    },

    getPractitionerDetails: (jsonObject) => {
        let map = new Map();
        let practitionerId;
        let practitionerFirstName;
        let practitionerType;
        let practitionerLastName
        let isActive;
        let key;
        let fullName;
        let length = Object.keys(jsonObject).length;
        for (let i = 0; i < length; i++) {
            let PractionerDetails = new Array();
            key = Object.keys(jsonObject)[i];
            isActive = jsonObject[key].isActive
            practitionerFirstName = jsonObject[key].firstName
            practitionerLastName = jsonObject[key].lastName
            practitionerId = jsonObject[key].id
            practitionerType = jsonObject[key].type
            if (practitionerLastName == null) {
                practitionerLastName = '';
            }
            fullName = practitionerFirstName + ' ' + practitionerLastName;
            PractionerDetails.push(isActive);
            PractionerDetails.push(fullName);
            map.set(practitionerId, PractionerDetails);
        }
        return map;
    },
    //--------------------Get Date by Local time-------------------------------------------//   
    getCurrentUILoginDate: () => {
        let currentLocaldate = new Date(); //actual time in miliseconds
        let currentDate = dayjs(currentLocaldate).format('MM/DD/YYYY');
        //Regex for replacing 0 if current month < 10
        let uiLoginDate = currentDate.replace(/(^|\/)0+/g, '$1');
        return uiLoginDate;
    },

    getInputDate: (inputDate) => {
        let currentDate = dayjs(inputDate).format('MM/DD/YYYY');
        //Regex for replacing 0 if current month < 10
        let uiLoginDate = currentDate.replace(/(^|\/)0+/g, '$1');
        return uiLoginDate;
    },
    getYear: (inputDate) => {
        let currentTimezoneDate = dayjs(inputDate).format('MM/DD/YYYY');
        let year = dayjs(currentTimezoneDate).format('YYYY');
        let years = year.replace(/(^|\/)0+/g, '$1');
        return years;
    },
    getMonth: (inputDate) => {
        let currentTimezoneDate = dayjs(inputDate).format('MM/DD/YYYY');
        let month = dayjs(currentTimezoneDate).format('MM');
        let months = month.replace(/(^|\/)0+/g, '$1');
        return months;
    },
    getDay: (inputDate) => {
        let currentTimezoneDate = dayjs(inputDate).format('MM/DD/YYYY');
        let day = dayjs(currentTimezoneDate).format('DD');
        let days = day.replace(/(^|\/)0+/g, '$1');
        return days;
    },
    getMonthName: (inputMonth) => {
        let map = new Map();
        map.set("1", 'January');
        map.set("2", 'February');
        map.set("3", 'March');
        map.set("4", 'April');
        map.set("5", 'May');
        map.set("6", 'June');
        map.set("7", 'July');
        map.set("8", 'August');
        map.set("9", 'September');
        map.set("10", 'October');
        map.set("11", 'November');
        map.set("12", 'December');
        return map.get(inputMonth);
    },
    getCurrentDate: () => {
        let currentLocaldate = new Date(); //actual time in miliseconds
        let currentDate = dayjs(currentLocaldate).format('MM/DD/YYYY');
        return currentDate;
    },
    getISOFormatInputDate: (inputDate) => {
        let stringdate = new Date(inputDate).toISOString();
        return stringdate;
    },
    getMonthKeys: () => {
        let map = new Map();
        map.set(1, 'January');
        map.set(2, 'February');
        map.set(3, 'March');
        map.set(4, 'April');
        map.set(5, 'May');
        map.set(6, 'June');
        map.set(7, 'July');
        map.set(8, 'August');
        map.set(9, 'September');
        map.set(10, 'October');
        map.set(11, 'November');
        map.set(12, 'December');
        let mapIter = map.keys();
        let monthIndex = [];
        for (let i = 0; i < 12; i++) {
            monthIndex[i] = mapIter.next().value;
        }
        return monthIndex;
    },
    getConcatinatMonthYearText: (monthName, year) => {
        return monthName.concat(" " + year);
    },

    getMonthIndexFromName: (monthName) => {

        var months = {
            'January': 1,
            'February': 2,
            'March': 3,
            'April': 4,
            'May': 5,
            'June': 6,
            'July': 7,
            'August': 8,
            'September': 9,
            'October': 10,
            'November': 11,
            'December': 12
        }
        return months[monthName]
    },

    getYearFromCalendarText: (inputTextString) => {
        let numricValue = parseInt(inputTextString.match(/\d+/), 10)
        return numricValue;
    },
    getMonthNameFromCalendarText: (inputTextString) => {
        var monthName = inputTextString.split(" ")
        return monthName[0];
    },
    jsonToMap: (str) => {
        let map = new Map()
        for (const key in str) {
            map.set(key, str[key])
        }
        return map
    },

    getRevenuMap2: (revenueData) => {
        let map = new Map()
        for (const key in revenueData) {
            console.log("****", key)
            if (key == 'average') {
                map.set(key, revenueData[key])
            } else {
                moment(key)
            }
        }
        console.log(map)
        return map
    },

    getRevenueSortedMap: (revenueData) => {
        let mrevenueMap = new Map()
        for (const key in revenueData) {
            console.log("****", key)
            if (key == 'average') {
                return
            } else {
                mrevenueMap.set(key, revenueData[key])
            }
        }
        console.log(mrevenueMap)
        return mrevenueMap
    },


    getRevenueAvgValue: (revenueData) => {
        let avgValue
        for (const key in revenueData) {
            console.log("****", key)
            if (key == 'average') {
                avgValue = revenueData[key]
                return false
            }
        }
        return avgValue
    },

    getRevenuMap: (str) => {
        let map = new Map()
        for (const key in str) {
            console.log("****", key)
            if (key == 'average') {
                map.set(key, str[key])
            } else {
                if (moment(key).isAfter()) {
                    moment(key).format("YYYY-MM-DD")
                    const tomorrow = moment().add(1, 'days');
                    let nextDayKey = tomorrow.format('YYYY-MM-DD');
                    if (str[key] == null) {
                        map.set(nextDayKey, 0)
                    } else {
                        map.set(nextDayKey, str[key])
                    }

                } else {
                    let newKey = moment(key).format("YYYY-MM-DD")
                    console.log("New Key", newKey)
                    if (map.has(newKey) === true) {
                        let existingValue = map.get(newKey)
                        console.log(existingValue)
                        let newKeyValue = str[key]
                        map.delete(newKey)
                        console.log(newKeyValue)
                        let total = existingValue + newKeyValue
                        console.log("total", total)
                        map.set(newKey, total)

                    } else {
                        map.set(newKey, str[key])
                    }
                }
            }
        }
        console.log(map)
        return map
    },
    getSumOfRevenu: (str) => {
        let map = new Map()
        let sum = 0;
        for (const key in str) {
            if (key == 'average') {
                map.set(key, str[key])
            } else {
                map.set(moment(key).format("YYYY-MM-DD"), str[key])
                sum = sum + str[key]
            }
        }
        return sum
    },
    getAppointmentCount: (appointmentList) => {
        let count = 0
        for (const key in appointmentList) {
            // if(appointmentList[key].isPatientConfirmed === false){
            //     count = count + 1
            // } 
            count = count + 1
        }
        return count
    },

    getUnConfirmedPatientCount: (unConfirmedPatient) => {
        let count = 0
        for (const key in unConfirmedPatient) {
            if (unConfirmedPatient[key].isPatientConfirmed === false) {
                count = count + 1
            }
        }
        return count
    },

    getOnlineRequestCount: (requestsObject) => {
        let count = 0
        for (const key in requestsObject) {
            if (requestsObject[key].isDeleted === false) {
                count = count + 1
            }
        }
        return count
    },
    getWaitingRoomReqCount: (response) => {
        let len = Object.keys(response.body).length
        let count = 0
        for (var i = 0; i < len; i++) {

            if (response.body[i].sentReminder.isWaitingRoomEnabled === true) {
                count = count + 1
            }
        }
        return count
    },

    getPatientUnconfirmedCount: (response) => {
        let len = Object.keys(response.body).length
        let count = 0
        for (var i = 0; i < len; i++) {

            if (response.body[i].sentReminder.isWaitingRoomEnabled === true) {
                count = count + 1
            }
        }
        return count
    },
    // Need to fixed for sub insight

    // getPatientInsightCount : (response) =>{
    //     let len = Object.keys(response.body).length
    //         let count =0 
    //         for(var i=0; i<len; i++){
    //             if(response.body[i].insights.type == "missingEmail"){
    //                 count = count +1
    //             }else if(response.body[i].insights.type == "missingMobile"){
    //                 count = count +1
    //             }
    //         }
    //         return count
    // }, 

    // Input date formate MM/DD/YYYY
    getISODate: (inputDate) => {
        return moment(inputDate, "MM/DD/YYYY").format("YYYY-MM-DD")
    },
    getYesterdayDate: () => {
        const yesterday = moment().add(-1, 'days');
        return yesterday.format('YYYY-MM-DD');
    },
    getTodaysDate: () => {
        const today = moment();
        return today.format('YYYY-MM-DD');
    },
    getTomorrowDate: () => {
        const tomorrow = moment().add(1, 'days');
        return tomorrow.format('YYYY-MM-DD');
    },
    getSelectDate: (selectDate) => {
        return moment(selectDate, "MM/DD/YYYY").format("YYYY-MM-DD")
    },
    getSelectNextDate: (selectDate) => {
        const selectDay = moment(selectDate, "MM/DD/YYYY");
        const nextDay = selectDay.add(1, 'days');
        const nextD = nextDay.format("MM/DD/YYYY")
        const nextDate = moment(nextD, "MM/DD/YYYY").format("YYYY-MM-DD")
        return nextDate
    },
    getSelectPrevDate: (selectDate) => {
        const selectDay = moment(selectDate, "MM/DD/YYYY");
        const nextDay = selectDay.add(-1, 'days');
        const nextD = nextDay.format("MM/DD/YYYY")
        const nextDate = moment(nextD, "MM/DD/YYYY").format("YYYY-MM-DD")
        return nextDate
    },
    getYearsFromBirth: (inputBirthDate) => {
        const years = moment().diff(inputBirthDate, 'years', false);
        return years
    },
    getList: (dbresponse) => {
        let array = dbresponse.split(":");
        return array;
    },
    getSubString: (string, p1, p2) => {
        let str = string.substring(p1, p2);
        return str;
    },
    convertObjectToString: (response) => {
        let responseString = JSON.stringify(response);
        return responseString;
    },
    getChairDetails: (jsonObject) => {
        let map = new Map();
        let chairID
        let chairName
        let key
        let length = Object.keys(jsonObject).length
        for (let i = 0; i < length; i++) {
            key = Object.keys(jsonObject)[i];
            chairID = jsonObject[key].id
            chairName = jsonObject[key].name
            map.set(chairID, chairName)
        }
        return map;
    },
    getPractitionerDetails: (jsonObject) => {
        let map = new Map();
        let practitionerId;
        let practitionerFirstName;
        let practitionerType;
        let practitionerLastName
        let isActive;
        let key;
        let fullName;
        let length = Object.keys(jsonObject).length;
        for (let i = 0; i < length; i++) {
            let PractionerDetails = new Array();
            key = Object.keys(jsonObject)[i];
            isActive = jsonObject[key].isActive
            practitionerFirstName = jsonObject[key].firstName
            practitionerLastName = jsonObject[key].lastName
            practitionerId = jsonObject[key].id
            practitionerType = jsonObject[key].type
            if (practitionerLastName == null) {
                practitionerLastName = '';
            }
            fullName = practitionerFirstName + ' ' + practitionerLastName;
            PractionerDetails.push(isActive);
            PractionerDetails.push(fullName);
            map.set(practitionerId, PractionerDetails);
        }
        return map;
    },

    getWeeklyScheduleData: (jsonObject) => {
        let map = new Map()
        var key = Object.keys(jsonObject)[0]
        var sunStartTime = uihelper.convertUTCTimeToPST(jsonObject[key].sunday.startTime)
        var sunEndTime = uihelper.convertUTCTimeToPST(jsonObject[key].sunday.endTime)
        var sundayTimeSlot = sunStartTime + ' to ' + sunEndTime
        map.set('Sunday', sundayTimeSlot)
        //////////////////
        var monStartTime = uihelper.convertUTCTimeToPST(jsonObject[key].monday.startTime)
        var monEndTime = uihelper.convertUTCTimeToPST(jsonObject[key].monday.endTime)
        var mondayTimeSlot = monStartTime + ' to ' + monEndTime
        map.set('Monday', mondayTimeSlot)
        ///////////////////////////////
        var tueStartTime = uihelper.convertUTCTimeToPST(jsonObject[key].tuesday.startTime)
        var tueEndTime = uihelper.convertUTCTimeToPST(jsonObject[key].tuesday.endTime)
        var tuesdayTimeSlot = tueStartTime + ' to ' + tueEndTime
        map.set('Tuesday', tuesdayTimeSlot)
        /////////////////////////////
        var wedStartTime = uihelper.convertUTCTimeToPST(jsonObject[key].wednesday.startTime)
        var wedEndTime = uihelper.convertUTCTimeToPST(jsonObject[key].wednesday.endTime)
        var wednesdayTimeSlot = wedStartTime + ' to ' + wedEndTime
        map.set('Wednesday', wednesdayTimeSlot)
        /////////////////////////////
        var thuStartTime = uihelper.convertUTCTimeToPST(jsonObject[key].thursday.startTime)
        var thuEndTime = uihelper.convertUTCTimeToPST(jsonObject[key].thursday.endTime)
        var thursdayTimeSlot = thuStartTime + ' to ' + thuEndTime
        map.set('Thursday', thursdayTimeSlot)
        /////////////////////////////
        var friStartTime = uihelper.convertUTCTimeToPST(jsonObject[key].friday.startTime)
        var friEndTime = uihelper.convertUTCTimeToPST(jsonObject[key].friday.endTime)
        var fridayTimeSlot = friStartTime + ' to ' + friEndTime
        map.set('Friday', fridayTimeSlot)
        //////////////////////////////////
        var satStartTime = uihelper.convertUTCTimeToPST(jsonObject[key].saturday.startTime)
        var satEndTime = uihelper.convertUTCTimeToPST(jsonObject[key].saturday.endTime)
        var saturdayTimeSlot = satStartTime + ' to ' + satEndTime
        map.set('Saturday', saturdayTimeSlot)
        return map;
    },

    convertUTCTimeToPST: (inputDate) => {
        var utcDate = new Date(inputDate)
        var pstDate = utcDate.toLocaleString("en-US", { timeZone: "America/Vancouver" })
        var pstTime = moment(pstDate).format('h:mm A')
        return pstTime
    },


    getPatientFilterQueryBySelectedOption: (inputOption) => {
        switch (inputOption) {
            case "All Patients":      //if day = 1
                //console.log("Monday");
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=allPatients&isHoH=true'
            case "Smart Recare":      //if day = 2
                return 'order[]=["dueForHygieneDate","desc"]&order[]=["id","asc"]&segment[]=smartRecare&isHoH=true'
            case "Follow Ups":      //if day = 3
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=followUps&isHoH=true'
            case "My Follow Ups (Past 30 Days)":      //if day = 4
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=myFollowUps&segment[]=30&segment[]=true&isHoH=true'
            case "Due Within 60 Days":      //if day = 5
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=dueWithin&isHoH=true'
            case "0-3 Months Late":      //if day = 6
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=lateAppointments&isHoH=true'
            case "4-6 Months Late":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=lateAppointments&segment[]=6&segment[]=4&isHoH=true'
            case "7-12 Months Late":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=lateAppointments&segment[]=12&segment[]=7&isHoH=true'
            case "13-18 Months Late":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=lateAppointments&segment[]=18&segment[]=13&isHoH=true'
            case "19-24 Months Late":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=lateAppointments&segment[]=24&segment[]=19&isHoH=true'
            case "25-36 Months Late":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=lateAppointments&segment[]=36&segment[]=25&isHoH=true'
            case "Missed/Cancelled":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=missedCancelled&isHoH=true'
            case "Missed Pre-appointed":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=missedPreAppointed&isHoH=true'
            case "Unconfirmed Patients (1 Week)":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=unConfirmedPatients&isHoH=true'
            case "Unconfirmed Patients (2 Week)":      //if day = 7
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=unConfirmedPatients&segment[]=14&isHoH=true'
            default:    //if day doesn't match any of above
                return 'order[]=["patientFollowUps.dueAt","asc"]&order[]=["id","asc"]&segment[]=allPatients&isHoH=true'
        }

    },
    getRandomEmail: () => {
        var randomEmail
        var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        var str = '';
        for (var ii = 0; ii < 5; ii++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        randomEmail = str + '@testing.com'
        return randomEmail
    },
    getRandomString: () => {
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var randomString = '';
        for (var ii = 0; ii < 5; ii++) {
            randomString += chars[Math.floor(Math.random() * chars.length)];
        }

        return randomString
    },
    typeofComparison: (a, b) => {
        if (typeof a === typeof b) return true;
        throw new Error(
            `The typeof the value '${a}' is different than the value '${b}', make sure that the array contains only equal type values`,
        );
    },
    generateDataPointsBeforeToday: (data, dataKeys, startOfCurrentDay, endOfCurrentDay) => {
        return dataKeys
            .filter(dateUtil.filterBooked(startOfCurrentDay, endOfCurrentDay))
            .sort(dateUtil.sortAsc)
            .map(key => Math.floor(data[key]));
    },

    generateDataPointsAfterToday: (data, dataKeys, endOfCurrentDay) => {
        return dataKeys
            .filter(dateUtil.filterEstimated(endOfCurrentDay))
            .sort(dateUtil.sortAsc)
            .map(key => Math.floor(data[key]));
    },

    fetchPracticeOfficeHours: (jsonObject) => {
        let map = new Map()
        var key = Object.keys(jsonObject)
        var sunStartTime = uihelper.convertUTCTimeToPST(jsonObject.sunday.startTime)
        var sunEndTime = uihelper.convertUTCTimeToPST(jsonObject.sunday.endTime)
        var sundayTimeSlot = sunStartTime + ' to ' + sunEndTime
        map.set('Sunday', sundayTimeSlot)
        //////////////////
        var monStartTime = uihelper.convertUTCTimeToPST(jsonObject.monday.startTime)
        var monEndTime = uihelper.convertUTCTimeToPST(jsonObject.monday.endTime)
        var mondayTimeSlot = monStartTime + ' to ' + monEndTime
        map.set('Monday', mondayTimeSlot)
        ///////////////////////////////
        var tueStartTime = uihelper.convertUTCTimeToPST(jsonObject.tuesday.startTime)
        var tueEndTime = uihelper.convertUTCTimeToPST(jsonObject.tuesday.endTime)
        var tuesdayTimeSlot = tueStartTime + ' to ' + tueEndTime
        map.set('Tuesday', tuesdayTimeSlot)
        /////////////////////////////
        var wedStartTime = uihelper.convertUTCTimeToPST(jsonObject.wednesday.startTime)
        var wedEndTime = uihelper.convertUTCTimeToPST(jsonObject.wednesday.endTime)
        var wednesdayTimeSlot = wedStartTime + ' to ' + wedEndTime
        map.set('Wednesday', wednesdayTimeSlot)
        /////////////////////////////
        var thuStartTime = uihelper.convertUTCTimeToPST(jsonObject.thursday.startTime)
        var thuEndTime = uihelper.convertUTCTimeToPST(jsonObject.thursday.endTime)
        var thursdayTimeSlot = thuStartTime + ' to ' + thuEndTime
        map.set('Thursday', thursdayTimeSlot)
        /////////////////////////////
        var friStartTime = uihelper.convertUTCTimeToPST(jsonObject.friday.startTime)
        var friEndTime = uihelper.convertUTCTimeToPST(jsonObject.friday.endTime)
        var fridayTimeSlot = friStartTime + ' to ' + friEndTime
        map.set('Friday', fridayTimeSlot)
        //////////////////////////////////
        var satStartTime = uihelper.convertUTCTimeToPST(jsonObject.saturday.startTime)
        var satEndTime = uihelper.convertUTCTimeToPST(jsonObject.saturday.endTime)
        var saturdayTimeSlot = satStartTime + ' to ' + satEndTime
        map.set('Saturday', saturdayTimeSlot)
        return map;
    },

    getConnectorServicesStatus: (data) => {
        let service
        for (let i = 0; i < data.connectorServices.length; i++) {

            const res = exec("Get-Service " + "" + data.connectorServices[i], { 'shell': 'powershell.exe' })
            res.stdout.on('data', (val) => {

                service = val
            })
        }
        return service
    },
    convertUTCDateTimeToPST: (inputDate) => {
        var utcDate = new Date(inputDate)
        var pstDate = utcDate.toLocaleString("en-US", { timeZone: "America/Vancouver"})
        var pstTime = moment(pstDate).format('h:mm A')
        return pstDate
    }
}

