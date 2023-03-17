import { scrubMessage, SCRUB_REPLACEMENT, SENSITIVE_KEYWORDS } from "./scrubber"
import { LoggerOutputs } from "./types";
import { DEFAULT_LOG_DIRECTORY, Logger } from "./logger";
import fs from 'fs';


test("Expect scrubber to REDACT string values when necessary in non-sensitve properties(added feature)", () => {
    SENSITIVE_KEYWORDS.forEach(sensitiveWord => {
        expect(scrubMessage({nonsensitivekey: `${sensitiveWord}: This is test filler message content.`})).toStrictEqual({nonsensitivekey: SCRUB_REPLACEMENT})
    });  
    SENSITIVE_KEYWORDS.forEach(sensitiveWord => {
        expect(scrubMessage({nonsensitivekey: `cutoff the front ${sensitiveWord} This is test filler message content.`})).toStrictEqual({nonsensitivekey: SCRUB_REPLACEMENT})
    });  
    SENSITIVE_KEYWORDS.forEach(sensitiveWord => {
        expect(scrubMessage({nonsensitivekey: `${sensitiveWord}-This is test filler message content.`})).toStrictEqual({nonsensitivekey: SCRUB_REPLACEMENT})
    });  
})


test("Expect scrubber to REDACT strings when containg sensitve keywords", () => {
    expect(scrubMessage("2) apikey: this message should be scrubbed")).toStrictEqual(SCRUB_REPLACEMENT);
});


test("Expect scrubber to REDACT values of sensitive keyword properties in objects", () => {
    expect(scrubMessage({ 
        apikey: '3) this_value_should_be_scrubbed', 
        message: '3) this message is good to go' 
    }))
    .toStrictEqual({ 
        apikey: "<REDACTED>", 
        message: "3) this message is good to go"
    })
});


test("Expect scrubber NOT TO REDACT when unecessary(strings and objects)", () => {
    expect(scrubMessage({ noSensitiveInfo: '4) this message is good to go' }))
    .toStrictEqual({ noSensitiveInfo: '4) this message is good to go' });
    
    expect(scrubMessage('4) this message is good to go')).toStrictEqual('4) this message is good to go' );
})


// will delete logs directory, maybe should move to it's own dedicated test directory if needed
test(`Expect default directory creation for Logger in ${DEFAULT_LOG_DIRECTORY}`, () => {
    const fileLogger = new Logger({ logOutputType: LoggerOutputs.FILE });

    if (fs.existsSync(DEFAULT_LOG_DIRECTORY)) {
        fs.rmSync(DEFAULT_LOG_DIRECTORY, { recursive: true, force: true });
    }

    fileLogger.log('Testing default directory creation');

    expect(fs.existsSync(DEFAULT_LOG_DIRECTORY)).toBeTruthy();
})