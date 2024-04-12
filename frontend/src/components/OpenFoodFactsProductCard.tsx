import {OpenFoodFactsProduct} from "../types/OpenFoodFactsProducts.ts";

type OpenFoodFactsProductCardProps = {
    product : OpenFoodFactsProduct
}
export default function OpenFoodFactsProductCard(props: Readonly<OpenFoodFactsProductCardProps>) {
    return (
        <div>
            <div>
                <div>
                    <label>{props.product.name}</label>
                    {props.product.servingSize !== 0
                        ?
                        <label>{props.product.servingSize + " " + props.product.servingUnit}</label>
                        :
                        <label>100 g</label>
                    }
                </div>
                <button>Add</button>
            </div>
            <div>
                <label>{props.product.servingSize !== 0 ? props.product.nutriments.energyKcalServing : props.product.nutriments.energyKcal100g} kcal</label>
            </div>
        </div>
    );
}
