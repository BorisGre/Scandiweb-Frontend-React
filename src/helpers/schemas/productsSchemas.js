import additionalFieldsBook from "./additionalFieldsBook";
import additionalFieldsDVD from "./additionalFieldsDVD";
import additionalFieldsFurniture from "./additionalFieldsFurniture";
import mainFields from "./mainFields";

const productsSchemas = {
    "DVD": {...mainFields, ...additionalFieldsDVD },
    "Book": {...mainFields, ...additionalFieldsBook },
    "Furniture": {...mainFields, ...additionalFieldsFurniture }
}

export default productsSchemas;