Cypress.Commands.add("updatePatient",
  (
    authToken,
    patientId,
    firstName,
    lastName,
    email,
    birthDate,
    mobilePhoneNumber,
    homePhoneNumber,
    cellPhoneNumber
  ) => {
        cy.getCurrentAccountAdapterType(authToken).then((adapterTypeString) => {
          cy.request({
            method: "PUT",
            url: `${Cypress.env("backendUrl")}api/patients/${patientId}`,
            auth: {
              bearer: authToken,
            },
            body: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              birthDate: birthDate,
              mobilePhoneNumber : mobilePhoneNumber,
              homePhoneNumber: homePhoneNumber,
              cellPhoneNumber: cellPhoneNumber                
            },
          }).then((response) => {
            expect(response.status).to.eq(201);
            return response;
          });
        });
      }); 
