import PropTypes from 'prop-types';
import { useState } from 'react';

const DTHSearch = ({viewInfo, valueUpdated}) => {
    const [value, setValue] = useState("")
    const changeHandler = (e, index) => {
        setValue(e.target.value);
        valueUpdated(index, e.target.value);
    }
    // eslint-disable-next-line no-unused-vars
    const {index, type} = viewInfo;
    return (
        <th scope="col" value={index}>
            <input type='text' value={value} onChange={(e) => changeHandler(e, index)} />
        </th>
    )
}
DTHSearch.propTypes = {
    viewInfo: PropTypes.shape({
        index: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    valueUpdated: PropTypes.func.isRequired
}

export default DTHSearch;