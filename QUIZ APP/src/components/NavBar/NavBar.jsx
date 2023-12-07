import { useMediaQuery, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Box, Flex, HStack, Button, useDisclosure, Spacer } from '@chakra-ui/react'
import { ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons'
import SearchQuizzes from '../SearchQuizzes/SearchQuizzes'
import NavLinks from '../NavLinks/NavLinks'
import NavUser from '../NavUser/NavUser'
import { useColorMode } from '@chakra-ui/color-mode'
import NavLogo from '../NavLogo/NavLogo'
export default function NavBar () {
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { colorMode } = useColorMode()
  return (
    <Box>
      <Flex align="center" justify="space-evenly" mt={10}>
        {isSmallerThan800
          ? (
          <><Button
            display={['block', 'block', 'none']}
            alignItems={['left', 'left', 'none']}
            onClick={onOpen}
            variant={'link'}
            fontSize={['xl', 'xl', '4xl']}
            ml={10}
          >
            <HamburgerIcon />
          </Button>
            <Spacer></Spacer>
            <NavLogo />
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader>
                  <Button onClick={onClose} variant={'link'} fontSize={'xl'} color={'brand.400'}>
                    <ChevronRightIcon />
                  </Button>
                </DrawerHeader>
                <DrawerBody>
                  <NavUser></NavUser>
                  <NavLinks display={['block', 'block', 'none']} />
                  <SearchQuizzes />
                </DrawerBody>
              </DrawerContent>
            </Drawer></>
            )
          : (
          <><NavLogo />
            <NavLinks display={['none', 'none', 'block']}></NavLinks><HStack spacing="10px" display={['none', 'none', 'flex']}>
              <Spacer></Spacer>
              <SearchQuizzes />
              <Spacer></Spacer>
              <NavUser></NavUser>
            </HStack></>
            )}
      </Flex >
    </Box >
  )
}
