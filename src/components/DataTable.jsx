import PropTypes from 'prop-types';
import DTHeader from "./DTHeader";
import DTRow from "./DTRow";
import { useState } from 'react';

const DataTable = ({ fieldInfos, rows }) => {
    // console.log(fieldInfos, rows);
    const [filters, setFilters] = useState({});
    let filteredRows = [...rows];
    Object.keys(filters).forEach(fldno => {
        const filterValue = filters[fldno].toLowerCase();
        filteredRows = filteredRows.filter(row => row[fldno].toLowerCase().includes(filterValue));    
    });
    console.log(filters, filteredRows);
    return (
        <table>
            <DTHeader fieldInfos={fieldInfos} filtersChanged={setFilters} />
            <tbody>
                {filteredRows.map(rowData => { 
                    return <DTRow key={rowData[0]} fieldInfos={fieldInfos} row={rowData} />
                })
                }
            </tbody>
        </table>
    )
}
DataTable.propTypes = {
    fieldInfos: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
}

export default DataTable;