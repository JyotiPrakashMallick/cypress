const { exec } = require("child_process");
const data = require('../../../../../../fixtures/gui/enterprisemanagement/connector.json')

for (let i = 0; i < data.connectorServices.length; i++) {

    const res = exec("Get-Service " + "" + data.connectorServices[i], { 'shell': 'powershell.exe' })
    res.stdout.on('data', (val) => {
         
        console.log(val)
    })
}
// export default {
// getConnectorServicesStatus: (data) => {
//     for (let i = 0; i < data.connectorServices.length; i++) {

//         const res = exec("Get-Service " + "" + data.connectorServices[i], { 'shell': 'powershell.exe' })
//         res.stdout.on('data', (val) => {
             
//             console.log(val)
//         })
//     }
    
// }
// }
// const data = require('../../../../../fixtures/gui/enterprisemanagement/connector.json')
// describe('Check Connector services running status', () => {
//     it.only('Get Connector services and check the running status', () => {

//       const val=  cy.task('getServices')
//       cy.log()



//     })
// })