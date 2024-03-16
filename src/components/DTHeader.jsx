import PropTypes from 'prop-types';
import DTHColumn from "./DTHColumn";

const DTHeader = ({ fieldInfos }) => {
    return (
        <thead>
            <tr>
                {fieldInfos && fieldInfos.map((fieldInfo) => {
                    return <DTHColumn key={fieldInfo.fldno} fieldInfo={fieldInfo} />
                })}
            </tr>
        </thead>
    )
}
DTHeader.propTypes = {
    fieldInfos: PropTypes.arrayOf(PropTypes.shape({
        fldno: PropTypes.number.isRequired,
        dataType: PropTypes.string.isRequired
    }))
}

export default DTHeader;