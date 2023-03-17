export const SENSITIVE_KEYWORDS = ['apikey', 'password', 'username', 'login'];
export const SCRUB_REPLACEMENT = '<REDACTED>';
import { ScrubObject, LoggerMessage } from "./types";


// string scrubber
const scrubString = (message: string): string => {
  // reduce sensitve keywords to search for matches in string
  const shouldBeScrubbed = SENSITIVE_KEYWORDS.reduce(
    (shouldScrub, currentSensitiveWord) => shouldScrub || message.includes(currentSensitiveWord)
    , false
  );

  return shouldBeScrubbed
    ? SCRUB_REPLACEMENT
    : message;
}

//object scrubber
const scrubObject = (message: ScrubObject): ScrubObject => {
  // scrub all values with sensitive keywords as properties 
  // and run scrubString on other values(added improvement)
  return Object.keys(message).reduce(
    (clean:ScrubObject, messageKey) => {
      clean[messageKey] = SENSITIVE_KEYWORDS.includes(messageKey)
        ? SCRUB_REPLACEMENT
        : scrubString(message[messageKey]);
      return clean;
    }, {}
  );
}

// Handle string/object message scrubbing
export const scrubMessage = (logMessage:LoggerMessage):LoggerMessage => 
  typeof logMessage === 'string'
    ? scrubString(logMessage)
    : scrubObject(logMessage);



