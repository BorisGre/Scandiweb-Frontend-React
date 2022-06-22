import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Product from '../../components/product/product';
import { mockProducts } from '../../helpers/mockFabric';

//Products page
const Products = ({productsObj, setProducts}) => {

    const windowRef = useRef(window);
    let maxScroll = 0;
    const maxScrollRef = useRef(maxScroll);
 
    const [nextPage, setLoadNextPage] = useState(true)
    const [debounce, setDebounce] = useState(false)
    const debounceTime = 1000//ms

    const infinityLoad = function(e){// print "false" if direction is down and "true" if up

        //console.log(this.scrollY, this.outerHeight, this.innerHeight, this.outerHeight - this.innerHeight, maxScroll)

        //if((this.oldScroll < this.scrollY) && ((this.scrollY - this.oldScroll) >= (this.outerHeight*0.15))){
        if(this.oldScroll < this.scrollY && this.scrollY >= maxScrollRef.current){

            if(debounce === false){
                
                setLoadNextPage(true)
                setDebounce(true)
           }
           maxScrollRef.current = this.scrollY >= maxScrollRef.current ? this.scrollY : maxScrollRef.current
        } 

     this.oldScroll = this.scrollY;
    }

    windowRef.current.onscroll = infinityLoad
   
    useEffect(() => {

        if(debounce){
           
            setTimeout(() => { console.log(`timeout`); setDebounce(false)}, debounceTime)
          }
        }  
        ,[debounceTime, setDebounce, debounce]
    );

    /* let currentTimeOut = null
    useEffect(() => {
        clearTimeout(currentTimeOut)

      }, []);*/

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
               
            setProducts({current: productsObj.current+1, next: true, 
                         products: [...productsObj.products, ...fetchMock.products]})
                        })
        }
        setLoadNextPage(false)

    }, [nextPage, setProducts, productsObj]);
        


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
                 <header className='top'>  
                   <h3>Product List</h3>
                   <nav className='topControls'>
                        <Link to="/addproduct"><button name="add">ADD</button></Link>
                        <button id="delete-product-btn" name="delete" onClick={onMassDelete}>MASS DELETE</button>
                    </nav>
                  </header>
                    <hr></hr>
                        <ul className="productsList">
                            {productsObj.products.map((product, idx) => {
                                let check = checkedProducts.includes(product.sku)    
                                return <Product key={product.sku+idx*idx} product={product} checked={check} onCheckToggle={onCheckToggle}/>
                                }   
                            )}
                        </ul>   
                </section> 
             </div>
             );
}

export default Products;