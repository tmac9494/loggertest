import { scrubMessage } from './scrubber';
import { LogTypeToLogger } from './util';
import { LoggerConfig, LoggerLevels, LoggerOutputs, LoggerMessage, LoggerLevelTypes } from './types';

const DEFAULT_LOG_OUTPUT_TYPE = LoggerOutputs.CONSOLE;
export const DEFAULT_LOG_DIRECTORY = './out';

export class Logger {
  defaultLevel;
  logScrubFunction;
  logOutputType;
  logDirectory;

  constructor(config:LoggerConfig) {
    this.defaultLevel = config.defaultLevel || LoggerLevels.INFO;
    this.logScrubFunction = config.logScrubFunction || scrubMessage;
    this.logOutputType = config.logOutputType || DEFAULT_LOG_OUTPUT_TYPE;
    this.logDirectory = config.logDirectory || DEFAULT_LOG_DIRECTORY;
  }

  log(message:LoggerMessage, level?:LoggerLevelTypes) {
    const logger = LogTypeToLogger[this.logOutputType];
    logger({
      logLevel: level || this.defaultLevel,
      message: this.logScrubFunction(message),
      logDirectory: this.logDirectory,
    });
  }
}
