import React, { Suspense, useMemo, useState } from 'react';
import { currentFilled, validate, notification } from '../../helpers/fieldsHelper';
import { typeToComponentFabric } from '../../helpers/mockFabric';
import ErrorBoundary from '../errorBoundary';
import TypesSelector from '../typesSelector/typesSelector';

//Product Add form 
const ProductFormComponent = ({productTypes, newProduct, changeProduct}) => {

    const [currentType, typeHandler] = useState("") 

    const changeType = (e) => {
        const currentType = e.target.value;
        typeHandler(currentType)
        changeProduct({...currentFilled(newProduct), 'productType': {value: currentType, valid: true, message: ''}})
    }

    const handleChange = (e, field) => {

        const {valid, message} = validate(field, e.target.value)
        changeProduct({...newProduct, [field]: {value: e.target.value, valid, message}})
    }

    const LazyComponent = useMemo(() => typeToComponentFabric(React, currentType), [currentType]);
    const LazyProprs = {newProduct, handleChange, notification}

    return (
            <form id="product_form">
            <fieldset>
                <ul className='inputFields'>
                <li>
                <ul className='mainFieldNotificationBlock'>
                    <li className='inputSide'> 
                        <label htmlFor="sku">SKU</label>
                        <input id="sku" type="text" name="sku" value={newProduct?.sku?.value || ""} onChange={(e) => handleChange(e, 'sku')}/>
                    </li> 
                    <li className='notificationSide'><span className='warning'>{notification('sku', newProduct)}</span></li>
                </ul>
                </li>
                <li>
                <ul className='mainFieldNotificationBlock'>
                    <li className='inputSide'>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={newProduct?.name?.value || ""} onChange={(e) => handleChange(e, 'name')}/>
                    </li> 
                    <li className='notificationSide'><span className='warning'>{notification('name', newProduct)}</span></li>
                </ul>
                </li>
                <li>
                <ul className='mainFieldNotificationBlock'>
                    <li className='inputSide'>
                        <label htmlFor="price">Price ($)</label>
                        <input id="price" type="text" name="price"  value={newProduct?.price?.value || ""} onChange={(e) => handleChange(e, 'price')}/>
                    </li> 
                    <li className='notificationSide'><span className='warning'>{notification('price', newProduct)}</span></li>
                </ul>
                </li>  
                <li>
                    <div className='typesSelectorWrapper'>
                        <label htmlFor="productType" name="switcherLabel">Type Switcher</label>
                        <TypesSelector types={productTypes} defaultValue={newProduct.productType?.value} onChangeHandler={changeType}/>
                    </div>
                </li>     
                <li className="typeSpecificFields">{

                    currentType.length
                    ?
                        <ErrorBoundary>
                                <Suspense fallback={""}>
                                    <LazyComponent {...LazyProprs}/>
                                </Suspense>
                        </ErrorBoundary>
                    : ""
                  }
                </li>
                </ul>
            </fieldset>
            </form>
    )
}
export default ProductFormComponent;