import { Button } from '@chakra-ui/react'
import { StarIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { makeAdmin, blockUser, unBlockUser } from '../../../services/users.services'
import PropTypes from 'prop-types'

const AdminButtons = ({ currentUser }) => {
  const handleBlock = (handle) => {
    blockUser(handle)
  }
  const handleAdmin = (handle) => {
    makeAdmin(handle)
  }
  const handleUnblock = (handle) => {
    unBlockUser(handle)
  }

  return (
        <>
            <Button onClick={() => handleAdmin(currentUser.handle)} flex='1' variant='ghost' leftIcon={<StarIcon />}>
                Make Admin
            </Button>
            <Button onClick={() => currentUser.isBlocked
              ? handleUnblock(currentUser.handle)
              : handleBlock(currentUser.handle)} flex='1' variant='ghost' leftIcon={<NotAllowedIcon />}>
                {currentUser.isBlocked ? 'Unblock user' : 'Block user'}
            </Button>
        </>
  )
}
AdminButtons.propTypes = {
  currentUser: PropTypes.object
}
export default AdminButtons
