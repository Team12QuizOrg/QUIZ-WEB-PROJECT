import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getAllQuizzes } from "../../services/quiz.services";
import { MIN_LENGTH_CAT } from "../../common/constants";
import { Center, Box, Flex, Stack, Text, Tooltip, List, ListItem, ListIcon, Button, useColorMode } from "@chakra-ui/react";
import { feedbackFormatDate } from "../../services/feedback.services";
import { ChevronRightIcon } from "@chakra-ui/icons";
import AppContext from "../../context/AuthContext";
import {declineInvitation, acceptingInvitation } from "../../services/users.services";

export const CategoryView = () => {
    const {userData} = useContext(AppContext);
    const [quizzes, setQuizzes] = useState();
    const { cat } = useParams();
    const getFirstCat = cat.split(" ");
    const result1 = getFirstCat[0].toLowerCase();
    const keyword = "for ";
    const getCatName = cat.split(keyword);
    const result2 = getCatName[1];
    const [currentUser, setCurrentUser] = useState()
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    useEffect(() => {
        if (userData) {
          setCurrentUser(userData.handle)
        }
      }, [])
    useEffect(() => {
        getAllQuizzes()
            .then((res) => {
                if (cat.length < MIN_LENGTH_CAT) {
                    if (result1 === "ongoing") {
                        const filteredQuizzes = res.filter((quiz) => quiz && quiz.state == result1);
                        setQuizzes(filteredQuizzes);
                    } else if (result1 === "active") {
                        const filterParticipatedQuizzes = res.filter((quiz) => quiz.participants && Object.keys(quiz.participants).length > 0);
                        setQuizzes(filterParticipatedQuizzes || []);
                    } else if (result1 === "popular") {
                        const filteredPopularQuizzes = res.filter((quiz) => quiz.scoreBoards && Object.keys(quiz.scoreBoards).length > 0);
                        const sortedPopularQuizzes = filteredPopularQuizzes.sort(
                            (quizA, quizB) => quizA.scoreBoards && quizB.scoreBoards && Object.keys(quizB.scoreBoards).length - Object.keys(quizA.scoreBoards).length
                        );
                        const topPopularQuizzes = sortedPopularQuizzes.slice(0, 5);
                        setQuizzes(topPopularQuizzes || []);
                    } else if (result1 === "all") {
                        setQuizzes(res);
                    }
                } else {
                    const filteredQuizzes = res.filter((quiz) => quiz && quiz.category === result2);
                    setQuizzes(filteredQuizzes);
                }

            })
    }, [])

      const acceptInvitation = (handle, quizId) => {
        acceptingInvitation(handle, quizId);
        navigate(`${quizId}`)
      }
      const removeInvitation = (quizId, handle) => {
        declineInvitation(quizId, handle);
        navigate(0)
      }
    
    return (
        quizzes && (
            <Flex mt={20} wrap="wrap" justify="center" flexDirection="row">
                {Object.entries(quizzes).map(([quizId, quizData]) => (
                    <Center padding={'10px'} py={6} key={console.log(quizId)}>
                        <Box
                            maxW={'250px'} 
                            w={'full'}
                            bg={colorMode === 'dark' ? 'blue.700' : 'white.200'}
                            boxShadow={'2xl'}
                            rounded={'md'}
                            overflow={'hidden'}
                        >
                            <Stack textAlign={'center'} p={6} color={'black'} align={'center'}>
                            <Text fontSize={'xs'} fontWeight={500} bg={'green.50'} p={2} px={3} color={'green.500'} rounded={'full'}>
                                    {quizData.category}
                                </Text>
                                <Stack maxW={'250px'} align={'center'} justify={'center'}>
                                    <Tooltip label={quizData.title} placement="top">
                                        <Text fontSize={'sm'} color={'brand.200'} fontWeight={800} isTruncated>
                                            {quizData.title}
                                        </Text>
                                    </Tooltip>
                                </Stack>
                            </Stack>
                            <Box bg={colorMode === 'dark' ? '#A0AEC0' : 'grey.50'} padding={'25px'}>
                                <List textAlign={'left'} spacing={2}>
                                    <ListItem fontSize={'sm'} marginLeft={0}>
                                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                                        Author: {quizData.author}
                                    </ListItem>
                                    <ListItem fontSize={'xs'}>
                                        <ListIcon marginLeft={0} as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                                        Created: {feedbackFormatDate(quizData?.createdOn)}
                                    </ListItem>
                                    <ListItem fontSize={'sm'} marginLeft={0}>
                                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                                        Type: {quizData.selectedOption}
                                    </ListItem>
                                    <ListItem fontSize={'sm'} marginLeft={0}>
                                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                                        Availability: {quizData.state}
                                    </ListItem>
                                    <ListItem fontSize={'sm'} marginLeft={0}>
                                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                                        Questions: {quizData.numQuestions}
                                    </ListItem>
                                    <ListItem fontSize={'sm'} marginLeft={0}>
                                        <ListIcon as={ChevronRightIcon} color={colorMode === 'dark' ? '#F7B315' : 'green.500'} />
                                        Total Points: {quizData.totalPoints * quizData.numQuestions}
                                    </ListItem>
                                </List>
                                {userData && quizData && quizData.selectedOption === "Private" && (quizData.invites && quizData.invites[currentUser] && quizData.invites[currentUser]?.inviteStatus === "false") ? (
                                    <>
                                        <Button mt={10} w={'full'} bg={'blue.400'}
                                            color={'white'} rounded={'xl'} boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                            _hover={{ bg: 'brand.200' }} _focus={{ bg: 'brand.200' }}
                                            onClick={() => acceptInvitation(userData.handle, quizData.id)}
                                        >
                                            Accept
                                        </Button>
                                        <Button mt={4} w={'full'} bg={'red.400'} color={'white'} rounded={'xl'} boxShadow={'0 5px 20px 0px rgb(255 99 132 / 43%)'}
                                            _hover={{ bg: 'red.300' }} _focus={{ bg: 'red.300' }}
                                            onClick={() => removeInvitation(quizData.id, userData.handle)}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                ) : (
                                    <Button mt={10} w={'full'} bg={'blue.400'} color={'white'} rounded={'xl'}
                                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                        _hover={{ bg: 'brand.200' }}
                                        _focus={{ bg: 'brand.200' }}
                                        onClick={() => navigate(`${quizData.id}`)}
                                    >
                                        View Quiz Details
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Center>
                ))}
                {(!quizzes || quizzes.length === 0) && <Text align={'center'}>No {cat}</Text>}
            </Flex>
        )
    );
}