import React, {Component, useEffect, useState} from 'react'
import { post } from 'axios';
import {BrowserRouter as Router, NavLink, Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function Universities(props) {
    const initialState = { Username: '', Password: ''}
    const [User, setSignup] = useState(initialState) 
    
    function handleChange(event) { 
        //setSignup({...User, [event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) { 
        // event.preventDefault();     
        // if(!User.title || !User.content ) return 
        // async function postSignup() {
        // try {
        //     const response = await post('/api/Users', User); 
        //     props.history.push(`/Users/${response.data._id}`);  
        // } catch(error) {
        //     console.log('error', error);
        // }
        // }
        // postSignup();
    }
    
    function handleCancel() {
        //props.history.push("/Users");
    }

    return (
        <Card className="card-login card-elevation3">
            <Card.Body>
                <Card.Text>
                <b>Sign in</b> or <a href = "/SignUp">Sign up</a>
                </Card.Text>
                <form onSumbit={handleSubmit}>
                <div className="form-group signin-form">
                    <div className="container text-success">
                        <div className="row sm-4 md-4 lg-4">
                            <div className="col control-label ">
                                
                                    <br/>
                                    <Form.Control name="Username" placeholder="Username" rows="1" value={setSignup.content} onChange={handleChange} className="form-control" />
                                    <br/>
                                    <Form.Control type="password" name="Password" placeholder="Password" rows="1" value={setSignup.content} onChange={handleChange} className="form-control" />
                                
                                    <div className="row sm-4 md-4 lg-4 row-offset-sm-5 submit-btn">
                                        <div className="col col-offset-sm-4 btn-group">
                                            <button type="button" value="Submit" className="btn btn-primary cardbtn">Sign in</button>
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

export default Universities;