const express = require('express');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');

const app = express();
const config =
{
    host: 'localhost',
    user: 'workshop2',
    password: 'Vinson1!Marines0)',
    database: 'workshop2'
};

var pool = new Pool(config);

app.set('port', (8080));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/create-user', async (req, res) =>
{
   var firstName = req.body.firstname;
   var lastName = req.body.lastname;
   var userName = req.body.username;
   var email = req.body.email;
   
   if(!firstName || !lastName || !userName || !email)
   {
       res.json({error : 'Parameters not given'});
   }
   else
   {
       try
       {
           var checkUserName = await pool.query('SELECT user_name FROM user_database WHERE user_name = $1', [userName]);
           if(checkUserName.rows.length == 0)
           {
               await pool.query('INSERT INTO user_database VALUES ($1, $2, $3, $4)', [userName, firstName, lastName, email]);
               res.json({status : 'user added'});
           }
           else
           {
               res.json({status : 'username taken'});
           }
       } catch(e) {
           console.log('Error running request');
       }
   }
});