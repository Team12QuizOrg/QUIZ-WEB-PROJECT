import { useState, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { useContext } from 'react';
import { addFeedback } from '../../services/feedback.services';
import { VStack, HStack, Box, IconButton, Tooltip, Modal, Heading, Text, Input, Stack, List, ListItem, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Textarea, FormControl, Button, } from '@chakra-ui/react';
import { addGroup, getAllGroupMembers, getLiveTeamMembers, getGroupOwner, deleteGroupMember } from '../../services/groups.services';
import GetAvatar from '../GetAvatar/GetAvatar';
import AddGroupMember from '../AddGroupMember/AddGroupMember';
import { FaTrash } from 'react-icons/fa';


const GroupInfo = ({ isOpen, onClose, selectedGroup }) => {
    const { userData } = useContext(AppContext)
    const { groupId, groupName } = selectedGroup;
    const [groupMembers, setGroupMembers] = useState([])
    const [owner, setOwner] = useState()
    useEffect(() => {
        getGroupOwner(groupId).then((res) => setOwner((res)));
    }, []);
    useEffect(() => {
        const liveMembers = getLiveTeamMembers((data) => {
            setGroupMembers(data)
        }, groupId);

        return () => {
            liveMembers();
        };
    }, [groupId]);
    const handleDeleteMember = (groupId, groupName, member) => {
        deleteGroupMember(groupId, groupName, member)
            .then(() => alert("User removed"))

    }

    return (
        <>


            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader color={'black'} fontSize={['0.8em', '1em', '1.2em']} align={'center'} justify={'center'} textTransform='uppercase'>{groupName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody color={'black'}>
                        <Heading color={'black'} fontSize={['0.8em', '1em', '1.2em']}> Owner </Heading>
                        <VStack style={{
                            border: '2px solid grey', borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }} p={2} mt={4} mb={6}>
                            <Box h={10}
                                w={10} mt={2}>
                                <GetAvatar handle={owner} /></Box>
                            <Text color={'brand.200'} align={'center'}>{owner}</Text>
                        </VStack>
                        <Heading color={'black'} fontSize={['0.8em', '1em', '1.2em']}> Members </Heading>
                        <List color="white" fontSize={['0.8em', '1em', '1.2em']} spacing={4} mt={4} mb={6}>
                            <Stack maxW={'250px'} direction={'row'} align={'center'} justify={'center'} >
                                {groupMembers && groupMembers.map((member) => (
                                    <ListItem key={member} style={{
                                        border: '2px solid grey', borderRadius: "10px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                    }} p={5}>
                                        <VStack align="center"  >
                                            <Box h={10}
                                                w={10} mt={2}>
                                                <GetAvatar handle={member} />
                                            </Box>
                                            <HStack >
                                                <Text color={'brand.200'} align={'center'}>{member}</Text>

                                                {userData.handle === owner && member !== owner && (
                                                    <Tooltip label="Delete Member">
                                                        <IconButton
                                                            size='xs'
                                                            icon={<FaTrash />}
                                                            colorScheme="red"

                                                            onClick={() => handleDeleteMember(groupId, groupName, member)}
                                                        />
                                                    </Tooltip>
                                                )}
                                            </HStack>
                                        </VStack>
                                    </ListItem>
                                ))}
                            </Stack>
                        </List>
                        {userData.handle === owner &&
                            < Box mb={6}>
                                <Heading color={'black'} fontSize={['0.8em', '1em', '1.2em']}> Add Member: </Heading>
                                <AddGroupMember group={groupName} groupId={groupId} currentMembers={groupMembers} ></AddGroupMember>
                            </Box>
                        }
                    </ModalBody>
                </ModalContent>
                <ModalCloseButton></ModalCloseButton>
            </Modal>

        </>
    );
};

export default GroupInfo;