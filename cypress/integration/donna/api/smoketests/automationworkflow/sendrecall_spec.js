describe("Manual Triggering Recall Message Touchpoints", function () {
  beforeEach(function () {
    cy.fixture("api/automationworkflow/sendrecalldata.json").then((data) => {
      this.data = data;
    });
  });

  it("is authorized with api", function () {
    cy.apilogin(
      this.data.account.email,
      this.data.account.password,
      Cypress.env("backendUrl") + "auth"
    );
  });

  it("can print current account ID for clearing cron jobs in database", function () {
    cy.getCurrentAccountID(Cypress.env("token")).then((id) => {
      cy.log(`Account ID: ${id}`);
    });
  });

  it("Book appointment to populate Todo list", function () {
    cy.bookApptByRecallTouchpoint(
      Cypress.env("token"),
      this.data.prevAppointment.procedureCode,
      this.data.prevAppointment.reason,
      this.data.recall.dueDateMonths,
      this.data.recall.message.touchpoint,
      this.data.recall.message.period,
      this.data.recall.message.sentAfterDueDate
    );
  });
});
