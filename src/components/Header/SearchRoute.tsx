import React, { useState } from 'react';

const routes = [
    "Route 1", "Route 2", "Route 3", "Route 4", "Route 5", "Route 6", "Route 7", "Route 8", "Route 9", "Route 10",
    "Route 11", "Route 12", "Route 13", "Route 14", "Route 15", "Route 16", "Route 17", "Route 18", "Route 19", "Route 20",
    "Route 21", "Route 22", "Route 23", "Route 24", "Route 25", "Route 26", "Route 27", "Route 28", "Route 29", "Route 30"
];

export default function SearchRoute() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredRoutes = routes.filter(route =>
        route.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <input
                type="text"
                placeholder="Search routes"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul>
                {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route, index) => <li key={index}>{route}</li>)
                ) : (
                    <li>No routes found</li>
                )}
            </ul>
        </>
    );
}
