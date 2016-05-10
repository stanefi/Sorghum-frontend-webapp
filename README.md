# Sorghum-frontend web application

Complete instructions manual for installing and configuring Sorghum-frontend application to run locally on your machine.

## Application requirements

   * npm 2.14.0 or higher

     npm -v

   * node.js 4.0.0 or higher

     node -v
   * browserify

   * mocha

     npm install -g mocha

## Application install
    cd Sorghum-frontend-webapp
    npm install
    node database/db_create.js
    
## Running locally
    
    node app.js
 Sorghum-frontend app should now be running on  [localhost:8080](http://localhost:8080/)


## Compile client javascript
    browserify client/app.js > assets/bundle.js

## Test users
    email: admin@gmail.com
    password: pass1234

## Database seeds (test data)

To add more test data: open models/app_model.js and edit addSeeds() function


## Run tests
    mocha