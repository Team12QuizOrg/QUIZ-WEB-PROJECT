import { logoutUser } from '../../services/auth.services'
import { useContext } from 'react'
import AppContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import GetAvatar from '../GetAvatar/GetAvatar'
import { Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { PiHardDrives } from 'react-icons/pi'
import { IoPersonCircle } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import AddButton from '../AddButton/AddButton'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode'
export default function NavUser () {
  const { user, userData, setContext } = useContext(AppContext)
  const navigate = useNavigate()
  const onLogout = () => {
    logoutUser().then(() => {
      setContext({
        user: null,
        userData: null
      })
    })
  }

  return (
        <>
            {user === null && (
                <>
                    <AddButton
                        bg={'brand.100'}
                        onClick={() => navigate('/signin')}
                    >
                        Sign In
                    </AddButton>
                    <AddButton
                        bg={'brand.200'}
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </AddButton>
                </>
            )}
            {user !== null && (
                <>
                    <>
                        <Menu>
                            <MenuButton

                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                            >
                                {userData
                                  ? (
                                    <GetAvatar handle={userData.handle} />
                                    )
                                  : (
                                      'My profile'
                                    )}
                            </MenuButton>

                            <MenuList>
                                <ToggleColorMode ></ToggleColorMode>
                                <MenuItem

                                    onClick={() => navigate(`/${userData.handle}`)}
                                    color={'brand.200'}
                                    fontWeight={'bold'}
                                    _hover={{
                                      textDecoration: 'none',
                                      color: 'brand.100',
                                      bg: 'brand.200'
                                    }}
                                >
                                    <IoPersonCircle />

                                    My Profile
                                </MenuItem>

                                <MenuDivider />
                                {userData && userData.isAdmin && (
                                    <>
                                        <MenuItem

                                            onClick={() => navigate('/adminPanel')}
                                            color={'brand.200'}
                                            fontWeight={'bold'}
                                            _hover={{
                                              textDecoration: 'none',
                                              color: 'brand.100',
                                              bg: 'brand.200'
                                            }}
                                        >
                                            <PiHardDrives />
                                            Admin panel
                                        </MenuItem>
                                        <MenuDivider />
                                    </>
                                )}
                                <MenuItem
                                    onClick={onLogout}
                                    color={'brand.200'}
                                    fontWeight={'bold'}
                                    _hover={{
                                      textDecoration: 'none',
                                      color: 'brand.100',
                                      bg: 'brand.200'
                                    }}
                                ><LuLogOut />
                                    Log Out

                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </>
                </>
            )
            }
        </>
  )
}
