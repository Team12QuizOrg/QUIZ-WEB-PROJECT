import { useContext, useState } from 'react'
import AppContext from '../../context/AuthContext'
import { createUserHandle, getUserByHandle } from '../../services/users.services'
import { registerUser } from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import codes from '../../codes/codes'
import { MAX_NAME_LENGTH, MAX_USERNAME_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH, PHONE_NUMBER_LENGTH } from '../../common/constants'
import {Box,Flex, Stack,Heading,Text,Container,Input,Button,SimpleGrid,Avatar,AvatarGroup,useBreakpointValue,Select,FormControl, InputGroup,InputRightElement} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence'
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo'
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds'
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba'
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast'
  }
]
export default function JoinOurTeam () {
  const [showPassword, setShowPassword] = useState(false)
  const { setContext } = useContext(AppContext)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    handle: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    photoURL: '',
    userType: 'student',
    code: ''
  })
  const updateForm = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }
  const onUserTypeChange = (e) => {
    const newUserType = e.target.value
    setForm({
      ...form,
      userType: newUserType
    })
    setShowCodeInput(newUserType === 'teacher')
  }

  function validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail\.com|yahoo\.com|abv\.bg)$/
    return re.test(String(email).toLowerCase())
  }

  const onRegister = (event) => {
    event.preventDefault()
    if (!form.email) {
      alert('Email is required')
      return
    }

    if (!validateEmail(form.email)) {
      alert('Email is not in proper format')
      return
    }

    if (!form.handle) {
      alert('Handle is required')
      return
    }

    if (!form.handle || form.handle.length < MIN_USERNAME_LENGTH || form.handle.length > MAX_USERNAME_LENGTH) {
      alert('Handle is required and must be between 3 and 30 characters')
      return
    }

    if (!form.password || form.password.length < MIN_PASSWORD_LENGTH) {
      alert('Password is required and must be at least 6 characters long')
      return
    }

    if (!form.firstName || form.firstName.length < MIN_NAME_LENGTH || form.firstName.length > MAX_NAME_LENGTH) {
      alert('First Name is required and must be between 1 and 30 characters')
    }

    if (!form.lastName || form.lastName.length < MIN_NAME_LENGTH || form.lastName.length > MAX_NAME_LENGTH) {
      alert('Last Name is required and must be between 1 and 30 characters')
    }

    if (form.phone || form.phone.length !== PHONE_NUMBER_LENGTH) {
      alert('Phone number is required and must be 10 characters')
    }

    if (form.userType === 'teacher' && !codes.includes(form.code)) {
      alert('Invalid code!')
      return
    }

    getUserByHandle(form.handle)
      .then(snapshot => {
        if (snapshot.exists()) {
          throw new Error(`Handle @${form.handle} has already been taken!`)
        }

        return registerUser(form.email, form.password)
      })
      .then(credential => {
        return createUserHandle(form.handle, credential.user.uid, credential.user.email, form.firstName, form.lastName, form.phone, form.userType)
          .then(() => {
            setContext({
              user: credential.user
            })
          })
      })
      .then(() => {
        navigate('/')
      })
      .catch((err) => alert(err))
  }

  return (
        <Box position={'relative'} >
            <Container
                height={'900px'} width={'full'}
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}>
                <Stack spacing={{ base: 10, md: 20 }} >
                    <Heading align={'center'} justify={'center'}
          justifySelf={'center'}
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                        color={'brand.200'}>
                        Quiz creation begins here{' '}
                        <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                            !
                        </Text>{' '}
                        Register on our app to craft engaging quizzes and become a part of the quiz-making community.
                    </Heading>
                    <Stack direction={'row'} spacing={4} align={'center'}>
                        <AvatarGroup>
                            {avatars.map((avatar) => (
                                <Avatar
                                    key={avatar.name}
                                    name={avatar.name}
                                    src={avatar.url}
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    size={useBreakpointValue({ base: 'md', md: 'lg' })}
                                    position={'relative'}
                                    zIndex={2}
                                    _before={{
                                      content: '""',
                                      width: 'full',
                                      height: 'full',
                                      rounded: 'full',
                                      transform: 'scale(1.125)',
                                      bgGradient: 'linear(to-bl, red.400,pink.400)',
                                      position: 'absolute',
                                      zIndex: -1,
                                      top: 0,
                                      left: 0
                                    }}
                                />
                            ))}
                        </AvatarGroup>
                        <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                            +
                        </Text>
                        <Flex
                            align={'center'}
                            justify={'center'}
                            fontFamily={'heading'}
                            fontSize={{ base: 'sm', md: 'lg' }}
                            bg={'gray.800'}
                            color={'white'}
                            rounded={'full'}
                            minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
                            minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
                            position={'relative'}
                            _before={{
                              content: '""',
                              width: 'full',
                              height: 'full',
                              rounded: 'full',
                              transform: 'scale(1.125)',
                              bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                              position: 'absolute',
                              zIndex: -1,
                              top: 0,
                              left: 0
                            }}>
                            YOU
                        </Flex>
                    </Stack>
                </Stack>
                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                            Join our community
                            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                                !
                            </Text>
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                            If you want to create stuning quizzes OR you want to master your brain!
                        </Text>
                    </Stack>
                    <Box as={'form'} mt={10}>
                        <Stack spacing={4}>
                            <Input
                                value={form.firstName}
                                onChange={updateForm('firstName')}
                                placeholder="Firstname"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                  color: 'gray.500'
                                }}
                            />
                            <Input
                                value={form.lastName}
                                onChange={updateForm('lastName')}
                                placeholder="Lastname"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                  color: 'gray.500'
                                }}
                            />
                            <Input
                                value={form.email} onChange={updateForm('email')}
                                placeholder="email@gmail.com"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                  color: 'gray.500'
                                }}
                            />
                            <Input
                                value={form.handle} onChange={updateForm('handle')}
                                placeholder="Username"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                  color: 'gray.500'
                                }}
                            />
                            <FormControl id="password" isRequired>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} value={form.password} onChange={updateForm('password')} placeholder="Password"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                          color: 'gray.500'
                                        }} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Input
                                value={form.phone} onChange={updateForm('phone')}
                                placeholder="Phone number"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                  color: 'gray.500'
                                }}
                            />
                            <Select placeholder='Select role' value={form.userType} onChange={onUserTypeChange} color={'brand.200'}>
                                <option value='student'>Student</option>
                                <option value='teacher'>Teacher</option>
                            </Select>

                            {showCodeInput && (
                                <div>
                                    <Input
                                        value={form.code} onChange={updateForm('code')}
                                        placeholder="Enter validation code"
                                        bg={'gray.100'}
                                        border={0}
                                        color={'gray.500'}
                                        _placeholder={{
                                          color: 'gray.500'
                                        }}
                                    />

                                </div>
                            )}
                        </Stack>
                        <Button
                            onClick={onRegister}
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            color={'white'}
                            _hover={{
                              bgGradient: 'linear(to-r, red.400,pink.400)',
                              boxShadow: 'xl'
                            }}>
                            Submit
                        </Button>
                    </Box>
                    form
                </Stack>
            </Container>
        </Box>
  )
}
