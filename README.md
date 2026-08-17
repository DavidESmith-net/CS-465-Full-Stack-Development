# CS-465-Full-Stack-Development
Architecture

Frontend Development Comparison

There are two frontends for this application. The customers' website is powered by Express, Handlebars (HBS), and vanilla JavaScript. Express and HBS render pages of HTML on the server before they are served to the client. Each time a user clicks to navigate to a new place in the website, their entire page is reloaded. This is ideal for ensuring quick initial page loads and SEO. The admin portal is a Single Page Application (SPA) written in Angular. Instead of the server rendering full HTML pages, everything is done on the client side in the browser. JavaScript then fetches necessary data from the web server and programmatically rewrites parts of the current page with new data. This prevents full page reloads and allows for admins to experience the product more like a desktop application when managing the store's inventory.

MongoDB NoSQL Database 

We use MongoDB because it's a NoSQL database, making it easy to use with the rest of the MEAN stack. Instead of tables with rigid relationships, MongoDB stores data as flexible BSON documents that look a lot like JSON. Data stored in MongoDB maps cleanly to JavaScript objects. This means our app can pass that data straight from our database to our Express server to our Angular frontend with zero translation.

Functionality

JSON vs. JavaScript

JavaScript is an object oriented dynamic programming language. JavaScript has logic, functions, and lines of code that can be executed. JSON on the other hand is purely a data format. It’s a lightweight text-based language used to store and transport data. JSON is language independent, however its syntax is based on JavaScript Object notation. For this application JSON is used as a medium of communication between client and server. When the frontend requests information to display, the backend performs the query in MongoDB, converts that data into JSON, and sends that data through the network as JSON. Then the frontend receives that JSON and converts it back into JavaScript objects to display on the UI.

Refactoring and Reusable UI Components 

There was lots of refactoring between converting static HTML mock ups into dynamic templates that pull data from the database. A good example of this is the Trip listings on all pages. They were broken out into their own Angular components (i.e. trip- card component). Building reusable UI components has tremendous advantages. You write less code, your application has consistent styling, and it makes maintenance much easier. If you want to make a change to the look of your trip cards you only need to make that change once in the components file and every trip card on your application is changed.

Testing

Methods, Endpoints, and Security

Unit testing the application would also require testing that the workflow works through all layers. To test the API, you would make requests with the appropriate HTTP verbs (GET, POST, PUT, DELETE) to the URL endpoint (i.e. /api/ trips) to ensure the backend talks to the database as intended. Much of the endpoint testing was done with Postman before hooking them up to Angular front end. After adding security, there was another layer needed to test. The endpoints that alter the database were secured. In order to test them, you must authenticate a user to receive a JSON Web Token and then pass that token in the request's HTTP Authorization headers to demonstrate that you have permission to perform the task.

Reflection

Coming from a long career in manual labor and retail management, I need something to show employers that I can actually write code. This full-stack MEAN application will do that for my professional GitHub ePortfolio. Creating the Travlr Getaways application allowed me to learn how to utilize MongoDB, Express, Angular, and Node. js together. From creating a functional client-side application to developing a secure server-side structure. By the time I graduate the Computer Science program in Sept. 20 26, I will have learned the discipline to create a scalable, secure website while working night shift and getting my life together. That will surely teach me how to be a competitive and marketable software engineer.
