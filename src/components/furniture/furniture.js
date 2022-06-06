import React from 'react';
import TypeDescriptionComponent from '../typeDescription/typeDescription';

const FurnitureComponent = ({newProduct = {}, handleChange, notification}) => {
    //handleChange = () => console.log(`handle`);
    return (
           <ul id="Furniture">
                <li>
                 <ul className='fieldNotificationBlock'>
                  <li>
                    <label htmlFor="hight">Height (MB)</label>
                     <input id="height" type="text" max-length="50" placeholder='Please, provide height' value={newProduct?.height?.value} onChange={(e) => handleChange(e, 'height')}/>
                  </li>
                   <li><span className='warning'>{notification('height', newProduct)}</span></li>
                  </ul>
                </li>
                <li>
                 <ul className='fieldNotificationBlock'>
                  <li>
                    <label htmlFor="width">Width (CM)</label>
                     <input id="width" type="text" max-length="50" placeholder='Please, provide width' value={newProduct?.width?.value} onChange={(e) => handleChange(e, 'width')}/>
                   </li>
                   <li><span className='warning'>{notification('width', newProduct)}</span></li>
                  </ul>
                </li>
                <li>
                 <ul className='fieldNotificationBlock'>
                  <li>
                    <label htmlFor="length">Length (CM)</label>
                    <input id="length" type="text" max-length="50" placeholder='Please, provide length' value={newProduct?.length?.value} onChange={(e) => handleChange(e, 'length')}/>
                  </li>
                  <li><span className='warning'>{notification('length', newProduct)}</span></li>
                 </ul>
                </li>
                <li><TypeDescriptionComponent productType={newProduct.productType?.value}/></li> 
           </ul>
        );
    }

export default FurnitureComponent;