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
			var attendeeList = response.rows.map(function(x)
			{
				return x.attendees;
			});
			var responseObject =
			{
				'attendees' : attendeeList
			};
//			res.json(responseObject);
		} catch(e)
		{
			res.json({error: 'Workshop not found'});
		}
		if(response.rows.length == 0)
		{
			res.json({error: 'Workshop not found'});
		}
		else
		{
			res.json(responseObject);
		}
	}
	else
	{
		try
		{
			var response = await pool.query('SELECT workshops FROM workshop');
			console.log(JSON.stringify(response.rows));
			var workshopList = response.rows.map(function(x)
			{
				return x.workshops;
			});
			var responseObject =
			{
				'workshops' : workshopList
			};
			res.json(responseObject);
		} catch(e)
		{
			console.log('Error running get', e);
		}
	}
});

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
			var checkAttendee = await pool.query('SELECT attendees FROM workshop WHERE attendees = $1 and workshops = $2', [attendee, workshopClass]);
			if (checkAttendee.rows.length == 0)
			{
				try
				{
					var input = await pool.query('INSERT INTO workshop VALUES ($1, $2)', [attendee, workshopClass]);
					res.json(
						{
							'attendee' : attendee,
							'workshop' : workshopClass
						});
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
