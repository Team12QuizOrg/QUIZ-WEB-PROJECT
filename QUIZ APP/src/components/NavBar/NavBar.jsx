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
    Image,
    Heading

} from '@chakra-ui/react'
import {
    ChevronDownIcon,
    ChevronRightIcon,
    AddIcon,
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
                {/* тук ще бъде сърч бара */}
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
        to: '/quizzes/quizzes',
    },
]