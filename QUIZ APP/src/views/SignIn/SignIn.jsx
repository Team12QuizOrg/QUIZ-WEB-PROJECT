import React from "react";
import './SignIn.css';
import AppContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import { loginUser } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

export default function SignIn() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const { setContext } = useContext(AppContext);

    const navigate = useNavigate();

    const updateForm = (field) => (e) => {
        setForm({
            ...form,
            [field]: e.target.value,
        });
    }

    const onLogin = () => {
        if (!form.email) {
            alert('Email is required');
            return;
        }
        if (!form.password && form.password.length < 6) {
            alert('Password is required and must be at least 6 characters long');
            return;
        }

        loginUser(form.email, form.password)
            .then(credential => {
                setContext({
                    user: credential.user
                });
            })
            .then(() => {
                navigate('/');
            })
            .catch((err) => alert('Invalid password or email'));
    }
    const handleReset = () => {
        navigate("/reset")
    }


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('brand.100', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} color={'brand.200'}>Sign in to your account</Heading>
                    <Box >
                        to enjoy all of our cool <Text bgGradient="linear(to-r, red.400,pink.400)" bgClip="text" fontSize={'lg'} color={'gray.600'}>features</Text> ✌️
                    </Box>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel color={'brand.200'}>Email address</FormLabel>
                            <Input color={'brand.400'} type="email" value={form.email} onChange={updateForm('email')} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel color={'brand.200'}>Password</FormLabel>
                            <Input color={'brand.400'} type="password" value={form.password} onChange={updateForm('password')} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'end'}>

                                <Text onClick={handleReset} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">Forgot password?</Text>
                            </Stack>
                            <Button
                                onClick={onLogin}
                                fontFamily={'heading'}
                                cursor={'pointer'}
                                mt={8}
                                w={'full'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                color={'white'}
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}