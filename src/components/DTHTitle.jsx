import PropTypes from 'prop-types';

const DTHTitle = ({viewInfo, changeSort}) => {
    const {index, title, imgsrc, sortIndex} = viewInfo;
    const handleClick = (e) => {
        const asc = !e.shiftKey;
        const append = e.ctrlKey;
        changeSort(append, index, asc);
    }
    return (
        <th scope="col" value={index} onClick={handleClick}>            
            {title}
            { sortIndex >= 0 && 
                <> <img  src={imgsrc} /><span>{1 + sortIndex}</span></>
            }
        </th>
    )
}
DTHTitle.propTypes = {
    viewInfo: PropTypes.shape({
        index: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        imgsrc: PropTypes.string,
        sortIndex: PropTypes.number
    }).isRequired,
    changeSort: PropTypes.func.isRequired
}

export default DTHTitle;