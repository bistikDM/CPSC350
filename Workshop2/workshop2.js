const express = require('express');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');

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

//Create user request.
app.post('/create-user', async (req, res) =>
{
   var firstname = req.body.firstname;
   var lastname = req.body.lastname;
   var username = req.body.username;
   var email = req.body.email;
   
   if(!firstname || !lastname || !username || !email)
   {
       res.json({error : 'Parameters not given'});
   }
   else
   {
       try
       {
           var checkUsername = await pool.query('SELECT user_name FROM user_database WHERE user_name = $1', [username]);
           if(checkUsername.rows.length == 0)
           {
               await pool.query('INSERT INTO user_database VALUES ($1, $2, $3, $4)', [username, firstname, lastname, email]);
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

//Delete user request.
app.delete('/delete-user', async (req, res) =>
{
    var username = req.body.username;
    
    if(!username)
    {
        res.json({error : 'Parameters not given'});
    }
    else
    {
        try
        {
            await pool.query('DELETE FROM user_database WHERE user_name = $1', [username]);
            res.json({status : 'deleted'});
        } catch(e)
        {
            console.log('Error running request');
        }
    }
});

//List user request.
app.get('/list-users', async (req, res) =>
{
    var type = req.query.type;
    var userList;
    
    if(type == 'summary')
    {
        try
        {
            userList = await pool.query('SELECT first_name, last_name FROM user_database');
            var users = {users : []};
            for(var x = 0; x < userList.rows.length; x++) 
            {
               users.users.push({firstname : userList.rows[x].first_name, lastname : userList.rows[x].last_name});
            }
            res.json(users);
        } catch(e)
        {
            console.log('Error running summary request', e);
        }
    }
    else if(type == 'full')
    {
        try
        {
            userList = await pool.query('SELECT first_name, last_name, user_name, email FROM user_database');
            var users = {users : []};
            for(var x = 0; x < userList.rows.length; x++)
            {
                users.users.push({firstname : userList.rows[x].first_name, lastname : userList.rows[x].last_name, username : userList.rows[x].user_name, email : userList.rows[x].email});
            }
            res.json(users);
        } catch(e)
        {
            console.log('Error running full request', e);
        }
    }
    else
    {
        res.json({error : 'Invalid parameter'});
    }
});

//Add workshop request.
app.post('/add-workshop', async (req, res) =>
{
   var title = req.body.title;
   var date = dateFormat(req.body.date, 'yyyy-mm-dd');
   var location = req.body.location;
   var maxSeats = req.body.maxseats;
   var instructor = req.body.instructor;
   
   if(!title || !date || !location || !maxSeats || !instructor)
   {
       res.json({error : 'Parameters not given'});
   }
   else
   {
       try
       {
            var checkWorkshop = await pool.query('SELECT title FROM workshop_database WHERE title = $1 AND start_date = $2', [title, date]);
            if(checkWorkshop.rows.length == 0)
            {
                var checkInstructor = await pool.query('SELECT instructor FROM instructor_database WHERE instructor = $1', [instructor]);
                if(checkInstructor.rows.length == 0)
                {
                    await pool.query('INSERT INTO instructor_database (instructor) VALUES ($1)', [instructor]);
                }
                await pool.query('INSERT INTO workshop_database (title, start_date, location, max_seats, instructor_id) VALUES ($1, $2, $3, $4, (SELECT instructor_id FROM instructor_database WHERE instructor = $5))', [title, date, location, maxSeats, instructor]);
                res.json({status : 'workshop added'});
            }
            else
            {
                res.json({status : 'workshop already in database'});
            }
       } catch(e)
       {
           console.log('Error running workshop post request', e);
       }
   }
});

//User enroll request.
app.post('/enroll', async (req, res) =>
{
    var username = req.body.username;
    var title = req.body.title;
    var date = dateFormat(req.body.date, 'yyyy-mm-dd');
    var location = req.body.location;
    
    if(!username || !title || !date || !location)
    {
        res.json({error : 'Parameters not given'});
    }
    else
    {
        try
        {
            var checkWorkshop = await pool.query('SELECT title FROM workshop_database WHERE title = $1 AND start_date = $2 AND location = $3', [title, date, location]);
            var checkUsername = await pool.query('SELECT user_name FROM user_database WHERE user_name = $1', [username]);
            var maxSeats = await pool.query('SELECT max_seats FROM workshop_database WHERE title = $1 AND start_date = $2', [title, date]);
            var checkSeats = await pool.query('SELECT COUNT(ed.user_name) FROM enrollment_database AS ed INNER JOIN workshop_database AS wd ON ed.workshop_id = wd.workshop_id');
            if(checkWorkshop.rows.length == 0)
            {
                res.json({status : 'workshop does not exist'});
            }
            else if(checkUsername.rows.length == 0)
            {
                res.json({status : 'user does not exist'});
            }
            else if(checkSeats.rows[0].count < maxSeats.rows[0].max_seats) //Check to see if the calls on both sides are valid.
            {
                await pool.query('INSERT INTO enrollment_database (workshop_id, user_name) VALUES ((SELECT workshop_id FROM workshop_database WHERE title = $1 AND start_date = $2 AND location = $3), $4)', [title, date, location, username]);
                res.json({status : 'user added'});
            }
            else
            {
                res.json({status : 'no seats available'});
            }
        } catch(e)
        {
           console.log('Error running enroll post request', e);
        }
    }
});

//List workshop request.
app.get('/list-workshops', async (req, res) =>
{
    try
    {
        var workshopList = await pool.query('SELECT title, start_date, location FROM workshop_database');
        var workshops = {workshops : []};
        for(var x = 0; x < workshopList.rows.length; x++)
        {
            workshops.workshops.push({title : workshopList.rows[x].title, date : dateFormat(workshopList.rows[x].start_date, 'yyyy-mm-dd'), location : workshopList.rows[x].location});
        }
        res.json(workshops);
    } catch(e)
    {
        console.log('Error running list workshop request');
    }
});

//Attendees request.
app.get('/attendees', async (req, res) =>
{
   var title = req.query.title;
   var date = req.query.date;
   var location = req.query.location;
   
   if(!title || !date || !location)
   {
       res.json({error : 'Parameters not given'});
   }
   else
   {
       try
       {
            var attendeeList = await pool.query(
               'SELECT ud.first_name, ud.last_name FROM user_database AS ud INNER JOIN enrollment_database AS ed ON ed.user_name = ud.user_name INNER JOIN ' + 
               'workshop_database AS wd ON ed.workshop_id = (SELECT workshop_id FROM workshop_database WHERE title = $1 AND start_date = $2 AND location = $3)', [title, date, location]);
            var attendees = {attendees : []};
            for(var x = 0; x < attendeeList.rows.length; x++)
            {
                attendees.attendees.push({firstname : attendeeList.rows[x].first_name, lastname: attendeeList.rows[x].last_name});
            }
            res.json(attendees);
       } catch(e)
       {
           console.log('Error running list attendees request', e);
       }
   }
});

app.listen(app.get('port'), () => 
{
	console.log('Running');
});