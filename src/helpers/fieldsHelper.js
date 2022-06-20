import mainFields from "./schemas/mainFields";
import productsSchemas from "./schemas/productsSchemas";

const validate = (fieldType, value) => {//ValidateField

    let productFields = {}
    Object.keys(productsSchemas).forEach(k => { productFields = {...productFields, ...(productsSchemas[k])}})

    const messages = {'empty': `Please, provide ${fieldType}`,
                      'invalid': `Please, provide the data of indicated type: ${productFields[fieldType]['desc']}`}

    const status = value === value.match(productFields[fieldType]['pattern'])?.[0];
    let message = ""
    
    if(status === false) message = messages['invalid']
    if(value.length === 0) message = messages['empty']
                                        
    return ({'valid': status, message});
}

const currentFilled = (newProduct) => {

    const current = {}

    Object.keys(newProduct).forEach(key => {
        if(Object.keys(mainFields).includes(key)){
            current[key] = newProduct[key]
        }
    });
    return current
}

const notification = (field, newProduct) => {
    let outMessage = '';

      if(newProduct[field]){
          outMessage = newProduct[field]['message'] ? newProduct[field]['message'] : ''
      }

    return outMessage;
}

export {validate, currentFilled, notification}