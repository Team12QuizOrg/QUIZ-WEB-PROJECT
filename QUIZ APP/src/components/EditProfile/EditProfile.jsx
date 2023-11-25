
import { useContext, useState } from 'react';
import { editUser } from '../../services/users.services';
//import Button from '../Button/Button';
import AppContext from '../../context/AuthContext';
import { SettingsIcon } from '@chakra-ui/icons'
import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, IconButton, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Input, Textarea, FormControl, Button, } from "@chakra-ui/react"
import UploadPhoto from '../Uploadphoto/UploadPhoto';
//import PropTypes from "prop-types";

export default function EditProfile({ user, originalFirstName, originalLastName, originalCaption, onEditProfile }) {

    const [editedFirstName, setEditedFirstName] = useState(originalFirstName);
    const [editedLastName, setEditedLastName] = useState(originalLastName);
    const [editedCaption, setEditedCaption] = useState(originalCaption)
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    // const { userData } = useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure();



    const handleCancel = () => {

        setEditedFirstName(originalFirstName);
        setEditedLastName(originalLastName);
        setEditedCaption(originalCaption)
        onClose();
    };

    const handleSubmitEdit = () => {
        const updatedUserData = {
            firstName: editedFirstName,
            lastName: editedLastName,
            caption: editedCaption,
            phoneNumber: editedPhoneNumber,
        };
        onEditProfile(updatedUserData);
        editUser(user, updatedUserData)
            .then((updatedUser) => {

            })
            .catch((error) => {
                console.error("Error editing user:", error);
            });
        onClose();
    };

    return (
        <>
            <IconButton
                onClick={onOpen}
                variant='ghost'
                colorScheme='gray'
                aria-label='See menu'
                icon={<SettingsIcon />} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            color={'brand.400'}
                            type="text"
                            placeholder={originalFirstName}
                            value={editedFirstName}
                            onChange={(e) => setEditedFirstName(e.target.value)}
                        />
                        <Input
                            color={'brand.400'}
                            placeholder={originalLastName}
                            value={editedLastName}
                            onChange={(e) => setEditedLastName(e.target.value)}
                        />
                        <Input
                            color={'brand.400'}
                            placeholder={originalCaption}
                            value={editedCaption}
                            onChange={(e) => setEditedCaption(e.target.value)}
                        />
                        <Text color={'brand.200'}> Upload photo:</Text>
                        <UploadPhoto></UploadPhoto>
                        {/* {userData.isAdmin && (
                                <Input
                                    placeholder="Edit Phone Number"
                                    value={editedPhoneNumber}
                                    onChange={(e) => setEditedPhoneNumber(e.target.value)}
                                />
                            )} */}

                        <Button onClick={handleCancel} >Cancel</Button>
                        <Button onClick={handleSubmitEdit} >Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>



        </>
    );
}
