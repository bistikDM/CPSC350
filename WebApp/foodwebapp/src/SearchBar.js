import React from 'react';

export class SearchBar extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.handleChange=this.handleChange.bind(this);
    }
    
    handleChange(query) 
    {
        const name = query.target.value;
        this.props.axiosGet(name);
    }
    
    render()
    {
        return (
            <input type='search' name='description' onChange={this.handleChange} />
        );
    }
}

export default SearchBar;