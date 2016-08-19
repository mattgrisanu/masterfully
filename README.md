[![Build Status](https://travis-ci.org/chkakaja/sentimize.svg?branch=master)](https://travis-ci.org/chkakaja/sentimize)
[![Stories in Ready](https://badge.waffle.io/chkakaja/sentimize.png?label=ready&title=Ready)](https://waffle.io/chkakaja/sentimize)
# Masterfully

  Masterfully provides session-based visualization and tracking of video and tone sentiment analyses during video recording for interviews and training.

## Table of Contents
1. [Usage](#Usage)
2. [Getting started](#Getting-Started)
  1. [Clone the latest version](#Installing-Dependencies)
  2. [Install Dependencies](#Installing-Dependencies)
  3. [Setup Environment Variables](#Environment-Variables)
  4. [Start the application](#Start-application)
3. [Technologies](#Technologies)
4. [Database Schema](#Database)
5. [Team](#Team)
6. [Contributing](#Contributing)

## Usage

Landing page:
![screen shot 2016-07-26 at 13 16 31](https://cloud.githubusercontent.com/assets/8594433/17825075/8d8abe20-661a-11e6-9002-f76dcedce20d.png)

Login:
![screen shot 2016-07-26 at 13 19 28](https://cloud.githubusercontent.com/assets/8594433/17825129/edfae2a8-661a-11e6-89b6-8469a6a0f0ff.png)

Home:
![screen shot 2016-07-26 at 13 16 50](https://cloud.githubusercontent.com/assets/8594433/17825076/8d8c6676-661a-11e6-9cc0-5fbbed1ca53d.png)

Session Overview:
![screen shot 2016-07-26 at 13 17 45](https://cloud.githubusercontent.com/assets/8594433/17825077/8d8d9e88-661a-11e6-8433-b045cc07e4a0.png)

Progrss:
![screen shot 2016-07-26 at 13 19 53](https://cloud.githubusercontent.com/assets/8594433/17825078/8d91e3bc-661a-11e6-83ee-494ac6cc92b2.png)

## Getting started

#### 1. Clone the latest version

  Start by cloning the latest version of Sentimize on your local machine by running:

  ```sh
  $ git clone https://github.com/formidable-coffee/masterfully
  $ cd masterfully
  ```

#### 2. Install Dependencies
  From within the root directory run the following command to install all dependencies:

  ```sh
  $ npm install
  ```

#### 3. Setup Environment Variables

##### Server side setup

  1. Copy and save the  ``` example.env ``` file in the env folder as ``` development.env ```.
  2. Replace the port with your desired port and enter the login credentials for your MySQL server (make sure it is running)
  3. Sign up for a [Watson Developer Cloud account](http://www.ibm.com/cloud-computing/bluemix/watson/) and obtain a Username and Password for both the Watson [Speech To Text](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/speech-to-text/) and [Tone Analyzer](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tone-analyzer/index.shtml)
  4. Enter the username and password provided from the Speech To Text and Tone Analyzer in the `STT_USER/STT_PASSWORD` and `TA_USER/TA_PASSWORD`, respectively.

##### Client side setup

  1. Create a free account on http://face.sightcorp.com/ and create a new application for a new App Key.
  2. Copy and save the  ``` client-config.example.js ``` file in the env folder as ``` client-config.js ```.
  3. Enter and save your Client ID and App Key in the ``` client-config.js ``` file.

#### Database setup

  1. Start database 

    ```
    $ mysql.server start
    ```

  2. Login into the database

    ```
    $ mysql -u root -p
    ```

  3. Create database

    ```
    > CREATE DATABASE masterfully;
    ```
    
#### 4. Run the application

  1. Create a build folder, ```client/build```. From within the root directory run the following command to make sure Browserify builds the bundle file and rebuilds on every change with Watchify:

  ```sh
  $ npm run bundle
  ```

  2. In a new terminal window run the following command to start the application:

  ```sh
  $ npm start
  ```

  After that open in your browser the localhost with your chosen port, e.g. ``` http://localhost:4568/ ``` to access the application.

#### 5. Run tests

  Configure the environment variable `NODE_ENV` prior to running tests.

  ```sh
  $ export NODE_ENV=development
  $ npm test
  ```

  You may use `npm run test-client` or `np run test-server` to run front-end and back-end tests independently.

## Technologies

##### Front end:
- React
- Face Analysis Cloud Engine API by Sightcorp
- Speech To Text API by IBM Watson
- Browserify
- Chartjs
- Babel

##### Back end:
- Node
- Express
- Jade
- Bookshelf/Knex
- MySQL
- Passport
- Tone Analyzer API by IBM Watson

##### Testing:
- Mocha
- Chai
- jsdom

##### Continuous Integration:
- Travis CI

## Database
Created with this [visualizer](http://ondras.zarovi.cz/sql/demo/)

![screen shot 2016-06-07 at 15 51 33](https://cloud.githubusercontent.com/assets/17868916/15941715/454c6a3a-2e36-11e6-9227-a352cc0dee8c.png)

## Directory Layout
```
├── /env/                       # Environment variables
├── /node_modules/              # 3rd-party libraries and utilities
├── /client/                    # Client source code
│   ├── /build/                 # Build file produced with Browserify
│   ├── /components/            # React components
│     ├── /home-view/           # Home view components
│     ├── /main-layout/         # Main Layout components
│     ├── /practice-view/       # Practice view components
│     ├── /record-view/         # Record view components
│     ├── /report-view/         # Reporting view components
│     ├── /sessions-view/       # Session view components
│     ├── /settings-view/       # Settings view components
│     ├── /setup-view/          # Setup view components
│     ├── /App.jsx/             # Main React App
│   ├── /lib/                   # Lib files, e.g. from FACE API
│   ├── /style/                 # CSS Style files
│   ├── /index.jsx              # Index file to attach React to DOM
├── /server/                    # Server source code
│   ├── /config/                # Initial server config files
│   ├── /controllers/           # Controllers for database interaction
│   ├── /lib/                   # Lib for util functions
│   ├── /models/                # Data models
│   ├── /routes/                # Routes for incoming GET and POST requests
│   ├── /views/                 # Jade templating views
│   └── /server.js              # Server-side startup script
├── /test/                      # Server and client side tests
│   ├── /client/                # Client side tests
│   ├── /server/                # Server side tests
|   ├── /data/                  # Holds seed & dummy data
└── package.json                # List of 3rd party libraries and utilities to be installed
└── .babelrc                    # Babel presets
└── .eslintrc                   # ESLint settings
```

## Team

* Adam Lessen
* Matt Naing
* Erin Kavanaugh

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
