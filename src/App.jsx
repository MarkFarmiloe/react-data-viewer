import { useEffect, useState } from 'react'
import './App.css'
import CountButton from './components/CountButton'
// import DTHeader from './components/DTHeader'
import DataTable from './components/DataTable';
// import PageHeader from './components/PageHeader'

function App() {
  const [fieldInfos, setFieldInfos] = useState();
  const [rows, setRows] = useState();
  useEffect(() => {
    setFieldInfos([
      { fldno: 1, dataType: "", text: "Surname", sortIndex: 0 },
      { fldno: 0, dataType: "", text: "Forename", sortIndex: 0 },
      { fldno: 2, dataType: "", text: "Age", sortIndex: 1, imgsrc: "./asc.png" },
    ]);
  }, []);
  useEffect(() => {
      setRows([
      ["John", "Smith", 42, "extra"],
      ["Mark", "Farmiloe", 65, "unused"],
      ["Hilary", "Farmiloe", 60, "data"]
    ]);
  }, []);

  return (
    <>
      {/* <PageHeader /> */}
      <div className="card">
        <CountButton />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      { fieldInfos && <DataTable fieldInfos={fieldInfos} rows={rows} /> }
      {/* <table>
        <DTHeader fieldInfos={fieldInfos} />
      </table> */}
    </>
  )
}

export default App
