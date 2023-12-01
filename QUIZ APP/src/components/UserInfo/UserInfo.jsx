

import { HStack, Text, Heading, Spacer, } from '@chakra-ui/react';


const UserInfo = ({ currentUser }) => {


    return (
        <>

            <HStack>
                <Heading textAlign={"start"} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}> {currentUser.firstName}{' '}{currentUser.lastName}</Heading>
                <Spacer></Spacer>
                <Heading textAlign={"start"} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}> {currentUser.email}</Heading>
            </HStack>
            {currentUser.caption && <Text textAlign={"start"} >
                {currentUser.caption}
            </Text>
            }


        </>
    );
};

export default UserInfo;