import PropTypes from 'prop-types';
import DTHeader from "./DTHeader";
import DTRow from "./DTRow";
import { useRef, useState } from 'react';

const DataTable = ({ fieldInfos, rows, calcFields }) => {
    const [filters, setFilters] = useState({}); // the set of filters on the data
    const [currentSort, setCurrentSort] = useState(""); // the current sort of the data
    const [refresh, setRefresh] = useState(true);
    const config = useRef({
        sorts: [],
        indexes: {},
        pageNo: 0,
        pageSize: 25,
        filteredRowIndexes: Array.from({ length: rows.length }, (_, i) => i)
    }); // breakdown of sorts by field

    const handleFiltersChange = (fldno, value) => {
        setFilters(filters => {
            const newFilters = {...filters};
            newFilters[fldno] = value;
            config.current.filteredRowIndexes = null;
            return newFilters;
        });
    }

    const handleSortsChange = (append, fldno, asc) => {
        if (append) {
            const newSorts = config.current.sorts.filter(([fno, ]) => fno != fldno);
            newSorts.push([fldno, asc]);
            config.current.sorts = newSorts;
        } else {
            config.current.sorts = [[fldno, asc]];
        }
        const sortKey = buildSortKey();
        if (currentSort !== sortKey) {
            if (!config.current.indexes[sortKey]) {
                config.current.indexes[sortKey] = buildIndex();
            }
            config.current.filteredRowIndexes = null;
            config.current.pageNo = 0;
            setCurrentSort(sortKey); // trigger a re-render.
        }
    }
    const buildSortKey = () => { // build a sortKey from the sorting on columns
        let sortKey = "s";
        config.current.sorts.forEach(([fldno, asc]) => { sortKey += (asc ? "+" : "-") + fldno; });
        return sortKey; // used to set current sort and to store the index
    }
    const buildIndex = () => {
        const sortfn = sorts => {
            const cmpFn = (a, b) => {
                for (let i = 0; i < sorts.length; i++) {
                    const [fldno, asc] = sorts[i];
                    if (a[fldno] < b[fldno]) {
                        return asc ? -1 : 1;
                    }
                    if (a[fldno] > b[fldno]) {
                        return asc ? 1 : -1;
                    }
                }
                return 0;
            };
            return cmpFn;
        }
        const quickIndex = (array, cmpfn = (a, b) => a < b ? -1 : 1) => {
            const qsi = index => {
                if (index.length <= 1) { return index; }
                const pivot = array[index[Math.floor(index.length / 2)]];
                const left = [], same = [], right = [];
                for (let i = 0; i < index.length; i++) {
                    const j = index[i];
                    const testResult = cmpfn(array[j], pivot);
                    if (testResult < 0) { left.push(j) }
                    else if (testResult > 0) { right.push(j) }
                    else { same.push(j); }
                }
                // if (same.length === 1) {
                return qsi(left).concat(same).concat(qsi(right));
                // }
                // return qsi(left).concat([same]).concat(qsi(right));
            }
            const index = Array.from({ length: array.length }, (_, i) => i);
            return qsi(index);
        }
        return quickIndex(rows, sortfn(config.current.sorts));
    };
    const rowChanged = (rowIndex, fldno, newValue) => {
        console.log(rowIndex, fldno, newValue);
        rows[rowIndex][fldno] = newValue;
        calcFields(rows);
        if (refresh) { setRefresh(false); } else { setRefresh(true); }
    }
    if (!config.current.filteredRowIndexes) {
        let fri = config.current.indexes[currentSort] ?? Array.from({ length: rows.length }, (_, i) => i);
        Object.keys(filters).forEach(fldno => {
            const filterValue = filters[fldno].toLowerCase();
            fri = fri.filter(rowIndex => rows[rowIndex][fldno].toLowerCase().includes(filterValue));    
        });
        config.current.filteredRowIndexes = fri;
        if (calcFields) { calcFields(rows) }
    }
    return (
        <table>
            <DTHeader fieldInfos={fieldInfos} filtersChanged={handleFiltersChange} sorts={config.current.sorts} sortsChanged={handleSortsChange} />
            <tbody>
                {config.current.filteredRowIndexes.map(rowIndex => { 
                    return <DTRow key={rows[rowIndex][0]} 
                        fieldInfos={fieldInfos} row={rows[rowIndex]} 
                        rowChanged={(fldno, newValue) => rowChanged(rowIndex, fldno, newValue)} />
                })
                }
            </tbody>
        </table>
    )
}
DataTable.propTypes = {
    fieldInfos: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    calcFields: PropTypes.func
}

export default DataTable;