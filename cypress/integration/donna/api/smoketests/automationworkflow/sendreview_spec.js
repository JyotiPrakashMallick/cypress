describe("Manual Triggering Review Message Touchpoints", function () {
  beforeEach(function () {
    cy.fixture("api/automationworkflow/sendreviewdata.json").then((data) => {
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

  it(`can set/update review request interval`, function () {
    cy.setReviewRequestInterval(
      Cypress.env("token"),
      this.data.review.touchpoint,
      this.data.review.period
    );
  });

  it(`can update the review request channels given message channels`, function () {
    cy.setReviewRequestChannels(
      Cypress.env("token"),
      this.data.review.messageTypes
    );
  });

  it(`can send a review request message at the specified touchpoint`, function () {
    cy.bookApptByReviewRequestTouchpoint(
      Cypress.env("token"),
      this.data.review.touchpoint,
      this.data.review.period,
      this.data.patient.id
    );
  });
});
