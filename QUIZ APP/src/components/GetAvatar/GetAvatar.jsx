import { useState, useEffect, useContext } from 'react'
import { getUserByHandleLive } from '../../services/users.services'
import { Avatar, Center } from '@chakra-ui/react'
import AppContext from '../../context/AuthContext'
import PropTypes from 'prop-types'

const GetAvatar = ({ handle, size }) => {
  const [avatar, setAvatar] = useState()
  const { userData } = useContext(AppContext)

  useEffect(() => {
    getUserByHandleLive(handle, setAvatar)
  }, [handle])

  return (
        <>
            {userData &&
                (<Center>< Avatar src={avatar} size={size} /></Center>)
            }
        </>
  )
}
GetAvatar.propTypes = {
  handle: PropTypes.string,
  size: PropTypes.string
}
export default GetAvatar
