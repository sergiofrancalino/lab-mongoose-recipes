//1. - Import EXPRESS - framework for Node.js that provides minimal resources for building web servers.
import express from "express"; 

//1.1 - ES6 use modules -> package name that automatically loads environment variables from an .env file
import * as dotenv from "dotenv"; 

//1.2 - Import the connect and The routes
import connect from "./config/db.config.js";
import recipeRoute from './routes/recipe.routes.js';

//2.Enable the server to have environment variables
dotenv.config();

//3. - Instantiate (invoke, make the express() function at least once) 
//3.1 - The variable that will be responsible for our server - by default it is app
const app = express();

//4. Configures the server to accept sending and receiving files in JSON, otherwise the server don't understand JSON. 
//4.1 - .use() is a middleware (A bridge between OS or database and a app)
app.use(express.json());

//1.3 - Invoke connect function -> To connect to database on port and URI specified in .env file
connect()

//5. Create routes in the routes folder and import them with the middleware ".use()" again.
app.use("/recipe", recipeRoute);

// DO IT ALWAYS AT THE END OF THE "index.js" FILE

//6. Server going up: .listen() - is also a middleware too - takes two parameters: 
//a) Port (defined in .env file: "process.env." in .env file and "PORT" is the file key)
//b) Callback console.log with the below massage sayng the IP, http port and database connected's name
app.listen(process.env.PORT, () => {
  console.log(
    `App server up and running on url and port → http://localhost:${process.env.PORT}`
  );
});
