import {OpenFoodFactsProducts} from "../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductCard from "./OpenFoodFactsProductCard.tsx";

type OpenFoodFactsProductsGalleryProps ={
    openFoodFactsProducts : OpenFoodFactsProducts | null
}

export default function OpenFoodFactsProductsGallery(props: Readonly<OpenFoodFactsProductsGalleryProps>) {
    return (
        <div>
            {props.openFoodFactsProducts !== null
                ?
                props.openFoodFactsProducts.products.map(product => product.name !== "" && <OpenFoodFactsProductCard product={product}/>)
                :
                null
            }
        </div>
    );
}