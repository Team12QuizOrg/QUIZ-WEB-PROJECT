import SearchBar from '../SearchBar/SearchBar'
import {
  HStack,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  Button,
  Flex
} from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import { getAllUserData, sendInvitation } from '../../services/users.services'
import { MdOutlineGroupAdd } from 'react-icons/md'
import AppContext from '../../context/AuthContext'
import PropTypes from 'prop-types'

export default function InviteStudents ({ quizId }) {
  const [searchResults, setSearchResults] = useState(null)
  const { userData } = useContext(AppContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUserData()
      .then((res) => {
        const students = res.filter((user) => user.userType === 'student')
        setUsers(students)
      })
      .catch((err) => console.error('error fetching posts: ', err))
  }, [])

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

  return (
    <>
    <Flex align="center">
      <SearchBar
        searchingFor={users}
        onSearchResults={handleSearchResults}
        selectedOption="username"
      />
      <Popover onClose={() => setSearchResults(null)}>
        <PopoverTrigger>
          <Button margin={'8px'}>Invite</Button>
        </PopoverTrigger>
        {searchResults && searchResults.length > 0 && (
          <PopoverContent justifySelf={'right'} >
            {searchResults.map((user) => (

              <HStack
                key={user.id}

                onClick={() => {
                  sendInvitation(userData.handle, quizId, user.handle)
                  setSearchResults(null)
                }}
                cursor="pointer"
              >
                <PopoverHeader color={'brand.400'} fontWeight={'bold'}>
                  {user.handle}
                </PopoverHeader>
                <Spacer></Spacer>
                <MdOutlineGroupAdd />
              </HStack>
            ))}
          </PopoverContent>
        )}
      </Popover>
      </Flex>
    </>
  )
}
InviteStudents.propTypes = {
  quizId: PropTypes.string
}
