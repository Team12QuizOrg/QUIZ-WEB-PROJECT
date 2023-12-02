import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import AllQuizzes from "../AllQuizzes/AllQuizzes";
import { getAllQuizzes } from "../../services/quiz.services";
import { getAllCategories } from "../../services/category.services";

export const CategoryQuizzes = () => {
    const [allQuizzes, setAllQuizzes] = useState();

    const [categories, setCategories] = useState();

    useEffect(() => {
        getAllQuizzes()
            .then((res) => {
                setAllQuizzes(res);
            })
            .catch((error) => {
                console.error("Error fetching quizzes:", error);
            });
        getAllCategories()
        .then((res) => {
            setCategories(res);
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
        });
    }, []);
    console.log(categories);

    return (
        <Box>
            <Box>
                <Box mb="50px">
                    <AllQuizzes quizzes={allQuizzes} catName={'Open Quizzes'} />
                </Box>
            </Box>
        </Box>
    )

}