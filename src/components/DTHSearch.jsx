import PropTypes from 'prop-types';
import { useState } from 'react';

const DTHSearch = ({fieldInfo, valueUpdated}) => {
    const [value, setValue] = useState("")
    const changeHandler = (e, fldno) => {
        setValue(e.target.value);
        valueUpdated(fldno, e.target.value);
    }
    // const {fldno, text, imgsrc, sortIndex} = fieldInfo;
    const {fldno} = fieldInfo;
    return (
        <th scope="col" value={fldno}>
            <input type='text' value={value} onChange={(e) => changeHandler(e, fldno)} />
        </th>
    )
}
DTHSearch.propTypes = {
    fieldInfo: PropTypes.shape({
        fldno: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        imgsrc: PropTypes.string,
        sortIndex: PropTypes.number
    }).isRequired,
    valueUpdated: PropTypes.func.isRequired
}

export default DTHSearch;