import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ModalNewClient(props) {
    const [values, setValues] = useState();
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleNewClient = () => {
        Axios.post("http://127.0.0.1:8000/api/clients/store", {
          data: values,
        }).then((response) => {
            var result = response.data;
            if(result.response == 200){
                console.log(result.data)
                props.setListClients([
                    ...props.listClients,
                    {
                        id: result.data.id,
                        name: values.name,
                        cpf: values.cpf,
                        email: values.email,
                        birthday: values.birthday,
                        cep: values.cep,
                        street: values.street,
                        district: values.district,
                        city: values.city,
                        complement: values.complement,
                        number: values.number,
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
          Novo Cliente
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Novo Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cpf"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nascimento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthday"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cep"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Logradouro</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="street"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="district"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={5}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={5}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="complement"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={2}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Numero</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="number"
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
                <Button variant="primary" onClick={handleNewClient}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ModalNewClient;