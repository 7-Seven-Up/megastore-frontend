import React from "react";
import { Product } from "../interfaces/product-response.interface";
import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const firstImageUrl = product.imagesURLS?.[0];

    return (
        <Link to={`/products/{productId}`} className="flex flex-col gap-2 w-full">
            <Image src={firstImageUrl} alt={product.name} className="w-full h-48 object-cover rounded-br-none rounded-bl-none mb-auto" classNames={{
                wrapper: "!max-w-full"
            }}/>
            <div className="flex flex-col p-3">
            <h2 className="text-xl capitalize font-bold">{product.name}</h2>
            <h2>{product.description}</h2>
            <p>${product.price}</p>
            </div>
        </Link>
    );
};