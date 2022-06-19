import React from 'react';
import TypeDescriptionComponent from '../typeDescription/typeDescription';

const FurnitureComponent = ({newProduct = {}, handleChange, notification}) => {
    //handleChange = () => console.log(`handle`);
    return (
           <ul id="Furniture">
                <li>
                 <ul className='additinonalFieldBlock'>
                  <li className='inputSide'>
                    <label htmlFor="hight">Height (MB)</label>
                     <input id="height" type="text" max-length="50" placeholder='Please, provide height' value={newProduct?.height?.value  || ""} onChange={(e) => handleChange(e, 'height')}/>
                  </li>
                   <li className='notificationSide'><span className='warning'>{notification('height', newProduct)}</span></li>
                  </ul>
                </li>
                <li>
                 <ul className='additinonalFieldBlock'>
                  <li className='inputSide'>
                    <label htmlFor="width">Width (CM)</label>
                     <input id="width" type="text" max-length="50" placeholder='Please, provide width' value={newProduct?.width?.value || ""} onChange={(e) => handleChange(e, 'width')}/>
                   </li>
                   <li className='notificationSide'><span className='warning'>{notification('width', newProduct)}</span></li>
                  </ul>
                </li>
                <li>
                 <ul className='additinonalFieldBlock'>
                  <li className='inputSide'>
                    <label htmlFor="length">Length (CM)</label>
                    <input id="length" type="text" max-length="50" placeholder='Please, provide length' value={newProduct?.length?.value || ""} onChange={(e) => handleChange(e, 'length')}/>
                  </li>
                  <li className='notificationSide'><span className='warning'>{notification('length', newProduct)}</span></li>
                 </ul>
                </li>
                <li><TypeDescriptionComponent productType={newProduct.productType?.value}/></li> 
           </ul>
        );
    }

export default FurnitureComponent;