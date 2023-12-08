import { useState, useContext } from 'react'
import AppContext from '../../context/AuthContext'
import AddButton from '../AddButton/AddButton'
import {
  Modal, Input, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Box,
  FormLabel,
  FormControl,
  Button
  , useToast
} from '@chakra-ui/react'
import { addGroup } from '../../services/groups.services'

const CreateGroup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupName, setGroupName] = useState('')
  const { userData } = useContext(AppContext)
  const toast = useToast()

  const handleOpen = () => {
    onOpen()
  }

  const handleInputChange = (e) => {
    setGroupName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addGroup(userData.handle, groupName).then((res) =>
      toast({
        description: 'Group created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    )
    setGroupName('')
    onClose()
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        bg={'brand.200'}
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        {' '}
        Create Group
      </Button>
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

                  type="text"
                  placeholder=" "
                  value={groupName}
                  onChange={handleInputChange}
                  rows={15}
                  cols={15}
                />
              </FormControl>
              <Box align={'center'}>
              <AddButton type="submit" onMouseLeave={onClose} bg={'brand.200'} mt={2}>
                Submit
              </AddButton>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateGroup
