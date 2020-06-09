import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import axios from 'axios';

const SignUpFormContainer = styled.div`
    display: flex;
    justify-content: center; 
    flex: 1 1 auto;
    margin-top: 20px;
`;

const SignUpContainer = styled.div`
    display: flex;
    border: 1px solid green;
    justify-content: center; 
    flex-direction: column;
    border-radius: 4px;
    padding:20px;
    .signupTitle {
        text-align: center;
    }
    .email, .password, .username, .submitBtn {
        margin: 20px 60px 10px 20px;
        font-size: 15px;
    }
    .email input, 
    .password input,
    .username input {
        display: block;
    }
    label {
        flex-grow: 0;
    }
    input {
        display: block;
        width: 100%;    
        padding: .375rem .75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: .25rem;
        transition: border-color .15s
    }
    .submitBtn button {
        padding: 10px;
        font-size: 12px;
    }
`;

const SignupForm = () => {
    const history = useHistory();
    const [initialObject, setInitialObject] = useState({
        user_name: '',
        email: '',
        password: ''
    });
    const handleInputChange = (event) => {
        const { name, value } = event && event.target;  
        setInitialObject({
            ...initialObject,
            [name]: value
        });
    };
    const submitForm = (event) => {
        event.preventDefault();
        axios.post('api/users/signup', initialObject)
        .then(res => {
            // console.log(res)
            const { data } = res;
            history.push('/login');
        })
        .catch(err => console.err(err))
    }
    return (
        <SignUpFormContainer>
            <SignUpContainer>
                <div className="signupTitle">
                    <h1>SignUp</h1>
                </div>
                <div className="username">
                    <label>Username </label>
                    <input type="username" name="user_name" id="username" onChange={handleInputChange}></input>
                </div>
                <div className="email">
                    <label>Email </label>
                    <input type="email" id="email" name="email" onChange={handleInputChange}></input>
                </div> 
                <div className="password">
                    <label>Password </label>
                    <input type="password" id="password" name="password" onChange={handleInputChange}></input>
                </div>
                <div className="submitBtn">
                    <button onClick={submitForm}>Submit</button>
                    <p>Do you have an account already? <Link to={'/login'}>click here</Link></p>
                </div>
            </SignUpContainer>
        </SignUpFormContainer>
    )
}

export default SignupForm;