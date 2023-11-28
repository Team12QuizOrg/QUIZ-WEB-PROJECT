import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { Text, Popover, PopoverTrigger, PopoverHeader, PopoverContent, Button } from '@chakra-ui/react'
import { useState, useContext, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { getAllQuizzes } from '../../services/quiz.services';
export default function SearchQuizzes() {
    const [searchResults, setSearchResults] = useState(null);

    const [quizzes, setQuizzes] = useState([]);
    const [openQuizzes, setOpenQuizzes] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        getAllQuizzes()
            .then(res => {
                setQuizzes(res);
                const openQ = res.filter((quiz) => quiz.selectedOption === "Open")
                setOpenQuizzes(openQ);
            })
            .catch(err => console.error('error fetching posts: ', err))
    }, [quizzes])
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