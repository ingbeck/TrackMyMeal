import {OpenFoodFactsProduct} from "../types/OpenFoodFactsProducts.ts";
import "./OpenFoodFactsProductCard.css"

type OpenFoodFactsProductCardProps = {
    product : OpenFoodFactsProduct
}
export default function OpenFoodFactsProductCard(props: Readonly<OpenFoodFactsProductCardProps>) {
    return (
        <div className={"card"}>
            <div className={"card-header"}>
                <div className={"card-header-wrapper"}>
                    <label>{props.product.name}</label>
                    {props.product.servingSize !== 0
                        ?
                        <label>{props.product.servingSize + " " + props.product.servingUnit}</label>
                        :
                        <label>100 g</label>
                    }
                </div>
                <button>+</button>
            </div>
            <div className={"card-body"}>
                <label>{props.product.servingSize !== 0 ? props.product.nutriments.energyKcalServing : props.product.nutriments.energyKcal100g} kcal</label>
            </div>
        </div>
    );
}
