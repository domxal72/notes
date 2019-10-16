This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

```"scripts": {
    "start": “PORT=9000 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
 ```

Linux (tested on Ubuntu 14.04/16.04) and MacOS (tested by @aswin-s on MacOS Sierra 10.12.4):<br />
    `"start": "PORT=9000 react-scripts start"`
or (may be) more general solution by @IsaacPak
    `"start": "export PORT=9000 react-scripts start"`
Windows @JacobEnsor solution
    `"start": "set PORT=9000 && react-scripts start"`
