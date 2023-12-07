import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import ListUsers from '../../components/ListUsers/ListUsers'
import { getAllUserData } from '../../services/users.services'
import { Radio, RadioGroup, Stack, VStack, Text } from '@chakra-ui/react'
export default function AdminPanel () {
  // const { users } = useContext(AppContext)
  const [users, setUsers] = useState([])
  const [searchResults, setSearchResults] = useState(null)
  const [selectedOption, setSelectedOption] = useState('option1')

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

  useEffect(() => {
    getAllUserData()
      .then((res) => setUsers(res))
      .catch((err) => console.error('Problem fetching all users', err))
  }, [])
  return (
        <><>

            <RadioGroup defaultValue='username' mt={30} />
            <VStack>
                <Stack spacing={5} direction='row'>
                    <Radio

                        defaultChecked
                        name="searchOption"
                        value="username"
                        isChecked={selectedOption === 'username'}
                        onChange={() => setSelectedOption('username')}
                    > <Text > Username</Text> </Radio>

                    <Radio

                        name="searchOption"
                        value="email"
                        isChecked={selectedOption === 'email'}
                        onChange={() => setSelectedOption('email')}
                    > <Text > Email</Text> </Radio>

                    <Radio
                        color={'brand.200'}

                        name="searchOption"
                        value="first-name"
                        isChecked={selectedOption === 'first-name'}
                        onChange={() => setSelectedOption('first-name')}
                    > <Text > First name</Text> </Radio>

                </Stack>

                <SearchBar searchingFor={users}
                    onSearchResults={handleSearchResults}
                    selectedOption={selectedOption} />
            </VStack>
        </><>
                {searchResults && <ListUsers users={searchResults} selectedOption={selectedOption} />}
            </></>

  )
}
