import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

function EventInfo() {
    return(
        <Container fluid>
            <Row>
                <Col sm={4}>
                    <h2> Find your organization </h2>
                    <Organization/>
                </Col>
                <Col sm={8}>
                    <h1> Upcoming Events </h1>
                    <Event/>
                </Col>
            </Row>
        </Container>
    );
}

function Organization() {
    return(
        <Form>
        <Form.Row>
            <Col sm={5}>
                <Form.Control placeholder="Organization Name" />
            </Col>
            <Col sm={5}>
                 <Form.Control placeholder="School Name" />
            </Col>
            <Col sm={2}>
                 <button type="button" className="btn btn-secondary">Search</button>
            </Col>
        </Form.Row>
        <Form.Row>

        </Form.Row>
        </Form>
    );
}



function Event() {
    return(
        <Form>

        </Form>
    );
}

export default EventInfo;