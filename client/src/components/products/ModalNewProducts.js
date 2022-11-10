import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ModalNewProducts(props) {
    const [values, setValues] = useState();
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleNewProduct = () => {
        Axios.post("http://127.0.0.1:8000/api/products/store", {
          data: values,
        }).then((response) => {
            var result = response.data;
            if(result.response == 200){
                console.log(result.data)
                props.setListProducts([
                    ...props.listProducts,
                    {
                        id: result.data.id,
                        name: values.name,
                        price: values.price,
                    },
                ]);

                setShow(false)
                
            }

            props.handleShowMessage(result.response, result.message)
        });
    };

    const handleAddValues = (value) => {
        setValues((prevValues) => ({
          ...prevValues,
          [value.target.name]: value.target.value,
        }));
    };
  
    return (
      <>
        <Button style={{float: 'right'}} className="mb-3" variant="primary" onClick={handleShow}>
          Novo Produto
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Novo Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs={8}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="name"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="price"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleNewProduct}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ModalNewProducts;