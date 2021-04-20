import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import './App.css';
import 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import API from './API';


function Signup(props) {
    const initialState = { username: '', user_pw: '', full_name: '', university_id: '', email: '', student_id: '' }
    const [User, setSignup] = useState(initialState) 
    const [uniList, setUniList] = useState([]);

    useEffect(() => {
        API.getUniversities().then(
            (resp) => { 
                setUniList(resp.map((x, i) => <option key={i} value={x.university_id}> {x.uni_name} </option>));
            });
    }, [])

    function handleChange(event) { 
        setSignup({...User, [event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) { 
        event.preventDefault();
        
        let action = props.register ? API.register : API.authenticate;
        action(User).then(x => {
            if (x && x.user_id) {
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
                                        <Form.Control name="student_id" placeholder="student ID" rows="1" value={setSignup.content} onChange={handleChange} className="form-control" />
                                        <br/>
                                        <Form.Control as="select" name="university_id" value={setSignup.content} onChange={handleChange}  className="form-control">
                                            <option value="">Select University</option>
                                            {uniList}
                                        </Form.Control>
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