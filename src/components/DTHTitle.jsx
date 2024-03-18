import PropTypes from 'prop-types';

const DTHTitle = ({fieldInfo, changeSort}) => {
    const {fldno, text, imgsrc, sortIndex} = fieldInfo;
    const handleClick = (e) => {
        const asc = !e.shiftKey;
        const append = e.ctrlKey;
        changeSort(append, fldno, asc);
    }
    return (
        <th scope="col" value={fldno} onClick={handleClick}>            
            {text}
            { sortIndex >= 0 && 
                <> <img  src={imgsrc} /><span>{1 + sortIndex}</span></>
            }
        </th>
    )
}
DTHTitle.propTypes = {
    fieldInfo: PropTypes.shape({
        fldno: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        imgsrc: PropTypes.string,
        sortIndex: PropTypes.number
    }).isRequired,
    changeSort: PropTypes.func.isRequired
}

export default DTHTitle;