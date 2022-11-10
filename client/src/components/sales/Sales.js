import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import ModalNewSales from "./ModalNewSales"

export default function Sales(props){
    const [listSales, setListSales] = useState([]);

    useEffect(() => {
        Axios.get("http://127.0.0.1:8000/api/sales/all").then((response) => {
            setListSales(response.data);
        });
      }, []);
    

    return (
        <div className='main-content'>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <Card.Title>
                                Vendas 
                                <ModalNewSales
                                    listSales={listSales}
                                    setListSales={setListSales}
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
                                        <th>Cliente</th>
                                        <th>Data</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listSales.map((val) => (
                                        <tr>
                                            <td>{val.id}</td>
                                            <td>{val.client_name}</td>
                                            <td>{val.readable_sale_date}</td>
                                            <td>{val.total_price}</td>
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