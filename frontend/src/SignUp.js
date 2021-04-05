import React, {useState} from 'react'
import {NavLink} from 'react-router-dom';
import './App.css';
import 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import API from './API';


function Signup(props) {
    const initialState = { username: '', user_pw: '', full_name: '', uni_name: '', email: '' }
    const [User, setSignup] = useState(initialState) 
    
    function handleChange(event) { 
        setSignup({...User, [event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) { 
        event.preventDefault();
        let action = props.register ? API.register : API.authenticate;
        action(User).then(x => {
            if (x) {
                props.setUser(x);
                props.history.push('/');
            } else {
                console.log("Error Authenticating " + User)
            }
        });
    }
    
    return (
        <Card className="card-signup card-elevation3">
            <Card.Body>
                {
                    props.register ?
                    <Card.Text>
                        <NavLink exact activeClassName="active" to="/LogIn">Sign in</NavLink> or <b>Sign up</b>
                    </Card.Text> 
                    :
                    <Card.Text>
                        <b>Sign in</b> or <NavLink exact activeClassName="active" to="/SignUp">Sign up</NavLink>
                    </Card.Text>
                }
                <form>
                    <div className="form-group signup-form">
                        <div className="container text-success">
                            <div className="row sm-4 md-4 lg-4">
                                <div className="col control-label ">
                                    {props.register?
                                    <div>
                                        <Form.Control name="full_name" placeholder="Your name" rows="1" value={setSignup.content} onChange={handleChange} className="form-control" />
                                        <br/>
                                        <Form.Control name="uni_name" placeholder="University name" rows="1" value={setSignup.content} onChange={handleChange} className="form-control" />
                                        <br/>
                                        <Form.Control name="email" placeholder="School email" rows="1" value={setSignup.content} onChange={handleChange} className="form-control" />
                                        <br/>                                       
                                    </div>
                                    :""}
                                    <Form.Control name="username" placeholder="Username" rows="1" value={setSignup.content} onChange={handleChange} className="form-control" />
                                    <br/>
                                    <Form.Control type="password" name="user_pw" placeholder="Password" rows="1" value={setSignup.content} onChange={handleChange} className="form-control" />
                                    <div className="row sm-4 md-4 lg-4 row-offset-sm-5 submit-btn">
                                        <div className="col col-offset-sm-4 btn-group">
                                            <button className="btn btn-primary cardbtn" onClick={handleSubmit}>{props.register?"Register":"Sign in"}</button>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                     </div>
                </form>
            </Card.Body>
        </Card>
    )
}

export default Signup;