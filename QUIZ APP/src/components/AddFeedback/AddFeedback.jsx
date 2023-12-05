import { useState } from 'react';
import AppContext from '../../context/AuthContext';
import { useContext } from 'react';
import { addFeedback } from '../../services/feedback.services';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Textarea, FormControl, Button, } from '@chakra-ui/react';

const AddFeedback = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [feedback, setFeedback] = useState('');
    const { userData } = useContext(AppContext);

    const handleOpen = () => {
        if (!userData || !userData.isBlocked) {
            onOpen();
        }
    };

    const handleInputChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addFeedback(feedback, userData.handle);
        setFeedback('');
        onClose();
    };

    return (
        <>
            {userData && userData.isBlocked ? (
                <p className="blocked-user-message">User is blocked and cannot comment.</p>
            ) : (
                <>
                    <Button bg={'brand.200'} mr={3} onClick={handleOpen}> Give us Feedback </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Feedback</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <form className="comment-container" onSubmit={handleSubmit}>
                                    <FormControl>
                                        <FormLabel>Add your feedback here...</FormLabel>
                                        <Textarea
                                            color={'brand.400'}
                                            type="text"
                                            placeholder="If you want to share your experience or have any recommendations ... feel free to do it here! "
                                            value={feedback}
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


export default AddFeedback;