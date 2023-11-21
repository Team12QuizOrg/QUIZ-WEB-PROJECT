import React, { useContext, useState } from 'react';
import './SignUp.css';
import AppContext from '../../context/AuthContext';
import { createUserHandle, getUserByHandle } from '../../services/users.services';
import { registerUser } from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import codes from '../../codes/codes';

export default function SignUp() {
    const { setContext } = useContext(AppContext);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        handle: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        profilePic: null, 
        userType: 'student', 
        code: '', 
    });
    const updateForm = (field) => (e) => {
        setForm({
            ...form,
            [field]: e.target.value,
        });
    }
    const onUserTypeChange = (e) => {
        const newUserType = e.target.value;
        setForm({
            ...form,
            userType: newUserType,
        });
        setShowCodeInput(newUserType === 'teacher');
    }
   
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(gmail\.com|yahoo\.com|abv\.bg)$/;
        return re.test(String(email).toLowerCase());
    }


    const onRegister = (event) => {
        event.preventDefault();
        if (!form.email) {
            alert('Email is required');
            return;
        }

        if (!validateEmail(form.email)) {
            alert('Email is not in proper format');
            return;
        }

        if (!form.handle) {
            alert('Handle is required');
            return;
        }

        if (!form.handle && form.handle.length < 4 && form.handle.length > 32) {
            alert('Handle is required and must be between 4 and 32 characters');
            return;
        }

        if (!form.password && form.password.length < 6) {
            alert('Password is required and must be at least 6 characters long');
            return;
        }
        if (!form.firstName && form.firstName.length < 4 && form.firstName.length > 32) {
            alert('First Name is required and must be between 4 and 32 characters')
        }
        if (!form.lastName && form.lastName.length < 4 && form.lastName.length > 32) {
            alert('Last Name is required and must be between 4 and 32 characters')
        }
        if(!codes.includes(form.code)) {
            alert("Invalid code!")
            return;
        }

        getUserByHandle(form.handle)
            .then(snapshot => {
                if (snapshot.exists()) {
                    throw new Error(`Handle @${form.handle} has already been taken!`);
                }

                return registerUser(form.email, form.password);
            })
            .then(credential => {
                return createUserHandle(form.handle, credential.user.uid, credential.user.email, form.firstName, form.lastName, form.phone, form.userType)
                    .then(() => {
                        setContext({
                            user: credential.user,
                        });
                    });
            })
            .then(() => {
                navigate('/');
            })
            .catch((err) => alert(err));
    }

    return (
        <div className='signup-wrapper'>
            <div className='form'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' value={form.email} onChange={updateForm('email')} />

                <label htmlFor='firstName'>First Name</label>
                <input type='text' name='firstName' id='firstName' value={form.firstName} onChange={updateForm('firstName')} />

                <label htmlFor='lastName'>Last Name</label>
                <input type='text' name='lastName' id='lastName' value={form.lastName} onChange={updateForm('lastName')} />

                <label htmlFor='handle'>Username</label>
                <input type='text' name='handle' id='handle' value={form.handle} onChange={updateForm('handle')} />

                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' value={form.password} onChange={updateForm('password')} />

                <label htmlFor='phone'>Phone</label>
                <input type='text' name='phone' id='phone' value={form.phone} onChange={updateForm('phone')} />

                <label htmlFor='profilePic'>Profile Picture</label>
                <input type='file' name='profilePic' id='profilePic' accept='image/*' onChange={updateForm('profilePic')} />

                <label htmlFor='userType'>User Type</label>
                <select name='userType' id='userType' value={form.userType} onChange={onUserTypeChange}>
                    <option value='student'>Student</option>
                    <option value='teacher'>Teacher</option>
                </select>

                {showCodeInput && (
                    <div>
                        <label htmlFor='code'>Teacher Code</label>
                        <input type='text' name='code' id='code' value={form.code} onChange={updateForm('code')} />
                    </div>
                )}

                <button onClick={onRegister}>Register</button>
            </div>
        </div>
    );
};