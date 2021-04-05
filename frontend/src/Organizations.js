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

function Organizations() {
    const [events, setEvents] = useState([]);
    const [categList, setCategList] = useState([]);
    const [univ, setUniv] = useState("");
    const [org, setOrg] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categ, setCateg] = useState("");
    
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        API.getCategories().then(
            (resp) => { 
                setCategList(resp.map((x, i) => <option key={i} value={x}>{x}</option>));
                var date = new Date();
                date.setDate(date.getDate() + 1);
                doSearch();
            });
    }, [])

    function doSearch(){
        const list = API.getEvents({univ, org, startDate, endDate, categ});
        setEvents(list.map((item) => <Event key={item.id} data={item}/>));
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
                        <table>
                            <tbody>
                            <tr>
                                <th>Organization: </th>
                                <td>
                                    <Form.Control placeholder="Name" value={org} onChange={(x) => setOrg(x.target.value)}/>
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
                            <label></label>
                            <tr>
                                <th> </th><td>
                                <Form>
                                    <Form.Check 
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
                    <a type="button" className="btn btn-success btn-search" href="#" role="button" onClick={() => setModalIsOpen(true)}> Register a new Organization</a>
                </Col>
                    <Modal isOpen={modalIsOpen} 
                        shouldCloseOnOverlayClick={(true)} 
                        onRequestClose={() => setModalIsOpen(false)}
                        
                        style={{
                            overlay: {backgroundColor: 'rgba(112,128,144,0.90)'},
                            content: {height: '75%', width: '40%'}
                        }}>
                        <div className="modal-org">
                            <table className="table-new-org">
                                <tbody>
                                <tr>
                                    <th> New Organization </th>
                                </tr>
                                <tr>
                                    <td>
                                        <Form.Control placeholder="Organization Name" value={org}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Form.Control as="textarea"placeholder="Organization Purpose" rows={3} />
                                    </td>
                                </tr>
                                <tr>
                                    <label> </label>
                                </tr>
                                <tr>
                                    <fieldset>
                                        <Form.Group as={Row}>
                                        <Col >
                                            <tr>
                                                <td ><th>Members</th></td>
                                                <td ><th>Admin</th></td>
                                            </tr>
                                            <tr>
                                            <div className="form-row">
                                                {inputFields.map((inputField, index) => (
                                                    <Fragment key={`${inputField}~${index}`}>
                                                    <div className="form-group">
                                                    <td><Form.Control id="schoolEmail" placeholder="Member's school email" /></td>
                                                    <td><Form.Check type="radio" name="formHorizontalRadios"/></td>
                                                    
                                                    <td>
                                                        <div className="form-group">
                                                            <td><button className="btn btn-link" type="button" onClick={() => handleRemoveFields(index)}>
                                                            -
                                                            </button></td>
                                                            <td><button className="btn btn-link" type="button" onClick={() => handleAddFields()}>
                                                            +
                                                            </button></td>
                                                        </div>
                                                    </td>
                                                    </div>
                                                </Fragment>)) }
                                            </div></tr>
                                        </Col>
                                        </Form.Group>
                                    </fieldset>
                                </tr>
                                <tr>
                                <br/>
                                </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-primary btn-modal" onClick={() => setModalIsOpen(false)}> Close </button>
                        </div>
                    </Modal>
                <Col sm={8} className = "col-results">
                    <div className="event-wrapper">
                        <h2> Organizations at "their school name" </h2>
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
            <Card.Header as="h5"> Organization Name: {data.contact_name}</Card.Header>
            <Card.Body>
                {/*<Card.Title>Subtitle</Card.Title>*/}
                <Card.Text>
                Short organization information
                <button type="button" className="btn btn-success cardbtn">Join</button>
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
}

export default Organizations;