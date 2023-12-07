import { useNavigate } from 'react-router-dom'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
export default function Error () {
  const navigate = useNavigate()
  return (
        <Box textAlign="center" py={10} px={6} mt={30}>
            <Box display="inline-block">
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bg={'red.500'}
                    rounded={'50px'}
                    w={'55px'}
                    h={'55px'}
                    textAlign="center">
                    <CloseIcon boxSize={'20px'} color={'white'} />
                </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2} color={'brand.400'}>
                Uppppss..
            </Heading>
            <Text color={'gray.500'}>
                Looks like something is wrong with this page
                You can go back to our <Text to='/home' onClick={() => navigate('/home)')} color={'brand.400'} >Home page</Text>
            </Text>
        </Box>

  )
}
