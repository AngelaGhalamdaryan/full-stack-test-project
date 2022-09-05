import React, { useEffect, useState } from "react";
import { Navs, Container } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Popup from 'reactjs-popup';
import { updateUser } from "../../redux/actions/user";
import axios from "axios";
import './Profile.scss';

const Profile = () => {
    const { avatar, name, surname, theme } = useSelector((state) => state.user.user);
    const [uploadFile, setUploadFile] = useState(null);
    const [localUrlPhoto, setLocalUrlPhoto] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!!uploadFile) {
            const local = URL.createObjectURL(uploadFile);
            setLocalUrlPhoto(local);
        }
    }, [uploadFile]);

    const uploadAvatar = (fileName, file, column, directory) => {
        let formData = new FormData();
        formData.append(fileName, file);
        formData.append("column", column);
        formData.append("fileName", fileName);
        formData.append("directory", directory);
        formData.append("table", "user");
        axios.put("http://localhost:8000/user/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        })
    }
    return (
        <div className={`profile--page ${theme}`}>
            <Popup open={!!uploadFile} onClose={() => setUploadFile(null)} className="popup--container">
                <div className="upload--avatar--popup">
                    <h1>Upload Avatar</h1>
                    <img src={localUrlPhoto} />
                    <div className="btn--group">
                        <Button variant="contained" color="primary" onClick={() => setUploadFile(null)}>Close</Button>
                        <Button onClick={() => uploadAvatar('avatar', uploadFile, 'avatar', 'avatars')}>Save</Button>
                    </div>
                </div>
            </Popup>
            <Navs />
            <div className="cover--image--section" />
            <Container className="profile--container flex">
                <div className="left--column">
                    <div className="avatar--section">
                        <img src={avatar} alt="avatar" />
                        <input
                            accept="image/*"
                            className="upload--photo"
                            id="contained-button-file"
                            multiple
                            type="file" 
                            onChange={(e) => {
                                setUploadFile(e.target.files[0])
                            }}
                        />
                        <label htmlFor="contained-button-file" className="upload--btn">
                            <IconButton variant="contained" color="primary" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                </div>
                <div className="right--column">

                </div>
            </Container>
        </div>
    );
};

export default Profile;