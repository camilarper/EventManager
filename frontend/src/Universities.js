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

function Universities(props) {
    const [uniList, setUniList] = useState([]);
    const [univ, setUniv] = useState({});
    const [uni, setUni] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const emptyUni = { university_id: 0, uni_name: '', location_id: '', description:''}
    const [newUni, setNewUni] = useState(emptyUni);

    function doSearch(){
        API.getOrgs({uni, user_id: props.user.user_id}).then(
            (list) => {
                setUniList(list.length ? list.map((item) => <Uni key={item.rso_id} data={item} openModal={() => openModal(item.rso_id)}/>) :
                <div>
                <img className="notFoundImg" src={noevent} alt="empty state" />
                <h2 className="not-found">No match found</h2>
                </div> );
            }
        );        
    }
    function createUni(){
        API.createUni(newUni).then(() => {
            setModalIsOpen(false)
            doSearch()
        });
    }
    function openModal(org_id) { 
        setNewUni({...emptyUni})
        setModalIsOpen(true)
    }

    
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
                                <td>
                                    <Form.Control placeholder="Name" value={uni} onChange={(x) => setUni(x.target.value)}/>
                                </td>
                            </tr>
                            <tr></tr>
                            </tbody>
                        </table>
                        </Card.Body>
                        </Card>
                    </div>
                    <button type="button" className="btn btn-primary btn-search" onClick={doSearch}>Search</button>
                    <a type="button" className="btn btn-success btn-search" href="#" role="button" onClick={() => setModalIsOpen(true)}> Create new University</a>
                </Col>                         
                <Col sm={8} className = "col-results">
                    <div className="event-wrapper">
                        <h2> Universities </h2>
                        {uniList}
                    </div>
                </Col>
            </Row>

            <Modal isOpen={modalIsOpen} 
                        shouldCloseOnOverlayClick={(true)} 
                        onRequestClose={() => setModalIsOpen(false)}
                        ariaHideApp={false}
                        style={{
                            overlay: {backgroundColor: 'rgba(112,128,144,0.90)'},
                            content: {height: '60%', width: '40%'}
                        }}>
                        <div className="modal-org">
                            <Form className="table-new-org">
                                <div>
                                    New University
                                </div>
                                <Form.Control placeholder="University Name" value={uni}/>
                                <Form.Control as="textarea"placeholder="Description" rows={3} />
                                <Form.Control placeholder="Number of Students" value=""/>
                                <Form.Control name="locationName" placeholder="Location Name" value=""/>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                        <Form.Control name="latitude" placeholder="latitude" value="" />
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                        <Form.Control name="longitude" placeholder="longitude" value=""/>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.File id="formcheck-api-custom" custom>
                                    <Form.File.Input isValid />
                                        <Form.File.Label data-browse="Upload">
                                            Upload a picture
                                        </Form.File.Label>
                                        <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                                    </Form.File>
                                
                            </Form>
                            <button className="btn btn-primary btn-modal" onClick={() => setModalIsOpen(false)}> Cancel </button>
                            <button className="btn btn-primary btn-modal" onClick={createUni}> Create </button>
                        </div>
                    </Modal>
                    

            
                
        </Container>
    );
}

function Uni({data, openModal}) {
    return(
        <div className="cardDiv card-elevation3">
            <Card>
            <Card.Header as="h5">{data.rso_name}</Card.Header>
            <Card.Body>
                <Card.Title>Short organization information</Card.Title>
                <Card.Text>
                
                {data.isAdmin
                ? <button type="button" className="btn btn-success cardbtn" onClick={openModal}> Create New Event</button>
                : (data.isMember 
                    ? <p className="cardJoined">Joined</p>
                    : <button type="button" className="btn btn-success cardbtn">Join</button>)}
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}

export default Universities;