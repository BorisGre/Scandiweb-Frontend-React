import React from 'react';
import TypeDescriptionComponent from '../typeDescription/typeDescription';

const DVDComponent = ({newProduct = {}, handleChange, notification}) => {
    return (
        <ul id="DVD">
          <li>
            <ul className='fieldNotificationBlock'>
              <li className='inputSide'>
                <label htmlFor="size">Size (MB)</label>
                <input id="size" type="text" max-length="50" placeholder='Please, provide size' value={newProduct?.size?.value} onChange={(e) => handleChange(e, 'size')}/>
              </li>
              <li className='notificationSide'><span className='warning'>{notification('size', newProduct)}</span></li>
            </ul>
          </li>
           <li>{/*<TypeDescriptionComponent productType={newProduct.productType?.value}/>*/}</li> 
        </ul>
        );
    }

export default DVDComponent;