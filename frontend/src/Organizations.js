import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Modal from 'react-modal'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import API from './API';
import noevent from './noevent.png';

function Organizations(props) {
    const [orgList, setOrgList] = useState([]);
    const [univ, setUniv] = useState({});
    const [org, setOrg] = useState("");
    const [myOrg, setMyOrg] = useState(true);
    
    const [modalOrgIsOpen, setModalOrgIsOpen] = useState(false);
    const [modalEventIsOpen, setModalEventIsOpen] = useState(false);
    
    const emptyEvent = { rso_id: 0, event_name: '', event_type: '', category:'', description: '', date: '', contact_phone: '', contact_email: '' , latitude: '' , longitude: '' , locationName: '' }
    const [newEvent, setNewEvent] = useState(emptyEvent) 
    
    function handleNewEventChange(event) { 
        setNewEvent({...newEvent, [event.target.name]: event.target.value})
    }    
    function handleOrgOpenModal(org_id) { 
        setNewEvent({...newEvent, rso_id: org_id})
        setModalEventIsOpen(true)
    }

    function createEvent(){
        API.createEvent(newEvent);
    }

    useEffect(() => {
        API.getUserInfo(props.user.user_id).then(
            (resp) => { 
                setUniv(resp.univ)
                doSearch();
            });
    }, [])

    function doSearch(){
        const list = API.getOrgs({org, myOrg, user_id: props.user.user_id});
        setOrgList(list.length ? list.map((item) => <Orgs key={item.rso_id} data={item} openModal={() => handleOrgOpenModal(item.rso_id)}/>) :
        <div>
        <img className="notFoundImg" src={noevent} alt="empty state" />
        <h2 className="not-found">No match found</h2>
        </div> );
    }

    const [inputFields, setInputFields] = useState([{ schoolEmail: '' }]);

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ schoolEmail: ''});
        setInputFields(values);
      };
    
      const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
      };

    return(
        <Container fluid>
            <Row className="event-page">
                <Col sm={4} className = "col-filter">
                    <h2> Filter by </h2>
                    <div className="cardDiv card-elevation3">
                        <Card>
                        <Card.Body>
                        <table className="table-full">
                            <tbody>
                            <tr>
                                <th>Organization: </th>
                                <td>
                                    <Form.Control placeholder="Name" value={org} onChange={(x) => setOrg(x.target.value)}/>
                                </td>
                            </tr>
                            <tr></tr>
                            <tr>
                                <th> </th><td>
                                <Form>
                                    <Form.Check 
                                        onChange={(x) => setMyOrg(x.target.checked)}
                                        checked={myOrg}
                                        type="switch"
                                        id="custom-switch"
                                        label="My Organizations Only"
                                    />
                                </Form></td>
                            </tr>
                            </tbody>
                        </table>
                        </Card.Body>
                        </Card>
                    </div>
                    <button type="button" className="btn btn-primary btn-search" onClick={doSearch}>Search</button>
                    <a type="button" className="btn btn-success btn-search" href="#" role="button" onClick={() => setModalOrgIsOpen(true)}> Register a new Organization</a>
                </Col>                         
                <Col sm={8} className = "col-results">
                    <div className="event-wrapper">
                        <h2> Organizations at {univ.uni_name} </h2>
                        {orgList}
                    </div>
                </Col>
            </Row>

            <Modal isOpen={modalOrgIsOpen} 
                        shouldCloseOnOverlayClick={(true)} 
                        onRequestClose={() => setModalOrgIsOpen(false)}
                        
                        style={{
                            overlay: {backgroundColor: 'rgba(112,128,144,0.90)'},
                            content: {height: '80%', width: '40%'}
                        }}>
                        <div className="modal-org">
                            <Form className="table-new-org">
                                <div>
                                    New Organization
                                </div>
                                <Form.Control placeholder="Organization Name" value={org}/>
                                <Form.Control as="textarea"placeholder="Organization Purpose" rows={3} />
                                <fieldset>
                                        <Form.Group as={Row}>
                                        <Col >
                                            Members (choose an administrator)
                                                {inputFields.map((inputField, index) => (
                                                <Fragment key={`${inputField}~${index}`}>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="orgMember">
                                                        <Form.Control id="userSchoolEmail" placeholder="Member's email (school)" />
                                                    </Form.Group>
                                                    <Form.Group controlId="orgAdmin">
                                                        <Form.Check type="radio" name="formHorizontalRadios"/>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <button className="btn btn-primary btn-modal" type="button" onClick={() => handleAddFields()}>
                                                            +
                                                        </button>
                                                        <button className="btn btn-primary btn-modal" type="button" onClick={() => handleRemoveFields(index)}>
                                                            -
                                                        </button>
                                                    </Form.Group>
                                                </Form.Row>
                                                </Fragment>)) }
                                        </Col>
                                        </Form.Group>
                                </fieldset>
                            </Form>
                            <button className="btn btn-primary btn-modal" onClick={() => setModalOrgIsOpen(false)}> Close </button>
                        </div>
                    </Modal>
                    

            <Modal isOpen={modalEventIsOpen} 
                        shouldCloseOnOverlayClick={(true)} 
                        onRequestClose={() => setModalEventIsOpen(false)}
                        ariaHideApp={false}
                        style={{
                            overlay: {backgroundColor: 'rgba(112,128,144,0.90)'},
                            content: {height: '85%', width: '80%'}
                        }}>
                        <div className="modal-org">
                            <table className="table-new-event">
                                <tbody>
                                <tr><td className="col50">
                                    <div> New Event </div>
                                    
                                    <Form.Control name="event_name" placeholder="Event Title" value={newEvent.event_name} onChange={handleNewEventChange}/>
                                    <Form.Control name="event_type" placeholder="Event Type" value={newEvent.event_type} onChange={handleNewEventChange}/>
                                    <Form.Control name="category" placeholder="Category" value={newEvent.category} onChange={handleNewEventChange}/>
                                    <Form.Control name="description" as="textarea" placeholder="Event Description" rows={3} value={newEvent.description} onChange={handleNewEventChange}/>
                                    <Form.Control name="date" placeholder="Event Date" value={newEvent.eventdate} onChange={handleNewEventChange}/>
                                    <br/>
                                    <div> Location: </div>
                                    <Form.Control name="locationName" placeholder="Location Name" value={newEvent.locationName} onChange={handleNewEventChange}/>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formLocation">
                                        <Form.Control name="latitude" placeholder="latitude" value={newEvent.latitude} onChange={handleNewEventChange}/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formLocation">
                                        <Form.Control name="longitude" placeholder="longitude" value={newEvent.longitude} onChange={handleNewEventChange}/>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <div> Contact Info: </div>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formLocation">
                                        <Form.Control name="contact_phone" placeholder="Phone Number" value={newEvent.contact_phone} onChange={handleNewEventChange}/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formLocation">
                                        <Form.Control name="contact_email" placeholder="Email Adress" value={newEvent.contact_email} onChange={handleNewEventChange}/>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                </td>
                                <th> TBA</th>
                                </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-primary btn-modal" onClick={createEvent}> Create </button>
                            <button className="btn btn-primary btn-modal" onClick={() => setModalEventIsOpen(false)}> Cancel </button>
                        </div>
                    </Modal>
                
        </Container>
    );
}

function Orgs({data, openModal}) {
    return(
        <div className="cardDiv card-elevation3">
            <Card>
            <Card.Header as="h5"> Organization Name: {data.contact_name}</Card.Header>
            <Card.Body>
                {/*<Card.Title>Subtitle</Card.Title>*/}
                <Card.Text>
                Short organization information
                <button type="button" className="btn btn-success cardbtn">Join</button>
                <button type="button" className="btn btn-success cardbtn" onClick={openModal}> Create New Event</button>
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}

export default Organizations;