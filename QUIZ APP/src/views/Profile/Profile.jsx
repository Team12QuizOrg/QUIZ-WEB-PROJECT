import { useContext, useState, useEffect } from 'react'
import AppContext from '../../context/AuthContext'
import { getUserByHandle, makeEducator } from '../../services/users.services'
import { useParams } from 'react-router-dom'
import EditProfile from '../../components/EditProfile/EditProfile'
import { PlusSquareIcon } from '@chakra-ui/icons'
import CreateGroup from '../../components/CreateGroup/CreateGroup'
import { Center, Grid, Box, GridItem, Spinner, Flex, Heading, Text, Button, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import ListGroup from '../../components/ListGroups/ListGroups'
import UserScoreBoard from '../../components/UserScoreBoard/UserScoreBoard'
import UsersQuizzes from '../../components/UsersQuizzes/UsersQuizzes'
import UserInfo from '../../components/UserInfo/UserInfo'
import AdminButtons from './AdminButtons/AdminButtons'
import EducatorsQuizzes from '../../components/EducatorsQuizzes/EducatorsQuizzes'
import GetAvatar from '../../components/GetAvatar/GetAvatar'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentFill } from 'react-icons/pi'
import ListForLater from '../../components/ListForLater/ListForLater'

const Profile = () => {
  const { userData } = useContext(AppContext)
  const [currentUser, setCurrentUser] = useState('')
  const { profile } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile === null) return

    getUserByHandle(profile)
      .then(snapshot => {
        if (!snapshot.exists()) {
          throw new Error('Something went wrong!')
        }
        setCurrentUser(snapshot.val())
      })
      .catch(e => console.log(e.message))
      .finally(() => {
        setLoading(false)
      })
  }, [profile])

  const handleEditProfile = (updatedValues) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedValues
    }))
  }
  const handleEducator = (handle) => {
    makeEducator(handle)
  }

  if (loading) {
    return (
            <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
                <Spinner size="xl" />
                <Text>Loading...</Text>
            </Box>
    )
  } else {
    return (
            <>
                <Grid
                    minHeight={'100vh'}
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={4}
                > <GridItem as="main"
                    colSpan={{ base: 6, lg: 4, xl: 4 }}

                    p="40px"
                >
                        <Center>

                            <Card maxW='2xl' >
                                <Button size='md' bg={'brand.200'} fontSize={['xl', 'lg', '2xl']} style={{
                                  borderRadius: '10px',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }} leftIcon={currentUser.userType === 'teacher' ? (<FaChalkboardTeacher />) : (<PiStudentFill />)}>{currentUser && currentUser.handle}</Button>
                                <CardHeader>

                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <GetAvatar handle={currentUser && currentUser.handle} size={'xl'} />

                                            {currentUser.userType === 'student' && (
                                                <UsersQuizzes user={currentUser} />
                                            )}
                                            {currentUser.userType === 'teacher' && (
                                                <EducatorsQuizzes user={currentUser} />
                                            )}

                                        </Flex>
                                        {currentUser.handle === userData.handle &&
                                            <EditProfile user={currentUser.handle} originalFirstName={currentUser.firstName} originalLastName={currentUser.lastName} onEditProfile={handleEditProfile} originalPhone={currentUser.phone ? currentUser.phone : ''} originalCaption={currentUser.caption ? currentUser.caption : 'Add caption here'} />
                                        }
                                    </Flex>
                                </CardHeader>
                                <CardBody>
                                    <UserInfo currentUser={currentUser} />
                                </CardBody>

                                <CardFooter
                                    justify='space-between'
                                    flexWrap='wrap'
                                    sx={{
                                      '& > button': {
                                        minW: '136px'
                                      }
                                    }}
                                >
                                    {userData.isAdmin && !currentUser.isAdmin && (
                                        <AdminButtons currentUser={currentUser} />
                                    )}

                                    {userData.userType === 'teacher' && currentUser.userType === 'student' && (
                                        <Button onClick={() => handleEducator(currentUser.handle)} flex='1' variant='ghost' leftIcon={<PlusSquareIcon />}>
                                            Make Educator
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>

                            </Center>
                        <Center>

                        {currentUser.userType === 'teacher' && (
                            <Card m={10} >

                                <CardHeader>
                                    <Heading size='md' color={'brand.200'}>SOLVED QUIZZES</Heading>
                                </CardHeader>
                                <CardBody ml={10}>
                                <UsersQuizzes user={currentUser} />
                                </CardBody>
                            </Card>
                        )}
                        </Center>
                    </GridItem>

                    <GridItem as="aside"
                        colSpan={{ base: 6, lg: 2, xl: 2 }}

                        minHeight={{ lg: '100%' }}
                        p={{ base: '20px', lg: '30px' }}
                        mt={2}>
                        {currentUser.userType === 'student' && (
                            <Card mb={10}>
                                <CardHeader>
                                    <Heading size='md' color={'brand.200'}>SCORE BOARD</Heading>
                                </CardHeader>

                                <CardBody>
                                    <UserScoreBoard user={currentUser}></UserScoreBoard>
                                </CardBody>
                            </Card>

                        )}
                        {currentUser.userType === 'teacher' && (
                            <Card mb={10}>
                                {currentUser.handle === userData.handle &&
                                    <CreateGroup></CreateGroup>
                                }
                                <CardHeader>
                                    <Heading size='md' color={'brand.200'}>GROUPS</Heading>
                                </CardHeader>
                                <CardBody>
                                    <ListGroup user={currentUser} ></ListGroup>
                                </CardBody>
                            </Card>
                        )}
                        {currentUser.handle === userData.handle && <Card>
                            <CardHeader>
                                <Heading size='md' color={'brand.200'}>FOR LATER</Heading>
                            </CardHeader>

                            <CardBody>
                                <ListForLater quizzes={currentUser.forLater}></ListForLater>
                            </CardBody>
                        </Card>}
                    </GridItem>
                </Grid>

            </>
    )
  }
}
export default Profile
