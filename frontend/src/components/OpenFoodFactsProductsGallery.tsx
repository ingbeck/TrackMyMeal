import {OpenFoodFactsProducts} from "../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductCard from "./OpenFoodFactsProductCard.tsx";

type OpenFoodFactsProductsGalleryProps ={
    openFoodFactsProducts : OpenFoodFactsProducts
}

export default function OpenFoodFactsProductsGallery(props: Readonly<OpenFoodFactsProductsGalleryProps>) {
    return (
        <div>
            {props.openFoodFactsProducts.products.length != 0 &&
                props.openFoodFactsProducts.products.map(product => <OpenFoodFactsProductCard product={product}/>)}
        </div>
    );
}