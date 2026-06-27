import React from 'react';

// 🔴 MAKE SURE THE CURLY BRACES ARE HERE AROUND THE PROPS
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm} // This is line 9 causing the crash!
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;