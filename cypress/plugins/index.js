/// <reference types="cypress"/>
/**
 * @type {Cypress.PluginConfig}
 */
const fs = require('fs-extra');
const path = require('path');
const clipboardy = require('clipboardy')
const pathh = require('path');
const fss = require('fs');
const { exec } = require("child_process");
function getConfigurationByFile(file) {
  //const pathToConfigFile = path.resolve('..','qa-e2e-automations/cypress/configFiles',`${file}.json`);
  const pathToConfigFile = path.resolve('..', 'qa-e2e-automations', `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  on("task", {
    dbQuery: (query) => require("cypress-postgres")(query.query, query.connection)
  });
  on('task', {
    getClipboard() {
      const clipboard = clipboardy.readSync()
      return clipboard
    }
  });
  on('task', {

    files: ls,
  });

  on('task', {

    getServices: service,
  });

  const file = config.env.fileConfig || 'development';
  return getConfigurationByFile(file);
};

const ls = (path) => {
  return fss.readdirSync(path)
}

const service = (data) => {
  return exec("Get-Service " + "" + data.connectorServices[0], { 'shell': 'powershell.exe' })
}