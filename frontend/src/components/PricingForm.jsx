import { useState } from "react";
import { calculatePrice } from "../api";

const PricingForm = () => {
    const [formData, setFormData] = useState({ base_price: "", tax: "", discount: "" });
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await calculatePrice(formData);
        setResult(response.final_price);
    };

    return (
        <div>
            <h2>Pricing Calculator</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="base_price" placeholder="Base Price" onChange={handleChange} required />
                <input type="number" name="tax" placeholder="Tax (%)" onChange={handleChange} required />
                <input type="number" name="discount" placeholder="Discount" onChange={handleChange} required />
                <button type="submit">Calculate</button>
            </form>
            {result && <h3>Final Price: ${result}</h3>}
        </div>
    );
};

export default PricingForm;
