import React from 'react';
import Axios from 'axios';
import SearchBar from './SearchBar.js';
import ResultTable from './ResultTable.js';

class Nutrition extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={results: []};
        
        this.getRequest=this.getRequest.bind(this);
    }
    
    getRequest(query)
    {
        Axios.get('https://postgresql-hydron.c9users.io/api/nutrition?name=' + query).then(function(response)
        {
            this.setState({results: response.data});
        }.bind(this));  
    }
    
    render()
    {
        return (
            <div>
                <SearchBar axiosGet={this.getRequest} />
                <ResultTable results={this.state.results} />
            </div>
        );
    }
}

export default Nutrition;