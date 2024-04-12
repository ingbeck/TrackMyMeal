import {OpenFoodFactsProduct} from "../types/OpenFoodFactsProducts.ts";
import "./OpenFoodFactsProductCard.css"

type OpenFoodFactsProductCardProps = {
    product : OpenFoodFactsProduct,
    onClickAddButton : () => void
}
export default function OpenFoodFactsProductCard(props: Readonly<OpenFoodFactsProductCardProps>) {
    return (
        <div className={"card"}>
            <div className={"card-header"}>
                <div className={"card-header-wrapper"}>
                    <label>{props.product.name}</label>
                    {props.product.servingSize !== 0
                        ?
                        <span>{props.product.servingSize + " " + props.product.servingUnit}</span>
                        :
                        <span>100 g</span>
                    }
                </div>
                <button onClick={props.onClickAddButton}>+</button>
            </div>
            <div className={"card-body"}>
                <span>{props.product.servingSize !== 0 ? props.product.nutriments.energyKcalServing : props.product.nutriments.energyKcal100g} kcal</span>
            </div>
        </div>
    );
}
