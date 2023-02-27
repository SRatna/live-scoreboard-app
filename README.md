# Live Football World Cup Score Board App

This is a simple live football scoreboard web application powered by React with TypeScript. 
One could start new game, update a game's score, end a game and view all ongoing games summary with their scores via the app.

## Tech Stack

This app uses a number of third party open-source tools:

### Frontend
- [Vite](https://vitejs.dev/) for building the [React](https://reactjs.org/) frontend.
- [Antd](https://ant.design/) for the UI components.
- [UUID](https://github.com/uuidjs/uuid) for generating unique Game IDs.
- [Jest](https://jestjs.io/) along with [ts-jest](https://kulshekhar.github.io/ts-jest/) for unit testing.

## Getting started

### Requirements
You must install latest version of [NodeJS](https://nodejs.org/en/download/) to run this application.

### Up and Running
Run following commands from root directory of the project to run the application.
```shell
# install node packages
npm i
# start vite dev server
npm run dev
# perform test using jest
npm run test
```

### Additional Notes
All the helper functions can be found [here](https://github.com/SRatna/live-scoreboard-app/blob/main/src/helpers/index.ts) and its unit tests are [here](https://github.com/SRatna/live-scoreboard-app/blob/main/src/helpers/index.test.ts).