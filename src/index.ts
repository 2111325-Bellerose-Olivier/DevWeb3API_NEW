import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import { connect } from 'mongoose';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

  connect(EnvVars.MongoDb_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    logger.err(err, true);
  });
