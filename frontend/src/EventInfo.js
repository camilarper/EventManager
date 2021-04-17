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

function EventInfo() {
    return(
        <Container fluid>
        <Row className="event-page">
            <Col sm={6} className = "col-filter">
                <h2> Event Title </h2>
                
             </Col>
            
            <Col sm={6} className = "col-results">
                <div className="event-wrapper">
                    <h2> Chat box </h2>
                    <div className="cardDiv card-elevation3">
                    <Card>
                    <Card.Body>
                    <table>
                        <tbody>
                        <tr>
                           
                        </tr>
                        </tbody>
                    </table>
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