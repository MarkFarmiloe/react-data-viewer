import PropTypes from 'prop-types';

const DTRow = ({ fieldInfos, row, rowChanged }) => {
    const dateToString = v => {
        const d = new Date(0, 0, v - 1);
        return d.toLocaleDateString();
    }
    const formatValue = (v, dataType) => {
        switch (dataType) {
            case "Int":
                return [v, "n0"];
            case "Money":
                return [v.toFixed(2), "n2"];
            case "Date":
                return [dateToString(v), "date"];
            default:
                return [v, ""];
        }
    }
    const toggleIncluded = (fldno) => {
        // row[fldno] = !row[fldno];
        if (rowChanged) { rowChanged(fldno, !row[fldno]); }
    }
    // console.log(row);
    return (
        <tr key={row[0]}>
            {fieldInfos.map(fldInfo => {
                const v = row[fldInfo.fldno];
                const [txt, cls] = formatValue(v, fldInfo.dataType);

                return (
                    <td key={fldInfo.fldno} value={v} className={cls}>
                        {fldInfo.dataType === "bool" ?
                        <input type="checkbox" checked={v} onChange={() => toggleIncluded(fldInfo.fldno)} /> :
                        txt}
                    </td>
                );
            })}
        </tr>
    )
}
DTRow.propTypes = {
    fieldInfos: PropTypes.arrayOf(PropTypes.shape({
        fldno: PropTypes.number.isRequired,
        dataType: PropTypes.string.isRequired
    })),
    row: PropTypes.arrayOf(PropTypes.any).isRequired,
    rowChanged: PropTypes.func
}

export default DTRow;