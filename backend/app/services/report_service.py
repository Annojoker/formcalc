import csv
from fastapi.responses import FileResponse

def generate_report():
    """
    Generates a CSV report and returns the file path.
    """
    file_path = "reports/output.csv"
    with open(file_path, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Item", "Price"])
        writer.writerow(["Product A", "100"])
        writer.writerow(["Product B", "150"])

    return FileResponse(file_path, media_type='text/csv', filename="report.csv")
