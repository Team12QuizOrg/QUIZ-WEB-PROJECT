import { useState } from 'react'
import { editUser } from '../../services/users.services'
import { SettingsIcon } from '@chakra-ui/icons'
import { Modal, Text, Box, ModalOverlay, ModalContent, ModalHeader, IconButton, ModalBody, ModalCloseButton, useDisclosure, Input, Button } from '@chakra-ui/react'
import UploadPhoto from '../Uploadphoto/UploadPhoto'
import PropTypes from 'prop-types'
import AddButton from '../AddButton/AddButton'

export default function EditProfile ({ user, originalFirstName, originalLastName, originalPhone, originalCaption, onEditProfile }) {
  const [editedFirstName, setEditedFirstName] = useState(originalFirstName)
  const [editedLastName, setEditedLastName] = useState(originalLastName)
  const [editedCaption, setEditedCaption] = useState(originalCaption)
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(originalPhone)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCancel = () => {
    setEditedFirstName(originalFirstName)
    setEditedLastName(originalLastName)
    setEditedCaption(originalCaption)
    setEditedPhoneNumber(originalPhone)
    onClose()
  }

  const handleSubmitEdit = () => {
    const updatedUserData = {
      firstName: editedFirstName,
      lastName: editedLastName,
      caption: editedCaption,
      phone: editedPhoneNumber
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
              border={'1px'}
              borderColor={'brand.200'}
              type="text"
              placeholder={originalFirstName || 'Add first name'}
              value={editedFirstName}
              onChange={(e) => setEditedFirstName(e.target.value)}
            />
            <Input
              border={'1px'}
              borderColor={'brand.200'}
              placeholder={originalLastName || 'Add last name'}
              value={editedLastName}
              onChange={(e) => setEditedLastName(e.target.value)}
            />
            <Input
              border={'1px'}
              borderColor={'brand.200'}
              placeholder={originalPhone || 'Add phone number'}
              value={editedPhoneNumber}
              onChange={(e) => setEditedPhoneNumber(e.target.value)}
              mt={2}
            />
            <Input
              border={'1px'}
              borderColor={'brand.200'}
              placeholder={originalCaption || 'Add caption'}
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              mt={2}
            />
             <Box border={'1px'} borderColor={'brand.200'} rounded={'10'} mt={7} >
            <Text color={'brand.200'} m={2} fontWeight={'bold'}> Upload photo:</Text>

            <UploadPhoto ></UploadPhoto>
            </Box>
            <Box m={5} align={'center'}>
              <AddButton onClick={handleCancel} color={'brand.200'}>Cancel</AddButton>
              <AddButton onClick={handleSubmitEdit} bg={'brand.200'}>Submit</AddButton>
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
  originalPhone: PropTypes.string,
  onEditProfile: PropTypes.func
}
