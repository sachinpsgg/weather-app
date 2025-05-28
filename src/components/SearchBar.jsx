import React, { useState } from 'react';
import {Button} from "./ui/Button.jsx";
import {Input} from "./ui/Input.jsx";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                id="password"
                name="password"
                type="text"
                placeholder="Enter City"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-blue-400/20"
                required
            />
            <Button
                variant="outline-primary"
                className="text-white/80 hover:text-white hover:bg-white/10 p-1 h-auto gap-1"
            >Search
            </Button>
        </form>
    );
};

export default SearchBar;
