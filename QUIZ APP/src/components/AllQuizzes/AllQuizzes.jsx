import { useEffect, useState } from "react";
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
} from '@chakra-ui/react';
import { ChevronRightIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { ITEMS_PER_PAGE } from "../../common/constants";


const AllQuizzes = ({ quizzes }) => {
    const [allQuizzes, setAllQuizzes] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastQuiz = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstQuiz = indexOfLastQuiz - ITEMS_PER_PAGE;

    const currentQuizzes = Object.entries(allQuizzes).slice(
        indexOfFirstQuiz,
        indexOfLastQuiz
    );


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        setAllQuizzes(quizzes || {});
    }, [quizzes]);

    const mappedQuizzes = currentQuizzes.map(([quizId, quizData]) => (
        <Center padding={'15px'} py={6} key={quizId}>
            <Box
                maxW={'330px'}
                w={'full'}
                bg={'white'}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
            >
                <Stack
                    textAlign={'center'}
                    p={6}
                    color={'black'}
                    align={'center'}>
                    <Text
                        fontSize={'xs'}
                        fontWeight={500}
                        bg={'green.50'}
                        p={2}
                        px={3}
                        color={'green.500'}
                        rounded={'full'}>
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
                    <List textAlign={'left'} spacing={3}>
                        <ListItem marginLeft={0}>
                            <ListIcon as={ChevronRightIcon} color="green.400" />
                            Author: {quizData.author}
                        </ListItem>
                        <ListItem>
                            <ListIcon marginLeft={0} as={ChevronRightIcon} color="green.400" />
                            Created: {quizData.createdOn.toLocaleString()}
                        </ListItem>
                        <ListItem marginLeft={0}>
                            <ListIcon as={ChevronRightIcon} color="green.400" />
                            Type: {quizData.selectedOption}
                        </ListItem>
                        <ListItem marginLeft={0}>
                            <ListIcon as={ChevronRightIcon} color="green.400" />
                            Questions: {quizData.numQuestions}
                        </ListItem>
                        <ListItem marginLeft={0}>
                            <ListIcon as={ChevronRightIcon} color="green.400" />
                            Total Points: {quizData.totalPoints}
                        </ListItem>
                    </List>

                    <Button
                        mt={10}
                        w={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{
                            bg: 'brand.200',
                        }}
                        _focus={{
                            bg: 'brand.200',
                        }}>
                        Enroll
                    </Button>
                </Box>
            </Box>
        </Center>
    ));

    return (
        <div>
          <Text fontSize="xl" fontWeight="bold" mb={4} align={'left'}>
            {/* {categoryTitle} */} Mathematics
          </Text>
          <Flex wrap="wrap" justify="center" flexDirection="row">
            {currentPage > 1 && (
              <Button
                variant="ghost"
                mx={1}
                marginTop={'135px'}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ArrowForwardIcon transform="rotate(180deg)" />
              </Button>
            )}
            <Box
              border="1px solid #ccc" // Add border styling here
              borderRadius="md" // Optional: Add border radius for rounded corners
              display="flex"
            >
              {mappedQuizzes}
            </Box>
            {currentPage * ITEMS_PER_PAGE < Object.keys(allQuizzes).length && (
              <Button
                variant="ghost"
                mx={1}
                marginTop={'135px'}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ArrowForwardIcon />
              </Button>
            )}
          </Flex>
        </div>
      );
}
export default AllQuizzes