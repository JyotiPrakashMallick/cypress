describe("Manual Triggering Reminder Message Touchpoints", function () {
  beforeEach(function () {
    cy.fixture("./api/automationworkflow/sendreminderdata.json").then((data) => {
      this.data = data;
    });
  });

  it("can get authorized with CareCru's API", function () {
    cy.apilogin(
      this.data.account.email,
      this.data.account.password,
      Cypress.env("backendUrl") + "auth"
    );
  });

  it(`can send a reminder for a given touchpoint`, function () {
    cy.bookApptByReminderTouchpoint(
      Cypress.env("token"),
      this.data.reminder.touchpoint,
      this.data.reminder.period,
      this.data.patient.id
    );
  });

  it(`can create a customized reminder touchpoint`, function () {
    cy.createReminder({
      authToken: Cypress.env("token"),
      touchpoint: this.data.reminder.touchpoint,
      timePeriod: this.data.reminder.period,
      primaryTypes: this.data.reminder.messageTypes,
      dailyRunTime: this.data.reminder.dailyRunTime,
    });
  });
});
