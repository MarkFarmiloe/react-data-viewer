import PropTypes from 'prop-types';
import DTHSearch from "./DTHSearch";
import DTHTitle from "./DTHTitle";

const DTHeader = ({ fieldInfos, filtersChanged, sorts, sortsChanged }) => {
    return (
        <thead>
            <tr>
                {fieldInfos && fieldInfos.map((fieldInfo) => {
                        return <DTHSearch key={fieldInfo.fldno} fieldInfo={fieldInfo} valueUpdated={filtersChanged} />
                    })}
            </tr>
            <tr>
                {fieldInfos && fieldInfos.map((fieldInfo) => {
                    const sortIdx = sorts.findIndex(([fno, ]) => fno == fieldInfo.fldno);
                    if (sortIdx === -1) {  
                        return <DTHTitle key={fieldInfo.fldno} fieldInfo={fieldInfo} changeSort={sortsChanged} />
                    } else {
                        const asc = sorts[sortIdx][1];
                        const fldInfo = {...fieldInfo}
                        fldInfo.imgsrc = "/" + (asc ? "asc" : "desc") + ".png";
                        fldInfo.sortIndex = sortIdx;
                        return <DTHTitle key={fieldInfo.fldno} fieldInfo={fldInfo} changeSort={sortsChanged} />
                    }
                })}
            </tr>
        </thead>
    )
}
DTHeader.propTypes = {
    fieldInfos: PropTypes.arrayOf(PropTypes.shape({
        fldno: PropTypes.number.isRequired,
        dataType: PropTypes.string.isRequired
    })).isRequired,
    filtersChanged: PropTypes.func.isRequired,
    sortsChanged: PropTypes.func.isRequired,
    sorts: PropTypes.array
}

export default DTHeader;