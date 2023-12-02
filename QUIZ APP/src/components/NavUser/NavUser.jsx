import { logoutUser } from "../../services/auth.services";
import { useContext, } from "react";
import AppContext from "../../context/AuthContext";
import { useNavigate, } from "react-router-dom";
import GetAvatar from "../GetAvatar/GetAvatar";
import { Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, } from "@chakra-ui/react";
import { PiHardDrives } from "react-icons/pi";
import { IoPersonCircle } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
export default function NavUser() {
    const { user, userData, setContext, } = useContext(AppContext);
    const navigate = useNavigate();
    const onLogout = () => {
        logoutUser().then(() => {
            setContext({
                user: null,
                userData: null,
            });
        });
    };

    return (
        <>
            {user === null && (
                <>
                    <Button
                        variant="solid"
                        color="green"
                        fontSize={['sm', 'sm', '1.5em']}
                        onClick={() => navigate("/signin")}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="solid"
                        color="yellow.500"
                        fontSize={['sm', 'sm', '1.5em']}
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </Button>
                </>
            )}
            {user !== null && (
                <>
                    <>
                        <Menu>
                            <MenuButton

                                as={Button}
                                rounded={"full"}
                                variant={"link"}
                                cursor={"pointer"}
                                minW={0}
                            >
                                {userData ? (
                                    <GetAvatar handle={userData.handle} />
                                ) : (
                                    "My profile"
                                )}
                            </MenuButton>

                            <MenuList>
                                <MenuItem


                                    onClick={() => navigate(`/${userData.handle}`)}
                                    color={"brand.200"}
                                    fontWeight={"bold"}
                                    _hover={{
                                        textDecoration: "none",
                                        color: "brand.100",
                                        bg: "brand.200",
                                    }}
                                >
                                    <IoPersonCircle />

                                    My Profile
                                </MenuItem>

                                <MenuDivider />
                                {userData && userData.isAdmin && (
                                    <>
                                        <MenuItem

                                            onClick={() => navigate(`/adminPanel`)}
                                            color={"brand.200"}
                                            fontWeight={"bold"}
                                            _hover={{
                                                textDecoration: "none",
                                                color: "brand.100",
                                                bg: "brand.200",
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
                                    color={"brand.200"}
                                    fontWeight={"bold"}
                                    _hover={{
                                        textDecoration: "none",
                                        color: "brand.100",
                                        bg: "brand.200",
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
    );
}
