//const userRoleList = ['OWNER', 'ADMIN', 'USER'];
//const userRole = userRoleList[Math.floor((Math.random() * userRoleList.length))];
//const accountID = 'a979189d-6bef-41f9-b224-892fbeb0955b'

Cypress.Commands.add("createUser",(accountID,confirmPassword,email,firstName,lastName,password,role,userId) => 
{
    let authorization ="bearer "+ Cypress.env('token');
        cy.request({
            method: "POST",
            url: `${Cypress.env("backendUrl")}api/accounts/${accountID}/newUser/`,
            headers: {
                authorization,
                'Accept':"application/vnd.api+json"
            },
            body: {
                "accountId": accountID,
                "confirmPassword": confirmPassword,
                "email": email,
                "firstName":firstName,
                "lastName": lastName,
                "password": password,
                "role": role,
                "sendingUserId": userId
            }
        }).then((response) => {
            // assert status code  
            expect(response.status).to.eq(201)
            // assert duration
            expect(response.duration).to.not.be.greaterThan(20000)
            //return cy.wrap(response)
        })
    })

Cypress.Commands.add("updateUser",
    (
        userRole,
        permissionId
    ) => {
        cy.request({
            method: "PUT",
            url: `${Cypress.env("backendUrl")}api/accounts/${accountID}/permissions/${permissionId}`,
            headers: {
                'Authorization': "Bearer " + Cypress.env('token'),
            },
            body: {
                role: userRole
            }
        }).then((response) => {
            // assert status code
            expect(response.status).to.eq(200)
            // assert duration
            expect(response.duration).to.not.be.greaterThan(500)
            return cy.wrap(response)
        })
    })

Cypress.Commands.add("deleteUser",
    (userId
    ) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env("backendUrl")}/api/users/${userId}`,
            headers: {
                'Authorization': "Bearer " + Cypress.env('token'),
            }
        }).then((response) => {
            // assert status code  
            expect(response.status).to.eq(204)
            // assert duration
            expect(response.duration).to.not.be.greaterThan(500)
        });
    });

