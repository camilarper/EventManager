import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import API from './API';
import Modal from 'react-modal'
import noevent from './noevent.png';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

function Home() {
    const [events, setEvents] = useState([]);
    const [categList, setCategList] = useState([]);
    const [univ, setUniv] = useState("");
    const [org, setOrg] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categ, setCateg] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false)

    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');      
        return month + '/' + day + '/' + year;
    }

    useEffect(() => {
        API.getCategories().then(
            (resp) => { 
                setCategList(resp.map((x, i) => <option key={i} value={x}>{x}</option>));
                var date = new Date();
                setStartDate(getFormattedDate(date))
                date.setDate(date.getDate() + 1);
                setEndDate(getFormattedDate(date))
                doSearch();
            });
    }, [])

    function doSearch(){
        const list = API.getEvents({univ, org, startDate, endDate, categ});
        setEvents(list.length ? list.map((item) => <Event key={item.id} data={item}/>) :
        <div>
        <img className="notFoundImg" src={noevent} alt="empty state" />
        <h2 className="not-found">No match found</h2>
        </div> );
    }

    return(
        <Container fluid>
            <Row className="event-page">
                <Col sm={4} className = "col-filter">
                    <h2> Filter by </h2>
                    <div className="cardDiv card-elevation3">
                        <Card>
                        <Card.Body>
                        <table>
                            <tbody>
                            <tr>
                                <th>University: </th>
                                <td>
                                    <Form.Control placeholder="University Name" value={univ} onChange={(x) => setUniv(x.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th>Organization: </th>
                                <td>
                                    <Form.Control placeholder="Organization Name" value={org} onChange={(x) => setOrg(x.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <th>Start Date: </th>
                                <td>
                                    <Form.Control value={startDate} onChange={(x) => setStartDate(x.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <th>End Date: </th>
                                <td>
                                    <Form.Control value={endDate} onChange={(x) => setEndDate(x.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <th>Category: </th>
                                <td>
                                    <Form.Control as="select" value={categ} onChange={(x) => setCateg(x.target.value)}>
                                        <option value="">All</option>
                                        {categList}
                                    </Form.Control>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </Card.Body>
                        </Card>
                    </div>
                    <button type="button" className="btn btn-primary btn-search" onClick={doSearch}>Search</button>
                    <a type="button" className="btn btn-success btn-search" href="#" role="button" onClick={() => setModalIsOpen(true)}> Create New Event</a>
                </Col>
                <Modal isOpen={modalIsOpen} 
                        shouldCloseOnOverlayClick={(true)} 
                        onRequestClose={() => setModalIsOpen(false)}
                        
                        style={{
                            overlay: {backgroundColor: 'rgba(112,128,144,0.90)'},
                            content: {height: '75%', width: '80%'}
                        }}>
                        <div className="modal-org">
                            <table className="table-new-event">
                                <tbody>
                                <tr><td>
                                    <tr><th> New Event </th></tr>
                                    <tr><Form.Control placeholder="Event Title" value={org}/></tr>
                                    <tr>
                                        <Form.Control as="select" value={categ} >
                                            <option value="">Category</option>
                                            {categList}
                                        </Form.Control>
                                    </tr>
                                    <tr><Form.Control as="textarea"placeholder="Event Description" rows={3} /></tr>
                                    <tr><Form.Control value={startDate}/></tr>
                                    <tr><Form.Control placeholder="Event Time" value={org}/></tr>
                                    <tr><br/></tr>
                                    <tr><th> Contact Info: </th></tr>
                                    <tr><Form.Control placeholder="Phone Number" value={org}/></tr>
                                    <tr><Form.Control placeholder="Email Adress" value={org}/></tr>
                                    
                                    <tr><br/></tr>
                                </td>
                                <td>
                                    
                                <img className="notFoundImg" src={noevent} alt="empty state" />
                                </td></tr>
                                </tbody>
                            </table>
                            <button className="btn btn-primary btn-modal" onClick={() => setModalIsOpen(false)}> Close </button>
                        </div>
                    </Modal>
                <Col sm={8} className = "col-results">
                    <div className="event-wrapper">
                        <h2> Upcoming Events </h2>
                        {events}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

function Event({data}) {
    return(
        <div className="cardDiv card-elevation3">
            <Card>
            <Card.Header as="h5">{data.title}</Card.Header>
            <Card.Body>
                {/*<Card.Title>Subtitle</Card.Title>*/}
                <Card.Text>
                Event location: -
                {data.location}
                <a type="button" className="btn btn-primary cardbtn" href="/EventInfo"> Event Details </a>
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}

export default Home;