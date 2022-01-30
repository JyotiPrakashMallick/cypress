# How to run spec test suites and spec test cases in terminal or in jenkins

The following are ways to run the e2e tests in terminal and can be use in jenkins too:

**Open Cypress Test Runner:**
* npm run cypress:open 

**Run all e2e tests:** 
* npm run cypress:runAll 

**Run  api smoke tests:** 
* npm run cypress:apismokeTest

**Run api regression tests:** 
* npm run cypress:apiregressionTest

**Run gui smoke tests:**
* npm run cypress:guismokeTest

**Run gui regression tests:**
* npm run cypress:guiregressionTest

**Run specific test you scripted**

***GUI:***
* npm run cypress: run --spec cypress/integration/donna/gui/regression/<filename>.js

***API:***
* npm run cypress: run --spec cypress/integration/donna/api/regression/<filename>.js

By default cypress runs headless mode on electron.
To put in headless and change browser you can add --headless --browser chrome

Sample : 
* npm run cypress: run -- --headless --spec cypress/integration/donna/gui/regressions/*.js --browser chrome 

***Run Tests on Different ENV***

* cypress:devENV": "npm run cypress:run --config-file cypress.env.json 

***Pass env variable to run locally in test runner***

* npm run cypress:open --env password={insertpassword}

***Run Tests on CLI passing the password env***
* npm run cypress:run -- --env password={password} --browser chrome

This are all found in the package.json file. 