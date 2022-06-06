import React from 'react';

const TypesSelector = ({types = [], defaultValue, onChangeHandler}) => {
    
    return (
            <select id="productType" name="productType" className="typesSelector" onChange={(e) => onChangeHandler(e)}>
                {defaultValue ? '' : <option selected={defaultValue} value="Type Switcher">Type Switcher</option>}
                {types.map((type) => {
                    return (type === defaultValue ? <option value={type} selected key={type}>{type}</option>
                                                  : <option value={type} key={type}>{type}</option>
                            )
                })}
            </select>
    )
} 
export default TypesSelector