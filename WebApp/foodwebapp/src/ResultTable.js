import React from 'react';

export class ResultTable extends React.Component
{
    render() 
    {
        var rowData=this.props.results;
        
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Description</td>
                        <td>Calories (kcal)</td>
                        <td>Protein (g)</td>
                        <td>Total fat (g)</td>
                        <td>Cholesterol (mg)</td>
                        <td>Carbohydrate (g)</td>
                        <td>Fiber (g)</td>
                        <td>Sugar (g)</td>
                    </tr>
                    <PersonRow data = {rowData} />
                </tbody>
            </table>
        );
    }
}

const PersonRow = (props) => 
{
    return (
        <tr>
            <td>{props.description}</td>
            <td>{props.kcal}</td>
            <td>{props.protein_g}</td>
            <td>{props.lipid_total_g}</td>
            <td>{props.cholestrl_mg}</td>
            <td>{props.carbohydrate_g}</td>
            <td>{props.fiber_td_g}</td>
            <td>{props.sugar_g}</td>
        </tr>
    );
};

export default ResultTable;

// https://codepen.io/brianmd/pen/gaVPaw