import { useState, useContext } from 'react'
import { upload } from '../../services/photo.services'
import AppContext from '../../context/AuthContext'
import { Input, Button, useToast } from '@chakra-ui/react'

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
        description: 'Member added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    )
  }

  return (
    <>
      <Input
        type="file"
        onChange={handleChange}
        placeholder="Min: 5"
        color={'brand.400'}
        border={'1px'}
        borderColor={'brand.400'}
      />
      <Button disabled={loading || !photo} onClick={handleClick} color="black">
        Upload
      </Button>
    </>
  )
}
export default UploadPhoto
