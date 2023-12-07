import { useState } from 'react'
import { editUser } from '../../services/users.services'
import { SettingsIcon } from '@chakra-ui/icons'
import { Modal, Text, Box, ModalOverlay, ModalContent, ModalHeader, IconButton, ModalBody, ModalCloseButton, useDisclosure, Input, Button } from '@chakra-ui/react'
import UploadPhoto from '../Uploadphoto/UploadPhoto'
import PropTypes from 'prop-types'

export default function EditProfile ({ user, originalFirstName, originalLastName, originalCaption, onEditProfile }) {
  const [editedFirstName, setEditedFirstName] = useState(originalFirstName)
  const [editedLastName, setEditedLastName] = useState(originalLastName)
  const [editedCaption, setEditedCaption] = useState(originalCaption)
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCancel = () => {
    setEditedFirstName(originalFirstName)
    setEditedLastName(originalLastName)
    setEditedCaption(originalCaption)
    onClose()
  }

  const handleSubmitEdit = () => {
    const updatedUserData = {
      firstName: editedFirstName,
      lastName: editedLastName,
      caption: editedCaption,
      phoneNumber: editedPhoneNumber
    }
    onEditProfile(updatedUserData)
    editUser(user, updatedUserData)
      .then((updatedUser) => {

      })
      .catch((error) => {
        console.error('Error editing user:', error)
      })
    onClose()
  }

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
                            placeholder={originalFirstName || 'Add first name'}
                            value={editedFirstName}
                            onChange={(e) => setEditedFirstName(e.target.value)}
                        />
                        <Input
                            color={'brand.400'}
                            placeholder={originalLastName || 'Add last name'}
                            value={editedLastName}
                            onChange={(e) => setEditedLastName(e.target.value)}
                        />
                        <Input
                            color={'brand.400'}
                            placeholder={originalCaption || 'Add caption'}
                            value={editedCaption}
                            onChange={(e) => setEditedCaption(e.target.value)}
                        />
                        <Text color={'brand.200'} mt={7}> Upload photo:</Text>
                        <UploadPhoto></UploadPhoto>
                        <Box m={5} align={'center'}>
                            <Button onClick={handleCancel} color={'brand.200'}>Cancel</Button>
                            <Button onClick={handleSubmitEdit} bg={'brand.200'}>Submit</Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
  )
}

EditProfile.propTypes = {
  user: PropTypes.string,
  originalFirstName: PropTypes.string,
  originalLastName: PropTypes.string,
  originalCaption: PropTypes.string,
  onEditProfile: PropTypes.func
}
