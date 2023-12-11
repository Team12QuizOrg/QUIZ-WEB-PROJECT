import { useState, useContext } from 'react'
import { deletePhoto, upload } from '../../services/photo.services'
import AppContext from '../../context/AuthContext'
import { Input, Button, useToast, Tooltip, HStack } from '@chakra-ui/react'

const UploadPhoto = () => {
  const { userData } = useContext(AppContext)
  const toast = useToast()
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange (e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleClick () {
    upload(photo, userData, setLoading).then((res) =>
      toast({
        description: 'Photo added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    )
  }
  function handleDelete () {
    deletePhoto(userData, setLoading).then((res) =>
      toast({
        description: 'Photo removed successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    )
  }

  return (
    <>
     <Tooltip label={'Choose photo from your files & Press Upload'} fontSize="md">
      <Input
        type="file"
        onChange={handleChange}
        placeholder="Min: 5"

        border={'1px'}
        borderColor={'grey'}
      />
      </Tooltip>
      <HStack m={'2'} ml={'20'}>
      <Button disabled={loading || !photo} onClick={handleClick} bg={'brand.200'}>
        Upload
      </Button>
      <Button disabled={loading || photo} onClick={handleDelete} >
        Delete photo
      </Button>
      </HStack>
    </>
  )
}
export default UploadPhoto
