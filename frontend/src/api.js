import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Function to upload a file and receive extracted data
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data; // Assuming API returns the extracted data in a structured format
};

// Function to calculate pharmaceutical pricing
export const calculatePrice = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/pricing/calculate`, data);
    return response.data;
};

// Function to generate a CSV report
export const generateReport = async () => {
    const response = await axios.get(`${API_BASE_URL}/reports/generate-csv`, {
        responseType: "blob",
    });
    return response;
};
