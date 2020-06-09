import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
const qs = require('qs');

const BlogPostFormContainer = styled.div`
    display: flex;
    margin-left: 20px;
    .createBlogBtn button {
        margin-top: 20px;
        padding: 5px;
    }
`;

const FormContainer = styled.div`
    margin-top: 20px;
    font-size: 15px;
    .title {
        font-size: 15px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    . description {
        font-size: 15px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .description input {
        height: 200px;
    }
    label {
        flex-grow: 0;
    }
    input {
        display: block;
        width: 200%;    
        padding: .375rem .75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: .25rem;
        transition: border-color .15s;
        margin-top: 10px;
    }
    .postFormSubmit button {
        padding: 10px;
        margin-top: 20px;
        font-size: 12px;
    }
`;

const BlogPostForm = () => {
    const history = useHistory();
    const [initialObject, setInitialObject] = useState({
        title: '',
        body: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event && event.target;
        setInitialObject({
            ...initialObject,
            [name]: value
        });
    };

    const createPost = (event) => {
        event.preventDefault();
        //console.log(initialObject);
        axios.post('/api/posts/create', qs.stringify(initialObject), 
        { 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('authToken')
            }
        })
        .then(res => {
            history.push('/blog');
        })
        .catch(err => console.error(err))
    };

    return (
        <BlogPostFormContainer>
            <div className="BlogContainer">
                 <FormContainer>
                     <form>
                        <div className="title">
                            <label>Title </label>
                            <input type="title" name="title" onChange={handleInputChange}></input>
                        </div>
                        <div className="description">
                            <label>Description </label>
                            <input type="description" name="body" onChange={handleInputChange}></input>
                        </div>
                        <div className="postFormSubmit">
                            <button onClick={createPost}>Submit</button>
                        </div>
                     </form>
                 </FormContainer>
            </div>
        </BlogPostFormContainer>
    )
}

export default BlogPostForm;

