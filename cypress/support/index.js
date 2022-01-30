// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import addContext from "mochawesome/addContext"
// Import commands.js using ES2015 syntax:
import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')
import './commands/gui/common/commonUtilCommands';
import './commands/gui/integrations/chaircommand';
import './commands/gui/automationworkflow/dashboard/dashboardPageCommands';
import './commands/api/automationworkflow/dashboard/dashboardAPICommands';
import './commands/gui/scheduling/schedulePageCommands';
import './commands/gui/enterprisemanagement/localstoragePageCommands';
import './commands/api/automationworkflow/automationworkflowCommands';
import './commands/gui/integrations/practionerCommands';
import './commands/gui/automationworkflow/Reminders/reminderCommands';
import './commands/gui/integrations/patientCommand';
import './commands/api/integrations/patients/patientsAPICommand';
import './commands/gui/patientmanagement/patientManagementCommand';
import "./commands/api/scheduling/servicesCommands"
import "./commands/gui/scheduling/scheduleReasonPageCommands"
import './commands/gui/scheduling/onlineBookingWidgetCommands'
import './commands/gui/enterprisemanagement/practiseCommand'
import './commands/gui/enterprisemanagement/addEditEnterpriseCommands'
import './commands/gui/integrations/practiceCommands'
import './commands/gui/scheduling/waitlist/waitlistCommands'
import './commands/gui/integrations/nasaSettingsCommand';
import './commands/gui/enterprisemanagement/searchRandomNonExistingPracticeEnterprise'
import './commands/api/enterprisemanagement/enterpriseCommands.js'
import './commands/gui/automationworkflow/formpagecommands'
import './commands/api/scheduling/onlineBookingRequestCommands'
import './commands/gui/enterprisemanagement/enterpriseAndPracSearchCommands'
import './commands/gui/unifiedcommunications/chatCommands'
import './commands/api/patientmanagement/loggedRecallCustomCommands'
import './commands/api/enterprisemanagement/enterpriseCommands'
import './commands/api/unifiedcommunications/chatApiCommands'
import './commands/api/patientmanagement/updatePatient'
import './commands/api/scheduling/createAppt' 
import './commands/api/scheduling/createWaitspot'
import './commands/gui/scheduling/apptLinkingCommands'
import './commands/gui/automationworkflow/forms/formsSignature'
import './commands/api/scheduling/chairCommands'
import './commands/api/scheduling/practitionerCommands'
import './commands/api/patientmanagement/followUpsCustomCommands'
import './commands/api/scheduling/eventCommands'
import './commands/api/users/usersCommands'
import './commands/api/integrations/connectorReleaseCommands'
import './commands/api/patientmanagement/familyCustomCommands'

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
      const screenshot = `${Cypress.config('screenshotsFolder')}/${
        Cypress.spec.name
      }/${runnable.parent.title} -- ${test.title} (failed).png`;
      addContext({ test }, screenshot);
    }
  });
