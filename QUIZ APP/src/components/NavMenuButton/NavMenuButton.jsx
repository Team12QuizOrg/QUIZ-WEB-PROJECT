import { useNavigate, } from "react-router-dom";
import { MenuButton } from "@chakra-ui/react";

export default function NavMenuButton({ btnName, display }) {
    const navigate = useNavigate();

    return (
        <MenuButton
            display={display} p={1}
            fontSize={['xl', 'lg', '2xl']}

            color={'brand.400'}
            onClick={() => navigate(`/${btnName}`)}
            rounded={"lg"}
            variant={"link"}
            cursor={"pointer"}
            fontWeight={"bold"}
            _hover={{
                textDecoration: "none",
                bg: "brand.200",
            }}
            _active={{
                bg: "brand.300",
                transform: "scale(0.98)",
            }}
        >
            {btnName}
        </MenuButton>
    )
}