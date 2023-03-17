import { Logger } from './logger';

const consoleLogger = new Logger({ logOutputType: 'CONSOLE', logDirectory: './out' });

// "1) Hello World this message is good to go" 
consoleLogger.log('1) Hello World this message is good to go', 'DEBUG');

// "<REDACTED>" 
consoleLogger.log('2) apikey: this message should be scrubbed', 'ERROR');

// { "apikey": "<REDACTED>", "message": "3) this message is good to go" }
consoleLogger.log({ apikey: '3) this_value_should_be_scrubbed', message: '3) this message is good to go' });

// { "apikey": "<REDACTED>", "message": "3) this message is good to go" }
consoleLogger.log({ noSensitiveInfo: '4) this message is good to go' });

/*
  File gets created in ./out/<date>.log.txt
  Containing...

  INFO: {"apikey":"<REDACTED>","someOtherDataPoint":"6) this message is good to go"}
  INFO: {"noSensitiveInfo":"7) this message is good to go"}

*/
const fileLogger = new Logger({ logOutputType: 'FILE' });
fileLogger.log('5) Hello World File', 'INFO');
fileLogger.log({ apikey: '6) this_value_should_be_scrubbed', someOtherDataPoint: '6) this message is good to go' });
fileLogger.log({ noSensitiveInfo: '7) this message is good to go' });
