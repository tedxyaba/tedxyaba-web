# TEDxYaba Official Website
Independently organised TED event

### Requirements
* Node JS `12.16.1`
* NPM `6.13.4`
* Yarn `1.22.4`

## Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
### Install dependencies
`npm install` or `yarn install`

### Run the app locally
`npm run start` or `yarn start` <br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Run Tests
`npm test` or `yarn test` <br>
Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build for Production
`npm run build` or `yarn build:prod` <br>
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

`npm start` or `yarn start` <br>
Open [http://localhost:5000](http://localhost:5000) to view this production build in the browser.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Prod is deployed to [Surge](https://surge.sh/)
```
rm -rf build && yarn build:prod && mv build/index.html build/200.html && surge build/ tedxyaba.com
```


## Contributing

* Clone locally `git clone https://github.com/tedxyaba/tedxyaba-web.git`
* Create a branch for each separate piece of work e.g. `build-homepage`
* Push your branch `git push origin build-homepage`
* Create a new Pull Request and add Reviewers
* Merge when approved and delete branch

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). <br>
To learn React, check out the [React documentation](https://reactjs.org/).

License
----

MIT
