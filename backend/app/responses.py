# responses.py

from fastapi.responses import JSONResponse
import numpy as np
import json

class CustomJSONResponse(JSONResponse):
    def render(self, content: dict) -> bytes:
        # Convert NaN and Inf to None
        def convert_nan_inf(obj):
            if isinstance(obj, float):
                if np.isnan(obj) or np.isinf(obj):
                    return None
            return obj

        # Use json.dumps with a custom default function
        return super().render(json.loads(json.dumps(content, default=convert_nan_inf)))