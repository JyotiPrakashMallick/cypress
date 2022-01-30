// <reference types="Cypress"/>

describe('Users Api', () => {
    let userData;

    // select random user role from the list provided
    beforeEach(() => {
        cy.apilogin(Cypress.env('superadmin_email'), Cypress.env('superadmin_password'), (Cypress.env('backendUrl') + "auth"));

          // load test data from fixtures
          cy.fixture('api/users/users').then((userdata)=>{
            userData=userdata
            cy.log(userData.firstName)
        }) 

      
    });
    it('Verify create,update and delete user api', () => {
        var crypto = require("crypto");
        var email = crypto.randomBytes(8).toString('hex')+'@mailinator.com';
        var firstName = crypto.randomBytes(8).toString('hex');
        var lastName = crypto.randomBytes(6).toString('hex');
        cy.createUser(userData.accountID,userData.confirmPassword,email,firstName,lastName,userData.password,userData.role,userData.userId).then((response) => {
            var res = JSON.stringify(response.body);
            expect(res).to.include(userData.accountID);
            expect(res).to.include(firstName);
            expect(res).to.include(lastName);
            expect(res).to.include(email);
            expect(res).to.include(userData.role)

            // fetch user id
            //var res_userID = JSON.stringify(response.body);
            var userid = res.result;
            console.log("------------------------->",userid)
            var permissionID = res.entities.users[0].permissionId
            cy.updateUser(userRole, permissionID).then((respo) => {
            var res2 = (JSON.stringify(respo.body))

            // assert data
            expect(res2).to.include(userData.roleUpdated);

            // delete user
            cy.deleteUser(userid)
            })
        })
    });
});