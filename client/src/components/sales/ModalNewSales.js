import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useRef} from 'react';

function ModalNewSales(props) {
    const [values, setValues] = useState();
    const [show, setShow] = useState(false);
    const [listClients, setListClients] = useState([]);
    const [total, setTotal] = useState(0);
    const [listProducts, setListProducts] = useState([]);
    const [saleProducts, setSaleProducts] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(saleProducts);

    useEffect(() => { // pegar todos os clientes
        Axios.get("http://127.0.0.1:8000/api/clients/all").then((response) => {
            setListClients(response.data);
        });
    }, []);

    useEffect(() => { // pegar todos os produtos
        Axios.get("http://127.0.0.1:8000/api/products/all").then((response) => {
            setListProducts(response.data);
        });
    }, []);
    
    const handleNewSale = () => {
        Axios.post("http://127.0.0.1:8000/api/sales/store", {
            data: {
                'sale': values, 
                'products': saleProducts,
                'total': total,
            },
        }).then((response) => {
            var result = response.data;
            if(result.response == 200){
                
                props.setListSales([
                    ...props.listSales,
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

    const handleNewProduct = () => {
        listProducts.map((value) => {
            if(value.id == values.product_id){
                const t = total + (value.price * values.quantity)
                setTotal(t);

                setSaleProducts([
                    ...saleProducts,
                    {
                        id: values.product_id,
                        quantity: values.quantity,
                        price: value.price,
                        name: value.name,
                    }
                ])
            }
        })
    }

    const handleRemoveProduct = (element) => {
        setSaleProducts(
            saleProducts.filter((value) => {
                if(value.id == element.target.name){
                    const t = total - (value.price * value.quantity)
                    setTotal(t);
                }

                return value.id != element.target.name;
            })
        );
    }

    const handleAddValues = (value) => {
        setValues((prevValues) => ({
          ...prevValues,
          [value.target.name]: value.target.value,
        }));
    };
  
    return (
      <>
        <Button style={{float: 'right'}} className="mb-3" variant="primary" onClick={handleShow}>
          Nova Venda
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nova Venda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs={8}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Cliente</Form.Label>
                                <Form.Select
                                    required
                                    name="client_id"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                >
                                    <option>Selecionar</option>
                                    {listClients.map((val) => (
                                        <option value={val.id}>{val.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>data</Form.Label>
                                <Form.Control
                                    required
                                    type="datetime-local"
                                    name="sale_date"
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
                                <Form.Label>Produto</Form.Label>
                                <Form.Select
                                    required
                                    name="product_id"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                >
                                    <option>Selecionar</option>
                                    {listProducts.map((val) => (
                                        <option value={val.id}>{val.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={3}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="quantity"
                                    placeholder=""
                                    autoFocus
                                    onChange={handleAddValues}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={3}>
                            <Button variant="primary" style={{marginTop: "32px"}} onClick={handleNewProduct}>
                                Adicionar
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <h5 className='mb-2 mt-3'><b>Produtos:</b></h5>
                        <Col xs={12}>
                            {saleProducts.map((val) => (
                                <Row>
                                    <Col xs={6}>
                                        {val.name}
                                    </Col>
                                    <Col xs={2}>
                                        R$ {val.price}
                                    </Col>
                                    <Col xs={2}>
                                        Qtd: {val.quantity}
                                    </Col>
                                    <Col xs={2}>
                                        <Button variant="danger" name={val.id} onClick={handleRemoveProduct}>
                                            remover
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Row>

                    <Row className='mt-3'>
                        <Col xs={8}>
                            <b>Total: {total}</b>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleNewSale}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ModalNewSales;