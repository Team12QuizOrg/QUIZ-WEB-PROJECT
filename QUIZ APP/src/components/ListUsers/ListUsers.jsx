import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../services/users.services'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tfoot } from '@chakra-ui/react'
import { ITEMS_PER_PAGE_PANEL } from '../../common/constants'
import { useState } from 'react'
import Pagination from './Pagination/Pagination'
import PropTypes from 'prop-types'

export default function ListUsers ({ users, selectedOption }) {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastUser = currentPage * ITEMS_PER_PAGE_PANEL
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE_PANEL

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE_PANEL)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
        <TableContainer>
            <Table>
                <Thead>
                    <Tr color={'brand.200'}>
                        {selectedOption === 'username' && (
                            <>
                                <Th style={{ textAlign: 'left', color: 'brand.200' }}>Username</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'brand.200' }}>Created On</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'brand.200' }}>User Role</Th>
                            </>
                        )}

                        {selectedOption === 'email' && (
                            <>
                                <Th style={{ textAlign: 'left', color: 'brand.200' }}>Email</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'brand.200' }}>Created On</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'brand.200' }}>User Role</Th>
                            </>
                        )}

                        {selectedOption === 'first-name' && (
                            <>
                                <Th style={{ textAlign: 'left', color: 'brand.200' }}>First Name</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'brand.200' }}>Created On</Th>
                                <Th isNumeric style={{ textAlign: 'center', color: 'brand.200' }}>User Role</Th>
                            </>
                        )}
                    </Tr>
                </Thead>
                    <Tbody>
                        {currentUsers.map((user) => (
                            <Tr
                                color={'brand.200'}
                                key={user.handle}
                                onClick={() => navigate(`/${user.handle}`)}
                            >
                                <Td style={{ width: '500px' }}>
                                    {selectedOption === 'username'
                                      ? user.handle
                                      : selectedOption === 'email'
                                        ? user.email
                                        : user.firstName}
                                </Td>
                                <Td style={{ width: '500px', textAlign: 'center', color: 'brand.400' }}>
                                    {formatDate(user.createdOn)}
                                </Td>
                                <Td style={{ textAlign: 'center', color: 'brand.400' }}>
                                    {user.userType ? user.userType : '-'}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td colSpan={3}>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </Td>
                        </Tr>
                    </Tfoot>
            </Table>
        </TableContainer>
  )
}

ListUsers.propTypes = {
  users: PropTypes.array,
  selectedOption: PropTypes.string
}
