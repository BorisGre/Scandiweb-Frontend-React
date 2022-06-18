import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Product from '../../components/product/product';
import { mockProducts } from '../../helpers/mockFabric';

//Products page
const Products = ({productsObj, setProducts, nextPage, setLoadNextPage}) => {

    useEffect(() => {

        if(productsObj.next && nextPage === true){
            
            fetch('https://dummyjson.com/products')
            .then(res => res.json())
            //.then(console.log)
            .then(resp => ({current: productsObj.current+1, next: resp.next, 
                            products: [...productsObj.products, ...resp.products]
                          }))
            .catch(e => console.log(`Products Fetching Error`, e))

            mockProducts()
            .then(fetchMock => {
                //console.log(`fetchMock`, fetchMock);
            
            setProducts({current: productsObj.current+1, next: true, 
                         products: [...productsObj.products, ...fetchMock.products]})
                        })
        }
        setLoadNextPage(false)

    }, [nextPage]);
        


    const [checkedProducts, checkToggle] = useState([])
    const onCheckToggle = (e) => {
       
        const checkedSKU = e.target.value;
        checkedProducts.includes(checkedSKU) ? checkToggle(checkedProducts.filter(v => v !== checkedSKU))
                                             : checkToggle([...checkedProducts, checkedSKU])   

    }

    const onMassDelete = (e) => {
        //console.log(`mass delete`, e, checkedProducts)

        fetch('https://dummyjson.com/products/1', {
            method: 'DELETE',
        })
        .then(res => res.json())
        //.then(console.log)
        .then(res => checkedProducts.filter(product => res.skuArray ? !res.skuArray.includes(product['sku']) : []))
        .then(newChecked => {
            const products = productsObj.products.filter(product => !newChecked.includes(product['sku']))
            setProducts({...productsObj, products})
            checkToggle(newChecked)
        })
        .then(_ => checkToggle([]))
        .catch(e => console.log(`DELETE ERROR`, e));
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