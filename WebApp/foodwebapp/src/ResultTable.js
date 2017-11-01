import React from 'react';

export class ResultTable extends React.Component
{
    render() 
    {
        var rowData=this.props.results.map((object, key) =>
        {
            return (
                <tr key={key}>
                    <td>{object.description}</td>
                    <td>{(object.kcal === null) ? 'N/A' : object.kcal}</td>
                    <td>{(object.protein_g === null) ? 'N/A' : object.protein_g}</td>
                    <td>{(object.lipid_total_g === null) ? 'N/A' : object.lipid_total_g}</td>
                    <td>{(object.cholestrl_mg === null) ? 'N/A' : object.cholestrl_mg}</td>
                    <td>{(object.carbohydrate_g === null) ? 'N/A' : object.carbohydrate_g}</td>
                    <td>{(object.fiber_td_g === null) ? 'N/A' : object.fiber_td_g}</td>
                    <td>{(object.sugar_g === null) ? 'N/A' : object.sugar_g}</td>
                </tr>);
        });
        
        return (
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Calories (kcal)</th>
                        <th>Protein (g)</th>
                        <th>Total fat (g)</th>
                        <th>Cholesterol (mg)</th>
                        <th>Carbohydrate (g)</th>
                        <th>Fiber (g)</th>
                        <th>Sugar (g)</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData}
                </tbody>
            </table>
        );
    }
}

/*
<PersonRow data = {rowData} />

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
*/

export default ResultTable;

// https://codepen.io/brianmd/pen/gaVPaw