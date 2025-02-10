
import { generateReport } from "../api";

const ReportView = () => {
    const handleDownload = async () => {
        const response = await generateReport();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <h2>Download Report</h2>
            <button onClick={handleDownload}>Generate CSV Report</button>
        </div>
    );
};

export default ReportView;
