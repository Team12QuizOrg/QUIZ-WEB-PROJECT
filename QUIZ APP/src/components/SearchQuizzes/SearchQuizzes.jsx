import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { Text, Popover, PopoverTrigger, PopoverHeader, PopoverContent, Button } from '@chakra-ui/react'
import { useState, useContext } from 'react';
import AppContext from '../../context/AuthContext';
export default function SearchQuizzes() {
    const [searchResults, setSearchResults] = useState(null);
    const { openQuizzes } = useContext(AppContext);

    const navigate = useNavigate();
    const handleSearchResults = (results) => {
        setSearchResults(results);
    }
    return (
        <>
            <SearchBar searchingFor={openQuizzes}
                onSearchResults={handleSearchResults}
                selectedOption='quizzes' />
            <Popover>
                <PopoverTrigger>
                    <Button>Search</Button>
                </PopoverTrigger>
                <PopoverContent>
                    {searchResults && searchResults.length > 0 ? (searchResults.map((quiz) => (
                        <PopoverHeader key={quiz.id} onClick={() => navigate(`/quizzes/AllQuizzes/${quiz.id}"`)} color={'brand.400'} fontWeight={'bold'}> {quiz.title}</PopoverHeader>
                    ))) : (<Text color={'brand.400'}>No results found</Text>)}
                </PopoverContent>
            </Popover></>




    )
}