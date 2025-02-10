from fastapi import APIRouter
from ..services.report_service import generate_report

router = APIRouter()

@router.get("/generate-csv")
async def generate_csv():
    return generate_report()
