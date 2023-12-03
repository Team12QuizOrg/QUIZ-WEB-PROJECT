import { logoutUser } from "../../services/auth.services";
import { useState, useContext } from "react";
import AppContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Box, Flex, HStack, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, Spacer, Image, Heading, } from "@chakra-ui/react";
import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import SearchQuizzes from "../SearchQuizzes/SearchQuizzes";
import NavLinks from "../NavLinks/NavLinks";
import NavUser from "../NavUser/NavUser";

export default function NavBar() {
  const { user, userData, setContext, openQuizzes } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <Box>
      <Flex
        h={16}
        alignItems={['center', 'center', 'center']}
        justifyContent={'space-between'}
        bg="brand.100"
        px={[4, 4, 8]}
        py={2}
      >
        <Button
          display={['block', 'block', 'none']}
          alignItems={['left', 'left', 'none']}
          onClick={onOpen}
          variant={'link'}
          fontSize={['xl', 'xl', '4xl']}
          color={'brand.400'}
        >
          <HamburgerIcon />
        </Button>
        <HStack spacing={0} alignItems={['center', 'center', 'center']}>
          <Image
            className="logo-image"
            src="assets\logo2.png"
            alt="logo"
            maxW={50}
            maxH={50}
            onClick={() => navigate(`/home`)}
            rounded={"full"}
          />
          <Heading fontSize={['xl', '1xl', '2xl']} color={"brand.400"}>
            Solvr
          </Heading>
        </HStack>
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
        </Drawer>
        <NavLinks display={['none', 'none', 'block']} ></NavLinks>
        <HStack spacing="10px" display={['none', 'none', 'flex']}>
          <Spacer />
          <SearchQuizzes />
          <Spacer />
          <NavUser></NavUser>
        </HStack>
      </Flex >
    </Box >
  );
}
