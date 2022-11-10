import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import ModalNewClient from "./ModalNewClient"

export default function Clients(props){
    const [listClients, setListClients] = useState([]);

    useEffect(() => {
        Axios.get("http://127.0.0.1:8000/api/clients/all").then((response) => {
            setListClients(response.data);
        });
      }, []);
    

    return (
        <div className='main-content'>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <Card.Title>
                                Clientes 
                                <ModalNewClient
                                    listClients={listClients}
                                    setListClients={setListClients}
                                    handleShowMessage={props.handleShowMessage}
                                />
                            </Card.Title>
                        </Col>
                    </Row>
                    
                    <Row className="justify-content-md-center">
                        <Col xs={12}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>E-mail</th>
                                        <th>Nascimento</th>
                                        <th>Endereço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listClients.map((val) => (
                                        <tr>
                                            <td>{val.id}</td>
                                            <td>{val.name}</td>
                                            <td>{val.cpf}</td>
                                            <td>{val.email}</td>
                                            <td>{val.readable_birthday}</td>
                                            <td>{val.street+" "+val.number + ", "+ val.district+", "+val.city}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}