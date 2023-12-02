import { useState, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { useContext } from 'react';
import { addFeedback } from '../../services/feedback.services';
import { VStack, Grid, HStack, Box, IconButton, Tooltip, Modal, Heading, Text, Input, Stack, List, ListItem, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Textarea, FormControl, Button, } from '@chakra-ui/react';
import { addGroup, getAllGroupMembers, getLiveTeamMembers, getGroupOwner, deleteGroupMember } from '../../services/groups.services';
import GetAvatar from '../GetAvatar/GetAvatar';
import AddGroupMember from '../AddGroupMember/AddGroupMember';
import { MdOutlineGroupRemove } from "react-icons/md";


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
                        <Grid templateColumns={`repeat(3, 1fr)`} gap={4} mt={4} mb={6}>
                            {groupMembers && groupMembers.map((member) => (
                                <VStack key={member} style={{
                                    border: '2px solid grey', borderRadius: "10px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }} p={5}  >
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
                                                    icon={<MdOutlineGroupRemove />}
                                                    colorScheme="red"

                                                    onClick={() => handleDeleteMember(groupId, groupName, member)}
                                                />
                                            </Tooltip>
                                        )}
                                    </HStack>
                                </VStack>

                            ))}
                        </Grid>
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