import React from 'react';
import TypeDescriptionComponent from '../typeDescription/typeDescription';

const BookComponent = ({newProduct = {}, handleChange, notification}) => {

    return (
        <ul id="Book">
          <li>
           <ul className='fieldNotificationBlock'>
            <li className='inputSide'> 
              <label htmlFor="weight">Weight (KG)</label>
              <input id="weight" type="text" max-length="50" placeholder='Please, provide weight' value={newProduct?.weight?.value} onChange={(e) => handleChange(e, 'weight')}/>
            </li>
             <li className='notificationSide'><span className='warning'>{notification('weight', newProduct)}</span></li>
            </ul>
          </li>
          <li><TypeDescriptionComponent productType={newProduct.productType?.value}/></li>
        </ul>
        );
    }

export default BookComponent;