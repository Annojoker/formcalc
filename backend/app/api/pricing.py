from fastapi import APIRouter
from app.models.pricing_model import PricingRequest
from app.services.pricing_service import calculate_final_price

router = APIRouter()

@router.post("/calculate")
async def calculate_price(data: PricingRequest):
    final_price = calculate_final_price(data)
    return {"final_price": final_price}
