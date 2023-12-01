import { useContext } from "react";
import AppContext from "../../context/AuthContext";
import { useNavigate, } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Spacer, Icon, } from "@chakra-ui/react";
import { ChevronRightIcon, } from "@chakra-ui/icons";
import NavMenuButton from "../NavMenuButton/NavMenuButton";
export default function NavLinks({ display }) {
    const { userData, } = useContext(AppContext);
    const navigate = useNavigate();


    return (
        <><Menu>
            <NavMenuButton btnName={"Home"} display={display} />
        </Menu><Menu>
                <Menu></Menu>
                <MenuButton display={display}
                    fontSize={['xl', 'xl', '1xl']}
                    color={'brand.400'}
                    rounded={"full"}
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
                    Quizzes
                </MenuButton>
                <MenuList>
                    {NAV_ITEMS.map((navItem) => (
                        <MenuItem
                            onClick={() => navigate(`${navItem.to}`)}
                            key={navItem.to}
                        >
                            {navItem.label} <Spacer />{" "}
                            <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
            {
                userData && userData.userType === "teacher" && (
                    <Menu>
                        <NavMenuButton btnName={"QuizForm"} display={display} />

                    </Menu>
                )
            }
            <Menu>
                <NavMenuButton btnName={"About"} display={display} />
            </Menu>
        </>

    );
}

const NAV_ITEMS = [
    {
        label: "All Categories",
        to: "/quizzes/categories",
    },
    {
        label: "All Quizzes",
        to: "/quizzes/AllQuizzes",
    },
];
