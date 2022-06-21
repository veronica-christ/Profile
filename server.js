const express = require("express"); // import express library
const cors = require("cors"); //import cors module
const app = express(); //Initialize express

require("./configs/dotenv"); //Import your environmental configs
const client = require("./configs/database");
const user = require("./routes/users");

app.use(express.json());
   
app.use(cors());

const port = process.env.PORT || 5050;

const hostURL = '0.0.0.0'; //Fault-Tolerant listening port for Backend. Picks available dynamic IPv4 and IPv6 addresses of the local host

client.connect((err) =>{ // Connect to the Database
   if (err) {
     }
  else {
    console.log("Data logging initialised");
   }

});



app.get("/", (req, res) =>{
    res.status(200).send("Sever Initialized and Online. Ready to take OFF!");
});

app.use("/user", user) // User endpoint API



app.listen(port, process.env.baseURL , () =>{  
   console.log(`Here we go, All Engines started at ${port}.`) 
})
