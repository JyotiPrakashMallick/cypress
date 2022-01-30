# Cypress Automation Tool Brief Overview

## What is Cypress?
Cypress framework is a JavaScript-based end-to-end testing framework built on top of Mocha – a feature-rich JavaScript test framework running on and in the browser, making asynchronous testing simple and convenient. It also uses a BDD/TDD assertion library and a browser to pair with any JavaScript testing framework.

## Benefits of using Cypress: 
* Cypress automatically waits for commands and assertions before moving on, async will not be an issue.
* Ability to test Edge Testcases by Mocking the server response
* Cypress takes snapshots as your tests run. We can hover over each commands in the Command Log to see exactly what happened at each step.
* Because of its Architectural design, Cypress delivers fast, consistent and reliable test execution compared to other Automation tools
* Cypress is built on node.js and uses javascript for writing test cases, they use built in commands which is easy to understand
* Our application is built on react and cypress supports also this framework.
* Write tests easily and quickly, and watch them execute in real time as you build your web application.
* Open Source
* Developer and QA friendly which means the community is growing. Please visit this site to see the trend of download:

## Cypress Architecture:

* Cypress engine directly operates inside the browser unlike selenium that uses drivers to operate on browsers.

* This architecture enables the tester with the help of cypress to listen and modify the browser behavior at run time by manipulating the DOM and altering the network requests to verify scenarios for responses. Cypress provides a new kind of testing that helps us to test not just the front end but also the back end manipulation responses.  

## Browser Supported:
* Chrome, Electron,Firefox & IE

## Operating System Supported: 
* MacOs 10.19 and above 64 bit only
*  Linux Ubuntu 12.04 and above, fedora 21 and Debian 8(64 Bit only) 
*  Windows 7 and above

## Cypress Components are composed of Test Runner and Dashboard Service

* Test Runner basically is where we run our specs which is our test cases
* Dashboard Service is an online dashboard tooling for cypress that allows us to see the analytics side of our test code coverage from the browser, run time, environment  etc.
* There is a free version of this dashboard online for 3 people only and they also have paid version.
