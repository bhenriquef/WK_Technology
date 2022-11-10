import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import ModalNewProducts from "./ModalNewProducts"

export default function Products(props){
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        Axios.get("http://127.0.0.1:8000/api/products/all").then((response) => {
            setListProducts(response.data);
        });
      }, []);
    

    return (
        <div className='main-content'>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <Card.Title>
                                Produtos 
                                <ModalNewProducts
                                    listProducts={listProducts}
                                    setListProducts={setListProducts}
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
                                        <th>Preço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listProducts.map((val) => (
                                        <tr>
                                            <td>{val.id}</td>
                                            <td>{val.name}</td>
                                            <td>{val.price}</td>
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