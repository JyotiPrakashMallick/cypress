# Cypress Test Framework Approach

## Page Object Design Pattern

This is a design pattern that creates an object repository for web UI elements. This helps gives the QA the confidence to reduce duplication of code and test maintenance is easy. Technically a page object is a class that represents a page in a web application. Each of the webpage map to one class or multiple class in the page object. This page class will contain the locators of the elements of the web page and contains method that performs actions on the web Elements. 

***Benefits:***

*  The page element selectors are in one place.
* Implementing these helps us standardize how we interact with each page

 **How to Implement in Cypress :**

In cypress we usually put all our page object class under the support folder and we will add a folder called pageObjects.

![Home Page Object Model](/docs/diagrams/pageobjectmodeljs.png)


For below sample, we added homepage.js file in pageObjects that will have all webElement locators and they encapsulate the all the methods that find and manipulate the application elements.

![Implement Page Object Model in Spec File](/docs/diagrams/implementationspecfile.png)

## Custom Commands Approach 

Cypress comes with its own API for creating custom commands and overwriting existing commands. This custom commands can be a repetitive action that is commonly used when every we start a test, like log in functionality. This way we can reuse the code for all our spec that needs log in.

**How to Implement in Cypress :**

We usually put all our custom commands in custom.js  under the folder cypress/support. Instead of putting the element locators plus action in a class, we put them all on the custom command.js like below:

![Custom Command Approach Model](/docs/diagrams/customcommandjs.png)

This is how we implemented the custom command in a spec file which is basically our test case:  We import custom commands in the spec file and use it like existing commands that starts with cy and then the command name

![Custom Command Approach Spec Model](/docs/diagrams/implementationcustomcommandjs.png)

## Cucumber Approach 

Cypress Test Framework is a java script end to end test framework built on top of Mocha can also be implemented with BDD assertion approach.

The common test framework for BDD is Cucumber. It uses a gherkin language which allows you to write tests that makes it easy for non technical and technical people.

The cucumber is not a built in package for cypress so we have to install a package called cucumber preprocessors.

To implement this we have to create a feature file in Integration folder in cypress and this feature file is glued to step definitions

This is how the feature file looks like:


![Feature File](/docs/diagrams/cucumberfeaturefile.png)

Below is the step definitions for the feature file that needs to be glued to the feature file: 

![StepDefinition File](/docs/diagrams/cucumberspec.png)

The team has decided to not use cucumber approach and use page object model pattern