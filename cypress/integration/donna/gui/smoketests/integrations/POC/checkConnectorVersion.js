
const data = require('../../../../../../fixtures/gui/enterprisemanagement/connector.json')
describe('Check Connector Updated Version', () => {
    it('Fetch All the Folder values for given connector location and validate updated version', () => {
        let flag
        cy.task("files", data.connectorPath).then((files) => {
            let flag
            for (let i = 0; i < files.length; i++) {
                if (files[i].includes(data.updatedVersion)) {
                    cy.log('updated version found ' + files[i])
                    flag = true
                    break
                }
            }
            if (!flag) {
                cy.log('Given Version is not matched with Connecter Highest version')
            }
        })
    })
})