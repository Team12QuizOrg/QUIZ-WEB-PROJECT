
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { getUserByHandle, makeEducator } from '../../services/users.services';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

import EditProfile from '../../components/EditProfile/EditProfile';

import { PlusSquareIcon, } from '@chakra-ui/icons'
import CreateGroup from "../../components/CreateGroup/CreateGroup";

import { Center, Grid, GridItem, Avatar, Flex, Heading, Text, Image, Button, Spacer, HStack, Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react"
import ListGroup from "../../components/ListGroups/ListGroups";
import UserScoreBoard from "../../components/UserScoreBoard/UserScoreBoard";
import UsersQuizzes from "../../components/UsersQuizzes/UsersQuizzes";
import UserInfo from '../../components/UserInfo/UserInfo';
import AdminButtons from './AdminButtons/AdminButtons';


const Profile = () => {
    const { user, userData } = useContext(AppContext)
    const [currentUser, setCurrentUser] = useState("")
    // const [groups, setGroups] = useState()
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


    const handleEditProfile = (updatedValues) => {
        setCurrentUser((prevUser) => ({
            ...prevUser,
            ...updatedValues,
        }));
    };
    const handleEducator = (handle) => {
        makeEducator(handle);
    }

    return (
        <Grid
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


                                    <UsersQuizzes user={currentUser} />
                                </Flex>
                                {currentUser.handle === userData.handle &&
                                    <EditProfile user={currentUser.handle} originalFirstName={currentUser.firstName} originalLastName={currentUser.lastName} onEditProfile={handleEditProfile} />
                                }
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <UserInfo currentUser={currentUser} />
                        </CardBody>
                        <Image
                            objectFit='cover'
                            src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            alt='Chakra UI'
                        />

                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '136px',
                                },
                            }}
                        >
                            {userData.isAdmin && !currentUser.isAdmin && (
                                <AdminButtons currentUser={currentUser} />
                            )}

                            {userData.userType === 'teacher' && currentUser.userType === "student" && (
                                <Button onClick={() => handleEducator(currentUser.handle)} flex='1' variant='ghost' leftIcon={<PlusSquareIcon />}>
                                    Make Educator
                                </Button>
                            )}
                        </CardFooter>
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

                        <CardBody>
                            <UserScoreBoard user={currentUser}></UserScoreBoard>
                        </CardBody>
                    </Card>
                )}
                {currentUser.userType === "teacher" && (
                    <Card>
                        {currentUser.handle === userData.handle &&
                            <CreateGroup></CreateGroup>
                        }
                        {/* {currentUser.handle !== userData.handle &&
                            <Button onClick={() => handleAddToGroup(currentUser.handle)} bg={'brand.200'} > Add to Group</Button>
                        } */}

                        <CardHeader>
                            <Heading size='md'>GROUPS</Heading>
                        </CardHeader>
                        <CardBody>
                            <ListGroup user={currentUser} ></ListGroup>
                        </CardBody>
                    </Card>
                )}
            </GridItem>
        </Grid>
    )
}
export default Profile;