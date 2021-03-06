import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';

const ShowBlogsContainer = styled.div`

`;

const BlogBtn = styled.div`
    display: flex;
    margin-top: 20px;
    button {
        padding: 6px;
        font-size: 15px;
    }
`;

const UnorderedList = styled.ul`
    display: flex;
    flex-direction: row;
    padding-left: 0px;
    flex-wrap: wrap;
    li {
        list-style-type: none;
        margin: 10px;
        padding: 10px;
        .blogTitle {
            display: block;
            text-align: center;
            margin-bottom: 20px;
            font-size: 18px;
        }
        .blogDate {
            display: block;
        }
    }
    .blogCard {
        box-shadow: 2px 2px 2px 2px rgba(30, 130, 76, 1);
        transition: 0.6s;
        padding: 10px;
    }
    .blogCard:hover {
        box-shadow: 0 8px 16px 0 rgba(30, 130, 76, 1);
      }
`;

const ShowBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get('/api/posts', { 
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        })
        .then(res => setBlogs(res.data))
        .catch(err => console.error(err))
    }, []);

    const renderBlogs = () => {
        return blogs.map((blog, idx) => { 	
            const date = Date(blog.date);
            const formattedDate = Moment(date).format("LL");
            return (
                <Link to={{
                        pathname: "/id",
                        blogInfo: blog
                    }}>
                    <li key={'blog-'+idx}> 
                    <div className="blogCard">
                        <div className="blogTitle">{blog.title}</div> 
                        <div className="blogDate">
                            <span>Posted On: </span>{formattedDate}
                        </div>
                    </div>
                    </li>
                </Link>
            )
        });
    }
    return (
        <ShowBlogsContainer>
            <BlogBtn className="createBlogBtn"><button><Link to="/post/create">Create a blog post</Link></button></BlogBtn>
            <UnorderedList className="blogsList">
                { renderBlogs() }
            </UnorderedList>
        </ShowBlogsContainer>
            

    )
}

export default ShowBlogs;