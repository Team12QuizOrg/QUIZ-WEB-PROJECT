import { useState, useEffect } from 'react';
import AppContext from '../../context/AuthContext';
import { useContext } from 'react';
import { addFeedback } from '../../services/feedback.services';
import { IconButton, Tooltip, Modal, Heading, Text, Input, Stack, List, ListItem, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Textarea, FormControl, Button, } from '@chakra-ui/react';
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
                <ModalContent>
                    <ModalHeader color={'black'}>{groupName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody color={'black'}>
                        <Heading color={'black'} fontSize={['0.8em', '1em', '1.2em']}> Owner </Heading>
                        <Stack >

                            <GetAvatar handle={owner} />
                            <Text color={'brand.200'} align={'center'}>{owner}</Text>
                        </Stack>
                        <Heading color={'black'} fontSize={['0.8em', '1em', '1.2em']}> Members </Heading>
                        <List color="white" fontSize={['0.8em', '1em', '1.2em']} spacing={4} mt={6} >
                            <Stack maxW={'250px'} direction={'row'} align={'center'} justify={'center'}>
                                {groupMembers && groupMembers.map((member) => (
                                    <ListItem key={member}>

                                        <GetAvatar handle={member} />
                                        <Text color={'brand.200'} >{member}<Tooltip label="Delete Member">
                                            <IconButton
                                                icon={<FaTrash />}
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={() => handleDeleteMember(groupId, groupName, member)}
                                                display={userData.handle === owner && member !== owner ? 'flex' : 'none'}
                                            />
                                        </Tooltip></Text>
                                    </ListItem>
                                ))}
                            </Stack>
                        </List>
                        {userData.handle === owner &&
                            <>
                                <Heading color={'black'} fontSize={['0.8em', '1em', '1.2em']}> Add Member: </Heading>
                                <AddGroupMember group={groupName} groupId={groupId} currentMembers={groupMembers} ></AddGroupMember>
                            </>
                        }
                    </ModalBody>
                </ModalContent>
                <ModalCloseButton></ModalCloseButton>
            </Modal>

        </>
    );
};

export default GroupInfo;