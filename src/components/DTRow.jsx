import PropTypes from 'prop-types';

const DTRow = ({ viewConfig, row, rowChanged }) => {
    const dateToString = v => {
        const d = new Date(v);
        return d.toLocaleDateString();
    }
    const formatValue = (v, dataType) => {
        switch (dataType) {
            case "integer":
                return [v, "n0"];
            case "number":
                return [v.toFixed(2), "n2"];
            case "date":
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
            {viewConfig.map(viewInfo => {
                const v = row[viewInfo.index];
                const [txt, cls] = formatValue(v, viewInfo.type);

                return (
                    <td key={viewInfo.index} value={v} className={cls}>
                        {viewInfo.type === "bool" ?
                        <input type="checkbox" checked={v} onChange={() => toggleIncluded(viewInfo.index)} /> :
                        txt}
                    </td>
                );
            })}
        </tr>
    )
}
DTRow.propTypes = {
    viewConfig: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    })),
    row: PropTypes.arrayOf(PropTypes.any).isRequired,
    rowChanged: PropTypes.func
}

export default DTRow;