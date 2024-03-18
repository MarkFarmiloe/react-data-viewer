import PropTypes from 'prop-types';
import DTHSearch from "./DTHSearch";
import DTHTitle from "./DTHTitle";
import { useState } from 'react';

const DTHeader = ({ fieldInfos, filtersChanged }) => {
    // eslint-disable-next-line no-unused-vars
    const [searchValues, setSearchValues] = useState({});
    const valueUpdated = (fldno, value) => {
        setSearchValues(current => {
            current[fldno] = value;
            filtersChanged(current);
            return current;
        })
    };
    return (
        <thead>
            <tr>
                {fieldInfos && fieldInfos.map((fieldInfo) => {
                    return <DTHSearch key={fieldInfo.fldno} fieldInfo={fieldInfo} valueUpdated={valueUpdated} />
                })}
            </tr>
            <tr>
                {fieldInfos && fieldInfos.map((fieldInfo) => {
                    return <DTHTitle key={fieldInfo.fldno} fieldInfo={fieldInfo} />
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
    filtersChanged: PropTypes.func.isRequired
}

export default DTHeader;