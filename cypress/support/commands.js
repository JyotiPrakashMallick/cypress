/// <reference types="Cypress"/>

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command -- 
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --


// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//import cypress = require("cypress");

// Helper functions for logging

import commonSelector from "./selectors/common/commonSelector";
import loginSelector from '../support/selectors/enterprisemanagement/loginSelector'

const getDateString = (date) => {
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}-${date.getFullYear()}`;
};

const getTimeString = (date) => {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};


Cypress.Commands.add("login", (username, password,user) => {
  cy.get(loginSelector.emailInputText,{timeout:2000}).clear()
  cy.get(loginSelector.passwordInputText).clear()
  cy.get(loginSelector.emailInputText).type(username);
  cy.get(loginSelector.passwordInputText).type(password, { log: false });
  expect(username, "username was set").to.be.a("string").and.not.be.empty;
  if (typeof password !== "string" && !password) {
    throw new Error("Missing password value, set password=... in cli");
  }

  cy.get(loginSelector.submitButton).click();
  //Removed the verification for the user logged on here as there is already another test for it loginsanity_spec
});

Cypress.Commands.add('apilogin', (username, password, apiUrl) => {
  cy.request({
    method: 'POST',
    url: apiUrl,
    body: {
      username,
      password,
    }
  }).then((response) => {
    Cypress.env('token', response.body.token);
    localStorage.setItem('token', response.body.token)
    return response;
  }).as('authResponse')
  //.its('status')
  //.should('eq', 200);
})
Cypress.Commands.add("loggedout", (url) => {
 // cy.wait(2000)
 cy.intercept(Cypress.env('backendUrl')+"newgraphql").as('waitfordashboardtoLoad')
 cy.wait('@waitfordashboardtoLoad')
  cy.get(loginSelector.dropdownMenuRight).should("be.visible");
 // cy.wait(2000)
  cy.get(loginSelector.dropdownMenuRight).click();
 // cy.wait(2000)
  cy.get(loginSelector.dropdownMenuLogout).click();
  cy.url().should("be.eq", url);
});
Cypress.Commands.add('uiLoginByAPI', (username, password, apiUrl) => {
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
    localStorage.setItem('token',response.body.token)  
    return response;
  })
})
//Cypress.Commands.add('loggedout', () => {
 //  cy.get('.styles__greeting___2v8u8',{timeout : 20000})
  //    .should('be.visible')
  //    .click()
  //  cy.get('ul[class*="dd-items-right"]',{timeout : 20000})
 //     .should('be.visible')
 //   cy.get('.dd-items-right > :nth-child(3)',{timeout : 20000})
  //    .should('be.visible')
//.click()
 //   cy.url().should('be.eq', Cypress.env('logoffUrl'));
 //})
Cypress.Commands.add('getcurrentdayoftheweek', () => {
  var today = new Date()
  var day = today.getDay()
  var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var currentDayofWeek = daylist[day]
  cy.log("Today is : " + daylist[day])
  return cy.wrap(currentDayofWeek)
})
Cypress.Commands.add('getcurrentcalendarmonth', () => {
  const today = new Date()
  var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var monthName=months[today.getMonth()]
  var displayMonth=monthName.substring(0,3)
  cy.log("Current Month is :" + displayMonth)
  return cy.wrap(displayMonth)
})
Cypress.Commands.add('getcurrentcalendardate', () => {
  const today = new Date()
  const date = today.toLocaleString('default', { day: '2-digit' })
  cy.log("Current Date is :" + date)
  return cy.wrap(date)

})
Cypress.Commands.add("selectfromthelist", (selector, lists) => {
  cy.get(selector).each(($el, index, list) => {
    if ($el.text().includes(lists)) {
      cy.get(selector).eq(index).click()
    }
  })
})

Cypress.Commands.add("randomlyselectfromdropdown", (selector) => {
  cy.get(selector).as("options")
  cy.get("@options")
    .its('length')
    .then(len => Math.floor(Math.random() * Math.floor(len)))
    .then((index) => {
      cy.get("@options").eq(index).click()
    })
})

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

Cypress.Commands.add("typeRandomNumber", (selector, min, max) => {
  var random = randomIntFromInterval(min, max)
  cy.get(selector).should('exist').type(random)
})
Cypress.Commands.add('typeRandomString', (stringLength, inputField) =>{
  //Types in random string on given length into input field
  let result = ''
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for(let i = 0; i < stringLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  cy.get(inputField).type(result)
})

Cypress.Commands.add("clearetext", (selector) => {
  cy.get(selector).clear()
})


//Custom Command for the Calendar
Cypress.Commands.add('selectDateFromCalendar', (mainSelector, daySelector, nextMonthSelect, prevMonthSelect, enablePrevious, dd, mm, yyyy) => {


  cy.get(mainSelector).invoke('text').then((text) => {

    var date = mm + '/' + dd + '/' + yyyy;

    var mmyy = text.split(" ")
    var ccpYear = mmyy[1]
    var ccpMonth = mmyy[0]
    var monthFromspec = getMonthFromString(mm, dd, yyyy)
    var monthFromCCP = getMonthFromString(ccpMonth, dd, ccpYear)

    var today = myTodayDate()
    var todayA = today.split("/")

    if (date == today) {
      cy.get(commonSelector.todaySelector).invoke('text').then((text) => {
        cy.get(commonSelector.todaySelector).click()
      })
    } else {

      if (dd > getDaysInMonth(monthFromspec - 1, yyyy)) {
        cy.contains("Wrong Date Entered!").should('not.exist')
      } else {


        if (ccpYear == yyyy) {

          if (ccpMonth == mm) {

            if (enablePrevious) {
              selectDay(daySelector, dd)
            } else {
              if (dd < todayA[1]) {
                throw new Error("You can not Click on Previous Date")
              } else {
                selectDay(daySelector, dd)
              }
            }
          } else {

            if (enablePrevious) {
              travaseMonth(monthFromCCP, monthFromspec, nextMonthSelect, prevMonthSelect)
              selectDay(daySelector, dd)
            } else {
              if (monthFromspec < monthFromCCP) {
                throw new Error("You can not Click on Previous Date")
              } else {
                travaseMonth(monthFromCCP, monthFromspec, nextMonthSelect, prevMonthSelect)
                selectDay(daySelector, dd)
              }
            }


          }
        } else {

          var specDate = new Date(yyyy, monthFromspec - 1, dd)
          var ccpDate = new Date(ccpYear, monthFromCCP - 1, dd)

          if (enablePrevious) {
            travrseYear(ccpDate, specDate, nextMonthSelect, prevMonthSelect)
            selectDay(daySelector, dd)
          } else {
            if (yyyy < todayA[2]) {
              throw new Error("You can not go to Previous Year")
            } else {
              travrseYear(ccpDate, specDate, nextMonthSelect, prevMonthSelect)
              selectDay(daySelector, dd)
            }

          }
        }

      }
    }
  })
})

function myTodayDate() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = monthNames[today.getMonth()] //January start with 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

var getDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
}

function getMonthFromString(mon, day, year) {
  return new Date(Date.parse(mon + day + "," + year)).getMonth() + 1
}

function selectDay(daySelector, dd) {
  cy.get(daySelector).each(($el, index, list) => {
    var date = $el.text()
    if (date == dd) {
      cy.wrap($el).click()
    }
  })
}

function monthDiff(from, to) {

  var d1 = to
  var d2 = from
  if (from < to) {
    d2 = to
    d1 = from
  }
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}


function travrseYear(ccpYear, specYear, nextMonthSelect, prevMonthSelect) {

  var count = monthDiff(ccpYear, specYear)

  cy.log(count)

  if (ccpYear < specYear) {
    for (let i = 1; i <= count; i++) {
      cy.get(nextMonthSelect).click()
    }

  } else {
    for (let i = 1; i <= count; i++) {
      cy.get(prevMonthSelect).click()
    }
  }
}

function travaseMonth(monthFromCCP, monthFromspec, nextMonthSelect, prevMonthSelect) {
  if (monthFromCCP < monthFromspec) {

    while (monthFromCCP < monthFromspec) {
      monthFromCCP++
      cy.get(nextMonthSelect).click()
    }

  } else {

    while (monthFromCCP > monthFromspec) {
      monthFromCCP--
      cy.get(prevMonthSelect).click()
    }

  }
}
// Custom Command for the calender END HERE!



Cypress.Commands.add('assertToastMessageSuccess', (data,selector) => {

  cy.get(selector, { timeout: 1000 }).should('be.visible').then(function (txt) {
      var toast = txt.text()
      expect(data).to.equal(toast)
  })


})
Cypress.Commands.add("getCurrentDatewithformatmmddyy",()=>{
  var today = new Date()
  var dd = String(today.getDate() ) //remove the last padStart as the test case fails as the date now is showing 10/4/2021 instead of 10/04/2021
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  mm=mm.replace(/(^|\/)0+/g, '$1')
  var yyyy = today.getFullYear()
  today = mm + '/' + dd + '/' + yyyy
  return cy.wrap (today )
})

Cypress.Commands.add('getMyFormattedDate', () => { 
  const moment = require('moment')
  const d = new Date()
  const t = moment(d).format('MMMM Do, YYYY')
  return t
})
Cypress.Commands.add("fetchAccountIdAndSet", (authToken) => {

  cy.request({

    method: "GET",

    url: `${Cypress.env("backendUrl")}api/users/me`,

    auth: {
      bearer: authToken,
    },
    headers: {
     // accept: "application/vnd.api+json",
      'Authorization': "Bearer " + Cypress.env('token'),
  },

  })
  .then((response) => {
    cy.log("Selected account Id", response.body.accountId)
    Cypress.env("accountId", response.body.accountId)
  })

})

Cypress.Commands.add('getShortFormattedDate', () => { 
  // it will return date in this format, example: Nov 23
  const moment = require('moment')
  const d = new Date()
  const t = moment(d).format('MMM D')
  return t
})

Cypress.Commands.add('getMyWeekAndDate', () => { 
  // it will return date in this format, example: Nov 23
  const moment = require('moment')
  const d = new Date()
  const t = moment(d).format('dddd MMMM D, YYYY')
  return t
})

Cypress.Commands.add('createNewPatient', (patientFirstName, patientLastName, patientEmail) => {
  cy.request({
    method: "POST",
        url: `${Cypress.env("backendUrl")}api/patients`,
        auth: {
            bearer: Cypress.env('token'),
        },
        body: {
    birthDate: "01/01/1999",
        firstName: patientFirstName,
        gender: Math.random() >= 0.5 ? "male" : "female",
        isSyncedWithPms: false,
    lastName: patientLastName,
        mobilePhoneNumber: '2500000000',
        email: patientEmail,
      },
}).then((response) => {
    expect(response.status).to.eq(201);
    return response.body.entities.patients[
        Object.keys(response.body.entities.patients)[0]
      ].id;
    });
})

Cypress.Commands.add('apiloginOnlineBooking', (email, password, apiUrl) => {
  cy.request({
    method: 'POST',
    url: apiUrl,
    body: {
      email,
      password,
    }
  }).then((response) => {
    Cypress.env('onlineBookingtoken', response.body.token);
    localStorage.setItem('onlineBookingtoken', response.body.token)
    return response;
  })
  //.its('status')
  //.should('eq', 200);
})
