import React from 'react';

const Product = ({product = {}, checked, onCheckToggle}) => {

    
    return (
             <li className="product">
                 <label className="productCheckbox"> 
                    <input type="checkbox" className={checked ? 'delete-checkbox': 'checkbox'}
                            defaultChecked={checked}
                            value={product.sku}
                            onChange={onCheckToggle} 
                    />        
                 </label>
                 <ul className="productCard">
                    <li>{product.sku}</li>
                    <li>{product.name}</li>
                    <li>{product.price} $</li>
                    {product.size ? (<li>Size: {product.size} MB</li>) : ``}
                    {product.weight ? (<li>Weight: {product.weight} KG</li>) : ``}
                    {product.height ? (<li>Dimension: {product.height}x{product.width}x{product.length}</li>) : ``}
                 </ul>
             </li>
            );
    }

export default Product;