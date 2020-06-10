import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';

const IndividualBlogContainer = styled.div`
    background-image: url("./background4.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: white;
    display: flex;
    justify-content: center;
    height: 600px;
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
    const blogdate = Date(date);
    const formattedDate = Moment(blogdate).format("LL");
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
                    <div>{formattedDate}</div>
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