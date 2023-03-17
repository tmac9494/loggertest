### Summary

#### This project consists of a basic logging utility. It allows for strings and object messages, of different severity, to be logged to different output systems.
#### It also looks for sensitive keywords and prevents those things from being logged (api keys, passwords, logins, etc)
---
### Setup
Install Node [16](https://nodejs.dev/download) (or [nvm and use 'nvm use'](https://github.com/nvm-sh/nvm))

`npm ci`

`npm run start`

---
### Objective
Read over `/src/main`. This file should not be changed. Each comment represents the expected output/result of each line.

Then over in `/src/scrubber`, implement the function 'scrubMessage'.

Lastly, treat this as a code review as well. Make any improvements you see fit (without changing `src/main` and the logger's log _function signature_)

---
### Other Notes
Use js or ts (Remove `// @ts-nocheck` from each file if you wish TS to start checking).
