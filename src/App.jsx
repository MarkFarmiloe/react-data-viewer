import { useEffect, useState } from "react";
import "./App.css";
// import CountButton from './components/CountButton'
import DataTable from "./components/DataTable";
// import PageHeader from './components/PageHeader'

function App() {
  const [fieldInfos, setFieldInfos] = useState();
  const [rows, setRows] = useState();
  useEffect(() => {
    setFieldInfos([
      { fldno: 5, dataType: "bool", text: "" },
      { fldno: 2, dataType: "", text: "Surname" },
      { fldno: 1, dataType: "", text: "Forename" },
      { fldno: 3, dataType: "", text: "Age" },
      { fldno: 6, dataType: "int", text: "FamilyAge" },
    ]);
  }, []);
  useEffect(() => {
    const rows = [
      [1, "John", "Smith", 8, "extra"],
      [2, "Mark", "Farmiloe", 65, "unused"],
      [3, "Hilary", "Farmiloe", 60, "data"],
    ];
    calcFields(rows);
    setRows(rows);
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
      {fieldInfos && (
        <DataTable
          fieldInfos={fieldInfos}
          rows={rows}
          calcFields={calcFields}
        />
      )}
    </>
  );
}

export default App;
