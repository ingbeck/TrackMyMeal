import {OpenFoodFactsProduct, OpenFoodFactsProducts} from "../types/OpenFoodFactsProducts.ts";
import OpenFoodFactsProductCard from "./OpenFoodFactsProductCard.tsx";

type OpenFoodFactsProductsGalleryProps ={
    openFoodFactsProducts : OpenFoodFactsProducts | null,
    onClickAddButton : (product: OpenFoodFactsProduct) => void
}

export default function OpenFoodFactsProductsGallery(props: Readonly<OpenFoodFactsProductsGalleryProps>) {
    return (
        <div>
            {props.openFoodFactsProducts !== null
                ?
                props.openFoodFactsProducts.products.map(product => product.name !== "" && <OpenFoodFactsProductCard
                    key={product.name}
                    product={product}
                    onClickAddButton={props.onClickAddButton}/>)
                :
                null
            }
        </div>
    );
}