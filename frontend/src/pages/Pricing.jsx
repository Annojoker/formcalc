// src/pages/Pricing.jsx

import React, { useState } from 'react';

const Pricing = () => {
    const [baseCost, setBaseCost] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [discounts, setDiscounts] = useState(0);
    const [finalPrice, setFinalPrice] = useState(null);

    const calculateFinalPrice = () => {
        const totalPrice = (baseCost + taxes) - discounts;
        setFinalPrice(totalPrice);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pricing Calculator</h1>
            <div className="mb-4">
                <label className="block mb-1">Base Cost:</label>
                <input
                    type="number"
                    value={baseCost}
                    onChange={(e) => setBaseCost(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Taxes:</label>
                <input
                    type="number"
                    value={taxes}
                    onChange={(e) => setTaxes(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Discounts:</label>
                <input
                    type="number"
                    value={discounts}
                    onChange={(e) => setDiscounts(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
            </div>
            <button
                onClick={calculateFinalPrice}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
                Calculate Final Price
            </button>
            {finalPrice !== null && (
                <h2 className="mt-4 text-xl font-bold">Final Price: ${finalPrice.toFixed(2)}</h2>
            )}
        </div>
    );
};

export default Pricing;