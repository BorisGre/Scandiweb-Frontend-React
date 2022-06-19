import React, { useState, } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Footer from './components/footer/footer';
import Products from './views/ProductsPage/Products';
import ProductAdd from './views/ProductAdd/ProductAdd';

function App() {
   
    const [productsObj, setProducts] = useState({current: 0, next: true, products: []})
    const [productTypes, setProductTypes] = useState([])

    const productProps = {productsObj, setProducts}
    const productAddProps = {productsObj, setProducts, productTypes, setProductTypes}
           
    return (
            <main className="rootApp">
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Products {...productProps}/>}>
                        <Route index element={<Products {...productProps}/>}/>
                    </Route>
                    <Route path="/addproduct" element={<ProductAdd {...productAddProps}/>}></Route>
                </Routes>
                </BrowserRouter>
                <Footer/> 
            </main>
    );
}

export default App;
