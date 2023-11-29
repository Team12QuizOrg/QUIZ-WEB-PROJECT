import { useState, useEffect } from 'react';

import { VStack, Text, Heading, Stack, StackDivider, Box, useDisclosure } from '@chakra-ui/react';
import { addGroup, } from '../../services/groups.services';
import { NotAllowedIcon } from '@chakra-ui/icons'
import GroupInfo from '../GroupInfo/GroupInfo';
import { getLiveUsersGroups } from '../../services/groups.services';
const ListGroup = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedGroup, setSelectedGroup] = useState({ groupId: '', groupName: '' });
    const [usersGroups, setUsersGroups] = useState([])


    useEffect(() => {
        const u2 = getLiveUsersGroups((data) => {
            setUsersGroups(data)
        }, user.handle);

        return () => {
            u2();
        };
    }, [user.handle]);
    const handleOpen = (groupId, groupName) => {
        console.log(groupId)
        console.log(groupName)
        setSelectedGroup({ groupId, groupName });
        onOpen();
    };

    return (
        <>
            {usersGroups && usersGroups.map((group) => (

                <VStack spacing='4' key={group[0]} divider={<StackDivider />}  >
                    <Box>
                        {/* <Text color={"black"}> {groupMembers}</Text> */}
                        <Heading size='xs' textTransform='uppercase' onClick={() => { handleOpen(group[0], group[1]) }}>
                            <NotAllowedIcon />  {group[1]}
                        </Heading>
                    </Box>
                    <StackDivider />
                </VStack>

            ))}
            {isOpen && (
                <GroupInfo isOpen={isOpen} onClose={onClose} selectedGroup={selectedGroup} />
            )}
        </>
    );
};

export default ListGroup;