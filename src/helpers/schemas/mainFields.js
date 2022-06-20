const mainFields = {
    "sku":    {pattern: "[A-Z0-9]{0,50}", desc: "capital letters and numbers"}, 
    "name":   {pattern: "[a-zA-Z 0-9,.]{0,50}", desc: "letters; numbers; comma or point"},
    "price":  {pattern: "[1-9]{0,1}[0-9]{0,45}[,]{0,1}[.]{0,1}[0-9]{0,2}", desc: "numbers, comma or point"},
}

export default mainFields;