

import { Stack, HStack, Text, Heading, Spacer, useBreakpointValue, Box } from '@chakra-ui/react';
import { MdEmail } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";

const UserInfo = ({ currentUser }) => {
    const includeSpacer = useBreakpointValue({ base: false, md: true });


    return (
        <>

            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                align={{ base: 'start', md: 'center' }}
            >
                <HStack align="center">
                    <Box as={FaHouseUser} fontSize="xl" ml={5} />
                    <Heading fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>
                        {currentUser.firstName} {currentUser.lastName}
                    </Heading>
                </HStack>
                {includeSpacer && <Spacer />}
                <HStack align="center">
                    <Box as={MdEmail} fontSize="xl" />
                    <Heading fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} mr={5}>
                        {currentUser.email}
                    </Heading>
                </HStack>

            </Stack>
            {currentUser.caption && (
                <Text textAlign={{ base: 'start', md: 'start' }} textStyle="caption" color="blue.400">
                    {currentUser.caption}
                </Text>
            )}
        </>
    );
};

export default UserInfo;