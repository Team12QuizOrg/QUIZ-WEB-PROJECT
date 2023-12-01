import { useState, useEffect } from 'react';

import { VStack, Spinner, HStack, Text, Heading, Spacer, Tooltip, Stack, StackDivider, Box, useDisclosure, Button } from '@chakra-ui/react';
import { CheckCircleIcon, UnlockIcon, LockIcon } from '@chakra-ui/icons'
import { getUsersQuizzes } from '../../services/users.services';
import { getEducatorsQuizzes } from '../../services/quiz.services';

const EducatorsQuizzes = ({ user }) => {

    const [quizState, setQuizState] = useState([])
    const [currentQuizzes, setCurrentQuizzes] = useState([])
    const [finishedQuizzes, setFinishedQuizzes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEducatorsQuizzes(user.handle)
            .then((res) => {
                setQuizState(res || []);
                console.log(res)
                const finished = res.filter((quiz) => quiz.state === 'too late');
                setFinishedQuizzes(finished);
                return res;
            })
            .then((res) => {
                const current = res.filter((quiz) => !quiz.state || quiz.state !== 'too late');
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
                    align={'center'}
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}>
                    <Tooltip label={`${user.handle}'s On going quizzes`} fontSize="md">
                        <Button flex='1' variant='ghost' leftIcon={<UnlockIcon />}>
                            {currentQuizzes.length}

                        </Button>
                    </Tooltip>
                    <Tooltip label={`${user.handle}'s Finished quizzes`} fontSize="md">
                        <Button flex='1' variant='ghost' leftIcon={<LockIcon />}>
                            {finishedQuizzes.length}
                        </Button>
                    </Tooltip>
                    <Tooltip label={`${user.handle}'s Rank`} fontSize="md">
                        <Button color={'brand.200'} flex='1' variant='ghost' leftIcon={<CheckCircleIcon />}>
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

export default EducatorsQuizzes;
