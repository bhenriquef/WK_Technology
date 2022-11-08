import { Routes, Route } from "react-router-dom"
import Clients from "./components/Clients"
import Products from "./components/Products"
import Sales from "./components/Sales"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path="/" element={ <Clients/> } />
        <Route path="/products" element={ <Products/> } />
        <Route path="/sales" element={ <Sales/> } />
      </Routes>
    </div>
  )
}

export default App