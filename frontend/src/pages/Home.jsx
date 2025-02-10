// src/pages/Home.jsx

import React, { useState } from "react";

const Home = () => {
    const [file, setFile] = useState(null);
    const [uploadedData, setUploadedData] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        validateAndSetFile(selectedFile);
    };

    // Handle drag-over effect
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    // Handle drag-leave effect
    const handleDragLeave = () => {
        setIsDragging(false);
    };

    // Handle drop file event
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFile = event.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    // Validate file format (CSV, XLS, XLSX)
    const validateAndSetFile = (selectedFile) => {
        if (!selectedFile) return;
        const allowedTypes = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        
        if (!allowedTypes.includes(selectedFile.type)) {
            setErrorMessage("Only CSV and Excel files are allowed!");
            return;
        }

        setFile(selectedFile);
        setErrorMessage("");
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            setErrorMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8000/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.error) {
                setErrorMessage(result.error);
            } else {
                setUploadedData(result.data);
                setErrorMessage("");
            }
        } catch (error) {
            setErrorMessage("Error uploading file. Please try again.");
            console.error("Upload error:", error);
        }
    };

    // Get table headers from the first data item
    const tableHeaders = uploadedData.length > 0 
        ? Object.keys(uploadedData[0]) 
        : [];

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Navigation Panel */}
            <nav className="w-1/4 bg-gray-200 p-4">
                <h2 className="text-lg font-bold">Navigation</h2>
                <ul>
                    <li className="mt-2"><a href="/">Home</a></li>
                    <li className="mt-2"><a href="/pricing">Pricing</a></li>
                    <li className="mt-2"><a href="/reports">Reports</a></li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Formula Builder Tool</h1>
                <p className="mb-4">This application helps you manage and calculate pharmaceutical pricing.</p>

                {/* File Upload Section */}
                <div 
                    className={`border-2 border-dashed p-6 mb-4 rounded-lg ${isDragging ? "border-dark-green bg-light-green" : "border-gray-400 bg-white"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer block text-center text-gray-700">
                        {file ? `Selected File: ${file.name}` : "Drag & Drop a file here or Click to Select"}
                    </label>
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-dark-green transition"
                >
                    Upload File
                </button>

                {/* Error Message */}
                {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}

                {/* Scrollable Table Section */}
                <div className="bg-light-green p-4 mt-6 h-96 overflow-y-auto border border-dark-green rounded-lg">
                    <h2 className="text-lg font-bold text-black mb-4">Uploaded Data</h2>
                    
                    {uploadedData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-dark-green">
                                        {tableHeaders.map((header) => (
                                            <th 
                                                key={header}
                                                className="px-4 py-2 text-left text-dark-green font-semibold"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploadedData.map((row, index) => (
                                        <tr 
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-gray-50"
                                        >
                                            {tableHeaders.map((header) => (
                                                <td 
                                                    key={`${index}-${header}`}
                                                    className="px-4 py-2 text-gray-700"
                                                >
                                                    {row[header] || '-'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600">No data uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;