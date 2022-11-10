import { Routes, Route } from "react-router-dom"
import Clients from "./components/clients/Clients"
import Products from "./components/products/Products"
import Sales from "./components/sales/Sales"
import Navbar from "./components/Navbar"
import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState } from "react";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('teste')
  const [type, setType] = useState('success')

  console.log(showMessage)
  const handleShowMessage = (status, m) => {
    setMessage(m)
    setType('success')
    
    if(status != 200)
      setType('danger')

    setShowMessage(true)
    
    setTimeout(
      () => setShowMessage(false), 
      3000
    );
  }

  return (
    <div className="App">
      <Alert className={showMessage ? "active" : ""} key={type} variant={type}>
        {message}
      </Alert>

      <Navbar/>
      <Routes>
        <Route path="/" element={ <Clients handleShowMessage={handleShowMessage}/> } />
        <Route path="/products" element={ <Products handleShowMessage={handleShowMessage}/> } />
        <Route path="/sales" element={ <Sales handleShowMessage={handleShowMessage}/> } />
      </Routes>
    </div>
  )
}

export default App