import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-6">
        <input
            type="text"
            placeholder="Cari barang..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
  );
};

export default SearchBar;