import { HStack, Heading, } from '@chakra-ui/react';
import { AiOutlineFieldTime } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const ListForLater = ({ quizzes }) => {
    const navigate = useNavigate()
    return (
        <>
            {quizzes && Object.entries(quizzes).map(([title, id]) => (

                <HStack align="center" key={`quiz-${id}`} mt={5}>
                    <AiOutlineFieldTime size={20} style={{ marginRight: '8px' }} />
                    <Heading cursor={'pointer'} size='xs' textTransform='uppercase' onClick={() => navigate(`/quizzes/AllQuizzes/${id}`)}>
                        {title}
                    </Heading>
                </HStack>

            ))
            }

        </>
    );
};

export default ListForLater;