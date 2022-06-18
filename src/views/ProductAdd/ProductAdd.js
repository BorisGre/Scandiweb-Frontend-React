import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import BookComponent from '../../components/book/book';
import DVDComponent from '../../components/dvd/dvdComponent';
import FurnitureComponent from '../../components/furniture/furniture';
import ProductFormComponent from '../../components/productForm/productFormComponent';
import { currentFilled, notification, validate } from '../../helpers/fieldsHelper';
import validateSchemas from '../../helpers/schemas/validateSchemas';

//Product Add View
const ProductAdd = ({productsObj, setProducts}) => {
    
    const [newProduct, changeProduct] = useState({})
    const [currentType, typeHandler] = useState("") 
    const [saveProduct, productSave] = useState(false)
    const [rejectSaveNotify, rejectSaveNotifyToggle] = useState({show: false})

    let navigate = useNavigate();

    useEffect(() => { if (saveProduct){ return navigate("/")}},[saveProduct]);

    const saveNewProduct = (e) => {
        console.log(`save new product`, e)

        /*const fieldsKeyArray = Object.keys(newProduct)
        const allFieldsValid = fieldsKeyArray.length === fieldsKeyArray.filter(f => newProduct[f]?.valid).length

        console.log(fieldsKeyArray, allFieldsValid)
        if(allFieldsValid){*/
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
             console.log(`save data`)
             const newProductKV = Object.keys(newProduct).reduce((prev, k) => { 
                 prev[k] = newProduct[k].value
                 return prev
                }, {})
             productSave(true)
             setProducts({...productsObj, products: [...productsObj.products, newProductKV]})
        }
        rejectSaveNotifyToggle({show: validate.valid, message: validate.message})
        console.log(`save data, REJECT`, rejectSaveNotify)
    }

    const types = ["DVD", "Book", "Furniture"]

    const changeType = (e) => {
        const currentType = e.target.value;
        typeHandler(currentType)
        changeProduct({...currentFilled(newProduct), 'productType': {value: currentType, valid: true, message: ''}})
    }
            console.log(`productType`, currentType, `newProduct`, newProduct)

    const handleChange = (e, field) => {

        const {valid, message} = validate(field, e.target.value)
        changeProduct({...newProduct, [field]: {value: e.target.value, valid, message}})
    }

    const addFieldsProps = {newProduct, handleChange, notification}

    const typeCompMap = {          "DVD": <DVDComponent {...addFieldsProps}/> , 
                                  "Book": <BookComponent {...addFieldsProps}/>, 
                             "Furniture": <FurnitureComponent {...addFieldsProps}/>, 
                         "Type Switcher": ""}

    const formProps = {types, currentType, notification, handleChange, changeType, newProduct, typeCompMap}                         

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