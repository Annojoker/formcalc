// src/components/Header.jsx

import React from "react";

const Header = () => {
    return (
        <header className="bg-dark-green text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Formula Builder Tool</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/pricing" className="hover:underline">Pricing</a></li>
                    <li><a href="/reports" className="hover:underline">Reports</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
