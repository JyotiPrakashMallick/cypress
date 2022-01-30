import moment from 'moment';
Cypress.Commands.add('loggedRecallviaGraphQL',(accountId,patientId,userId,note,sentRecallOutcomeId)=>{
     
    let date=moment().format("YYYY-MM-DD[T]HH:mm:ss")
    let authorization ="bearer "+ Cypress.env('token'); 
    const createManualSentRecall_NEST=`
    mutation {
       createManualSentRecall(
           sentRecallCreateInput:{
           accountId:"${accountId}",
           patientId:"${patientId}",
           primaryType: "phone",
           userId:"${userId}", 
           note: "${note}", 
           createdAt:"${date}",
           sentRecallOutcomeId: "${sentRecallOutcomeId}"}){
               accountId,
               id,
               patientId 
   
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

           query:createManualSentRecall_NEST
       }, 
       
   }).then(response=>{
    expect(response.status).to.eq(200)
   });
   
})


Cypress.Commands.add('fetchSentRecallOutcomes_NEST',()=>{
    let authorization ="bearer "+ Cypress.env('token');    
    const fetchSentRecallOutcomes_NEST=`
    query{
        sentRecallOutcomes(sentRecallOutcomesReadInput: {isDeprecated: false}) {
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

           query:fetchSentRecallOutcomes_NEST
       }, 
       
   }).then(response=>{
    expect(response.status).to.eq(200)
    return response
   });
   
})