import { resetPassword } from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { Box, FormControl, FormLabel, Input, Stack, Button, Text, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
export default function ResetPassword () {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const updateForm = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    resetPassword(form.email)
      .then((data) => {
        alert('Check your email')
        navigate('/')
      })
      .catch(err => console.log(err))
  }
  return (
    <Box
    display="flex"
    mt={55}
    justifyContent="center"
  >
<Box
align={'center'}
  maxW={'350'}
rounded={'lg'}
bg={useColorModeValue('white', 'gray.700')}
boxShadow={'lg'}
p={8}>
<Stack spacing={4}>
<Text bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">Forgot password?</Text>
    <FormControl id="email">
        <FormLabel color={'brand.200'}>Email address</FormLabel>
        <Input type="email" value={form.email} onChange={updateForm('email')}/>
    </FormControl>

        <Button
            onClick={handleSubmit}
            fontFamily={'heading'}
            cursor={'pointer'}
            mt={8}
            w={'full'}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={'white'}
            _hover={{
              bgGradient: 'linear(to-r, red.400,pink.400)',
              boxShadow: 'xl'
            }}>
            Send email
        </Button>
</Stack>
</Box>
</Box>
  )
}
