import './NavBar.css';
// import { Form, NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/auth.services';
import { useState, useContext, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import {
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
    Popover,
    PopoverTrigger,
    PopoverContent,
    useBreakpointValue,

} from '@chakra-ui/react'
import {
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'

export default function NavBar() {
    const { user, userData, setContext } = useContext(AppContext);
    // const [photo, setPhoto] = useState()

    const navigate = useNavigate();

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
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>
                    <Box>Logo</Box>

                    <Menu>
                        <MenuButton
                            onClick={() => navigate(`/home`)}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                        >
                            Home
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton
                            onClick={() => navigate(`/quizzes`)}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                        >
                            Quizzes
                        </MenuButton>
                        <MenuList>
                            {NAV_ITEMS.map((navItem) => (
                                <MenuItem onClick={() => navigate(`/quizzes/${navItem.label}`)} key={navItem.label} >{navItem.label}      <Spacer />     <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
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
                        >
                            About
                        </MenuButton>

                    </Menu>
                </HStack>
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
                                    <MenuItem onClick={() => navigate(`/${(userData.handle)}`)}>My Profile</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={onLogout}>Log Out</MenuItem>
                                </MenuList>
                            </Menu>

                        </>
                    )}
                </HStack>
            </Flex>

        </Box >

    );
}


const NAV_ITEMS = [
    {
        label: 'Mathematics',
        to: '/quizzes/mathematics',
    },
    {
        label: 'History',
        to: '/quizzes/mathematics',
    },
    {
        label: 'Biology',
        to: '/quizzes/mathematics',
    },
]