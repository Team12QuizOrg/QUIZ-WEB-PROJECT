import { useState, useEffect } from 'react';
import { ITEMS_PER_PAGE } from '../../common/constants';
import { VStack, HStack, Text, Heading, Stack, StackDivider, Box, Button, useDisclosure, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, } from '@chakra-ui/icons'
import { MdGroup } from 'react-icons/md'; // Assuming you are using react-icons

import GroupInfo from '../GroupInfo/GroupInfo';
import { getLiveUsersGroups } from '../../services/groups.services';
const ListGroup = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedGroup, setSelectedGroup] = useState({ groupId: '', groupName: '' });
    const [usersGroups, setUsersGroups] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroups, setCurrentGroups] = useState();
    const indexOfLastGroup = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstGroup = indexOfLastGroup - ITEMS_PER_PAGE;

    useEffect(() => {
        const groups = getLiveUsersGroups((data) => {
            setUsersGroups(data)

        }, user.handle);


        return () => {
            groups();
        };
    }, [user.handle]);

    useEffect(() => {

        setCurrentGroups(usersGroups.slice(indexOfFirstGroup, indexOfLastGroup));
    }, [currentPage, usersGroups]);


    const handleOpen = (groupId, groupName) => {
        setSelectedGroup({ groupId, groupName });
        onOpen();
    };


    return (
        <>
            {currentGroups && currentGroups.map((group) => (

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
            {usersGroups.length > ITEMS_PER_PAGE && (
                <Box align={'center'}>
                    <IconButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} icon={<ArrowBackIcon />} variant='outline' />
                    <IconButton onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastGroup >= usersGroups.length} icon={<ArrowForwardIcon />} variant='outline' />
                </Box>
            )}
        </>
    );
};

export default ListGroup;