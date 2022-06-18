import React, { Suspense } from 'react';
import { typeToComponentFabric } from '../../helpers/mockFabric';
import ErrorBoundary from '../errorBoundary';
import TypesSelector from '../typesSelector/typesSelector';

//Product Add form 
const ProductFormComponent = ({productTypes, currentType, notification, handleChange, changeType, newProduct}) => {

    const Lazy = typeToComponentFabric(React, currentType)
    const LazyProprs = {newProduct, handleChange, notification}


    console.log("lazy", Lazy, "type", currentType, "props", LazyProprs);

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
                        <TypesSelector types={productTypes} defaultValue={newProduct.productType?.value} onChangeHandler={changeType}/>
                    </div>
                </li>     
                {/*<li className="typeSpecificFields">{typeCompMap[currentType]}</li>*/}
                <li className="typeSpecificFields">{

                    currentType.length
                    ?
                        <ErrorBoundary>
                                <Suspense fallback={""}>
                                    <Lazy {...LazyProprs}/>
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