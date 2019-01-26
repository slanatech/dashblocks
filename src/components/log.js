import * as log from 'loglevel';
import moment from 'moment';

let LOG_LEVEL = 'info';

let origFactory = log.methodFactory;
log.methodFactory = function(methodName, logLevel, loggerName) {
  let origMethod = origFactory(methodName, logLevel, loggerName);
  return function(message) {
    const timestamp = moment([]).format('hh:mm:ss');
    const msg = `${timestamp} [${methodName.toUpperCase()}] [DB]: ${message}`;
    origMethod(msg);
  };
};

//log.setLevel(log.getLevel());
log.setLevel(LOG_LEVEL);

export default log;
