import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import SignUpForm from './SignupForm.jsx'
import axios from 'axios';

const LoginFormContainer = styled.div`
    display: flex;
    justify-content: center; 
    flex: 1 1 auto;
    margin-top: 20px;
`;
const FormContainer = styled.div`
    display: flex;
    border: 1px solid green;
    justify-content: center; 
    flex-direction: column;
    border-radius: 4px;
    padding:20px;
    .loginTitle {
        text-align: center;
    }
    .email, .password, .submitBtn {
        margin: 20px 60px 10px 20px;
        font-size: 15px;
    }
    .email input, 
    .password input {
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

const LoginForm = () => {
    const history = useHistory();
    const [initialObject, setInitialObject] = useState({
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
    //console.log(initialObject);
    const submitForm = (event) => {
        event.preventDefault();
        console.log(initialObject);
        axios.post('api/users/login', initialObject)
        .then(res => {
            // console.log(res)
            const { data } = res;
            const { token } = data;
            if (token) {
                localStorage.setItem('authToken', token);
                history.push('/blog');
            }
        })
        .catch(err => console.err(err))
    }
    return (
            <LoginFormContainer>
                <FormContainer>
                    <div className="loginTitle">
                        <h1>Login</h1>
                    </div>
                    <div className="email">
                        <label>Email </label>
                        <input type="email" name="email" onChange={handleInputChange}></input>
                    </div>
                    <div className="password">
                        <label>Password </label>
                        <input type="password" name="password" onChange={handleInputChange}></input>
                    </div>
                    <div className="submitBtn">
                        <button type="submit" onClick={submitForm}>Submit</button>
                        <p>Don't have an account? You can create one, <Link to={'/signup'}>click here</Link></p>
                    </div>
                </FormContainer>
            </LoginFormContainer>
    )
}

export default LoginForm;