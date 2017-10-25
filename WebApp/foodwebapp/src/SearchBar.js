import React from 'react';

class SearchBar extends React.Component
{
    render()
    {
        document.getElementById('description').onkeyup = function()
        {
            
        };
        
        return (
            <input type='search' name='description' />
        );
    }
}

// http://inimino.org/~inimino/blog/javascript_live_text_input