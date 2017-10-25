var React = require('react');
var NavLink = require('react-router-dom').NavLink;

class Nav extends React.Component
{
    render()
    {
        return (
            <ul className = 'nav'>
                <li>
                    <NavLink exact activeClassName = 'active' to = '/'>Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName = 'active' to = '/PageOne'>Page One</NavLink>
                </li>
                <li>
                    <NavLink activeClassName = 'active' to = '/PageTwo'>Page Two</NavLink>
                </li>
            </ul>);
    }
}

module.exports = Nav;