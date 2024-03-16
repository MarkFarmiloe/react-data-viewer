import PropTypes from 'prop-types';
import DTHeader from "./DTHeader";
import DTRow from "./DTRow";

const DataTable = ({ fieldInfos, rows }) => {
    // console.log(fieldInfos, rows);
    return (
        <table>
            <DTHeader fieldInfos={fieldInfos} />
            <tbody>
                {rows && rows.map((rowData, i) => { 
                    return <DTRow key={i} fieldInfos={fieldInfos} row={rowData} />
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