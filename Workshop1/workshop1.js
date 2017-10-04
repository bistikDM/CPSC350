const express = require('express');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');

const app = express();
var config = 
{
	host: 'localhost',
	user: 'workshop',
	password: 'Vinson1!Marines0)',
	database: 'workshop1'
};

var pool = new Pool(config);

app.set('port', (8080));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', async (req, res) => 
{
	var workshopClass = req.query.workshops;
	if (workshopClass)
	{
		try 
		{
			var response = await pool.query('SELECT attendees FROM workshop WHERE workshops = $1', [workshopClass]);
			console.log(JSON.stringify(response.rows));
			res.json(response.rows);
		} catch(e)
		{
			res.json({error: 'Workshop not found'});
		}
	}
	else
	{
		try
		{
			var response = await pool.query('SELECT workshops FROM workshop');
			console.log(JSON.stringify(response.rows));
			res.json(response.rows);
		} catch(e)
		{
			console.log('Error running get', e);
		}
	}
	
});

//Works on nodejs but errors on node at line 20 => app.get('/api', async (req, res)

app.post('/api', async (req, res) =>
{
	var attendee = req.body.attendees;
	var workshopClass = req.body.workshops;
	if (!attendee || !workshopClass)
	{
		res.json({error: 'Parameters not given'});

	}
	else
	{
		try
		{
			var checkAttendee = await pool.query('SELECT attendees FROM workshop WHERE workshops = $1', [workshopClass]);
			if (!checkAttendee)
			{
				try
				{
					var input = await pool.query('INSERT INTO workshop VALUES ($1, $2)', [attendee, workshopClass]);
					res.json({status: 'inserted'});
				} catch(e)
				{
					console.log('Error running insert', e);
				}
			}
			else
			{
				res.json({error: 'attendee already enrolled'});
			}
		} catch(e)
		{
			console.log('Error doing initial check');
		}
	}
});

app.listen(app.get('port'), () => 
{
	console.log('Running');
});
