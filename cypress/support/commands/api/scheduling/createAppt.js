Cypress.Commands.add("createApptApi",
  (
    authToken,
    startpoint,
    endpoint,
    patientId,
  ) => {
    cy.getPractitionerIDs(authToken).then((practitionerIds) => {
      if (practitionerIds.length == 0) {
        throw new Error("No practitioners available.");
      }
      cy.getChairIDs(authToken).then((chairIds) => {
        if (chairIds.length == 0) {
          throw new Error("No chairs available.");
        }
        cy.getCurrentAccountAdapterType(authToken).then((adapterTypeString) => {
          cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}api/appointments`,
            auth: {
              bearer: authToken,
            },
            body: {
              startDate: startpoint,
              endDate: endpoint,
              chairId: chairIds[0],
              patientId: patientId,
              practitionerId: practitionerIds[0],
              isSyncedWithPms: false,                     
              isReminderSent: false,
              isDeleted: false,
              deletedAt: startpoint                
            },
          }).then((response) => {
            expect(response.status).to.eq(201);
            return response;
          });
        });
      });
    });
  }); 
