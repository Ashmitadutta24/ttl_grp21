import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import ChartDisplay from "./ChartDisplay";
import "./Dashboard.css";
import Navbar from "./Navbar";

function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const [setDefects, setDefect] = useState("");


  useEffect(() => {
  axios.get("http://localhost:5000/api/user/defects")
    .then(res => setDefects(res.data));
}, []);


  // Fetch latest uploaded CSV data
  useEffect(() => {
    axios.get("http://localhost:5000/report/user/export/csv")
      .then((res) => {
        const latest = res.data[res.data.length - 1]?.data || [];
        setData(latest);
        setFilteredData(latest);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle CSV file upload
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/report/user/export/csv", formData);
      alert("CSV uploaded successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to upload CSV.");
    }
  };

  // Handle filtering logic
  useEffect(() => {
    if (!search.trim()) {
      setFilteredData(data);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = data.filter((row) =>
        Object.values(row).some((val) =>
          val?.toString().toLowerCase().includes(lowerSearch)
        )
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  // Calculate total & average
  const getSummary = () => {
    if (filteredData.length === 0) return { total: 0, average: 0 };

    const keys = Object.keys(filteredData[0]);
    const valueKey = keys[1];
    const values = filteredData.map((item) => parseFloat(item[valueKey])).filter(Number.isFinite);

    const total = values.reduce((acc, curr) => acc + curr, 0);
    const average = total / values.length;

    return { total: total.toFixed(2), average: average.toFixed(2), key: valueKey };
  };

  // PDF Export
  const exportPDF = async () => {
    const doc = new jsPDF("p", "pt", "a4");

    const addElementToPDF = async (selector, yOffset = 40) => {
      const element = document.querySelector(selector);
      if (!element) return yOffset;

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth() - 80;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      doc.addImage(imgData, "PNG", 40, yOffset, pdfWidth, imgHeight);
      return yOffset + imgHeight + 30;
    };

    let y = 40;
    y = await addElementToPDF(".summary-panel", y);
    y = await addElementToPDF(".data-table", y);
    y = await addElementToPDF(".chart-container", y);

    doc.save("insightboard_dashboard.pdf");
  };

  const headers = filteredData.length ? Object.keys(filteredData[0]) : [];
  const { total, average, key } = getSummary();

  return (
    <>
      <Navbar />
      <div className="dashboard-wrapper">
        <div className="csv-upload-row">
          {/* CSV Upload */}
          <div className="csv-upload-container">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={handleUpload}>Upload CSV</button>
          </div>

          {/* Summary Box */}
          <div className="summary-panel">
            <h3>Summary</h3>
            <p><strong>Total {key}:</strong> {total}</p>
            <p><strong>Average {key}:</strong> {average}</p>
          </div>
        </div>

        {/* Filter Input */}
        {filteredData.length > 0 && (
          <div className="filter-bar">
            <input
              type="text"
              className="filter-input"
              placeholder="Search in data..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Data Table */}
        <h2>Data Table</h2>
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx}>
                {headers.map((h) => (
                  <td key={h}>{row[h]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Chart */}
        <h2>Chart</h2>
        <div className="chart-container">
          <ChartDisplay />
        </div>

        {/* Export Button */}
        <div className="export-buttons">
          <button onClick={exportPDF}>Export as PDF</button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;




// import axios from "axios";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { useEffect, useState } from "react";

// function Dashboard() {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [file, setFile] = useState(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/csv")
//       .then((res) => {
//         const latest = res.data[res.data.length - 1]?.data || [];
//         setData(latest);
//         setFilteredData(latest);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleUpload = async () => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post("http://localhost:5000/api/csv/upload", formData);
//       alert("CSV uploaded successfully!");
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to upload CSV.");
//     }
//   };

//   useEffect(() => {
//     if (!search.trim()) {
//       setFilteredData(data);
//     } else {
//       const lowerSearch = search.toLowerCase();
//       const filtered = data.filter((row) =>
//         Object.values(row).some((val) =>
//           val?.toString().toLowerCase().includes(lowerSearch)
//         )
//       );
//       setFilteredData(filtered);
//     }
//   }, [search, data]);

//   const getSummary = () => {
//     if (filteredData.length === 0) return { total: 0, average: 0, key: "-" };
//     const keys = Object.keys(filteredData[0]);
//     const valueKey = keys[1];
//     const values = filteredData.map((item) => parseFloat(item[valueKey])).filter(Number.isFinite);

//     const total = values.reduce((acc, curr) => acc + curr, 0);
//     const average = total / values.length;

//     return { total: total.toFixed(2), average: average.toFixed(2), key: valueKey };
//   };

//   const exportPDF = async () => {
//     const doc = new jsPDF("p", "pt", "a4");

//     const addElementToPDF = async (selector, yOffset = 40) => {
//       const element = document.querySelector(selector);
//       if (!element) return yOffset;

//       const canvas = await html2canvas(element, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");
//       const pdfWidth = doc.internal.pageSize.getWidth() - 80;
//       const imgHeight = (canvas.height * pdfWidth) / canvas.width;

//       doc.addImage(imgData, "PNG", 40, yOffset, pdfWidth, imgHeight);
//       return yOffset + imgHeight + 30;
//     };

//     let y = 40;
//     y = await addElementToPDF(".summary-panel", y);
//     y = await addElementToPDF(".data-table", y);

//     doc.save("insightboard_dashboard.pdf");
//   };

//   const headers = filteredData.length ? Object.keys(filteredData[0]) : [];
//   const { total, average, key } = getSummary();

//   return (
//     <div className="p-6 max-w-screen-xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

//       <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
//         <input
//           type="file"
//           accept=".csv"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="border px-4 py-2 rounded w-full md:w-auto"
//         />
//         <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
//           Upload CSV
//         </button>
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border px-4 py-2 rounded w-full md:w-64"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="summary-panel border rounded p-4 mb-6 bg-gray-50">
//         <h2 className="text-xl font-semibold mb-2">Summary</h2>
//         <p><strong>Total {key}:</strong> {total}</p>
//         <p><strong>Average {key}:</strong> {average}</p>
//       </div>

//       <div className="overflow-auto mb-6">
//         <h2 className="text-xl font-semibold mb-2">Data Table</h2>
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr>
//               {headers.map((h) => (
//                 <th key={h} className="border px-4 py-2 bg-gray-200">{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row, idx) => (
//               <tr key={idx}>
//                 {headers.map((h) => (
//                   <td key={h} className="border px-4 py-2">{row[h]}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button
//         onClick={exportPDF}
//         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 float-right"
//       >
//         Export as PDF
//       </button>
//     </div>
//   );
// }

// export default Dashboard;
