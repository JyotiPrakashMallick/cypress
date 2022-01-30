import moment from 'moment';
Cypress.Commands.add('loggedFollowUpviaGraphQL',(accountId,patientId,userId,note,patientFollowUpTypeId)=>{
     
    let date=moment().format("YYYY-MM-DD[T]HH:mm:ss")
    let authorization ="bearer "+ Cypress.env('token'); 
    const createPatientFollowUp_NEST=`
    mutation {
        createPatientFollowUp(
           patientFollowUpCreateInput:{
           accountId:"${accountId}",
           patientId:"${patientId}",
           assignedUserId:"${userId}", 
           userId:"${userId}", 
           note: "${note}", 
           dueAt:"${date}",
           patientFollowUpTypeId: "${patientFollowUpTypeId}"}){
               accountId,
               id,
               patientId,
               note
   
           }
   }`;
       
    cy.request({
       url:Cypress.env('backendUrl')+'newgraphql',
       method:'POST',
       headers:{
           'Content-Type':'application/json',
            authorization

       },
       body:{

           query:createPatientFollowUp_NEST
       }, 
       
   }).then(response=>{
    expect(response.status).to.eq(200)
    expect(response.duration).to.not.be.greaterThan(500)
    return cy.wrap(response)
   });
   
})


Cypress.Commands.add('fetchFollowUpTypes_NEST',()=>{
    let authorization ="bearer "+ Cypress.env('token');    
    const fetchFollowUpTypes_NEST=`
    query{
        patientFollowUpTypes(patientFollowUpTypesReadInput: {isDeprecated: false}) {
        value: id
        label: name    
       __typename
        }
       }`;
       
    cy.request({
       url:Cypress.env('backendUrl')+'newgraphql',
       method:'POST',
       headers:{
           'Content-Type':'application/json',
            authorization

       },
       body:{

           query:fetchFollowUpTypes_NEST
       }, 
       
   }).then(response=>{
    expect(response.status).to.eq(200)
    expect(response.duration).to.not.be.greaterThan(500)
    return response
   });
   
})
Cypress.Commands.add('UpdateloggedFollowUpviaGraphQL',(followUpDataId,userId,patientFollowUpTypeId)=>{
     
    let date=moment().format("YYYY-MM-DD[T]HH:mm:ss")
    let authorization ="bearer "+ Cypress.env('token'); 
    
    const updatePatientFollowUp_NEST=`
    mutation {
        updatePatientFollowUp(
        patientFollowUpUpdateInput:{
           id:"${followUpDataId}",
           assignedUserId:"${userId}", 
           userId:"${userId}", 
           note: "UPDATE POSTMAN GRAPHQL", 
           dueAt:"${date}",
           patientFollowUpTypeId: "${patientFollowUpTypeId}"}){
               accountId,
               id,
               patientId ,
               note
   
           }
   }`;
       
    cy.request({
       url:Cypress.env('backendUrl')+'newgraphql',
       method:'POST',
       headers:{
           'Content-Type':'application/json',
            authorization

       },
       body:{

           query:updatePatientFollowUp_NEST
       }, 
       
   }).then(response=>{
    expect(response.status).to.eq(200)
    expect(response.duration).to.not.be.greaterThan(500)
    return cy.wrap(response)
   });

   Cypress.Commands.add('DeleteFollowUpviaGraphQL',(followUpDataId)=>{
     
    
    let authorization ="bearer "+ Cypress.env('token'); 
    
    const deletePatientFollowUp_NEST=`
    mutation {
        deletePatientFollowUp(
        patientFollowUpDeleteInput:{
           id:"${followUpDataId}",
           }){
            id
           }
   }`;
       
    cy.request({
       url:Cypress.env('backendUrl')+'newgraphql',
       method:'POST',
       headers:{
           'Content-Type':'application/json',
            authorization

       },
       body:{

           query:deletePatientFollowUp_NEST
       }, 
       
   }).then(response=>{
    expect(response.status).to.eq(200)
    expect(response.duration).to.not.be.greaterThan(500)
    return cy.wrap(response)
   });
})
})
Cypress.Commands.add('fetchMyFollowUps',(accountId,userId,)=>{
    let authorization ="bearer "+ Cypress.env('token');    
    const fetchMyFollowUps_NEST=`
    query{
        patientFollowUps(patientFollowUpsReadInput: {
            accountId: "${accountId}",
            assignedUserId: "${userId}", 
           isWithinPast30Days:true,
            isCompleted: false}
            )
            {
           id,   
           patientId
           __typename
             }
           }`;
       
    cy.request({
       url:Cypress.env('backendUrl')+'newgraphql',
       method:'POST',
       headers:{
           'Content-Type':'application/json',
            authorization

       },
       body:{

           query:fetchMyFollowUps_NEST
       }, 
       
   }).then(response=>{
    expect(response.status).to.eq(200)
    expect(response.duration).to.not.be.greaterThan(500)
    cy.wrap(response)
   });
   
})