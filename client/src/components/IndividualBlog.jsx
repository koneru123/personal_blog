import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';

const IndividualBlogContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .title {
        text-align: center;
        display: block;
    }
    .description {
        margin-bottom: 20px;   
    }
    .createdDate {
        margin-bottom: 10px;
    }
    .editBtn button{
        margin-right: 20px;
        padding: 7px;
        font-size: 15px;
        border: 1px solid blue;
        color: blue;
    } 
    .deleteBtn button{
        margin-right: 20px;
        padding: 7px;
        font-size: 15px;
        border: 1px solid red;
        color: red;
    }    
`;

const IndividualBlog = () => {
    const [individualBlog, setIndividualBlog] = useState([]);
    useEffect(() => {
        axios.get('api/posts/post/id')
        .then(res => console.log('success'))
        .catch(err => console.error(err))
    }, []);

    return (
        <IndividualBlogContainer>
            <div className="title">
                <h1>Title</h1>
                <div className="description">
                    Body
                </div>
                <div className="createdDate">
                    <div>Created by: author</div>
                    <div>Date</div>
                </div>
                <div className="updateDeleteBtns">
                    <span className="editBtn"><button>Edit</button></span>
                    <span className="deleteBtn"><button>Delete</button></span>
                </div>
            </div>
        </IndividualBlogContainer>
    )
}

export default IndividualBlog;