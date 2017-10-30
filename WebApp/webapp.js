const express = require('express');
const app = express();
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var config =
{
    host: 'localhost',
    user: 'webapp',
    password: 'Vinson1!Marines0)',
    database: 'food_nutrition'
};
var pool = new Pool(config);

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/nutrition', async(req, res) =>
{
    var name = '%'+req.query.name+'%';
    console.log(name);
    
    try
    {
        var result = await pool.query('SELECT description, kcal, protein_g, lipid_total_g, cholestrl_mg, carbohydrate_g, fiber_td_g, sugar_g FROM entries WHERE description LIKE $1 LIMIT 25', [name]);
        
        res.setHeader('Access-Control-Allow-Origin', 'http://postgresql-hydron.c9users.io:8081');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
        res.setHeader('Access-Control-Allow-Credentials', true); 
        
        res.json(result.rows);
    } catch(e)
    {
        console.log('Error running request', e);
    }
});

app.listen(app.get('port'), () => 
{
	console.log('Running');
});