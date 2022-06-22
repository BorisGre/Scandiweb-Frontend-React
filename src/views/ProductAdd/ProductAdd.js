import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProductFormComponent from '../../components/productForm/productFormComponent';
import { mockProudctTypes } from '../../helpers/mockFabric';
import validateSchemas from '../../helpers/schemas/validateSchemas';

//Product Add View
const ProductAdd = ({productsObj, setProducts, productTypes, setProductTypes}) => {
    
    const [newProduct, changeProduct] = useState({}) 
    const [saveProduct, productSave] = useState(false)
    const [rejectSaveNotify, rejectSaveNotifyToggle] = useState({show: false})

    let navigate = useNavigate();
    useEffect(() => { if (saveProduct){ 
       
        return navigate("/")
    }},[saveProduct, navigate]);

    
    useEffect(() => {

        if(productTypes.length === 0){

           /*fetch('https://dummyjson.com/productTypes')
           .then(res => res.json())*/
            mockProudctTypes()
           //.then(res => console.log(res))
           .then(res => setProductTypes(res.types))
           .catch(e => console.log(`Fetching product types error`, e))
        }
       }  
       ,[productTypes, setProductTypes]
   );
  
    const saveNewProduct = (e) => {

        const validate = validateSchemas(newProduct)
        if(validate.valid){
            fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  title: 'BMW Pencil',
                  /* other product data */
                })
              })
              .then(res => res.json())
              .then(console.log);

             const newProductKeyValue = Object.keys(newProduct).reduce((prev, k) => { 
                 prev[k] = newProduct[k].value
                 return prev
                }, {})
             productSave(true)
             setProducts({...productsObj, products: [newProductKeyValue, ...productsObj.products]})
             
        } else {

            rejectSaveNotifyToggle({show: validate.valid, message: validate.message})
            console.log(`REJECT Saving new product`, rejectSaveNotify)
        }
    }   
    
    const formProps = {productTypes, newProduct, changeProduct}                         

    return (
        <div className="wrap"> 
            <section className="productAdd">
            <div className='top'>  
                   <h3>Product Add</h3>
                   <div className='topControls'>
                        <button name="save" onClick={saveNewProduct}>Save</button>
                        <Link to="/"><button name="cancel">Cancel</button></Link>
                    </div>
            </div>
                  <hr></hr>
                  <ProductFormComponent {...formProps} />
            </section> 
        </div>
        );
}

export default ProductAdd;