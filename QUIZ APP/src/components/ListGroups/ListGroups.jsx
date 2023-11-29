import { useState, useEffect } from 'react';

import { VStack, HStack, Text, Heading, Stack, StackDivider, Box, useDisclosure } from '@chakra-ui/react';
import { addGroup, } from '../../services/groups.services';
import { MdGroup } from 'react-icons/md'; // Assuming you are using react-icons

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
                        <HStack align="center">
                            <MdGroup size={20} style={{ marginRight: '8px' }} />
                            <Heading size='xs' textTransform='uppercase' onClick={() => { handleOpen(group[0], group[1]) }}>
                                {group[1]}
                            </Heading>
                        </HStack>
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