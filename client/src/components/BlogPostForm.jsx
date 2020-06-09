import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogPostFormContainer = styled.div`
    .createBlogBtn button {
        margin-top: 20px;
        padding: 5px;
    }
`;

const BlogPostForm = () => {
    return (
        <BlogPostFormContainer>
            <div className="createBlogBtn">
                <button onClick>Create a blog post</button>
            </div>
        </BlogPostFormContainer>
    )
}

export default BlogPostForm

