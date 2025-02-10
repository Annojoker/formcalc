from app.models.pricing_model import PricingRequest

def calculate_final_price(data: PricingRequest) -> float:
    """
    Process the pricing calculation.
    Formula: Final Price = Base Price + (Tax%) - Discount
    """
    final_price = data.base_price + (data.base_price * data.tax / 100) - data.discount
    return round(final_price, 2)
