import { useState, useEffect } from "react";
import { getUserByHandle } from "../../services/users.services";
import { Avatar } from '@chakra-ui/react'
import { useContext } from "react";
import AppContext from "../../context/AuthContext";

const GetAvatar = ({ handle }) => {
    const [avatar, setAvatar] = useState()
    const { userData } = useContext(AppContext)

    useEffect(() => {
        getUserByHandle(handle)
            .then((res) => {
                if (res.exists()) {
                    const userData = res.val();
                    setAvatar(userData.photoURL);
                }
            })
            .catch((err) => console.error('error fetching user: ', err));
    }, [userData]);

    return (
        < Avatar src={avatar} mb={2} />
    )
}
export default GetAvatar;