import { useState } from 'react';
import AppContext from '../../context/AuthContext';
import { useContext } from 'react';
import { addFeedback } from '../../services/feedback.services';
import { Modal, Input, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Textarea, FormControl, Button, } from '@chakra-ui/react';
import { addGroup } from '../../services/groups.services';
const CreateGroup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupName, setGroupName] = useState('');
    const { userData } = useContext(AppContext);

    const handleOpen = () => {
        if (!userData || !userData.isBlocked) {
            onOpen();
        }
    };

    const handleInputChange = (e) => {
        setGroupName(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        addGroup(userData.handle, groupName);
        setGroupName('');
        onClose();
    };

    return (
        <>
            {userData && userData.isBlocked ? (
                <p className="blocked-user-message">User is blocked and cannot comment.</p>
            ) : (
                <>
                    <Button onClick={handleOpen} bg={'brand.200'}> Create Group</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create Group</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <form className="comment-container" onSubmit={handleSubmit}>
                                    <FormControl>
                                        <FormLabel>Group name</FormLabel>
                                        <Input
                                            color={'brand.400'}
                                            type="text"
                                            placeholder=" "
                                            value={groupName}
                                            onChange={handleInputChange}
                                            rows={15}
                                            cols={15}
                                        />
                                    </FormControl>
                                    <Button type="submit" >
                                        Submit
                                    </Button>
                                </form>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default CreateGroup;