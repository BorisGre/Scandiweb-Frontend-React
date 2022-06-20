import productSchemas from "./productsSchemas";

const validateSchemas = (newProduct) => {

    const message = "Error, invalid data in fields or some fields are missing";  
    let response = {'valid': false, message}

    const productType = newProduct['productType']?.value;                

     if(productType === undefined) return response

    const productSchema = productSchemas[productType]
    const productSchemaKeys = Object.keys(productSchema);

    const validKeysArray = productSchemaKeys.filter(schemaKey => {

     return (
      newProduct[schemaKey] !== undefined && 
      newProduct[schemaKey]?.value?.match(productSchema[schemaKey]?.pattern)?.[0] === newProduct[schemaKey]?.value

       ) ? true 
         : false 
     })
    
    const out = (validKeysArray.length === productSchemaKeys.length) ? ({'valid': true, message: 'OK'})
                                                                     : ({'valid': false, message})
                                                                     
    console.log(`validate`, validKeysArray, productSchemaKeys, validKeysArray.length, productSchemaKeys.length, out)                                                                     
    return out;                                                                     
}

export default validateSchemas;