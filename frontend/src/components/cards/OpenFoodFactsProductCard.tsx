import {OpenFoodFactsProduct} from "../../types/OpenFoodFactsProducts.ts";
import "./OpenFoodFactsProductCard.css"
import AddButton from "../svg/AddButton.tsx";

type OpenFoodFactsProductCardProps = {
    product : OpenFoodFactsProduct,
    onClickAddButton : (product: OpenFoodFactsProduct) => void
}
export default function OpenFoodFactsProductCard(props: Readonly<OpenFoodFactsProductCardProps>) {
    return (
        <div className={"card"}>
            <div className={"card-header"}>
                <div className={"card-header-wrapper"}>
                    <label>{props.product.name}</label>
                    {props.product.servingSize !== 0
                        ?
                        <div>
                            <span className={"gradient"}><span className={"serving"}>{props.product.servingSize !== 0 ? props.product.nutriments.energyKcalServing : props.product.nutriments.energyKcal100g}</span> kcal</span>
                            <span id={"servingsize"}>{" / "+ props.product.servingSize} {props.product.servingUnit ? props.product.servingUnit : "g"}</span>
                        </div>
                        :
                        <span>100 g</span>
                    }
                </div>
                <button onClick={() => props.onClickAddButton(props.product)}><AddButton width={40} height={40}/></button>
            </div>
        </div>
    );
}
