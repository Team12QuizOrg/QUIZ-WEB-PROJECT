

import { HStack, Text, Heading, Spacer, Flex, Box } from '@chakra-ui/react';
import { MdEmail } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";

const UserInfo = ({ currentUser }) => {


    return (
        <>

            <HStack>
                <Flex alignItems="center">
                    <Box as={FaHouseUser} fontSize="xl" mr={2} />
                    <Heading textAlign={"start"} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>
                        {currentUser.firstName} {currentUser.lastName}
                    </Heading>
                </Flex>
                <Spacer />
                <Flex alignItems="center">
                    <Box as={MdEmail} fontSize="xl" mr={2} />
                    <Heading textAlign={"start"} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>
                        {currentUser.email}
                    </Heading>
                </Flex>
            </HStack>

            {currentUser.caption && <Text textAlign={"start"} >
                {currentUser.caption}
            </Text>
            }


        </>
    );
};

export default UserInfo;