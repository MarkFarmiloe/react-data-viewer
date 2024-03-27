import { useEffect, useState } from "react";
import "./App.css";
// import CountButton from './components/CountButton'
import DataTable from "./components/DataTable";
// import PageHeader from './components/PageHeader'

function App() {
  const [fieldInfos, setFieldInfos] = useState();
  const [rows, setRows] = useState();
  const [viewConfig, setViewConfig] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/api/stockReqd")
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      const fi = data[1];
      const vc = data[2];
      vc.forEach(vi => {
        vi.type = fi.find(f => f.index === vi.index).type;
      });
      setRows(data[0]);
      setFieldInfos(fi);
      setViewConfig(vc);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  const calcFields = (rows) => {
    console.log("A", rows);
    rows.forEach((row, idx) => {
      if (typeof row[5] === "undefined") {
        row[5] = true;
      }
      if (row[5]) {
        row[6] =
          row[3] +
          (idx > 0 && rows[idx - 1][2] === row[2] ? rows[idx - 1][6] : 0);
      } else {
        row[6] = ""
      }
    });
    console.log("B", rows);
    return rows;
  };
  return (
    <>
      {/* <PageHeader /> */}
      {/* <div className="card">
        <CountButton />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {viewConfig && (
        <DataTable
          viewConfig={viewConfig}
          fieldInfos={fieldInfos}
          rows={rows}
          calcFields={calcFields}
        />
      )}
    </>
  );
}

export default App;
