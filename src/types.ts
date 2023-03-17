export enum LoggerLevels {
    DEBUG = 'DEBUG',
    ERROR = 'ERROR',
    INFO = 'INFO',
    WARN = 'WARN',
}
export type LoggerLevelTypes = keyof typeof LoggerLevels;
  
export enum LoggerOutputs {
    CONSOLE = 'CONSOLE',
    FILE = 'FILE'
}
export type LoggerOutputTypes = keyof typeof LoggerOutputs;
  
export type ConsoleLogConfig = {
    logLevel: LoggerLevelTypes;
    message: LoggerMessage;
}
  
export interface FileLogConfig extends ConsoleLogConfig {
    logDirectory?: string,
}

export interface LoggerConfig {
    defaultLevel?: LoggerLevelTypes,
    logScrubFunction?: (message: LoggerMessage) => LoggerMessage,
    logOutputType?: LoggerOutputTypes,
    logDirectory?: string,
}

export interface ScrubObject {
    [key:string]: string;
  }
  export type LoggerMessage = string | ScrubObject;
  