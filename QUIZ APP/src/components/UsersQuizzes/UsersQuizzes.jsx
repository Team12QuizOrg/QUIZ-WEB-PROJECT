import { useState, useEffect } from 'react';

import { VStack, Spinner, HStack, Text, Heading, Spacer, Tooltip, Stack, StackDivider, Box, useDisclosure, Button } from '@chakra-ui/react';
import { CheckCircleIcon, QuestionIcon, TimeIcon } from '@chakra-ui/icons'
import { getUsersQuizzes } from '../../services/users.services';

const UsersQuizzes = ({ user }) => {

    const [quizState, setQuizState] = useState([])
    const [currentQuizzes, setCurrentQuizzes] = useState([])
    const [finishedQuizzes, setFinishedQuizzes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsersQuizzes(user.handle)
            .then((res) => {
                setQuizState(res || []);
                const finished = res.filter((quiz) => quiz.status === 'finished');
                setFinishedQuizzes(finished);
                return res;
            })
            .then((res) => {
                const current = res.filter((quiz) => !quiz.status || quiz.status !== 'finished');
                setCurrentQuizzes(current);
            })
            .catch((err) => console.error('Failed to get quizState', err))
            .finally(() => {
                setLoading(false);
            });
    }, [user.handle]);
    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
                <Spinner size="xl" />
                <Text>Loading...</Text>
            </Box>
        );
    } else {
        return (
            <>



                <Box justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}>
                    <Tooltip label={`${user.handle}'s currently participating quizzes`} fontSize="md">
                        <Button flex='1' variant='ghost' leftIcon={<QuestionIcon />}>
                            {currentQuizzes.length}

                        </Button>
                    </Tooltip>
                    <Tooltip label={`${user.handle}'s finished quizzes`} fontSize="md">
                        <Button flex='1' variant='ghost' leftIcon={<TimeIcon />}>
                            {finishedQuizzes.length}
                        </Button>
                    </Tooltip>
                    <Tooltip label={`${user.handle}'s Rank`} fontSize="md">
                        <Button flex='1' variant='ghost' leftIcon={<CheckCircleIcon />}>
                            {quizState.length < 10 && 'Silver'}
                            {quizState.length >= 10 && quizState.length <= 20 && 'Gold'}
                            {quizState.length > 21 && 'Platinum'}
                        </Button>
                    </Tooltip>
                </Box>

            </>
        );
    }


};

export default UsersQuizzes;