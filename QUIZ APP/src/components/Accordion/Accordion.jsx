import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import topicsArr from '../../Topics/topics.js'

export default function AccordionAbout () {
  const navigate = useNavigate()

  return (
        <Accordion width={[400, 500, 600]}> 
            {topicsArr.map((topic) => (
    <AccordionItem key={topic.id}>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          {topic.title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     {topic.description}
    </AccordionPanel>
  </AccordionItem>
            ))}
            </Accordion>

  )
}
