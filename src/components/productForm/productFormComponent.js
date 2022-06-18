import React from 'react';
import TypesSelector from '../typesSelector/typesSelector';

//Product Add form 
const ProductFormComponent = ({types, currentType, notification, handleChange, changeType, newProduct, typeCompMap}) => {

    return (
            <form id="product_form">
            <fieldset>
                <ul className='inputFields'>
                <li>
                <ul className='mainFieldNotificationBlock'>
                    <li className='inputSide'> 
                        <label htmlFor="sku">SKU</label>
                        <input id="sku" type="text" name="sku" max-length="50" value={newProduct?.sku?.value} onChange={(e) => handleChange(e, 'sku')}/>
                    </li> 
                    <li className='notificationSide'><span className='warning'>{notification('sku', newProduct)}</span></li>
                </ul>
                </li>
                <li>
                <ul className='mainFieldNotificationBlock'>
                    <li className='inputSide'>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" max-length="50" value={newProduct?.name?.value} onChange={(e) => handleChange(e, 'name')}/>
                    </li> 
                    <li className='notificationSide'><span className='warning'>{notification('name', newProduct)}</span></li>
                </ul>
                </li>
                <li>
                <ul className='mainFieldNotificationBlock'>
                    <li className='inputSide'>
                        <label htmlFor="price">Price ($)</label>
                        <input id="price" type="text" name="price" max-length="50" value={newProduct?.price?.value} onChange={(e) => handleChange(e, 'price')}/>
                    </li> 
                    <li className='notificationSide'><span className='warning'>{notification('price', newProduct)}</span></li>
                </ul>
                </li>  
                <li>
                    <div className='typesSelectorWrapper'>
                        <label htmlFor="productType" name="switcherLabel">Type Switcher</label>
                        <TypesSelector types={types} defaultValue={newProduct.productType?.value} onChangeHandler={changeType}/>
                    </div>
                </li>     
                <li className="typeSpecificFields">{typeCompMap[currentType]}</li>
                </ul>
            </fieldset>
            </form>
    )
}
export default ProductFormComponent;