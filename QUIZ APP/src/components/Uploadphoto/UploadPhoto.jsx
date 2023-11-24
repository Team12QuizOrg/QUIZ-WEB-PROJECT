import { useEffect, useState } from "react";
import { upload } from "../../services/photo.services";
import { useContext } from "react";
import AppContext from "../../context/AuthContext";
import {

    Image,
    Input,
    Button,
} from '@chakra-ui/react'

const UploadPhoto = () => {
    const { userData } = useContext(AppContext);

    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    function handleClick() {
        upload(photo, userData, setLoading);
        console.log(userData);
    }

    useEffect(() => {
        if (userData?.photoURL) {
            setPhotoURL(userData.photoURL);
        }
    }, [userData])

    return (
        <>
            <Input type="file" onChange={handleChange} variant="filled"
                focusBorderColor="black"
                bg="brand.300"
                placeholder="Min: 5"
                color={'brand.400'}
                border={'1px'}
                borderColor={'brand.400'} />
            <Button disabled={loading || !photo} onClick={handleClick} color='black' >Upload</Button>
            <Image src={photoURL} alt="Avatar" className="avatar" width={70} height={70} />
        </>
    );
}
export default UploadPhoto;