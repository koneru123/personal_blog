import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import BlogPostForm from './BlogPostForm.jsx';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    background-color: green;
    padding: 20px;
    border-radius: 5px;
    font-size: 25px;
    color: white;
    font-weight: bold;
    justify-content: space-between;
    .navigationTitle {
        justify-content: start;
    }
    .navBarBtn {
        justify-content: end;
        button {
            padding: 10px;
            width: 95px;
            border-radius: 5px;
            font-size: 15px;
        }
    }
`;

class App extends React.Component {
    
    render() {
        return(
            <Router>
                <div>
                    <Nav>
                        <div className="navigationTitle">
                            Blog and Vlog
                        </div>
                        <div className="navBarBtn">
                            <button><Link to="/login">Login</Link></button>
                        </div>
                    </Nav>
                </div>
                <Switch>
                    <Route exact path="/" component={LoginForm}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/signup" component={SignupForm}/>
                    <Route path="/blog" component={BlogPostForm}/>
                </Switch>
            </Router>
        );       
    }
}

export default App;