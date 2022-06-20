const mockProducts = () => {
 const  template =  [{     "sku": "JVC2001923", 
                    "name": "ACME DISC", 
                    "price": "100", 
                    "size": "700", 
                },    
                {   "sku": "GGWP01007", 
                    "name": "War and Peace", 
                    "price": "20.00", 
                    "weight": "2", 
                },
                {   "sku": "TR1Z05455", 
                    "name": "Chair", 
                    "price": "40.00", 
                    "height": "24", 
                    "width": "45",
                    "length": "15"
                }]
    const count = 12;
    let outArray = [];

    for(let b = 0; b < count; b++){
        const i = Math.floor(Math.random()*3)        
        const product = {...template[i]}
   
        Object.keys(product).forEach((k, idx) => product[k] = product[k]+b)
        product.sku = skuGenerate(count)+(Math.floor(Math.random()*1000)+i+b)
        //console.log(`product`, product)
        outArray.push(product);
    }

    //console.log(`outArray`, outArray)
    return new Promise((res, rej) => { res({status: 'ok', next: true, products: outArray})});
}

const skuGenerate = (count) => {
      
    const alphabet =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']

    const skuLetters = (new Array(count/2).fill(true)).reduce((prev, next) => { 
       return prev+(alphabet[Math.floor(Math.random()*alphabet.length)])
    }, ""); 

    return skuLetters
}

const mockProudctTypes = () => new Promise((res, rej) => { res({types: ['DVD', 'Book', 'Furniture']})});

const typeToComponentFabric = (React, type) => {

    const downcase = type.toLowerCase();        
    return  type.length ? React.lazy(() => import(`../components/${downcase}/${downcase}.js`)) : "";
}

export {mockProducts, mockProudctTypes, typeToComponentFabric}