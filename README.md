# React Starter with Typescript
 Quick start react seed project to speed up development  
 Set up:
 * React
 * Redux (with thunk)
 * Typescript
 * Material-UI (for Material UI components and responsive design)
 * Express server or webpack-dev-server with Hot Module Replacement (HMR)
 * Unit Tests (with Jest, Enzyme and a mock store)
 
## Contents
   - [Getting Started](#getting-started)
     - [Express Mode](#express-mode)
     - [Webpack Dev Server Mode](#webpack-dev-server-mode)
   - [Client Structure](#client-structure)
     - [App](#app)
     - [Components](#components)
     - [Redux Store](#redux-store)
     - [Routing](#routing)
       - [Router State in Redux](#router-state-in-redux)
       - [Authentication](#authentication)
     - [Theming](#theming)
     - [Tests](#tests)
   - [Server Structure](#server-structure)
     - [Express](#express)
     - [Webpack Dev Server](#webpack-dev-server)
   - [Build System](#build-system)
     - [Development Mode](#development-mode)
       - [Development Mode Notes](#development-mode-notes)
     - [Production Mode](#production-mode)
       - [Production Mode Notes](#production-mode-notes)
     - [Testing](#testing)
   - [Technical Details](#technical-details)
     - [Build Process Details](#build-process-details)
     - [Known Issues](#known-issues) 
 
## Getting Started
`yarn` is recommended, though `npm` will also work  
 1. Clone the project
 2. Run `yarn install`
 3. Run `yarn run build.dev`

### Express mode:  
 1. Run `yarn start`
 2. Navigate to [localhost:9001](http://localhost:9001) for dev, or [localhost:9001/prod.html](http://localhost:9001/prod.html) for production

### Webpack Dev Server mode:
 1. Run `yarn devserver`
 2. Navigate to [localhost:9002](http://localhost:9002)

## Client Structure
### App  
   The app root (`client/app/index.tsx`) sets up the root of the application (container and child routes).  
   No logic should be present here; just the initialisation of the app.  
### Components  
   Components are located under the `components` folder and are [standard React components](https://facebook.github.io/react/docs/react-component.html).    
   Any components that need access to the redux store can do so with `connect`
### Redux Store
  Store bindings are provided via `react-redux`, with components using the [connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) method to bind state and actions.  
  `redux-thunk` is also set up, allowing for actions to [dispatch other actions](https://github.com/gaearon/redux-thunk).  
  Action creators are located under the `actions` folder.  
  Reducers are located under the `reducers` folder.  
  If any selectors are required, [reselect](https://www.npmjs.com/package/reselect) is also included.  
### Routing  
   Routing is done with [react-router v4](https://www.npmjs.com/package/react-router), with routes defined in components, and the main route in `app.tsx`.  
   Utilizing `<Switch>` directives, each component can render sub-routes as required.  
#### Router State in Redux
   Router state is synced with the store using [react-router-redux 5](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux), which also allows for routing within actions (for example routing back to the login page on session timeout).  
   See [the docs](https://github.com/reactjs/react-router-redux) for more details.  
#### Authentication
   Routes support checks before activating, and can navigate away if the checks fail. See `app.tsx` for an example.  
### Theming
   `material-ui` handles theming out of the box - see [the docs](http://www.material-ui.com/#/customization/themes)
### Tests
   Tests are located under the `__tests__` folder alongside the related component(s), and are largely up to the developer to write.  
   `enzyme` and `mock-redux-store` are included to allow for more comprehensive tests - see the home component test for an example.  
   They are executed using `jest`, which will detect and run them automatically and provide a coverage report.  
   They can be run manually with `yarn test`, but are also run with each production build.  
## Server Structure
### Express
   A simple express server providing some API endpoints and serving the generated bundles / css.  
   Any files under `api` ending in `.route.js` are included automatically, allowing endpoints to be split into multiple files.  
   All responses are compressed with gzip compression.  
### Webpack Dev Server
   Webpack dev server with hot module replacement enabled - only serves the dev bundle.  
   API requests are proxied through to the express server, so this will need to be running if any are required.  
## Build System
 The project is built using Webpack 3 and can be built in development or production mode  
 All output files are placed in the `dist` folder
### Development Mode
  `yarn run build.dev`  
  Generates a single artifact with the css bundled into it. Source maps are included and it is not minified.  

#### Development Mode Notes
  * This bundle will be big (about 7.5mb) - therefore it should _not_ be used in production

### Production Mode
  `yarn run build.prod`  
  Generates two bundles (app and vendor) for both css and javascript. Source maps are not included, the javascript bundles are minified and the css bundles are optimized.  
  The app bundle contains the code related to the application, while the vendor bundle contains all of the supporting libraries.  
  This will also run the test suite and will abort if any tests fail.  

#### Production Mode Notes
  * This bundle will be compact (about 650kb javascript + 120kb css), but debugging will be impossible so it should not be used for local development.  
  * When served with gzip, this decreases to around 180kb javascript and 25kb css

### Testing
  `yarn run test`  
  Runs all the tests in the `tests` folder and displays the results, followed by a coverage report  
  This can be run manually, but is also run when doing a production build
## Technical Details
### Build Process Details
 * `package.json` contains the build scripts
 * `build.dev` runs webpack using config `webpack.dev.js`, which builds a single artifact
   * JS is not minified and source maps are included
   * CSS toolchain is postcss-loader -> css->loader -> style-loader
 * `build.prod` runs webpack using `webpack.prod.js`, which builds chunked JS and CSS
   * JS is minified and source maps are not included
   * Vendor (3rd party) code is split into a separate JS file  
   * CSS toolchain is postcss-loader -> css-loader -> extract-text-webpack-plugin -> [app|vendor].prod.css -> optimize-css-assets-plugin

### Known Issues
 * None at this time 
