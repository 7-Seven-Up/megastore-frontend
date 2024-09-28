import React from "react";
import { Product } from "../interfaces/product.interface.ts";
import { Link } from "react-router-dom";

interface ProductCardP {
    product: Product;
}

export const ProductCard: React.FC<ProductCardP> = ({ product }) => {
    const firstImageUrl = product.imageURLS?.[0];

    return (
        <Link to={`/product/${product.productId}`} className="p-10 m-1 w-100 border-2" >
            { firstImageUrl ? (<img src={firstImageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" /> ) : 
            ( <p>No image avaiable</p>)}
            <h2>{product.name}</h2>
            <p>${product.price}</p>
        </Link>
    );
};
