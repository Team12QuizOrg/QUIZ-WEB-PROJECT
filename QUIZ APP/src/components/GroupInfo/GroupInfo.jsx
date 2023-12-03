import { useState, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { VStack, Grid, HStack, Box, IconButton, Tooltip, Modal, Heading, Text, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, } from '@chakra-ui/react';
import { getLiveTeamMembers, getGroupOwner, deleteGroupMember, deleteGroup } from '../../services/groups.services';
import GetAvatar from '../GetAvatar/GetAvatar';
import AddGroupMember from '../AddGroupMember/AddGroupMember';
import { MdOutlineGroupRemove } from "react-icons/md";


const GroupInfo = ({ isOpen, onClose, selectedGroup }) => {
    const { userData } = useContext(AppContext)
    const { groupId, groupName } = selectedGroup;
    const [groupMembers, setGroupMembers] = useState([])
    const [owner, setOwner] = useState()
    const navigate = useNavigate();
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

    const handleDeleteGroup = () => {
        deleteGroup(groupMembers, userData.handle, groupId)
            .then(() => onClose())
            .catch((err) => console.error(err));
    };

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
                        <Grid templateColumns={`repeat(2, 1fr)`} gap={4} mt={4} mb={6}>
                            {groupMembers && groupMembers.map((member) => (
                                <VStack key={member} style={{
                                    border: '2px solid grey', borderRadius: "10px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                                    p={5}
                                    _hover={{
                                        textDecoration: "none",
                                        bg: "brand.100",
                                    }}

                                >
                                    <Box h={10}
                                        w={10} mt={2} >
                                        <GetAvatar handle={member} />
                                    </Box>
                                    <HStack >
                                        <Text color={'brand.200'} align={'center'} >{member}</Text>

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
                                        {groupMembers.includes(userData.handle) && userData.handle === member && <Tooltip label="Leave group">
                                            <IconButton
                                                size='xs'
                                                icon={<MdOutlineGroupRemove />}
                                                colorScheme="red"

                                                onClick={() => handleDeleteMember(groupId, groupName, member)}
                                            />
                                        </Tooltip>}
                                    </HStack>
                                </VStack>

                            ))}
                        </Grid>
                        {userData.handle === owner &&
                            < Box mb={6}>
                                <Heading color={'black'} fontSize={['0.8em', '1em', '1.2em']}> Add Member: </Heading>
                                <AddGroupMember group={groupName} groupId={groupId} currentMembers={groupMembers} ></AddGroupMember>
                                <Button
                                    style={{
                                        border: '2px solid grey', borderRadius: "10px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                    }}
                                    w="100%"
                                    size="sm"
                                    _hover={{ bg: '#427575' }}
                                    mt="10px"
                                    type="button"
                                    onClick={handleDeleteGroup}>
                                    Delete Group
                                </Button>

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