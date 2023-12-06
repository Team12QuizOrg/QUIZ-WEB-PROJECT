import { useState } from "react";
import { Input } from '@chakra-ui/react'


const SearchBar = ({ searchingFor, onSearchResults, selectedOption }) => {
    const [search, setSearch] = useState('');

    const handleInputChange = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);
        let searchResults = '';
        if (selectedOption === "username") {
            searchResults = searchByUsername(searchText);
        } else if (selectedOption === "email") {
            searchResults = searchByEmail(searchText);
        } else if (selectedOption === "first-name") {
            searchResults = searchByName(searchText);
        } else if (selectedOption === "quizzes") {
            searchResults = searchByQuizzes(searchText);
        }

        onSearchResults(searchResults);
    }

    const searchByUsername = (searchText) => {
        return searchingFor.filter(user => user.handle.includes(searchText));
    }
    const searchByEmail = (searchText) => {
        return searchingFor.filter(user => user.email.includes(searchText));
    }
    const searchByName = (searchText) => {
        return searchingFor.filter(user => user.firstName.includes(searchText));
    }

    const searchByQuizzes = (searchText) => {
        return searchingFor.filter(quiz => quiz.title.includes(searchText));
    }

    return (
        <Input
            type="text"
            placeholder={`Search for ${selectedOption} here...`}
            _placeholder={{ color: 'inherit' }}
            value={search}
            onChange={handleInputChange}


        />

    );
}


export default SearchBar;