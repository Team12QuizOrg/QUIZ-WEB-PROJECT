import { useNavigate } from "react-router-dom";
import {
    VStack, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,

    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react';


const ListQuizzes = ({ user, quizzes }) => {

    const navigate = useNavigate();

    return (

        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{`${user.handle}'s On going quizzes`}</PopoverHeader>
            <PopoverBody>

                <UnorderedList>
                    {quizzes && quizzes.map((quiz) => (
                        <ListItem key={quiz.id} cursor={"pointer"}
                            fontWeight={"bold"}
                            _hover={{
                                textDecoration: "none",
                                bg: "brand.200",
                            }}
                            _active={{
                                bg: "brand.300",
                                transform: "scale(0.98)",
                            }} onClick={() => navigate(`/quizzes/AllQuizzes/${quiz.id}`)}> {quiz.title} </ListItem>
                    ))}
                </UnorderedList>

            </PopoverBody>
        </PopoverContent>


    );

};

export default ListQuizzes;
