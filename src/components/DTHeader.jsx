import PropTypes from 'prop-types';
import DTHSearch from "./DTHSearch";
import DTHTitle from "./DTHTitle";

const DTHeader = ({ viewConfig, filtersChanged, sorts, sortsChanged }) => {
    return (
        <thead>
            <tr>
                {viewConfig && viewConfig.map((viewInfo) => {
                        return <DTHSearch key={viewInfo.index} viewInfo={viewInfo} valueUpdated={filtersChanged} />
                    })}
            </tr>
            <tr>
                {viewConfig && viewConfig.map((viewInfo) => {
                    const sortIdx = sorts.findIndex(([fno, ]) => fno == viewInfo.index);
                    if (sortIdx === -1) {  
                        return <DTHTitle key={viewInfo.index} viewInfo={viewInfo} changeSort={sortsChanged} />
                    } else {
                        const asc = sorts[sortIdx][1];
                        const viewInfo = {...viewInfo}
                        viewInfo.imgsrc = "/" + (asc ? "asc" : "desc") + ".png";
                        viewInfo.sortIndex = sortIdx;
                        return <DTHTitle key={viewInfo.index} viewInfo={viewInfo} changeSort={sortsChanged} />
                    }
                })}
            </tr>
        </thead>
    )
}
DTHeader.propTypes = {
    viewConfig: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    })).isRequired,
    filtersChanged: PropTypes.func.isRequired,
    sortsChanged: PropTypes.func.isRequired,
    sorts: PropTypes.array
}

export default DTHeader;