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


const AllQuizzes = ({ quizzes, catName, category }) => {
  const [allQuizzes, setAllQuizzes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [cat, setCat] = useState({});
  const indexOfLastQuiz = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstQuiz = indexOfLastQuiz - ITEMS_PER_PAGE;
  const navigate = useNavigate();

  const currentQuizzes = Object.entries(allQuizzes).slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );
  useEffect(() => {
    if(category) {
      const filteredQuiz = quizzes && quizzes.filter((quiz) => quiz && quiz.category === category && quiz.state ==="ongoing");
      setAllQuizzes(filteredQuiz || {});
    } else {
      setAllQuizzes(quizzes || {});
    }
  
  }, [quizzes]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const mappedQuizzes = currentQuizzes.map(([quizId, quizData]) => (
    <Center padding={'10px'} py={6} key={quizId}>
      <Box maxW={'250px'} w={'full'} bg={'white'} boxShadow={'2xl'}
        rounded={'md'} overflow={'hidden'}>
        <Stack textAlign={'center'} p={6} color={'black'} align={'center'}>
          <Text fontSize={'xs'} fontWeight={500} bg={'green.50'} p={2}
            px={3} color={'green.500'} rounded={'full'}>
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

        <Box bg={'gray.50'} padding={'25px'} >
          <List textAlign={'left'} spacing={2}>
            <ListItem fontSize={'sm'} marginLeft={0}>
              <ListIcon as={ChevronRightIcon} color="green.400" />
              Author: {quizData.author}
            </ListItem>
            <ListItem fontSize={'xs'}>
              <ListIcon marginLeft={0} as={ChevronRightIcon} color="green.400" />
              Created: {feedbackFormatDate(quizData.createdOn)}
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
              Total Points: {quizData.totalPoints}
            </ListItem>
          </List>
          <Button mt={10} w={'full'} bg={'blue.400'} color={'white'}
            rounded={'xl'} boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{ bg: 'brand.200', }} _focus={{ bg: 'brand.200', }}
            onClick={() => navigate(`${quizData.id}`)}>
            View Quiz Details
          </Button>
        </Box>
      </Box>
    </Center>
  ));

  return (
    <div>
      <Text margin={'20px'}fontSize="xl" fontWeight="bold" mb={4} align={'left'}>
        {catName}
      </Text>
      <Box >
        {mappedQuizzes.length > 0 ? (
          <div>
            <Flex wrap="wrap" justify="center" flexDirection="row">
              {currentPage > 1 && (
                <Button variant="ghost" mx={1} marginTop={'185px'} onClick={() => handlePageChange(currentPage - 1)}>
                  <ArrowForwardIcon transform="rotate(180deg)" />
                </Button>
              )}
              <Box border="1px solid #ccc" borderRadius="md" display="flex">
                {mappedQuizzes}
              </Box>
              {currentPage * ITEMS_PER_PAGE < Object.keys(allQuizzes).length && (
                <Button variant="ghost" mx={1} marginTop={'185px'} onClick={() => handlePageChange(currentPage + 1)}>
                  <ArrowForwardIcon />
                </Button>
              )}
            </Flex>
          </div>
        ) : (
          <Text>No {catName}</Text>
        )}
      </Box>
    </div>
  );
}

export default AllQuizzes