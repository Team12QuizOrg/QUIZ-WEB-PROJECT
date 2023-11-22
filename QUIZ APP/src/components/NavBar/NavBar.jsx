import './NavBar.css';
import { Form, NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/auth.services';
import { useState, useContext } from 'react';
import AppContext from '../../context/AuthContext';

export default function NavBar() {
    const { user, userData, setContext } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const onLogout = () => {
        logoutUser()
            .then(() => {
                setContext({
                    user: null,
                    userData: null,
                });
            });
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <nav className='navigation'>
            <div className='navigation-menu'>
                {/* TODO: Click on Logo -> Home Page */}
                <NavLink to='/home' className='navigation-link'>Home</NavLink>
                <NavLink to='/forum' className='navigation-link'>Quizzes</NavLink>
                <NavLink to='/about' className='navigation-link'>About</NavLink>
            </div>
            <div className='buttons-nav'>
                {user === null && (
                    <>
                        <NavLink to='/signin' className='navigation-link'>Sign In</NavLink>
                        <NavLink to='/signup' className='navigation-link'>Sign Up</NavLink>
                    </>
                )}
                {user !== null && (
                    <>
                        <div className='user-dropdown'>
                            <button className='user-button' onClick={toggleDropdown}>
                                {userData ? userData.firstName + " " + userData.lastName : 'My profile'}
                            </button>
                            {userData ? <img src={userData.photoURL}
                                alt="User Avatar"
                                className="avatar-image"
                                width={50}
                                height={50}
                            /> : null}
                            {showDropdown && (
                                <div className='dropdown-content'>
                                    {<NavLink to='/:profile'>My Profile</NavLink>}
                                    {/* <p className="my-profile" onClick={() => navigate(`/${(userData.handle)}`)}>My Profile</p> */}

                                    <NavLink onClick={onLogout} to='/home'>Log Out</NavLink>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}