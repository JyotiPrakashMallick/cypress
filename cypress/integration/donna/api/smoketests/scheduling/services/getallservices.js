/// <reference types="Cypress"/>
/*
 This is a test for api for getting all services available for a certain account
*/
describe("Verify that we can get all services for a certain account", () => {
  before(function () {});
  it("Verify that user has an authorized status to an account", () => {
    cy.apilogin(
      Cypress.env("scheduleapi"),
      Cypress.env("password"),
      Cypress.env("backendUrl") + "auth"
    );
  });
  it("Verify that all services are available and shows status of 200 OK", function () {
    cy.getAllServices(Cypress.env("token")).then((servicesNames) => {
      let servicesName,
        serviceId,
        serviceDuration,
        serviceDescription,
        serviceisHidden,
        serviceisDefault,
        servicesPMSId,
        servicesbufferTime,
        servicesunitCost,
        servicesreasonWeeklyHoursId,
        servicescreatedAt,
        servicesupdatedAt,
        servicesdeletedAt,
        servicesAccountId;
      console.log(servicesNames);
      let arr = Object.entries(servicesNames);
      console.log(arr);
      var arrlength = arr.length;
      for (var i = 0; i < arrlength; i++) {
        servicesName = arr[i][1].name;
        serviceId = arr[i][1].id;
        serviceDuration = arr[i][1].duration;
        serviceDescription = arr[i][1].description;
        serviceisHidden = arr[i][1].isHidden;
        serviceisDefault = arr[i][1].isDefault;
        servicesAccountId = arr[i][1].accountId;
        servicesPMSId = arr[i][1].pmsId;
        servicesbufferTime = arr[i][1].bufferTime;
        servicesunitCost = arr[i][1].unitCost;
        servicesreasonWeeklyHoursId = arr[i][1].reasonWeeklyHoursId;
        servicescreatedAt = arr[i][1].createdAt;
        servicesupdatedAt = arr[i][1].updatedAt;
        servicesdeletedAt = arr[i][1].deletedAt;
        cy.log("name:" + servicesName);
        cy.log("id:" + serviceId);
        cy.log("duration:" + serviceDuration);
        cy.log("description:" + serviceDescription);
        cy.log("isDefault:" + serviceisDefault);
        cy.log("isHidden" + serviceisHidden);
        cy.log("accountId:" + servicesAccountId);
        cy.log("pmsId:" + servicesPMSId);
        cy.log("bufferTime:" + servicesbufferTime);
        cy.log("unitCost:" + servicesunitCost);
        cy.log("reasonWeeklyHoursId:" + servicesreasonWeeklyHoursId);
        cy.log("createdAt:" + servicescreatedAt);
        cy.log("updatedAt:" + servicesupdatedAt);
        cy.log("deletedAt:" + servicesdeletedAt);
      }
    });
  });
});
