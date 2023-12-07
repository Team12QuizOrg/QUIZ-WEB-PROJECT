import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import AllQuizzes from '../AllQuizzes/AllQuizzes'
import { getAllQuizzes } from '../../services/quiz.services'
import { getAllCategories } from '../../services/category.services'

export const CategoryQuizzes = () => {
  const [allQuizzes, setAllQuizzes] = useState()

  const [categories, setCategories] = useState()

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        const categories = res.map((cat) => cat.category)
        setCategories(categories)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
    getAllQuizzes()
      .then((res) => {
        setAllQuizzes(res)
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error)
      })
  }, [])

  return (
        <Box>
            {categories && categories.map((category, index) => (
                <Box key={index} mb="50px">
                    <AllQuizzes quizzes={allQuizzes} catName={`Quizzes for ${category}`} category={category} />
                </Box>
            ))}
        </Box>
  )
}
