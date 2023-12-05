import { useState, useEffect } from "react";
import { getUserByHandle, getUserByHandleLive } from "../../services/users.services";
import { Avatar, Center } from '@chakra-ui/react'
import { useContext } from "react";
import AppContext from "../../context/AuthContext";

const GetAvatar = ({ handle, size }) => {
    const [avatar, setAvatar] = useState()
    const { userData } = useContext(AppContext)

    useEffect(() => {
        getUserByHandleLive(handle, setAvatar)
    }, [handle]);

    return (
        <>
            {userData &&
                (<Center>< Avatar src={avatar} size={size} /></Center>)
            }
        </>

    )
}
export default GetAvatar;