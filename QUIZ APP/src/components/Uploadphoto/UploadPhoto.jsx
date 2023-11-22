import { useEffect, useState } from "react";
import { upload } from "../../services/photo.services";
import { useContext } from "react";
import AppContext from "../../context/AuthContext";

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
        <div className="fields">
            <input type="file" onChange={handleChange} />
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <img src={photoURL} alt="Avatar" className="avatar" width={70} height={70} />
        </div>
    );
}
export default UploadPhoto;