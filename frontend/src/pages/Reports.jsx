// src/pages/Reports.jsx
import React, { useEffect, useState } from "react";

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const response = await fetch("http://localhost:8000/api/reports");
            const data = await response.json();
            setReports(data);
        };

        fetchReports();
    }, []);

    return (
        <div>
            <h1>Reports</h1>
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>{report.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;