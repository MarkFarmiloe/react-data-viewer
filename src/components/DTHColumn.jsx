import PropTypes from 'prop-types';

const DTHColumn = ({fieldInfo}) => {
    const {fldno, text, imgsrc, sortIndex} = fieldInfo;
    // console.log(fldno, text, imgsrc, sortIndex);
    return (
        <th scope="col" value={fldno}>
            {text}
            { sortIndex > 0 && 
                <> <img src={imgsrc}/><span>{1 + sortIndex}</span></>
            }
        </th>
    )
}
DTHColumn.propTypes = {
    fieldInfo: PropTypes.shape({
        fldno: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        imgsrc: PropTypes.string,
        sortIndex: PropTypes.number
    })
}

export default DTHColumn;