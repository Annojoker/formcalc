from pydantic import BaseModel

class PricingRequest(BaseModel):
    base_price: float
    tax: float
    discount: float
