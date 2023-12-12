import { Box } from '@chakra-ui/react'
import AccordionAbout from '../../components/Accordion/Accordion'
import AddFeedback from '../../components/AddFeedback/AddFeedback'


const About = () => {
  return (
        <Box  align={'center'} justify={'center'}  justifySelf={'center'} m={'20'} >
            <AddFeedback />
            <AccordionAbout />
        </Box>
  )
}
export default About
