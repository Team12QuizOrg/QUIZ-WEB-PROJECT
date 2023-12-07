import Logo2 from '../../../assets/logo2.png'
import { useNavigate } from "react-router-dom";
import { useMediaQuery, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Box, Flex, HStack, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, Spacer, Image, Heading, } from "@chakra-ui/react";
import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import SearchQuizzes from "../SearchQuizzes/SearchQuizzes";
import NavLinks from "../NavLinks/NavLinks";
import NavUser from "../NavUser/NavUser";
import { useColorMode } from '@chakra-ui/color-mode';
export default function NavLogo() {

    const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    return (

        <HStack alignItems={['center', 'center', 'center']} >
            <Image

                className="logo-image"
                src={Logo2}
                alt="logo"
                maxW={50}
                maxH={50}

                onClick={() => navigate(`/home`)}
                rounded={"full"} />
            <Heading mr={10} fontSize={['xl', '1xl', '2xl']} color={colorMode === 'dark' ? 'brand.200' : 'brand.400'}>
                Solvr
            </Heading>
        </HStack>



    );
}