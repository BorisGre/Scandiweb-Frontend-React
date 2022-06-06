import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Product from '../../components/product/product';
import mockFabric from '../../helpers/mockFabric';

//Products page
const Products = ({productsObj, setProducts, nextPage, setLoadNextPage, scrollToTop, scrollToEnd}) => {

    useEffect(() => {
        console.log(`load nextPage`)//, nextPage)
        if(productsObj.next && nextPage === true){
            console.log(`next Page`, productsObj.current, productsObj.next, `next:`, productsObj.current+1)
            const fetchMock = mockFabric()
            console.log(fetchMock)
         /*   fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(console.log)
            .then(prod => setProducts({current: productsObj.current+1, next: true, products: [...productsObj.products, ...fetchMock.products]}))
            .catch(e => console.log(`error`, e))
            .finally(setLoadNextPage(false))*/
            setProducts({current: productsObj.current+1, next: true, products: [...productsObj.products, ...fetchMock.products]})
            //setLoadNextPage(false)
            //scrollToEnd()
        }
        //if(!productsObj.next && nextPage) setLoadNextPage(false)
        setLoadNextPage(false)

    }, [nextPage]); //[nextPage, setLoadNextPage, productsObj, mockFabric]);
        
    const [checkedProducts, checkToggle] = useState([])

    const onCheckToggle = (e) => {
        console.log(`checkToggle`, e.target.value);
        const checkedSKU = e.target.value;
        checkedProducts.includes(checkedSKU) ? checkToggle(checkedProducts.filter(v => v !== checkedSKU))
                                             : checkToggle([...checkedProducts, checkedSKU])   

    }

    const onMassDelete = (e) => {
        console.log(`mass delete`, e, checkedProducts)

        fetch('https://dummyjson.com/products/1', {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(console.log)
        .then(_ => {
            const products = productsObj.products.filter(product => !checkedProducts.includes(product['sku']))
            setProducts({...productsObj, products})
        })
        .then(_ => checkToggle([]))
    }

        return (
            <div className="wrap"> 
                <section className="products">
                 <div className='top'>  
                   <h3>Product List</h3>
                   <div className='topControls'>
                        <Link to="/addproduct"><button name="add">ADD</button></Link>
                        <button id="delete-product-btn" name="delete" onClick={onMassDelete}>MASS DELETE</button>
                    </div>
                  </div>
                    <hr></hr>
                        <ul className="productsList">
                            {productsObj.products.map((product, idx) => {
                                let check = Boolean(checkedProducts[product.sku])    
                                return <Product key={product.sku+idx*idx} product={product} checked={check} onCheckToggle={onCheckToggle}/>
                                }   
                            )}
                        </ul>   
                </section> 
             </div>
             );
}

export default Products;