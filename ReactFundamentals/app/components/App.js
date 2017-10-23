var React = require('react');
var ReactRouter = require('react-router-dom');
var Nav = require('./Nav');
var Home = require('./Home');
var PageOne = require('./PageOne');
var PageTwo = require('./PageTwo');
var Switch = ReactRouter.Switch;
var Route = ReactRouter.Route;
var Router = ReactRouter.BrowserRouter;

class App extends React.Component
{
    render()
    {
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route path = '/' component = {Home} />
                        <Route exact path = './PageOne' component = {PageOne} />
                        <Route exact path = './PageTwo' component = {PageTwo} />
                        <Route render = {function() 
                        {
                            return <p>Not Found</p>;
                        }} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

module.exports = App;

// https://github.com/tylermcginnis/react-fundamentals/blob/children/app/components/App.js