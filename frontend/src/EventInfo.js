import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ChatBox from './ChatBox'
import API from './API';

function EventInfo(props) {
    const[event, setEvent] = useState({});
    useEffect(() => {
        API.getEvent(props.match.params.id).then(
            (response) => { 
                setEvent(response);
            });
    }, [])

    return(
        <Container fluid>
        <Row className="event-page">
            <Col sm={6} className = "col-filter">
                <h1>{event.event_name} </h1>
                <p><div dangerouslySetInnerHTML={{ __html:event.description}} /></p>
                <p><b>Date and Time:</b> {event.date} </p>
                {event.location?
                <p><b>Location:</b>  {event.location.location_name} </p>:""}
                <p><b>Contact Information:</b> {event.contact_email} , {event.contact_phone}</p>
             </Col>
            
            <Col sm={6} className = "col-results">
                <div className="event-wrapper">
                    <h2> Reviews </h2>
                    <div className="cardDiv card-elevation3">
                    <Card>
                    <Card.Body>
                        <ChatBox/>
                    </Card.Body>
                    </Card>
                </div>
                </div>
            </Col>
        </Row>
    </Container>

 );
}

export default EventInfo;