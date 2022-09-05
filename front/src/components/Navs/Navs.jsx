import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HOME, USER_PROFILE } from '../../constants/routes';
import { IconButton, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import ChatIcon from '@material-ui/icons/Chat';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ChatsIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import DvrIcon from '@material-ui/icons/Dvr';
import LightThemeIcon from '@material-ui/icons/Brightness5';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import Profile from '@material-ui/icons/PermIdentity';
import SettingsIcon from '@material-ui/icons/Settings';
import BrushIcon from '@material-ui/icons/Brush';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import { useSelector, useDispatch } from 'react-redux';
import { userLogOut, updateUser } from '../../redux/actions/user';
import axios from 'axios';
import './Navs.scss';

const Navs = () => {
    const { user } = useSelector((state) => state.user);
    const { avatar, name, surname, email, theme } = user
    const [toggle, setToggle] = useState(false);
    const [toggleTheme, setToggleTheme] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(userLogOut(history))
    }
    useEffect(() => {
        if(theme === "light") setToggleTheme(false);
        else if (theme === "dark") setToggleTheme(true);
    }, [theme])

    const changeTheme = () => {
        const thisTheme = toggleTheme ? "light" : "dark"
        dispatch(updateUser("theme", thisTheme))
    }

    return (
        <nav className="navbar">
            <div className="navbar--container">
                <ul className="nav--item--list">
                    <li className="nav--item">
                        <Link to={HOME}>
                            <HomeIcon />
                            Home
                        </Link>
                    </li>
                    <li className="nav--item">
                        <Link to={HOME}>
                            <ImageIcon />
                            Images
                        </Link>
                    </li>
                    <li className="nav--item">
                        <Link to={HOME}>
                            <MovieIcon />
                            Video
                        </Link>
                    </li>
                    <li className="nav--item">
                        <Link to={HOME}>
                            <ChatIcon />
                            Chats
                        </Link>
                    </li>
                    <li className="nav--item user--menu">
                        <IconButton onClick={() => setToggle(!toggle)}>
                            <img src={avatar} alt="avatar" />
                        </IconButton>
                    </li>
                    {toggle && (
                        <div className="dropp--down--user--menu">
                            <div className="user--info--section">
                                <div className="avatar--block">
                                    <img alt="avatar" src={avatar} />
                                </div>
                                <div className="display--name--block">
                                    <p className="display--name">{name} {surname}</p>
                                    <p className="email">{email}</p>
                                </div>
                            </div>
                            <ul className="dropdown--menu--items--list">
                                <li className="dropdown--menu--item">
                                    <Link to={HOME}>
                                        <PhotoLibraryIcon />
                                        Images
                                    </Link>
                                </li>
                                <li className="dropdown--menu--item">
                                    <Link to={HOME}>
                                        <VideoLibraryIcon />
                                        Videos
                                    </Link>
                                </li>
                                <li className="dropdown--menu--item">
                                    <Link to={HOME}>
                                        <ChatsIcon />
                                        Chats
                                    </Link>
                                </li>
                                <li className="dropdown--menu--item">
                                    <Link to={HOME}>
                                        <PeopleIcon />
                                        Friends
                                    </Link>
                                </li>
                                <li className="dropdown--menu--item">
                                    <Link to={HOME}>
                                        <DvrIcon />
                                        News
                                    </Link>
                                </li>
                            </ul>
                            <ul className="dropdown--menu--items--list">
                                <li className="dropdown--menu--item">
                                    <Link to={USER_PROFILE}>
                                        <Profile />
                                        Profile
                                    </Link>
                                </li>
                                <li className="dropdown--menu--item">
                                    <Link to={HOME}>
                                        <SettingsIcon />
                                        Settings
                                    </Link>
                                </li>
                                <li className="dropdown--menu--item flex--item">
                                    <p>
                                        <BrushIcon />
                                        Theme
                                    </p>
                                    <IconButton
                                        onClick={() => {
                                            changeTheme()
                                        }}
                                    >
                                        {toggleTheme && <LightThemeIcon />}
                                        {!toggleTheme && <DarkThemeIcon />}
                                    </IconButton>
                                </li>
                            </ul>
                            <div className="log--out--block">
                                <Button onClick={logOut}>
                                    Log Out
                                    <LogOutIcon/>
                                </Button>
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navs