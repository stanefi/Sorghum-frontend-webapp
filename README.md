# Wiki page App

Complete instructions manual for installing and configuring Wiki page Application to run locally on your machine.
Manual also includes simple description how to utilize its user interface to create pages and edit their content and talk page, as well as details about using the code snippet widget.

## Application requirements

   * npm 2.14.0 or higher

     npm -v

   * node.js 4.0.0 or higher

     node -v

## Application install
    
    cd wiki_page
    npm install
    node database/db_create.js
    
## Running locally
    
    node app.js
 Wiki page App should now be running on  [localhost:8080](http://localhost:8080/)
 
 
## User manual
   * To show list of the posts (index page) open [localhost:8080](http://localhost:8080/) or [localhost:8080/pages](http://localhost:8080/pages)
   * To create new page click on "create page" on index page or open [localhost:8080/pages/new](http://localhost:8080/pages/new)
   * To show (show post detail), edit or delete a page click on the corresponding buttons (show, edit, destroy) next to the page's name and description on the index page
   * Page content is shown on the page detail (accessed by "show" button from index page)
   * From the content page you can also edit content with "edit content" button or switch to talk page with "switch to talk" button
   * From the talk page you can also edit talk with "edit talk" button or switch to content page with "switch to content" button
   * To being able to edit content or talk and new create pages you have to be logged in as user who is not banned 
   * To log in, press "login" button on index page or access: [localhost:8080/login](http://localhost:8080/login)
   * If you don't have a user account, create one form login page with "Sign up" link located under the login form
   * After signing up you will be automatically logged in
   * If you are signed as admin (username:admin, password:pass1234) you can access users page on [localhost:8080/users](http://localhost:8080/users) and ban other users form editing page content, page talk or creating new pages
   * You can do that by pressing "ban" button next to their username on the users page 
   * If you would like to logout from the page press "logout" button on index page (only when logged in) or access: [localhost:8080/logout](http://localhost:8080/logout)
   
      
### Code widget usage
   * To open code snippet widget, click on "toggle code snipped" button while creating or editing page content
   * To close code snipped widget, click "toggle code snipped"
   * To use code snipped widget fill the language and enter or paste the code to the form, then press "add snipped" button in the widget and the code will be automatically insert your code to the page content to the position of your courser in the page content
   * While editing a page content press "load code" button in code snipped widget and all of the code snippets from your page content will be automatically loaded to the code widget