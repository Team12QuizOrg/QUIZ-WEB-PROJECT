import React from "react";
import './SignIn.css';
import AppContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import { loginUser } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const { setContext } = useContext(AppContext);

    const navigate = useNavigate();

    const updateForm = (field) => (e) => {
        setForm({
            ...form,
            [field]: e.target.value,
        });
    }

    const onLogin = () => {
        if (!form.email) {
            alert('Email is required');
            return;
        }
        if (!form.password && form.password.length < 6) {
            alert('Password is required and must be at least 6 characters long');
            return;
        }

        loginUser(form.email, form.password)
            .then(credential => {
                setContext({
                    user: credential.user
                });
            })
            .then(() => {
                navigate('/');
            })
            .catch((err) => alert('Invalid password or email'));
    }
    const handleReset = () => {
        navigate("/reset")
    }


    return (
        <div className='signin-wrapper'>
            <div className='form'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' value={form.email} onChange={updateForm('email')} />
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' value={form.password} onChange={updateForm('password')} />
                <p className="forgot-pass" onClick={handleReset}>Forgot Password?</p>
                <button className='login-btn' onClick={onLogin} >Login</button>
            </div>
        </div>
    );
}