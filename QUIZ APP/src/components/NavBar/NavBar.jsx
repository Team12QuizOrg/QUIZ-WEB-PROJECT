import './NavBar.css';
// import { Form, NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/auth.services';
import SearchBar from '../SearchBar/SearchBar';
import { useState, useContext, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Box,
    Flex,
    Avatar,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Spacer,
    Collapse,
    Icon,

    useBreakpointValue,
    Image,
    Heading

} from '@chakra-ui/react'
import {
    ChevronDownIcon,
    ChevronRightIcon,
    AddIcon,
} from '@chakra-ui/icons'

export default function NavBar() {
    const { user, userData, setContext, openQuizzes } = useContext(AppContext);
    const [searchResults, setSearchResults] = useState(null);
    // const [photo, setPhoto] = useState()

    const navigate = useNavigate();
    const handleSearchResults = (results) => {
        setSearchResults(results);
    }
    // useEffect(() => {
    //     setPhoto(userData.photoURL)
    // }, [])
    const onLogout = () => {
        logoutUser()
            .then(() => {
                setContext({
                    user: null,
                    userData: null,
                });
            });
    };


    return (
        <Box>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} bg='brand.100'>
                <HStack spacing={8} alignItems={'bottom'} color="black" fontSize={['0.8em', '1em', '1.2em']} >
                    <HStack spacing={0} alignItems={'bottom'} >
                        <Image className="logo-image" src="assets\logo2.png" alt="logo" w={10} h={10} maxW={40} maxH={40} onClick={() => navigate(`/home`)}
                            rounded={'full'} />
                        <Heading fontSize={'4xl'} color={'brand.400'}>Solvr</Heading>
                    </HStack>

                    <Menu>
                        <MenuButton
                            onClick={() => navigate(`/home`)}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            fontWeight={'bold'}
                            _hover={{
                                textDecoration: 'none',
                                bg: 'brand.200',
                            }}
                            _active={{
                                bg: "brand.300",
                                transform: "scale(0.98)",
                            }}


                        >
                            Home
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton
                            // onClick={() => navigate(`/quizzes`)}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            fontWeight={'bold'}
                            _hover={{
                                textDecoration: 'none',
                                bg: 'brand.200',
                            }}
                            _active={{
                                bg: "brand.300",
                                transform: "scale(0.98)",
                            }}
                        >
                            Quizzes
                        </MenuButton>
                        <MenuList>
                            {NAV_ITEMS.map((navItem) => (
                                <MenuItem onClick={() => navigate(`${navItem.to}`)} key={navItem.to} >{navItem.label}      <Spacer />     <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                                </MenuItem>

                            ))}
                        </MenuList>

                    </Menu>
                    <Menu>
                        <MenuButton
                            onClick={() => navigate(`/about`)}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            fontWeight={'bold'}
                            _hover={{
                                textDecoration: 'none',
                                bg: 'brand.200',
                            }}
                            _active={{
                                bg: "brand.300",
                                transform: "scale(0.98)",
                            }}
                        >
                            About
                        </MenuButton>

                    </Menu>
                </HStack>
                <Spacer />
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
                        ))) : "No results found"}
                    </PopoverContent>
                </Popover>

                <Spacer />

                <HStack spacing="10px">
                    {user === null && (
                        <>
                            <Button variant='solid' color='green' fontSize="1.5em" onClick={() => navigate('/signin')}>
                                Sign In
                            </Button>
                            <Button variant='solid' color='yellow.500' fontSize="1.5em" onClick={() => navigate('/signup')}>
                                Sign Up
                            </Button>
                        </>
                    )}
                    {user !== null && (
                        <>

                            <>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>


                                        {userData ? (<Avatar size={'sm'} src={userData.photoURL} />) : 'My profile'}
                                    </MenuButton>


                                    <MenuList>

                                        <MenuItem onClick={() => navigate(`/${(userData.handle)}`)} color={'brand.200'} fontWeight={'bold'}
                                            _hover={{
                                                textDecoration: 'none',
                                                color: 'brand.100',
                                                bg: 'brand.200',
                                            }}>My Profile</MenuItem>

                                        <MenuDivider />
                                        {userData && userData.isAdmin && <><MenuItem onClick={() => navigate(`/adminPanel`)} color={'brand.200'} fontWeight={'bold'}
                                            _hover={{
                                                textDecoration: 'none',
                                                color: 'brand.100',
                                                bg: 'brand.200',
                                            }}>Admin panel</MenuItem><MenuDivider /></>}
                                        <MenuItem onClick={onLogout} color={'brand.200'} fontWeight={'bold'}
                                            _hover={{
                                                textDecoration: 'none',
                                                color: 'brand.100',
                                                bg: 'brand.200',
                                            }}>Log Out</MenuItem>
                                    </MenuList>
                                </Menu>

                            </>
                        </>
                    )}
                </HStack>
            </Flex>

        </Box >

    );
}


const NAV_ITEMS = [
    {
        label: 'All Categories',
        to: '/quizzes/categories',
    },
    {
        label: 'All Quizzes',
        to: '/quizzes/AllQuizzes',
    },
]