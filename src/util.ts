import fs from 'fs';
import chalk from 'chalk';
import { LoggerLevels, ConsoleLogConfig, FileLogConfig, LoggerOutputs } from './types';
import { DEFAULT_LOG_DIRECTORY } from './logger';


// moved chalk functions into object with enum properties
const chalkLoggerStore = {
  [LoggerLevels.INFO]: chalk.green,
  [LoggerLevels.WARN]: chalk.yellow,
  [LoggerLevels.ERROR]: chalk.red,
  [LoggerLevels.DEBUG]: chalk.blue,
};


export const consoleLogger = (logConfig: ConsoleLogConfig) => {
  const { logLevel, message } = logConfig;
  const chalkLogger = chalkLoggerStore[logLevel];

  const logMessage = typeof message === 'string'
    ? message
    : JSON.stringify(message, null, 2);

  console.log(chalkLogger(logMessage));
};


export const fileLogger = (logConfig: FileLogConfig) => {
  const { logDirectory, logLevel, message } = logConfig;
  const today = new Date().toISOString();
  const directory = logDirectory || DEFAULT_LOG_DIRECTORY;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const fileName = today.substring(0, today.indexOf('T')); // Date string in format 2021-12-07
  
  const logMessage = typeof message === 'string'
    ? message
    : JSON.stringify(message);
  
  fs.appendFileSync(
    `${logDirectory}/${fileName}.log.txt`, 
    `${logLevel}: ${logMessage}\n`
  );
};


export const LogTypeToLogger = {
  [LoggerOutputs.CONSOLE]: consoleLogger,
  [LoggerOutputs.FILE]: fileLogger,
};
