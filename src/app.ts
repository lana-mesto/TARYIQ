import {promisify} from 'util';
import express = require('express');
require('dotenv').config();

const cors = require('cors');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const server = require('http').createServer(app);
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const maxFileLImistSize = '50mb';

import mobileAuth_client = require('./cloudCode/modules/User/mobileAuth_client');

async function main(): Promise<void> {
  const config: any = {
    liveQuery: {
      classNames: [],
    },
    auth: {
      continueWithMobileAuth: {
        enabled: true,
        module: mobileAuth_client,
      },
    },
    databaseURI: process.env.databaseURI,
    appName: process.env.appName,
    appId: process.env.appId,
    restAPIKey: process.env.restAPIKey,
    cloud: './build/src/cloudCode/main.js',
    masterKey: process.env.masterKey,
    javascriptKey: process.env.javascriptKey,
    serverURL: process.env.serverURL,
    masterKeyIps: ['::/0', '0.0.0.0/0'],
    publicServerURL: process.env.publicServerURL,
    // loggerAdapter: LoggerAdapter,
    mountPath: process.env.mountPath,
    encodeParseObjectInCloudFunction: true,
    allowClientClassCreation:true
  };

  const api = new ParseServer(config);
  await api.start();
  app.use(cors());
  app.use(process.env.mountPath as string, api.app);
  server.listen(1337, function () {
    console.log('The Server is up and running on port 1337.');
  });
  ParseServer.createLiveQueryServer(server);
}

main();

console.log('---app.js File Initialized---');
