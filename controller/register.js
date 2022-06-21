const bcrypt = require("bcrypt");

const client = require("../configs/database");

const jwt = require("jsonwebtoken");
//Register Function

exports.register = async (req, res) => {
     const { name, email, phonenumber, password } = req.body;
     try { 
       const data = await client.query(`SELECT * FROM users WHERE email= $1;` , [email]); //Check if user exist
       const arr = data.rows;
       if(arr.length != 0){
          return res.status(400).json({
                 error: "Email already there, No need to register again.",
      });

  }
  else {
      bcrypt.hash(password, 10, (err, hash) => {
        if(err) 
       res.status(err).json({
         error: "Sever Error",
        });
    const user = {
      name, 
      email,
      phonenumber,
      password: hash,
    };
var flag = 1;
//Inserting data into the database

client
.query(`INSERT INTO users (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`, [user.name, user.email, user.phonenumber, user.password], (err) => {

if (err) {
flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
console.error(err);
return  res.status(500).json({
error: "Database error"
})
}
else {
flag  =  1;
res.status(200).send({ message: 'User added to database, not verified' });
}
})
if (flag) {
const  token  = jwt.sign( //Signing a jwt token
{
email: user.email
},
process.env.SECRET_KEY
);
};
});
}
}
catch (err) {
console.log(err);
res.status(500).json({
error: "Database error while registring user!", //Database connection error
});
};
}
/* //Insertiing data into the database
client.query(`INSERT INTO users (name, email, phonenumber, password), VALUES ($1, $2, $3, $4)`, [user.name, user.email, user.phonenumber, user.password], (err)=>{
  if (error) {
    flag = 0;
    console.error
    return res.status(200).json({
      error: "Database Error"
    })
  }

  else {
    flag = 1
    res.status(200).send(message: "User added to the database, not yet verified")};
    if (flag){
      const token = jwt.sign( // Sign in with your Token
        {email: user.email},
        process.env.SECRET_KEY
           );
    };
  

});
  
}    
  }
}
  catch (err){
    console.error(err);
    res.status(500).json({
      error: "Database Error while registering user"
    })

  }
 
 */