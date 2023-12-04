import { useState, useEffect } from 'react';
import {
    Spinner, Text, Tooltip, Box, Button, Popover,
    PopoverTrigger,
} from '@chakra-ui/react';
import { CheckCircleIcon, QuestionIcon, TimeIcon } from '@chakra-ui/icons'
import { getUsersQuizzes } from '../../services/users.services';
import ListQuizzes from '../ListQuizzes/ListQuizzes';
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
                    <Popover>
                        <PopoverTrigger>

                            <Button flex='1' variant='ghost' fontSize={['xl', 'lg', '1xl']} leftIcon={<QuestionIcon />} onClick={() => { }}>
                                {currentQuizzes.length}

                            </Button>
                        </PopoverTrigger>
                        <ListQuizzes user={user} quizzes={currentQuizzes} name={'On Going'} />

                    </Popover>

                    <Popover>
                        <PopoverTrigger>
                            <Button flex='1' variant='ghost' fontSize={['xl', 'lg', '1xl']} leftIcon={<TimeIcon />} onClick={() => { }}>
                                {finishedQuizzes.length}
                            </Button>
                        </PopoverTrigger>
                        <ListQuizzes user={user} quizzes={finishedQuizzes} name={'Finished'} />
                    </Popover>
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

export default UsersQuizzes;