import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  Flex,
  useColorModeValue,
  Tooltip,
  Td,
} from '@chakra-ui/react';
import { ChevronRightIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { ITEMS_PER_PAGE } from "../../common/constants";
import { addParticipant } from "../../services/quiz.services";
import AppContext from "../../context/AuthContext";
import { feedbackFormatDate } from "../../services/feedback.services";
import { acceptingInvitation } from "../../services/users.services";
import { declineInvitation } from "../../services/users.services";



const AllQuizzes = ({ quizzes, catName, category }) => {
  const [allQuizzes, setAllQuizzes] = useState({});
  const { userData } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [cat, setCat] = useState({});
  const [currentUser, setCurrentUser] = useState()
  const [rerender, setRerender] = useState(false);
  const indexOfLastQuiz = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstQuiz = indexOfLastQuiz - ITEMS_PER_PAGE;
  const navigate = useNavigate();

  const currentQuizzes = Object.entries(allQuizzes).slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );
  useEffect(() => {
    if (userData) {
      setCurrentUser(userData.handle)
    }
  }, [])
  useEffect(() => {
    if (category) {
      const filteredQuiz = quizzes && quizzes.filter((quiz) => quiz && quiz.category === category && quiz.state === "ongoing");
      setAllQuizzes(filteredQuiz || {});
    } else {
      setAllQuizzes(quizzes || {});
    }

  }, [quizzes]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const acceptInvitation = (handle, quizId) => {
    acceptingInvitation(handle, quizId);
    navigate(`${quizId}`)
  }
  const removeInvitation = (quizId, handle) => {
    declineInvitation(quizId, handle);
    navigate(0)
  }


  // const mappedQuizzes = currentQuizzes &&  currentQuizzes.map(([quizId, quizData]) => (
  //   <Center padding={'10px'} py={6} key={quizId}>
  //     <Box maxW={'250px'} w={'full'} bg={'white'} boxShadow={'2xl'} rounded={'md'} overflow={'hidden'}>
  //       <Stack textAlign={'center'} p={6} color={'black'} align={'center'}>
  //         <Text fontSize={'xs'} fontWeight={500} bg={'green.50'} p={2} px={3} color={'green.500'} rounded={'full'}>
  //           {quizData.category}
  //         </Text>
  //         <Stack maxW={'250px'} direction={'row'} align={'center'} justify={'center'}>
  //           <Tooltip label={quizData.title} placement="top">
  //             <Text fontSize={'sm'} fontWeight={800} isTruncated>
  //               {quizData.title}
  //             </Text>
  //           </Tooltip>
  //         </Stack>
  //       </Stack>
  //       <Box bg={'gray.50'} padding={'25px'}>
  //         <List textAlign={'left'} spacing={2}>
  //           <ListItem fontSize={'sm'} marginLeft={0}>
  //             <ListIcon as={ChevronRightIcon} color="green.400" />
  //             Author: {quizData.author}
  //           </ListItem>
  //           <ListItem fontSize={'xs'}>
  //             <ListIcon marginLeft={0} as={ChevronRightIcon} color="green.400" />
  //             Created: {feedbackFormatDate(quizData?.createdOn)}
  //           </ListItem>
  //           <ListItem fontSize={'sm'} marginLeft={0}>
  //             <ListIcon as={ChevronRightIcon} color="green.400" />
  //             Type: {quizData.selectedOption}
  //           </ListItem>
  //           <ListItem fontSize={'sm'} marginLeft={0}>
  //             <ListIcon as={ChevronRightIcon} color="green.400" />
  //             Availability: {quizData.state}
  //           </ListItem>
  //           <ListItem fontSize={'sm'} marginLeft={0}>
  //             <ListIcon as={ChevronRightIcon} color="green.400" />
  //             Questions: {quizData.numQuestions}
  //           </ListItem>
  //           <ListItem fontSize={'sm'} marginLeft={0}>
  //             <ListIcon as={ChevronRightIcon} color="green.400" />
  //             Total Points: {quizData.totalPoints * quizData.numQuestions}
  //           </ListItem>
  //         </List>
  //         {userData && quizData &&  quizData.selectedOption === "Private" && (quizData.invites && quizData.invites[currentUser]&&quizData.invites[currentUser]?.inviteStatus === "false") ? (
  //           <>
  //             <Button mt={10} w={'full'} bg={'blue.400'}
  //               color={'white'} rounded={'xl'} boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
  //               _hover={{ bg: 'brand.200' }} _focus={{ bg: 'brand.200' }}
  //               onClick={() => acceptInvitation(userData.handle, quizData.id)}
  //             >
  //               Accept
  //             </Button>
  //             <Button mt={4} w={'full'} bg={'red.400'} color={'white'} rounded={'xl'} boxShadow={'0 5px 20px 0px rgb(255 99 132 / 43%)'}
  //               _hover={{ bg: 'red.300' }} _focus={{ bg: 'red.300' }}
  //               onClick={() => removeInvitation(quizData.id, userData.handle)}
  //             >
  //               Reject
  //             </Button>
  //           </>
  //         ) : (
  //           <Button mt={10} w={'full'} bg={'blue.400'} color={'white'} rounded={'xl'}
  //             boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
  //             _hover={{ bg: 'brand.200' }}
  //             _focus={{ bg: 'brand.200' }}
  //             onClick={() => navigate(`${quizData.id}`)}
  //           >
  //             View Quiz Details
  //           </Button>
  //         )}
  //       </Box>
  //     </Box>
  //   </Center>
  // ));

  return (
    <div>
    <Text margin={'20px'} fontSize="xl" fontWeight="bold" mb={4} align={'left'}>
      {catName}
    </Text>
    {currentQuizzes && currentQuizzes.map(([quizId, quizData]) => (
      <Center padding={'10px'} py={6} key={quizId}>
        <Box
          maxW={'250px'} // Keep the max width constant for all screen sizes
          w={'full'}
          bg={'white'}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Stack textAlign={'center'} p={6} color={'black'} align={'center'}>
            <Text fontSize={'xs'} fontWeight={500} bg={'green.50'} p={2} px={3} color={'green.500'} rounded={'full'}>
              {quizData.category}
            </Text>
            <Stack maxW={'250px'} direction={'row'} align={'center'} justify={'center'}>
              <Tooltip label={quizData.title} placement="top">
                <Text fontSize={'sm'} fontWeight={800} isTruncated>
                  {quizData.title}
                </Text>
              </Tooltip>
            </Stack>
          </Stack>
          <Box bg={'gray.50'} padding={'25px'}>
            <List textAlign={'left'} spacing={2}>
                <ListItem fontSize={'sm'} marginLeft={0}>
                  <ListIcon as={ChevronRightIcon} color="green.400" />
                  Author: {quizData.author}
                </ListItem>
                <ListItem fontSize={'xs'}>
                  <ListIcon marginLeft={0} as={ChevronRightIcon} color="green.400" />
                  Created: {feedbackFormatDate(quizData?.createdOn)}
                </ListItem>
                <ListItem fontSize={'sm'} marginLeft={0}>
                  <ListIcon as={ChevronRightIcon} color="green.400" />
                  Type: {quizData.selectedOption}
                </ListItem>
                <ListItem fontSize={'sm'} marginLeft={0}>
                  <ListIcon as={ChevronRightIcon} color="green.400" />
                  Availability: {quizData.state}
                </ListItem>
                <ListItem fontSize={'sm'} marginLeft={0}>
                  <ListIcon as={ChevronRightIcon} color="green.400" />
                  Questions: {quizData.numQuestions}
                </ListItem>
                <ListItem fontSize={'sm'} marginLeft={0}>
                  <ListIcon as={ChevronRightIcon} color="green.400" />
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
      {currentQuizzes && currentQuizzes.length > 0 && (
        <Flex wrap="wrap" justify="center" flexDirection="row">
          {currentPage > 1 && (
            <Button variant="ghost" mx={1} onClick={() => handlePageChange(currentPage - 1)}>
              <ArrowForwardIcon transform="rotate(180deg)" />
            </Button>
          )}
          <Box border="1px solid #ccc" borderRadius="md" display="flex">
          </Box>
          {currentPage * ITEMS_PER_PAGE < Object.keys(allQuizzes).length && (
            <Button variant="ghost" mx={1}  onClick={() => handlePageChange(currentPage + 1)}>
              <ArrowForwardIcon />
            </Button>
          )}
        </Flex>
      )}
      {(!currentQuizzes || currentQuizzes.length === 0) && <Text>No {catName}</Text>}
    </div>
  );
}

export default AllQuizzes