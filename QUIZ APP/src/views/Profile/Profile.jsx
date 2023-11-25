import UploadPhoto from "../../components/Uploadphoto/UploadPhoto";
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { blockUser, getUserByHandle } from '../../services/users.services';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { makeAdmin } from '../../services/users.services';
import { unBlockUser } from '../../services/users.services';
import EditProfile from '../../components/EditProfile/EditProfile';
import { formatDate } from "../../services/users.services";
import { PhoneIcon, SettingsIcon, WarningIcon, StarIcon } from '@chakra-ui/icons'



import { Center, Menu, MenuItem, MenuButton, MenuList, Grid, GridItem, IconButton, Avatar, Flex, Heading, Divider, Box, Text, Image, Button, ButtonGroup, Spacer, Stack, HStack, StackDivider, Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react"

const Profile = () => {
    const { user, userData } = useContext(AppContext)
    const [currentUser, setCurrentUser] = useState("")
    const { profile } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (profile === null) return;

        getUserByHandle(profile)
            .then(snapshot => {
                if (!snapshot.exists()) {
                    throw new Error('Something went wrong!');
                }
                setCurrentUser(snapshot.val())
            })
            .catch(e => console.log(e.message));
    }, []);

    const handleBlock = (handle) => {
        blockUser(handle)
    }
    const handleAdmin = (handle) => {
        makeAdmin(handle);
    }
    const handleUnblock = (handle) => {
        unBlockUser(handle)
    }
    const handleEditProfile = (updatedValues) => {
        setCurrentUser((prevUser) => ({
            ...prevUser,
            ...updatedValues,
        }));
    };

    return (
        <><Grid
            minHeight={'100vh'}
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(6, 1fr)'
            gap={4}
        > <GridItem as="main"
            colSpan={{ base: 6, lg: 4, xl: 4 }}
            bg="brand.100"
            p="40px"
        >
                <Center>
                    <Card maxW='2xl' >
                        <CardHeader>
                            <Heading size='md'>{currentUser.handle}</Heading>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar src={currentUser.photoURL} width={70} height={70} />

                                    <Box justify='space-between'
                                        flexWrap='wrap'
                                        sx={{
                                            '& > button': {
                                                minW: '136px',
                                            },
                                        }}>
                                        <Button flex='1' variant='ghost' leftIcon={<PhoneIcon />}>
                                            Like
                                        </Button>
                                        <Button flex='1' variant='ghost' leftIcon={<PhoneIcon />}>
                                            Comment
                                        </Button>
                                        <Button flex='1' variant='ghost' leftIcon={<PhoneIcon />}>
                                            Share
                                        </Button>
                                    </Box>
                                </Flex>
                                {currentUser.handle === userData.handle &&
                                    <EditProfile user={currentUser.handle} originalFirstName={currentUser.firstName} originalLastName={currentUser.lastName} onEditProfile={handleEditProfile} />
                                }
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <HStack>
                                <Heading textAlign={"start"} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}> {currentUser.firstName}{' '}{currentUser.lastName}</Heading>
                                <Spacer></Spacer>
                                <Heading textAlign={"start"} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}> {currentUser.email}</Heading>
                            </HStack>
                            {currentUser.caption && <Text textAlign={"start"} >
                                {currentUser.caption}
                            </Text>
                            }
                        </CardBody>
                        <Image
                            objectFit='cover'
                            src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            alt='Chakra UI'
                        />
                        {userData.isAdmin && !currentUser.isAdmin && (
                            <CardFooter
                                justify='space-between'
                                flexWrap='wrap'
                                sx={{
                                    '& > button': {
                                        minW: '136px',
                                    },
                                }}
                            >
                                <Button onClick={() => handleAdmin(currentUser.handle)} flex='1' variant='ghost' leftIcon={<StarIcon />}>
                                    Make Admin
                                </Button>
                                <Button onClick={() => currentUser.isBlocked
                                    ? handleUnblock(currentUser.handle)
                                    : handleBlock(currentUser.handle)} flex='1' variant='ghost' leftIcon={<WarningIcon />}>
                                    {currentUser.isBlocked ? 'Unblock user' : 'Block user'}
                                </Button>

                            </CardFooter>
                        )}
                    </Card>
                </Center>
            </GridItem>

            <GridItem as="aside"
                colSpan={{ base: 6, lg: 2, xl: 2 }}
                bg="brand.100"
                minHeight={{ lg: '100%' }}
                p={{ base: '20px', lg: '30px' }}
                mt={2}>
                {currentUser.userType === "student" && (
                    <Card>
                        <CardHeader>
                            <Heading size='md'>SCORE BOARD</Heading>
                        </CardHeader>
                        {/* тук ще му мапваме ентитито с резултатите  */}
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Summary
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        View a summary of all your clients over the last month.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Overview
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Check out the overview of your clients.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Analysis
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        See a detailed analysis of all your business clients.
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                )}
                {currentUser.userType === "teacher" && (
                    <Card>
                        <CardHeader>
                            <Heading size='md'>GROUPS</Heading>
                        </CardHeader>
                        {/* тук ще му мапваме ентитито с резултатите  */}
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Summary
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        View a summary of all your clients over the last month.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Overview
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Check out the overview of your clients.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Analysis
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        See a detailed analysis of all your business clients.
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                )}
            </GridItem>
        </Grid></>
        // <div>
        //     <>
        //         <Flex as="nav" p="10px" mb="60px" alignItems="center" justifyContent={'center'} border="1px solid gray.50" borderRadius="10px"
        //             boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
        //             <HStack spacing="10px" >
        //                 <NavLink style={{ color: 'green', fontSize: "1.2em" }} to={`/${(currentUser.handle)}/usersposts`} >Posts</NavLink>
        //                 <NavLink style={{ color: 'green', fontSize: "1.2em" }} to={`/${(currentUser.handle)}/userscomments`} >Comments</NavLink>
        //                 {userData.isAdmin && (currentUser.handle === userData.handle) && <NavLink style={{ color: 'green', fontSize: "1.2em" }} to="/adminPanel" >Admin panel</NavLink>}
        //             </HStack>
        //         </Flex>

        //         <Card>
        //             <CardHeader>
        //                 <Heading size='md'>Username: {currentUser.handle}</Heading>
        //             </CardHeader>
        //             <Image src={currentUser.photoURL} alt="Avatar" className="avatar" width={70} height={70} />
        //             <CardBody >
        //                 <Stack divider={<StackDivider />} spacing='4' alignItems="center" justifyContent={'center'}>
        //                     <Box>
        //                         <Text pt='2' fontSize='sm'>
        //                             Email:
        //                         </Text>
        //                         <Heading size='xs' textTransform='uppercase'>
        //                             {currentUser.email}
        //                         </Heading>
        //                     </Box>
        //                     <Box>
        //                         <Text pt='2' fontSize='sm'>
        //                             Created on:
        //                         </Text>
        //                         <Heading size='xs' textTransform='uppercase'>
        //                             {formatDate(currentUser.createdOn)}
        //                         </Heading>
        //                     </Box>
        //                     <Box>
        //                         <Text pt='2' fontSize='sm'>
        //                             First name:
        //                         </Text>
        //                         <Heading size='xs' textTransform='uppercase'>
        //                             {currentUser.firstName}
        //                         </Heading>
        //                     </Box>
        //                     <Box>
        //                         <Text pt='2' fontSize='sm'>
        //                             Last name:
        //                         </Text>
        //                         <Heading size='xs' textTransform='uppercase'>
        //                             {currentUser.lastName}
        //                         </Heading>
        //                     </Box>
        //                     {userData.isAdmin && <Box>
        //                         <Text pt='2' fontSize='sm'>
        //                             Phone number:  {userData.phoneNumber}
        //                         </Text>

        //                     </Box>}
        //                 </Stack>
        //             </CardBody>
        //             <Divider />

        //             <CardFooter>
        //                 <ButtonGroup spacing='2'>
        //                     {currentUser.handle === userData.handle && <EditProfile user={currentUser.handle} originalFirstName={currentUser.firstName} originalLastName={currentUser.lastName} onEditProfile={handleEditProfile} />}
        //                     {userData.isAdmin && !currentUser.isAdmin && (
        //                         <><Button variant='solid' colorScheme='blue'
        //                             onClick={() => handleAdmin(currentUser.handle)}
        //                         >
        //                             Make Admin
        //                         </Button><Button variant='solid' colorScheme='blue'
        //                             onClick={() => currentUser.isBlocked
        //                                 ? handleUnblock(currentUser.handle)
        //                                 : handleBlock(currentUser.handle)}
        //                         >
        //                                 {currentUser.isBlocked ? 'Unblock user' : 'Block user'}
        //                             </Button>
        //                             <Spacer></Spacer>
        //                         </>
        //                     )}
        //                 </ButtonGroup>

        //             </CardFooter>
        //         </Card>
        //     </>
        //     <div className="uploadPhoto">
        //         <UploadPhoto />
        //     </div>

        // </div>
    )
}
export default Profile;