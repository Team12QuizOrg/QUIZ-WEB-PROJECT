'use client'

import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../../context/AuthContext'
export default function HomeButtons () {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()
  return (
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={
                'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text fontWeight={'bold'}
                        lineHeight={1.1}
                        fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                        color={'brand.100'}>
                        Join our community
                        <Text as={'span'} bgGradient={'linear(to-r, red.400,pink.400)'} bgClip={'text'} fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} >
                            &
                        </Text>{' '}
                        become quiz master!
                    </Text>
                    <Stack direction={'row'}>
                        { !user && <Button
                            onClick={() => navigate('/signin')}
                            bg={'whiteAlpha.300'}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'blue.500' }}>
                            Sign In
                        </Button>}
                        {!user && <Button
                            onClick={() => navigate('/signup')}
                            bg={'blue.400'}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'whiteAlpha.500' }}>
                            Sign Up
                        </Button>}
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
  )
}
