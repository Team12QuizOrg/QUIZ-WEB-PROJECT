import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { Text, Popover, PopoverTrigger, PopoverHeader, PopoverContent, Button } from '@chakra-ui/react'
import { useState, useContext, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";
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
        setSearchResults(results)


    }
    return (
        <>
            <SearchBar searchingFor={openQuizzes} onSearchResults={handleSearchResults} selectedOption='quizzes' width={['100', '200', '350']} />
            <Popover onClose={() => setSearchResults(null)}>
                <PopoverTrigger>
                    <IconButton size={["md", 'md', 'md']} variant='outline' icon={<SearchIcon />} />
                </PopoverTrigger>
                {searchResults && searchResults.length > 0 && (
                    <PopoverContent>
                        {searchResults.map((quiz) => (
                            <PopoverHeader
                                key={quiz.id}
                                onClick={() => {
                                    navigate(`/quizzes/AllQuizzes/${quiz.id}`);
                                    setSearchResults(null);
                                }}
                                color={'brand.400'}
                                fontWeight={'bold'}
                                cursor="pointer"
                            >
                                {quiz.title}
                            </PopoverHeader>
                        ))}
                    </PopoverContent>
                )}
            </Popover>
        </>




    )
}