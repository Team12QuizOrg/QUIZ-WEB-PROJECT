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
    Spacer,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    HStack,
    Button,
    useDisclosure,
    StackDivider
} from '@chakra-ui/react';
import { useContext, useState } from "react";
import AppContext from "../../context/AuthContext";
import AssessmentForm from "../AssessmentForm/AssessmentForm";

const ListQuizzes = ({ user, quizzes, name }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selected, setSelected] = useState({ quizId: '', student: '', teacher: '' });
    const navigate = useNavigate();
    const { userData } = useContext(AppContext)
    const handleOpen = (quizId, student, teacher) => {
        setSelected({ quizId, student, teacher });
        onOpen();
    };

    return (
        <>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>{`${user.handle}'s ${name} quizzes`}</PopoverHeader>
                <PopoverBody>

                    <UnorderedList>
                        {quizzes && quizzes.map((quiz) => (
                            <HStack key={quiz.id} >
                                <ListItem cursor={"pointer"}

                                    fontWeight={"bold"}
                                    _hover={{
                                        textDecoration: "none",
                                        bg: "brand.200",
                                    }}
                                    _active={{
                                        bg: "brand.300",
                                        transform: "scale(0.98)",
                                    }} onClick={() => navigate(`/quizzes/AllQuizzes/${quiz.id}`)}> {quiz.title} </ListItem>
                                <Spacer></Spacer>

                                {quiz.educatorsComments &&
                                    <Button onClick={() => { handleOpen(quiz.id, userData.handle,) }} bg={'blue.400'} color='white'> Assessment  </Button>
                                }

                            </HStack>

                        ))}
                    </UnorderedList>

                </PopoverBody>
            </PopoverContent>
            {isOpen && (
                <AssessmentForm isOpen={isOpen} onClose={onClose} selected={selected} />
            )}
        </>
    );

};

export default ListQuizzes;
