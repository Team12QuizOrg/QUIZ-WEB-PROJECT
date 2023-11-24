import { useState, useEffect } from "react";
import { getUserByHandle } from "../../services/users.services";
import { Avatar } from '@chakra-ui/react'

const GetAvatar = (handle) => {
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        getUserByHandle({ ...handle })
            .then((res) => {
                if (res.exists()) {
                    const userData = res.val();
                    setAvatar(userData.photoURL);
                    console.log(avatar)
                }
            })
            .catch((err) => console.error('error fetching user: ', err));
    }, []);

    return (
        < Avatar src={avatar} mb={2} />
    )
}
export default GetAvatar;