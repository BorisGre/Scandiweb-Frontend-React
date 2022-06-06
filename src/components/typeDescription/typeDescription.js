import React from 'react';

const TypeDescriptionComponent = ({productType}) => {
    
   
    const typeToMap = {       "DVD": {"message": "size", "format": "size"}, 
                             "Book": {"message": "weight", "format": "weight"}, 
                        "Furniture": {"message": "dimensions", "format": "HxWxL"}}
                        
    return ( 
        <p>Please provide the {typeToMap[productType]['message']} in {typeToMap[productType]['format']} format</p> 
        );
    }

export default TypeDescriptionComponent;