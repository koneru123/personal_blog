import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

const IndividualBlog = ({blogInfo}) => {
    const { _id, title, body, author, date } = blogInfo;
    //debugger;
    const history = useHistory();
    const handleDeleteClick = () => {
        axios.delete(`/api/posts/delete/${_id}`, 
        { 
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        })
        .then(res => {
            history.push('/blog');
        })
        .catch(err => console.error(err))
    };
    return (
        <IndividualBlogContainer>
            <div className="title">
                <h1>{title}</h1>
                <div className="description">
                    {body}
                </div>
                <div className="createdDate">
                    <div>Created by: {author}</div>
                    <div>{date}</div>
                </div>
                <div className="updateDeleteBtns">
                    <span className="editBtn"><Link to={{                   
                        pathname: "/post/create",
                        blogInfo: blogInfo
                        }}><button>Edit</button></Link></span>
                    <span className="deleteBtn" onClick={handleDeleteClick}><button>Delete</button></span>
                </div>
            </div>
        </IndividualBlogContainer>
    )
}

export default IndividualBlog;